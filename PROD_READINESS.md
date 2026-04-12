# SEFTEC Platform — Production Readiness (Current Truth)

**Date:** 2026-04-12  
**Scope:** Release-readiness reality for the current codebase and live shared Supabase backend  
**Status:** Active execution spec for this release

---

## 1. Document Positioning

This file supersedes the older audit framing from 2026-04-01.

- `.kiro/specs/enable-placeholder-features/requirements.md` is now a **legacy ambition document**.
- Current execution is **production-readiness and runtime truth**, not "enable every visible feature now."
- Feature governance for this release is:
  - live and working
  - intentionally deferred with clear UX messaging
  - hidden/disabled

Related execution tracker: `.kiro/specs/production-launch-readiness/tasks.md`.

---

## 2. Evidence Base (What This Report Is Grounded On)

### 2.1 Code and Runtime Checks (2026-04-12)

- `bun run typecheck` passes.
- `bun run build` passes.
- Sentry sourcemaps upload successfully during build.
- `/test` and `/edge-function-test` routes are not in `src/App.tsx`.
- Remaining `@ts-nocheck` count is **6** (not 11):
  - `src/hooks/use-marketplace-orders.ts`
  - `src/hooks/use-analytics.ts`
  - `src/hooks/use-recommendations.tsx`
  - `src/pages/Orders.tsx`
  - `src/components/ui/resizable.tsx`
  - `src/components/ui/chart.tsx`

### 2.2 Read-Only Live DB Inspection (2026-04-12)

Inspected via direct read-only `psql` queries against the live Supabase project.

- Core SME base tables exist in `app_seftec`:
  - `customers`, `customer_interactions`
  - `inventory_items`, `inventory_adjustments`, `stock_alerts`
  - `invoices`, `invoice_items`, `invoice_payments`
- `public` exposes compatibility views for those objects.
- Shared ownership objects are confirmed:
  - `public.user_roles` -> `auth_gateway.user_roles`
  - `public.products`/`orders`/`order_items` -> `marketplace.*`
  - `public.feature_flags` -> `control_room.feature_flags`
  - `public.vortex_wallets` -> `billing.vortex_wallets`
- `say_orders` is still not present as a live table/view in inspected relation inventory.
- RPCs are present and aligned:
  - `adjust_inventory_stock(...)`
  - `create_invoice_with_items(...)`
  - `record_invoice_payment(..., p_reference_number text, ...)`
- `information_schema.views` reports key `public` views as `is_updatable=YES` and `is_insertable_into=YES`.
- RLS policies exist for `app_seftec` SME tables and shared schemas (`auth_gateway`, `control_room`, `billing`).

---

## 3. Current Truth: Backend Ownership and Write Path

| Domain | Ownership Pattern | Current Write Path | Status |
|---|---|---|---|
| Auth roles | Shared (`auth_gateway`) exposed via `public.user_roles` view | App reads via `public.user_roles`; admin writes constrained by RLS | Aligned |
| Customers | SEFTEC-owned (`app_seftec`) + `public.customers` view | Direct Supabase CRUD/RPC through `public` facade | Aligned |
| Customer interactions | SEFTEC-owned (`app_seftec`) + `public` view | Direct CRUD through `public` facade | Aligned |
| Inventory | SEFTEC-owned (`app_seftec`) + `public` views | CRUD + `adjust_inventory_stock` RPC | Aligned |
| Invoices | SEFTEC-owned (`app_seftec`) + `public` views | CRUD + invoice RPCs | Aligned |
| Wallet surface | Shared billing (`billing.vortex_wallets`) via `public.vortex_wallets` | Read path is live; transfer actions intentionally constrained | Partially live by design |
| Feature flags | Shared control-room (`control_room.feature_flags`) via `public` view | Read path live; writes admin-constrained | Aligned |
| Marketplace products/orders | Shared marketplace schema via `public` views | Read/write depends on table-level RLS and app role | Aligned with shared model |
| SaySwitch ledger | Deferred surface (`say_orders` absent in active map) | Must remain disabled/deferred in UI/admin execution | Deferred |

---

## 4. Release Readiness Model

## A. Already Completed

1. Dev/test routes removed from app routing.
2. Fake dashboard business data replaced with honest empty states.
3. Wallet/bank non-operational actions moved to explicit deferred UX.
4. Core SME hooks are no longer suppressed by `@ts-nocheck` (`use-customers`, `use-invoices`, `use-inventory`).
5. Build pipeline is green (`typecheck` + `build`) with Sentry sourcemap upload.
6. Backend alignment moved from "missing tables" assumptions to verified multi-schema ownership.

## B. Release-Critical Now (P0)

1. Runtime E2E validation on deployed domain for:
   - auth callback/magic-link flow
   - customers/inventory/invoices pages (load, empty states, writes)
   - BizGenie live response path
2. Remove the remaining runtime `@ts-nocheck` files:
   - `use-marketplace-orders.ts`
   - `use-analytics.ts`
   - `use-recommendations.tsx`
   - `Orders.tsx`
3. Consolidate duplicate Supabase client entrypoints to one canonical import path.
4. Delete orphaned legacy files no longer used by live flow:
   - `src/pages/EdgeFunctionTest.tsx`
   - `src/components/ai/AIDemoPromptBox.tsx`
   - `src/components/sections/PersonalizedAIAdvisorSection.tsx`

## C. Needs Fix, Not Release-Blocking (P1)

1. Per-page SEO metadata and structured data completion.
2. Marketplace fallback/mock cleanup where still present.
3. Error-boundary hardening on key authenticated routes.
4. Type cleanup for library compatibility shims (`chart.tsx`, `resizable.tsx`).

## D. Intentionally Deferred (Explicitly Not "Broken")

1. Wallet top-up/transfer operations beyond current read surfaces.
2. Full bank account management workflows.
3. SaySwitch ledger-backed admin execution requiring `say_orders`.
4. Full PayPal/SaySwitch production payment rollout.
5. MFA hardening beyond current baseline.

## E. Platform-Later Architecture

1. Dedicated SEFTEC schema-first isolation model with controlled public facades.
2. Auth-gateway consolidation strategy across projects.
3. Multi-provider payment abstraction and broader notification channels.

---

## 5. Risk Register (Current Ranking)

### High

1. Shared-database compatibility risk if future migrations ignore ownership boundaries.
2. Runtime drift risk if deployed-domain E2E validation is skipped after backend alignment.

### Medium

1. Residual type-suppression risk in marketplace/runtime analytics files.
2. Product quality risk from legacy orphan files and dual Supabase client entrypoints.

### Low

1. SEO/compliance polish gaps that do not block core transactional flows.

---

## 6. Acceptance Criteria for This Phase

This phase is considered complete only when all are true:

1. Core SME pages (customers, inventory, invoices) run against live backend truth with no schema errors.
2. No release-critical runtime flow depends on placeholder assumptions.
3. Auth role access behavior is consistent with shared `auth_gateway.user_roles` ownership.
4. Release-critical `@ts-nocheck` usage is removed from runtime business flows.
5. Deferred features are clearly marked and non-misleading in UI.
6. Build and deployed-domain validation both pass.

---

## 7. Notes on Legacy Documents

- The old placeholder-enablement requirements remain useful for roadmap intent.
- They are no longer the correct release gate for this stage.
- Release decisions should now follow this file plus `.kiro/specs/production-launch-readiness/tasks.md`.

---

## 8. UAT and Select-User Preview Gates

This section defines minimum release controls before opening UAT and then a limited real-user preview.

### 8.1 Auth-Gated Dashboard Validation Matrix (Must Pass)

1. `/profile/dashboard` loads without runtime exceptions for a newly onboarded user and a returning user.
2. `/profile/wallet` renders live wallet read surfaces without red error panels when deferred payment tables are unavailable.
3. `/profile/finance` and wallet sub-components render honest empty states (not fake numbers) when no transactional data exists.
4. `/profile/invoices`, `/profile/customers`, `/profile/inventory`:
   - load cleanly against live backend views/tables
   - show clear empty states when no records exist
   - surface action errors with user-readable toasts (no silent failures)
5. `/orders` loads with typed item mapping and no relation-expansion runtime errors.

### 8.2 UAT Environment Controls (Must Pass)

1. Production-like env vars configured in preview environment:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SENTRY_DSN`
2. Supabase auth redirect URLs verified for deployed domain callback paths.
3. Sentry release + sourcemaps visible for current deployed commit.
4. Feature flags for deferred services (SaySwitch/PayPal/wallet transfer surfaces) explicitly set and verified.

### 8.3 Operational Readiness for Select Users (Must Pass)

1. Rollback path confirmed:
   - previous stable commit SHA documented
   - revert procedure tested (`git revert` or redeploy prior commit)
2. Monitoring baseline set:
   - Sentry error alert thresholds
   - critical page load checks for auth-gated routes
3. Incident triage ownership defined for UAT window.

### 8.4 Current Known Dashboard Risk Areas (Track During UAT)

1. Payment analytics remains intentionally neutral until deferred ledgers are fully aligned.
2. Bulk payment surfaces depend on shared-schema readiness and must fall back gracefully (no crash paths).
3. Library-level type suppressions in `chart.tsx` and `resizable.tsx` remain technical debt (not launch-blocking, but monitor UI regressions).
