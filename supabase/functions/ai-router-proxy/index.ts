/**
 * ai-router-proxy — server-side proxy to the Onasis AI Router.
 *
 * Why this exists: this app is a browser SPA, so it must never hold a router
 * credential. The browser calls THIS function with the user's Supabase JWT; we
 * forward that JWT to the router so each user keeps their own memory identity.
 *
 * Contract reference: onasis-ai-router/docs/INTEGRATION-GUIDE.md
 *   - endpoint is /api/v1/ai-chat
 *   - the answer is data.response
 *   - a lano_* key goes in X-API-Key, a user JWT in Authorization Bearer
 *   - never send both credential schemes
 *   - system/developer messages are rejected with HTTP 400 by the router
 *
 * Credential scheme is fixed per deployment by AI_ROUTER_AUTH_MODE
 * (`user_jwt` default, `api_key` opt-in). The proxy rejects anonymous callers:
 * `verify_jwt` accepts the public anon key, which is not an identity.
 *
 * Client compatibility: returns the answer as BOTH `text` and `response`
 * because the three chat surfaces this replaces disagree on the field name
 * (ai-chat returned `text`, use-ai-chat read `response`).
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ROUTER_URL = Deno.env.get('AI_ROUTER_URL') ?? 'https://ai.vortexcore.app';

// Server-side only. Never expose to the client bundle.
const LANO_KEY = Deno.env.get('LANONASIS_API_KEY') ?? '';

// Which credential this deployment presents to the router. Exactly ONE scheme,
// fixed for the whole deployment — never per request.
//
// The router treats a credential as an identity, so switching schemes partway
// through a request silently changes WHO is asking (guide §3). Guide §7.4 also
// forbids retrying a 401: it is a config error, and retrying hides it.
//
//   user_jwt (default) — forward the caller's Supabase JWT. Per-user memory.
//   api_key            — present the shared LANONASIS_API_KEY. Every caller then
//                        shares one memory identity; only correct when UAI does
//                        not yet trust this project's Supabase issuer.
type AuthMode = 'user_jwt' | 'api_key';

const AUTH_MODE_RAW = (Deno.env.get('AI_ROUTER_AUTH_MODE') ?? 'user_jwt').trim().toLowerCase();
const AUTH_MODE: AuthMode | null =
  AUTH_MODE_RAW === 'user_jwt' || AUTH_MODE_RAW === 'api_key' ? AUTH_MODE_RAW : null;

// Stay under nginx's 60s proxy cap so we fail with clean JSON, not HTML 504.
const TIMEOUT_MS = 45_000;

/** Fixed list — guide §4. Reject unknown values instead of letting the router
 *  silently fall back to `ask-ai`, which hides typos.
 *  NOTE: `memory-analysis-json` is live in GET /api/v1/catalog but missing from
 *  the guide's §4 table — the catalog is authoritative.
 *  NOTE: `tool-proxy` is deliberately absent. That lane answers with
 *  `response: ""` plus `tool_calls`, and requires the credential's `auth_id` to
 *  be allowlisted server-side. We send no `tools` and never read `tool_calls`,
 *  so offering the lane would turn every call into an empty-answer 502. Add it
 *  back only alongside real tool plumbing. */
const USE_CASES = new Set([
  'ask-ai',
  'landing-guide',
  'dashboard-assistant',
  'support-chat',
  'memory-analysis',
  'memory-analysis-json',
  'content-generation',
  'code-assist',
  'repl-nlp',
]);

const DEFAULT_USE_CASE = 'dashboard-assistant';

// Router retention is last 12 messages; more than that is wasted payload.
const MAX_HISTORY = 12;

interface RouterTurn {
  role: 'user' | 'assistant';
  content: string;
}

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...extraHeaders },
  });

const fail = (status: number, code: string, message: string, extraHeaders?: Record<string, string>) =>
  json({ error: { code, message }, text: '', response: '' }, status, extraHeaders);

/**
 * The router rejects a `system` or `developer` role outright, and ignores
 * anything but user/assistant turns. Sanitise before sending so a legacy caller
 * sending a system prompt degrades to a normal turn instead of a 400.
 */
function toTurns(raw: unknown): RouterTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: RouterTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as Record<string, unknown>).role;
    const content = (item as Record<string, unknown>).content;
    if (role !== 'user' && role !== 'assistant') continue;
    if (typeof content !== 'string' || !content.trim()) continue;
    turns.push({ role, content });
  }
  return turns.slice(-MAX_HISTORY);
}

function isValidSessionId(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9._:-]{8,128}$/.test(value);
}

/**
 * Read claims out of the caller's bearer token WITHOUT verifying it.
 *
 * Safe here only because Supabase's gateway already verified the signature
 * (`verify_jwt = true` in config.toml) before this function runs. We need the
 * claims for one reason: `verify_jwt` also accepts the project's ANON key, which
 * ships in every browser bundle, so "an Authorization header exists" does not
 * mean "a user is signed in". The anon key carries `role: "anon"` and no `sub`;
 * new-style `sb_publishable_...` keys are not JWTs at all.
 */
function readClaims(authorization: string): Record<string, unknown> | null {
  const token = authorization.replace(/^Bearer\s+/i, '').trim();
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const claims: unknown = JSON.parse(atob(padded));
    return claims && typeof claims === 'object' ? (claims as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Guide §2.2: the router echoes continuity on `onasis_metadata.session_id`. */
function readSessionEcho(body: Record<string, unknown> | null): string | null {
  const meta = body?.onasis_metadata;
  if (!meta || typeof meta !== 'object') return null;
  const id = (meta as Record<string, unknown>).session_id;
  return typeof id === 'string' ? id : null;
}

interface RouterResult {
  ok: boolean;
  status: number;
  body: Record<string, unknown> | null;
  retryAfter?: string;
}

async function callRouter(payload: Record<string, unknown>, auth: Record<string, string>): Promise<RouterResult> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ROUTER_URL}/api/v1/ai-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });

    // A 504 from nginx comes back as HTML; don't assume a parseable body.
    const body = await res.json().catch(() => null);
    return {
      ok: res.ok,
      status: res.status,
      body: body as Record<string, unknown> | null,
      retryAfter: res.headers.get('Retry-After') ?? undefined,
    };
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === 'AbortError';
    console.error('[ai-router-proxy] router call failed:', timedOut ? 'timeout' : String(err));
    return { ok: false, status: timedOut ? 504 : 502, body: null };
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return fail(405, 'method_not_allowed', 'Use POST.');
  }

  let payloadIn: Record<string, unknown>;
  try {
    payloadIn = await req.json();
  } catch {
    return fail(400, 'invalid_json', 'Request body must be JSON.');
  }

  // --- build the conversation ------------------------------------------------
  const history = toTurns(payloadIn.messages);
  const direct = typeof payloadIn.prompt === 'string'
    ? payloadIn.prompt
    : typeof payloadIn.query === 'string'
    ? payloadIn.query
    : '';

  const messages: RouterTurn[] = [...history];
  if (direct.trim()) {
    messages.push({ role: 'user', content: direct });
  }

  if (messages.length === 0) {
    return fail(400, 'missing_message', 'Provide `prompt`, `query`, or a non-empty `messages` array.');
  }
  if (messages[messages.length - 1].role !== 'user') {
    return fail(400, 'missing_user_turn', 'The last message must be from the user.');
  }

  // --- pick a lane -----------------------------------------------------------
  const requested = payloadIn.use_case ?? payloadIn.useCase;
  const useCase = typeof requested === 'string' ? requested : DEFAULT_USE_CASE;
  if (!USE_CASES.has(useCase)) {
    return fail(400, 'unknown_use_case', `Unknown use_case "${useCase}". See the integration guide §4.`);
  }

  const payload: Record<string, unknown> = { use_case: useCase, messages };
  if (isValidSessionId(payloadIn.session_id)) {
    payload.session_id = payloadIn.session_id;
  }

  // --- credential: exactly one scheme, fixed by AI_ROUTER_AUTH_MODE ---------
  if (!AUTH_MODE) {
    console.error(
      `[ai-router-proxy] invalid AI_ROUTER_AUTH_MODE "${AUTH_MODE_RAW}" — expected "user_jwt" or "api_key"`,
    );
    return fail(500, 'MISCONFIGURED', 'The AI service is misconfigured.');
  }
  if (AUTH_MODE === 'api_key' && !LANO_KEY) {
    console.error('[ai-router-proxy] AI_ROUTER_AUTH_MODE=api_key but LANONASIS_API_KEY is empty');
    return fail(500, 'MISCONFIGURED', 'The AI service is misconfigured.');
  }

  // A signed-in caller is required in BOTH modes. The anon key is not an
  // identity, and in api_key mode anonymous traffic would spend the shared
  // key's quota and land in the shared memory bank.
  const userAuth = req.headers.get('authorization');
  const claims = userAuth ? readClaims(userAuth) : null;
  const signedIn =
    !!claims && claims.role !== 'anon' && typeof claims.sub === 'string' && claims.sub.length > 0;

  if (!signedIn) {
    return fail(401, 'AUTH_REQUIRED', 'Sign in to use the AI assistant.');
  }

  const auth: Record<string, string> =
    AUTH_MODE === 'user_jwt'
      ? { Authorization: userAuth as string }
      : { 'X-API-Key': LANO_KEY };

  if (AUTH_MODE === 'api_key') {
    console.warn('[ai-router-proxy] serving chat with the shared key — every caller shares one memory identity');
  }

  // --- call the router -------------------------------------------------------
  let result = await callRouter(payload, auth);

  // Retry at most once, transient failures only — never on 401 (config error)
  // or 429 (backoff belongs to the caller) — guide §7.4. The same credential is
  // reused, so a retry can never change which identity is asking.
  if (!result.ok && [500, 502, 503, 504].includes(result.status)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    result = await callRouter(payload, auth);
  }

  // --- map the result --------------------------------------------------------
  if (result.ok) {
    const answer = typeof result.body?.response === 'string' ? result.body.response : '';
    if (!answer) {
      return fail(502, 'AI_SERVICE_ERROR', 'The AI service returned an empty answer. Please try again.');
    }
    return json({
      text: answer,
      response: answer,
      use_case: useCase,
      session_id: readSessionEcho(result.body) ?? payload.session_id ?? null,
      usage: result.body?.usage ?? null,
      onasis_metadata: result.body?.onasis_metadata ?? null,
    });
  }

  // 429 — pass Retry-After through so the client can honour it.
  if (result.status === 429) {
    return fail(429, 'RATE_LIMIT_EXCEEDED', 'Busy right now — please try again shortly.', {
      ...(result.retryAfter ? { 'Retry-After': result.retryAfter } : {}),
    });
  }

  if (result.status === 401) {
    console.error(
      '[ai-router-proxy] router rejected our credential (401) — check AI_ROUTER_AUTH_MODE and, for user_jwt, whether UAI trusts this issuer',
    );
    return fail(401, 'AUTH_REQUIRED', 'The AI service rejected the request. Please sign in again.');
  }

  // 503 AUTH_SERVICE_UNAVAILABLE is transient; everything else exhausted the chain.
  const code = result.body?.error && typeof result.body.error === 'object'
    ? String((result.body.error as Record<string, unknown>).code ?? 'AI_SERVICE_ERROR')
    : 'AI_SERVICE_ERROR';

  console.error(`[ai-router-proxy] router failed: status=${result.status} code=${code}`);

  return fail(
    result.status === 504 ? 504 : 503,
    code,
    'The AI assistant is unavailable right now. Please try again in a moment.',
  );
});
