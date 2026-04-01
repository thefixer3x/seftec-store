# SEFTEC Platform — Production Readiness Audit

**Date:** 2026-04-01  
**Scope:** Full application audit — frontend, backend, auth, payments, AI, data, config  
**Method:** Static code analysis of current codebase + runtime signal checks  

---

## 1. Executive Summary

The app builds and renders. Core marketing pages, auth flow, shop, and BizGenie AI chat are wired to real Supabase backends. However, several major subsystems (invoices, customers, inventory, wallet, banking) reference **database tables that don't exist in the generated types** and use `@ts-nocheck` to compile. Multiple dashboard components use **hardcoded mock data** that would be visible to real users. Payment integrations (Stripe, PayPal, SaySwitch) have edge functions but limited end-to-end verification. The app is best described as **"demo-grade with real infrastructure partially wired."**

---

## 2. Route-by-Route Matrix

| Route | Intended User | Backend Dependency | Status | Blocker? |
|---|---|---|---|---|
| `/` | Public | None (static sections + products query) | ✅ Renders | No |
| `/about` | Public | None | ✅ Static | No |
| `/contact` | Public | None | ✅ Static | No |
| `/solutions` | Public | None | ✅ Static | No |
| `/value-propositions` | Public | None | ✅ Static | No |
| `/faq` | Public | None | ✅ Static | No |
| `/defi-leadership` | Public | None | ✅ Static | No |
| `/biztools` | Public | None | ✅ Static | No |
| `/shop` | Public | `products` table | ✅ Wired | No |
| `/products` | Public | `products` table | ✅ Wired | No |
| `/cart` | Public/Auth | `orders`, `order_items` | ⚠️ Wired (uses `as any` casts) | No |
| `/bizgenie` | Public | `bizgenie-router` edge fn | ✅ Wired | No |
| `/coming-soon` | Public | None | ⚠️ Placeholder page | No |
| `/login` | Public | Supabase Auth | ✅ Wired | No |
| `/register` | Public | Supabase Auth | ✅ Wired | No |
| `/auth` | Public | Supabase Auth | ✅ Wired | No |
| `/auth-callback` | Public | Supabase Auth | ✅ Wired | No |
| `/reset-password` | Public | Supabase Auth | ✅ Wired | No |
| `/terms` | Public | None | ✅ Static | No |
| `/privacy` | Public | None | ✅ Static | No |
| `/cookies` | Public | None | ✅ Static | No |
| `/security` | Public | None | ✅ Static | No |
| `/edge-function-test` | Dev | None — **100% mock responses** | 🔴 Fake | Yes (remove or gate) |
| `/test` | Dev | None | ⚠️ Debug page exposed | Yes (remove or gate) |
| `/orders` | Auth | `orders`, `order_items`, `products` | ⚠️ `@ts-nocheck` — tables may not match types | No |
| `/sessions` | Auth | Supabase Auth sessions | ✅ Wired | No |
| `/roles` | Auth/Admin | `user_roles` — **table not in types.ts** | 🔴 Will fail at runtime | Yes |
| `/profile/dashboard` | Auth | Mixed real + mock | ⚠️ Mock stores/staff visible | No |
| `/profile/wallet` | Auth | `wallets` — **table doesn't exist** | 🔴 Always shows ₦0.00 | Yes |
| `/profile/finance` | Auth | `FinancialDashboard` → subscriptions, cards, banking | ⚠️ Partially wired | No |
| `/profile/settings` | Auth | Profile table | ✅ Wired | No |
| `/profile/account/*` | Auth | Profile, notifications | ✅ Wired | No |
| `/profile/inventory` | Auth | `inventory_items` — **table not in types.ts** | 🔴 `@ts-nocheck`, will fail | Yes |
| `/profile/invoices` | Auth | `invoices`, `invoice_items` — **tables not in types.ts** | 🔴 `@ts-nocheck`, will fail | Yes |
| `/profile/customers` | Auth | `customers` — **table not in types.ts** | 🔴 `@ts-nocheck`, will fail | Yes |
| `/profile/bill-payment` | Auth | SaySwitch edge functions | ⚠️ Feature-flagged | No |
| `/profile/trade-finance` | Auth | `trade-finance-*` edge functions | ⚠️ Partially wired | No |
| `/profile/stores` | Auth | None — **hardcoded mock data** | 🔴 Fake data visible | Yes |
| `/profile/marketplace` | Auth | `orders` table | ⚠️ Wired but limited | No |
| `/profile/transaction` | Auth | Transaction data | ⚠️ Unknown wiring | No |
| `/profile/developer` | Admin | Dev tools | ⚠️ No access control beyond auth | No |
| `/profile/sitemap` | Admin | None | ✅ Static | No |
| `/dashboard/*` | Auth | Mixed | ⚠️ Duplicate route (also `/profile/dashboard`) | No |

---

## 3. Services Matrix

| Service | Status | Details |
|---|---|---|
| **Auth (email/password)** | ✅ Wired | SignIn, SignUp, MagicLink, ResetPassword all use Supabase Auth |
| **Auth (OAuth)** | ⚠️ Partially wired | Google/GitHub/Facebook buttons exist; require Supabase provider config |
| **Auth (MFA)** | ⚠️ Partially wired | UI exists, uses `localStorage` flags for MFA flow simulation |
| **Auth (roles)** | 🔴 Broken | Queries `user_roles` table — **not in generated types.ts or DB schema** |
| **AI / BizGenie Chat** | ✅ Wired | Uses `bizgenie-router` edge function → OpenAI/Perplexity |
| **AI Demo (homepage)** | 🔴 Fake | `AIDemoPromptBox` returns **hardcoded mock responses**, not real AI |
| **AI Recommendations** | ⚠️ Partially wired | `ProductRecommendations` queries `ai_recommendations` view |
| **Payments (Stripe)** | ⚠️ Partially wired | Edge functions exist; checkout flow needs E2E verification |
| **Payments (PayPal)** | ⚠️ Partially wired | Edge functions + feature flag; untested |
| **Payments (SaySwitch)** | ⚠️ Partially wired | Edge functions + feature flags; queries `say_orders` (not in types) |
| **Invoices** | 🔴 Broken | Hook queries `invoices`/`invoice_items` tables — **don't exist in DB** |
| **Inventory** | 🔴 Broken | Hook queries `inventory_items` table — **doesn't exist in DB** |
| **Customers** | 🔴 Broken | Hook queries `customers` table — **exists as view only, not writable** |
| **Wallet / Banking** | 🔴 Mock | `wallets` table doesn't exist; always shows ₦0.00 |
| **Bank Accounts** | 🔴 Mock | `bank_accounts` table doesn't exist; commented-out code |
| **E-Doc Banking** | ⚠️ Partially wired | Edge functions exist; `FinancialInsights` uses **hardcoded mock data** |
| **Notifications** | ⚠️ Partially wired | `notifications` table exists; `create-notification` edge fn exists |
| **Feature Flags** | ⚠️ Wired with risk | Queries `feature_flags` table (exists as view); uses `@ts-nocheck` |
| **Admin / Dev Tools** | ⚠️ Partially wired | DevOps page exists; no role-based access enforcement |
| **Subscriptions** | ⚠️ Partially wired | `SubscriptionManager` exists; depends on Stripe integration |

---

## 4. Customer-Facing Placeholders, Mocks & Dead Ends

| Location | Type | Detail |
|---|---|---|
| `MyStores.tsx` | **Hardcoded mock** | Shows "Lekki Branch" and "Ikoyi Branch" with fake ₦ values to all users |
| `MyStaff.tsx` | **Hardcoded mock** | Shows "Derick" and "Tolu" as fake staff members to all users |
| `WalletBalanceCard.tsx` | **Dead feature** | `wallets` table doesn't exist; always shows ₦0.00; buttons do nothing meaningful |
| `BankAccountInfo.tsx` | **Dead feature** | `bank_accounts` table doesn't exist; always shows empty state |
| `FinancialInsights.tsx` | **Hardcoded mock** | Shows fake ₦2,450,000 income, ₦1,850,000 expenses regardless of real data |
| `EdgeFunctionTest.tsx` | **Fully mocked page** | Returns fake responses for "hello-world", "get-user", "process-payment" |
| `AIDemoPromptBox.tsx` | **Simulated AI** | Returns hardcoded text instead of calling real BizGenie API |
| `ComingSoon.tsx` page | **Placeholder** | Generic "coming soon" page used as catch-all |
| `/test` route (`TestPage`) | **Debug page** | Exposed to all users in production |
| `marketplace/types.ts` | **Mock order data** | Contains hardcoded `orderData` array used in marketplace tabs |

---

## 5. `@ts-nocheck` Usage (11 files)

| File | Reason | Risk |
|---|---|---|
| `use-invoices.ts` | `invoices`/`invoice_items` tables not in types | 🔴 Runtime failure — tables may not exist |
| `use-customers.ts` | `customers` table not writable | 🔴 Runtime failure on mutations |
| `use-inventory.ts` | `inventory_items` table not in types | 🔴 Runtime failure — table may not exist |
| `use-recommendations.tsx` | `recommendations` relation not in types | ⚠️ May silently fail |
| `use-marketplace-orders.ts` | `order_items` relation not in types | ⚠️ May silently fail |
| `use-analytics.ts` | `order_items` relation not in types | ⚠️ May silently fail |
| `Orders.tsx` | `order_items`/`products` relation not in types | ⚠️ May silently fail |
| `SaySwitchAdmin.tsx` | `say_orders` table not in types | 🔴 Runtime failure |
| `FeatureFlagManager.ts` | `feature_flags` table not in types | ⚠️ Works via view but untyped |
| `resizable.tsx` | `react-resizable-panels` export mismatch | ⚠️ Library compatibility |
| `chart.tsx` | `recharts` v3 type incompatibilities | ⚠️ Library compatibility |

---

## 6. Broad `as any` Casts (non-test, notable)

| File | Usage | Risk |
|---|---|---|
| `CartContext.tsx` | `as any` on order insert/items insert | ⚠️ Bypasses type safety on writes |
| `SaySwitchDashboard.tsx` | `(supabase as any).from('say_orders')` | 🔴 Table may not exist |
| `MoneyTransferForm.tsx` | Feature flag cast `as any` | ⚠️ Minor |

---

## 7. Missing Database Tables (referenced but not in types.ts/schema)

These tables are queried by code but **do not appear in the Supabase generated types**:

1. **`user_roles`** — used by AuthContext, RoleManagement, admin-access hook
2. **`invoices`** / **`invoice_items`** — used by use-invoices.ts
3. **`customers`** (as writable table) — used by use-customers.ts (exists as read-only view)
4. **`inventory_items`** — used by use-inventory.ts
5. **`wallets`** — referenced in WalletBalanceCard (commented out)
6. **`bank_accounts`** — referenced in BankAccountInfo (commented out)
7. **`say_orders`** — used by SaySwitch dashboard and provider
8. **`recommendations`** (as table) — used by use-recommendations.tsx

---

## 8. Categorized Findings

### 🔴 BLOCKERS (must fix before launch)

1. **Missing DB tables** — `user_roles`, `invoices`, `invoice_items`, `inventory_items`, `say_orders` are queried but don't exist. These cause silent runtime failures.
2. **Hardcoded mock data visible to real users** — MyStores, MyStaff, FinancialInsights show fake Nigerian business data to every logged-in user.
3. **Debug/test pages exposed** — `/test`, `/edge-function-test` are accessible in production with fake data.
4. **AI demo returns fake responses** — `AIDemoPromptBox` on the homepage simulates AI without calling the real API.
5. **Wallet shows ₦0.00 with non-functional buttons** — Dead feature with no backing table.

### 🟡 HIGH-PRIORITY GAPS

6. **`user_roles` table missing** — AuthContext silently fails to load roles; RoleManagement page is broken.
7. **11 files use `@ts-nocheck`** — Masks type errors that may indicate missing tables or broken contracts.
8. **OAuth providers not configured** — Social login buttons exist but may error if Supabase providers aren't set up.
9. **MFA flow uses localStorage flags** — Not a real MFA implementation; simulation only.
10. **Feature flags table is a view** — Works for reads but may not support real-time subscriptions or writes from admin UI.
11. **No error boundaries on most pages** — Dashboard has one, but most routes lack error recovery.

### 🟠 LAUNCH-WITH-RISK

12. **Payment E2E flows unverified** — Stripe, PayPal, SaySwitch edge functions exist but checkout-to-confirmation paths are untested.
13. **E-Doc financial insights are mocked** — Real consent flow exists but insights are hardcoded.
14. **Marketplace mock order data** — `orderData` in `types.ts` provides fallback demo data.
15. **Duplicate Supabase clients** — `src/integrations/supabase/client.ts` and `src/lib/supabase-central.ts` both create clients.
16. **No rate limiting or abuse protection** on public AI demo.
17. **SEO** — No `<title>` or meta tags on most pages (only HelmetProvider wrapper exists).

### 🟢 POST-LAUNCH IMPROVEMENTS

18. **Bundle optimization** — 1834 modules; could benefit from more aggressive code splitting.
19. **Test coverage** — Tests exist for some hooks/providers but no integration/E2E suite.
20. **Accessibility audit** — No ARIA landmarks or focus management observed.
21. **i18n** — I18nProvider exists but translation coverage unknown.
22. **Dark mode consistency** — Some components use hardcoded colors instead of semantic tokens.
23. **`project.json`** — References Nx workspace structure that doesn't match the Lovable deployment.

---

## 9. Recommended Execution Order

| Phase | Action | Items |
|---|---|---|
| **Phase 1: Remove/Gate Fakes** | Hide mock data, gate debug pages, wire or remove dead features | #2, #3, #4, #5 |
| **Phase 2: Create Missing Tables** | Migrate `user_roles`, `invoices`, `invoice_items`, `inventory_items` + regenerate types | #1, #6 |
| **Phase 3: Remove @ts-nocheck** | After tables exist, remove `@ts-nocheck` and fix type errors properly | #7 |
| **Phase 4: Wire Real Data** | Replace mock stores/staff/insights with real DB queries or empty states | #2, #13, #14 |
| **Phase 5: Auth Hardening** | Configure OAuth providers, fix MFA simulation, enforce role-based access | #8, #9, #11 |
| **Phase 6: Payment E2E** | Test Stripe/PayPal/SaySwitch checkout flows end-to-end | #12 |
| **Phase 7: Polish** | SEO, error boundaries, a11y, bundle optimization | #16, #17, #18, #19, #20 |

---

*This audit is based on static analysis of the current codebase. Runtime verification of each finding should be performed as fixes are applied.*
