# Production Launch Readiness — Execution Task List

**Renamed from:** `enable-placeholder-features`  
**New scope:** Runtime hardening, feature governance, and production-readiness alignment  
**Date:** 2026-04-12  
**Based on:** PROD_READINESS.md, SCHEMA_RECONCILIATION.md, FULL-AUDIT-REPORT.md, current codebase audit  

> **Supersession notice:** This task list supersedes the old `enable-placeholder-features` execution model for the current release.

> **Validation rule:** Code inspection alone is not sufficient for completion. Release-critical tasks (Section B) require deployed-domain runtime verification on https://www.seftechub.com or the active Vercel deployment URL.

---

## A. Already Completed

| # | Item | Evidence |
|---|------|----------|
| A1 | Remove `/test` and `/edge-function-test` routes from App.tsx | Routes removed from App.tsx routing table |
| A2 | Replace hardcoded mock data in MyStores, MyStaff, FinancialInsights | Components now show polished empty states |
| A3 | Disable non-functional wallet action buttons with "Coming Soon" badge | WalletBalanceCard buttons disabled |
| A4 | Disable "Manage Bank Accounts" button | BankAccountInfo disabled state |
| A5 | Remove `@ts-nocheck` from use-invoices, use-customers, use-inventory, FeatureFlagManager, use-recommendations | Confirmed removed — hooks now use proper types |
| A6 | SME views exist in DB (customers, invoices, invoice_items, inventory_items, etc.) | Confirmed via DB query — all exist as VIEWS. Note: this is backend schema evidence only; runtime validation of reads/writes through these views is still required (see B4) |
| A7 | Feature flag system wired to DB (FeatureFlagManager + useFeatureFlag hook) | Service + hook implemented |
| A8 | Auth (email/password, signup, logout, session persistence) wired and partly validated | Email/password auth flow works in preview; magic link and OAuth callbacks still require deployed-domain confirmation (see B2) |
| A9 | BizGenie AI chat wired to real edge function (bizgenie-router) | Uses real Supabase edge function |
| A10 | Solutions page "Learn More" buttons now link to /solutions with anchor sections | Functional navigation |
| A11 | Bulk payments column name fix (account_name → name, bank_name → bank_code) | Fixed in BulkPaymentTransactions.tsx |
| A12 | Product image upload storage policy fix | Migration applied for product_images bucket |
| A13 | Phase 1 UI sanitization complete | All fake data replaced with empty states |

---

## B. Release-Critical Now (P0)

### B1. Delete orphaned legacy files
- **Purpose:** Remove dead code that could confuse future devs or leak into production
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Files:** `src/pages/EdgeFunctionTest.tsx`, `src/components/ai/AIDemoPromptBox.tsx`, `src/components/sections/PersonalizedAIAdvisorSection.tsx`
- **Acceptance:** Files deleted, no imports reference them, build succeeds

### B2. Auth callback / magic link validation on deployed domain
- **Purpose:** Confirm magic link and OAuth callbacks work on https://www.seftechub.com (primary) and optional Vercel deployment URL — not just preview
- **Priority:** P0 | **Owner:** Frontend + Infra | **Release-blocking:** Yes
- **Dependency:** Supabase redirect URL config must include https://www.seftechub.com (and Vercel URL if applicable)
- **Acceptance:** Magic link email → click → lands on authenticated dashboard on production URL

### B3. Dashboard runtime truth — empty states audit
- **Purpose:** Every dashboard tab (/profile/dashboard, /profile/wallet, /profile/finance) must show honest empty state or real data — never a broken shell or misleading error
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Acceptance:** Authenticated user sees deliberate empty states ("No transactions yet"), not schema errors or blank panels

### B4. Invoices / Customers / Inventory runtime validation
- **Purpose:** Confirm these hooks query the existing views successfully at runtime, show proper empty states, and don't throw schema errors
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Dependency:** Views exist (confirmed). Hooks removed @ts-nocheck (confirmed). Need runtime test.
- **Acceptance:** Each page loads without console errors; empty state is clean; create/edit mutations either work or are disabled with explanation

### B5. BizGenie edge function secret/provider validation
- **Purpose:** Confirm AI chat actually returns real responses (not fallback/error) on deployed domain
- **Priority:** P0 | **Owner:** Backend/Infra | **Release-blocking:** Yes
- **Dependency:** OPENAI_API_KEY or equivalent secret must be set in Supabase edge function secrets
- **Acceptance:** User sends message → receives real AI response within 10s

### B6. Bill payment / SaySwitch maintenance state clarity
- **Purpose:** Bill payment page must show clear "Service under maintenance" or deferred state — no dead buttons, no misleading forms
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Acceptance:** /profile/bill-payment shows clear maintenance/deferred message; no clickable actions that silently fail

### B7. Remove remaining `@ts-nocheck` from runtime files
- **Purpose:** Clean type safety for production code
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Files:** `use-analytics.ts`, `use-marketplace-orders.ts`, `use-recommendations.tsx`, `Orders.tsx`
- **Note:** `chart.tsx` and `resizable.tsx` are library-level and non-blocking
- **Acceptance:** @ts-nocheck removed from all 4 files; build succeeds with proper type handling

### B8. Duplicate Supabase client consolidation
- **Purpose:** Single source of truth for Supabase client — avoid session drift or config mismatch
- **Priority:** P0 | **Owner:** Frontend | **Release-blocking:** Yes
- **Files:** `src/integrations/supabase/client.ts` vs `src/lib/supabase-central.ts`
- **Acceptance:** One canonical client; all imports point to it; build succeeds

---

## C. Needs Fix But Not Launch-Blocking (P1)

### C1. SEO per-page meta tags
- **Purpose:** Add `<title>` and meta descriptions to key pages
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** Homepage, shop, BizGenie, about, solutions have proper meta tags

### C2. GitHub repository hygiene (LICENSE, topics, description)
- **Purpose:** Improve discoverability and community health score
- **Priority:** P1 | **Owner:** Product/DevOps
- **Acceptance:** LICENSE file added; topics set; description expanded

### C3. Sentry sourcemap configuration cleanup
- **Purpose:** Ensure error tracking captures useful stack traces in production
- **Priority:** P1 | **Owner:** Frontend/Infra
- **Acceptance:** Sentry errors show source-mapped stack traces

### C4. Marketplace mock order data cleanup
- **Purpose:** Remove `orderData` fallback array in `marketplace/types.ts`
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** Marketplace tabs show empty state or real data only

### C5. Error boundaries on key routes
- **Purpose:** Prevent full-app crash from single component failure
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** Dashboard, wallet, invoices, inventory pages wrapped in error boundaries

### C6. Dark mode consistency
- **Purpose:** Replace hardcoded colors with semantic design tokens
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** All components use CSS variables / Tailwind semantic tokens

### C7. JSON-LD structured data for key pages
- **Purpose:** Improve search engine understanding
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** Homepage has Organization + WebSite schema; product pages have Product schema

### C8. Cart `as any` type safety
- **Purpose:** Remove type bypasses in CartContext order inserts
- **Priority:** P1 | **Owner:** Frontend
- **Acceptance:** Cart operations use proper typed inserts

---

## D. Intentionally Deferred (Disabled / Maintenance / Hidden)

| # | Feature | Current State | Rationale |
|---|---------|--------------|-----------|
| D1 | Wallet fund transfers / top-up | Buttons disabled, "Coming Soon" badge | `wallets` table doesn't exist; no ledger backend |
| D2 | Bank account management | Button disabled | `bank_accounts` table doesn't exist |
| D3 | SaySwitch bill payments (airtime, data, electricity, TV) | Feature-flagged off | Provider integration incomplete; no live credentials |
| D4 | PayPal payment processing | Feature-flagged off | Untested E2E; sandbox only |
| D5 | Trade finance / loan applications | Deferred state in UI | No backing financial service provider |
| D6 | SaySwitch admin dashboard (`say_orders`) | Table doesn't exist | Blocked on `say_orders` table creation |
| D7 | OAuth social login (Google/GitHub/Facebook) | Buttons exist; providers not configured | Requires Supabase provider configuration |
| D8 | MFA flow | Uses localStorage simulation | Not a real MFA implementation |
| D9 | E-Doc financial insights (real data) | Shows empty state / connection prompt | Real consent flow exists but insights generation not wired |
| D10 | Subscription payments (Stripe) | Partially wired | Checkout-to-confirmation untested |

---

## E. Platform-Later / Architecture Roadmap (P2+)

| # | Item | Rationale |
|---|------|-----------|
| E1 | Auth-gateway migration (move from direct Supabase Auth to shared auth-gateway) | Future platform architecture; current direct auth works |
| E2 | Move SME tables to dedicated `seftec` schema with public facade views | Matches multi-project pattern; not urgent while views work |
| E3 | Unified PaymentProvider interface (factory pattern across Stripe/PayPal/SaySwitch) | Design spec exists; no immediate need until multiple providers are live |
| E4 | Feature flag admin UI | FeatureFlagManager service works; admin UI is nice-to-have |
| E5 | Multi-channel notifications (email, SMS, push) | Basic in-app notifications work; broader channels need third-party integration |
| E6 | i18n full translation coverage audit | I18nProvider exists; translations partially covered; full audit is ongoing work |
| E7 | AI market analysis & business plan generation | BizGenie chat works; deeper analytical features are future scope |
| E8 | Bundle optimization / code splitting | 1834 modules; works but could be optimized |
| E9 | Comprehensive E2E test suite | Unit tests exist; full E2E is a continuous effort |
| E10 | Cross-app data orchestration (shared marketplace, shared wallet) | Multi-project architecture concern |
| E11 | `user_preferences` hook alignment with live schema | Live schema has trade-specific columns; hook uses key-value pattern — needs reconciliation |
| E12 | llms.txt for AI crawler readiness | SEO audit recommendation; low priority |
| E13 | Accessibility audit (ARIA, focus management) | Important but not launch-blocking |

---

## Gap Summary

| Area | Status | Gap |
|------|--------|-----|
| **Auth (email/password)** | ✅ Done | Magic link callback needs deployed-domain validation |
| **Dashboard** | ⚠️ Mostly done | Runtime empty states need final verification post-login |
| **Invoices/Customers/Inventory** | ⚠️ Code ready | Views exist, hooks cleaned up — needs runtime validation |
| **AI (BizGenie)** | ⚠️ Wired | Secret/provider availability on deployed domain unverified |
| **Payments** | 🔴 Deferred | All 3 providers (Stripe/PayPal/SaySwitch) are incomplete for E2E |
| **Wallet/Banking** | 🔴 Deferred | No backing tables; properly disabled in UI |
| **SEO** | ⚠️ Partial | robots.txt + sitemap exist; per-page meta tags missing |
| **Type safety** | ⚠️ Partial | 6 files still have @ts-nocheck (4 runtime, 2 library) |
| **Dead code** | ⚠️ Present | 3 orphaned files remain |
| **Supabase client** | ⚠️ Duplicate | Two clients exist; need consolidation |

---

## Recommended Execution Order

### Phase 1: Release Gate (P0 items — B1 through B8)
**Goal:** App is safe for real users on deployed domain  
**Estimated scope:** ~8 focused tasks  
**Order:**
1. B1 — Delete orphaned files (quick win, risk reduction)
2. B8 — Consolidate Supabase clients (foundational)
3. B7 — Remove remaining @ts-nocheck (type safety)
4. B3 — Dashboard empty states runtime audit
5. B4 — Invoices/Customers/Inventory runtime validation
6. B6 — Bill payment maintenance state
7. B5 — BizGenie secret validation
8. B2 — Auth callback on deployed domain

### Phase 2: Production Polish (P1 items — C1 through C8)
**Goal:** Professional quality for external stakeholders  
**Estimated scope:** ~8 polish tasks  
**Order:**
1. C4 — Marketplace mock data cleanup
2. C8 — Cart type safety
3. C5 — Error boundaries
4. C1 — SEO meta tags
5. C7 — JSON-LD structured data
6. C6 — Dark mode consistency
7. C3 — Sentry sourcemaps
8. C2 — GitHub repo hygiene
