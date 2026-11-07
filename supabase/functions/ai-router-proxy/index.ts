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

// UAI may not accept this project's Supabase JWTs as an issuer yet. When that is
// confirmed, flip this on to fall back to the shared key. Off by default because
// a shared key collapses every user into one memory identity (see guide §3).
const ALLOW_KEY_FALLBACK =
  (Deno.env.get('AI_ROUTER_ALLOW_KEY_FALLBACK') ?? 'false').toLowerCase() === 'true';

// Stay under nginx's 60s proxy cap so we fail with clean JSON, not HTML 504.
const TIMEOUT_MS = 45_000;

/** Fixed list — guide §4. Reject unknown values instead of letting the router
 *  silently fall back to `ask-ai`, which hides typos.
 *  NOTE: `memory-analysis-json` is live in GET /api/v1/catalog but missing from
 *  the guide's §4 table — the catalog is authoritative. */
const USE_CASES = new Set([
  'ask-ai',
  'landing-guide',
  'dashboard-assistant',
  'tool-proxy',
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

  // --- credential: exactly one scheme ---------------------------------------
  // The browser's Supabase JWT, so the router resolves THIS user's identity.
  const userAuth = req.headers.get('authorization');
  const useUserJwt = !!userAuth;

  if (!useUserJwt && !(ALLOW_KEY_FALLBACK && LANO_KEY)) {
    return fail(
      401,
      'AUTH_REQUIRED',
      'Sign in to use the AI assistant.',
    );
  }

  const attemptWith = (withKey: boolean): Record<string, string> =>
    withKey ? { 'X-API-Key': LANO_KEY } : { Authorization: userAuth as string };

  // --- first attempt ---------------------------------------------------------
  let result = await callRouter(payload, attemptWith(!useUserJwt));

  // Auth-scheme fallback, only if explicitly enabled and only on 401. This is an
  // intentional scheme switch, not a blind retry of a failed request.
  if (!result.ok && result.status === 401 && useUserJwt && ALLOW_KEY_FALLBACK && LANO_KEY) {
    console.warn('[ai-router-proxy] router rejected the user JWT; retrying with the shared key');
    result = await callRouter(payload, attemptWith(true));
  }

  // Retry at most once, and only for transient upstream failures.
  if (!result.ok && [500, 502, 503, 504].includes(result.status)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    result = await callRouter(payload, attemptWith(!useUserJwt));
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
      session_id: result.body?.session_id ?? payload.session_id ?? null,
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
    console.error('[ai-router-proxy] router rejected our credential (401) — check AI_ROUTER_ALLOW_KEY_FALLBACK');
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
