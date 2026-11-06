# P0 Validation Runbook — Production Launch Readiness

Companion to `.kiro/specs/production-launch-readiness/tasks.md`.
Purpose: close the runtime items (B2–B5) that cannot be proven from the filesystem, and record the evidence.

---

## 1. Status snapshot — 2026-11-06

| ID | Item | Status | Evidence |
|---|---|---|---|
| B1 | Delete orphaned legacy files | **Closed** | 5 files removed — see §2 |
| B2 | Auth callback on deployed domain | **Open** | Needs Supabase URL allowlist + live click-through — see §3 |
| B3 | Dashboard runtime truth | **Open** | Needs authenticated session — see §4 |
| B4 | Invoices / Customers / Inventory views | **Open** | Needs authenticated session — see §5 |
| B5 | BizGenie secrets | **Open** | Blocked on provider credits/keys — see §6 |
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
  https://seftechub.com/**            (apex, if apex is served)
  https://*-<vercel-team>.vercel.app/auth-callback   (preview, optional)
```

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

## 6. B5 — BizGenie secrets and quota

`supabase/functions/bizgenie-router/index.ts:8-12` reads:

```
OPENAI_API_KEY            (hard requirement for business-plan mode; 503 without it)
PERPLEXITY_API_KEY        (or PERPLEXITY_API_SK)
BizGenie_API_key
SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (auto-injected)
```

### 6.1 Set secrets

```bash
supabase secrets set OPENAI_API_KEY=sk-... PERPLEXITY_API_KEY=pplx-... \
  --project-ref <ref>
supabase secrets list --project-ref <ref>   # confirm presence (values are hashed)
```

### 6.2 Verify, unauthenticated

`OPENAI_API_KEY` is logged as a boolean on every request, so the function log is the fastest signal:

```bash
curl -sS -X POST "https://<ref>.supabase.co/functions/v1/bizgenie-router" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -d '{"mode":"chat","prompt":"hello","userId":"00000000-0000-0000-0000-000000000000"}' \
  | head -c 600
```

- **Healthy:** a model-generated reply within ~10s.
- **`503` with "currently unavailable for premium business plan generation":** `OPENAI_API_KEY` unset.
- **Quota/auth error from the provider:** credits exhausted or key invalid — this is a billing fix, not a code fix.

### 6.3 Then re-test in the UI

`/bizgenie` → send a message → real response, not a canned fallback.

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
