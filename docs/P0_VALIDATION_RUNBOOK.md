# P0 Validation Runbook — Production Launch Readiness

Companion to `.kiro/specs/production-launch-readiness/tasks.md`.
Purpose: close the runtime items (B2–B5) that cannot be proven from the filesystem, and record the evidence.

---

## 0. Pre-flight — domain, DNS and mail

Verified 2026-11-07 against authoritative DNS and live HTTP. **This gate must pass before B2 can be attempted at all.** An earlier pass found `seftechub.com` still delegated to Hostinger/Namecheap parking DNS and serving a domain-marketplace lander, which made "validate auth on the deployed domain" impossible — there was no deployment at that address.

| Check | Expected | Verified |
|---|---|---|
| Registry delegation | `ns1`/`ns2.vercel-dns.com` | ✅ |
| Public propagation | 8.8.8.8 and 9.9.9.9 agree | ✅ |
| Apex `A` | Vercel anycast `64.29.17.x` | ✅ |
| `www` `A` | Vercel anycast `216.198.79.x` | ✅ |
| Apex → `www` | `307` | ✅ |
| `http` → `https` | `308` | ✅ |
| `www` response | HTTP 200, `server: Vercel`, HSTS | ✅ |
| App renders | SEFTEC title present | ✅ |
| `MX` | `1 smtp.google.com` | ✅ |
| `SPF` | `v=spf1 include:_spf.google.com ~all` | ✅ |
| `DKIM` | `google._domainkey` → `v=DKIM1; k=rsa; p=…` | ✅ |
| `DMARC` | `_dmarc` TXT present | ❌ missing |
| Google verification | `google-site-verification=…` TXT | ⚠️ absent — check Admin console |
| Mailbox delivery | real send/receive on `support@` | ⚠️ unverified |

Re-verify at any time:

```bash
dig +short NS seftechub.com
dig +short MX seftechub.com
dig +short TXT seftechub.com
dig +short TXT _dmarc.seftechub.com
dig +short TXT google._domainkey.seftechub.com
curl -sS -I https://www.seftechub.com | head -5
```

### 0.1 Remaining mail gates

1. **DMARC missing.** Add a `_dmarc` TXT:

   ```
   v=DMARC1; p=none; rua=mailto:dmarc@seftechub.com
   ```

   Start at `p=none`. Gmail/Yahoo bulk-sender rules effectively expect it now, and without it you get no reporting on spoofing of your domain.

2. **Google verification token.** The apex has exactly one TXT (SPF) — no `google-site-verification=`. If Admin console → Domains shows the domain unverified, add the token it issues. Verification also decays if the record disappears again.

3. **DKIM activation is not the record.** The TXT existing does not mean Gmail signs. Click **Admin console → Apps → Google Workspace → Gmail → Authenticate email → Start authentication**, then send to a Gmail address and confirm `dkim=pass` in *Show original*.

4. **Mailbox reality.** MX routes but does not prove a mailbox exists. The app publishes `support@seftechub.com` in `src/components/ui/footer.tsx:93`, `src/pages/Contact.tsx:74` and `db.json:129` — send and receive a real test message before launch.

5. **Propagation tail.** Registry delegation TTL is `172800` s (2 days). Major resolvers already agree, but stragglers can serve the old parking answers for up to 48 h. Do not schedule a mail-dependent go-live inside that window.

### 0.2 Known-good notes

- A wildcard `*` `A` record exists, so arbitrary subdomains resolve to Vercel and return `404`. Harmless, and it does not affect `MX` or `TXT` lookups. Remove it if you want tighter hygiene.
- The apex `307`s to `www`, so `window.location.origin` is always `https://www.seftechub.com` — allowlist `www` only (§3.1).

---

## 1. Status snapshot — 2026-11-07

| ID | Item | Status | Evidence |
|---|---|---|---|
| B1 | Delete orphaned legacy files | **Closed** | 5 files removed — see §2 |
| B2 | Auth callback on deployed domain | **Open** | Domain now live and verified (§0); needs Supabase allowlist + click-through — see §3 |
| B3 | Dashboard runtime truth | **Open** | Needs authenticated session — see §4 |
| B4 | Invoices / Customers / Inventory views | **Open** | Needs authenticated session — see §5 |
| B5 | AI provider secrets | **Open** | Chat rerouted through `ai-router-proxy`; business-plan path still needs `OPENAI_API_KEY` — see §6 |
| B6 | Bill payment maintenance state | **Closed** | `BillPaymentPage.tsx` — 4× "Coming Soon" badges + `<Alert>` at L265 |
| B7 | Remove runtime `@ts-nocheck` | **Closed** | 0 runtime files remain; only `ui/chart.tsx`, `ui/resizable.tsx` (non-blocking per tasks.md) |
| B8 | Duplicate Supabase clients | **Closed** | Canonical client is `src/integrations/supabase/client.ts` (60 importers) — see §2 |

---

## 2. Code-closure evidence (B1, B7, B8)

**B1 — files removed.** The three files named in tasks.md were already gone. Two further unrouted test pages and two dead client modules were removed in this pass:

```
src/pages/AuthTest.tsx              (unrouted; last real change Mar 2025)
src/pages/SocialLoginTest.tsx       (unrouted; Apr 2025)
src/lib/supabase-central.ts         (0 importers)
src/context/SupabaseContext.tsx     (0 importers; created a 2nd client with no persistSession)
```

Verify no references remain:

```bash
grep -rn "AuthTest\|SocialLoginTest\|supabase-central\|SupabaseContext" src/ ; # expect no output
```

**B8 — why this resolved it.** `src/lib/supabase-central.ts` was never the drift risk: it had zero importers, so its config could not affect runtime. The genuine hazard was `src/context/SupabaseContext.tsx`, which called `createClient(url, key)` with **no `persistSession` and no `autoRefreshToken`** — a second client that would silently refuse to persist sessions. It was also unreferenced. Both modules are now deleted, leaving exactly one client:

```bash
grep -rln "createClient" src/
# expect: src/integrations/supabase/client.ts   <- canonical (instantiates)
#         src/lib/feature-flags.ts              <- type-only helper param, no instance
#         src/integrations/supabase/types.ts    <- comment only
```

**Build verification (2026-11-06, after deletions):**

```
bun install      -> 3204 packages installed
bun run typecheck -> exit 0
bun run build     -> exit 0, "✓ built in 10.60s"
```

Build also reports `[sentry-vite-plugin] Info: Successfully uploaded source maps to Sentry` — so the P1 "Sentry sourcemap verification" item is already satisfied in the build path; verify in the Sentry UI only if the release is tagged.

Note `src/integrations/supabase/client.ts` is the canonical client and already carries the correct auth options (`persistSession`, `autoRefreshToken`, `detectSessionInUrl`, `flowType: pkce`).

**B7 — verification.** The 2 remaining `@ts-nocheck` files are third-party wrapper artifacts:

```bash
grep -rn "@ts-nocheck" src/   # expect only ui/chart.tsx, ui/resizable.tsx
```

---

## 3. B2 — Auth callback on the deployed domain

**Why it fails in preview:** the app builds its redirect from `window.location.origin` (`src/utils/auth-utils.ts:43,56,121,148`). On a Lovable/Vercel preview origin that resolves to the preview host, which Supabase will reject unless allowlisted. Production only works if the production origin is allowlisted.

**Critical detail:** the callback route is **`/auth-callback`** (hyphen) — `src/App.tsx:100`. Not `/auth/callback`. A wrong-path entry in the allowlist produces a silent redirect-to-login loop.

### 3.1 Supabase dashboard → Authentication → URL Configuration

```
Site URL:      https://www.seftechub.com

Redirect URLs:
  https://www.seftechub.com/auth-callback
  https://www.seftechub.com/reset-password
  https://*-<vercel-team>.vercel.app/auth-callback   (preview, optional)
```

Use `www` only. The apex `307`s to `www` (§0.2), so `window.location.origin` is never the apex — an apex entry is dead weight and hides a misconfiguration if the redirect ever breaks.

### 3.2 Email/password + magic link

1. Open a private window → `https://www.seftechub.com/login`
2. Sign up with a fresh address → expect confirmation email, then land authenticated.
3. Magic link: request link → click from the email → should land on `/auth-callback` then redirect authenticated (not `/login`).
4. Reload the tab → session persists (proves `persistSession` on the canonical client).
5. Log out → confirm redirect to `/login` and protected routes bounce back.

**Pass:** no `redirect_uri mismatch`, no loop back to `/login`, session survives reload.
**Fail → check first:** allowlist path spelling, then DevTools Network for the `token?` / `#access_token` fragment being dropped.

---

## 4. B3 — Dashboard empty-state truth

Routes live under `/profile` (`src/routes/profileRoutes.tsx:46-51`).

| Route | Must show |
|---|---|
| `/profile/dashboard` | deliberate empty states, never a blank panel |
| `/profile/wallet` | "No transactions yet" — not a broken shell |
| `/profile/finance` | honest empty state |

**Pass:** zero console errors attributable to schema/RLS; every panel renders either real data or an explanatory empty state.
**Fail signature:** `PGRST205` / `42703` (missing column) or `42501` (RLS) in the console → record the exact table + column and compare against `SCHEMA_RECONCILIATION.md`.

---

## 5. B4 — Invoices / Customers / Inventory views

Views are shared across schemas, so a passing local query does not guarantee a passing deployed query — this must be checked signed-in against production.

| Route | Hook | Tables queried |
|---|---|---|
| `/profile/invoices` | `src/hooks/use-invoices.ts` | `invoices`, `invoice_items` |
| `/profile/customers` | `src/hooks/use-customers.ts` | `customers` |
| `/profile/inventory` | `src/hooks/use-inventory.ts` | `inventory_items` |

**Per page:** load → no console errors → clean empty state → attempt one create/edit and confirm it either succeeds or is explicitly disabled with an explanation (tasks.md acceptance).

---

## 6. B5 — AI provider secrets

The AI surface is now split in two. Only one path still needs a direct provider key.

### 6.1 Chat — `ai-router-proxy` → Onasis AI Router

`supabase/functions/ai-router-proxy/index.ts` replaces the direct OpenAI calls for all chat surfaces. It holds no vendor keys; the router owns vendor choice, model selection, failover and the system prompt.

| Env var | Required | Notes |
|---|---|---|
| `AI_ROUTER_URL` | no | Defaults to `https://ai.vortexcore.app`. Set it so a future alias is a config change. |
| `LANONASIS_API_KEY` | only for fallback | A `lano_*` key. Server-side only — never a `VITE_*` var. |
| `AI_ROUTER_ALLOW_KEY_FALLBACK` | no | `true` enables the shared-key path. Leave **off** until §6.3 is resolved. |

Credential rule: the function forwards the **caller's Supabase JWT** as `Authorization: Bearer`, so the router resolves each user's own memory identity. It never sends `Authorization` and `X-API-Key` together.

Health check before blaming the proxy:

```bash
curl -sS https://ai.vortexcore.app/health
```

`degraded` (HTTP 200) is normal and does **not** mean broken — the router is routing around a failed vendor. Only HTTP 503 / `unavailable` is an outage.

**Known state 2026-11-06:** the router reported `degraded`, `2/6` vendors healthy, every lane `degraded` with `servingCapacity 2 of 5`. It serves via fallbacks; expect variable latency.

### 6.2 Business plans — `bizgenie-router` (unchanged)

Business-plan generation still calls OpenAI directly, because it needs a custom ~40-line system prompt, HTML output, and `max_tokens: 4096` — none of which the router accepts (`system` role is a hard HTTP 400). This path needs exactly one secret:

```
OPENAI_API_KEY     # hard requirement; bizgenie-router returns 503 without it
```

```bash
supabase secrets set OPENAI_API_KEY=sk-... --project-ref <ref>
supabase secrets list --project-ref <ref>   # confirm presence (values are hashed)
```

`BizGenie_API_key` and `PERPLEXITY_API_KEY` are no longer read by the chat path. They can be retired once nothing calls the legacy `ai-chat` / `personalized-ai-chat` functions — but note `BizGenie_API_key` was also the key used by the old classifier, so do not delete it before confirming no deployed function still reads it.

Verify the plan path (the function logs `hasApiKey` as a boolean per request):

```bash
curl -sS -X POST "https://<ref>.supabase.co/functions/v1/bizgenie-router" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -d '{"mode":"business-plan","planData":"a coffee roastery in Lagos","userId":"00000000-0000-0000-0000-000000000000"}' \
  | head -c 600
```

- **Healthy:** HTML in `planHtml` within ~10s.
- **`503` "currently unavailable for premium business plan generation":** `OPENAI_API_KEY` unset.
- **Provider quota/auth error:** billing or key — not a code fix.

### 6.3 Open question that gates cutover — JWT acceptance

The router resolves identity through UAI (its auth gateway), and the guide states a forwarded JWT is "passed unchanged to UAI." It does **not** state that UAI trusts this project's Supabase issuer. That has not been verified.

- **If UAI accepts this project's JWTs:** chat works with per-user memory identity and **no** `LANONASIS_API_KEY` is needed.
- **If it does not:** the only path is a shared `lano_*` key with `AI_ROUTER_ALLOW_KEY_FALLBACK=true`. Per guide §3 that collapses every user into one memory bank — a cross-tenant leak, not a limitation. Do not enable it for authenticated users until that trade-off is accepted in writing.

Confirm this before flipping the client call sites on in production.

### 6.4 Re-test in the UI

`/bizgenie` and the dashboard assistant → send a message → real answer from `data.response`, not a canned fallback. Then generate a business plan to confirm the direct-OpenAI path still works.


---

## 7. Recording results

Append evidence as you go, then tick the matching box in `tasks.md`:

| ID | Date | Result | Evidence (screenshot / log / status) |
|---|---|---|---|
| B2 | | | |
| B3 | | | |
| B4 | | | |
| B5 | | | |

Do not mark B2–B5 closed on the strength of a preview deployment or a local `vite dev` run — both use a different origin and therefore a different redirect contract.
