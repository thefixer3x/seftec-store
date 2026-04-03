# Schema Reconciliation Report

**Date**: 2026-04-03  
**Project**: seftec-store  
**Supabase Ref**: ptnrwrgzrsbocgxlpvhd  

---

## 1. Architecture Discovery

This is a **multi-schema shared Supabase database**. The `public` schema contains:
- **10 base tables** owned by this project (or infra-level)
- **80+ views** pointing to tables in other schemas
- **CRUD functions** (auto-generated `_insert`/`_update`/`_delete`) for view writability

### Schema Map (discovered from view definitions)

| Schema | Purpose | Example tables |
|---|---|---|
| `shared_services` | Shared user data | `profiles`, `user_preferences` |
| `auth_gateway` | Auth/RBAC | `user_roles` |
| `marketplace` | E-commerce | `products`, `orders`, `order_items` |
| `control_room` | Platform config | `feature_flags` |
| `public` | Project-owned tables + facade views | All 10 base tables + views |

---

## 2. Ownership & Isolation Map

### Base Tables (seftec-owned or infra-owned)

| Table | Ownership | Status |
|---|---|---|
| `capability_tiers` | infra/shared | ✅ exists |
| `project_capabilities` | infra/shared | ✅ exists |
| `provider_accounts` | seftec-owned | ✅ exists |
| `provider_references` | seftec-owned | ✅ exists |
| `simple_users` | infra/shared | ✅ exists |
| `sync_config` | infra/shared | ✅ exists |
| `user_sync_log` | infra/shared | ✅ exists |
| `webhook_deliveries` | seftec-owned | ✅ exists |
| `webhook_endpoints` | seftec-owned | ✅ exists |
| `webhook_events` | seftec-owned | ✅ exists |

### Views (other-project-owned, exposed via public views)

| View | Source Schema | Writable? | Used by seftec? |
|---|---|---|---|
| `profiles` | `shared_services.profiles` | Yes (via CRUD funcs) | ✅ auth, dashboard |
| `user_roles` | `auth_gateway.user_roles` | Yes (via CRUD funcs) | ✅ admin, RBAC |
| `products` | `marketplace.products` | Yes (via CRUD funcs) | ✅ shop, inventory |
| `orders` | `marketplace.orders` | Yes (via CRUD funcs) | ✅ orders page |
| `order_items` | `marketplace.order_items` | Yes (via CRUD funcs) | ✅ orders, analytics |
| `feature_flags` | `control_room.feature_flags` | Yes (via CRUD funcs) | ✅ FeatureFlagManager |
| `user_preferences` | `shared_services.user_preferences` | Yes (via CRUD funcs) | ⚠️ schema mismatch |

### Missing Tables (need creation as seftec-owned)

| Table | Needed by | Status |
|---|---|---|
| `customers` | `use-customers.ts`, `use-invoices.ts` | ❌ does not exist |
| `customer_interactions` | `use-customers.ts` | ❌ does not exist |
| `inventory_items` | `use-inventory.ts` | ❌ does not exist |
| `inventory_adjustments` | `use-inventory.ts` | ❌ does not exist |
| `stock_alerts` | `use-inventory.ts` | ❌ does not exist |
| `invoices` | `use-invoices.ts` | ❌ does not exist |
| `invoice_items` | `use-invoices.ts` | ❌ does not exist |
| `invoice_payments` | `use-invoices.ts` | ❌ does not exist |
| `wallets` | `WalletBalanceCard.tsx` | ❌ does not exist |
| `bank_accounts` | `BankAccountInfo.tsx` | ❌ does not exist |

### Missing RPC Functions

| Function | Needed by | Status |
|---|---|---|
| `adjust_inventory_stock` | `use-inventory.ts` | ❌ does not exist |
| `create_invoice_with_items` | `use-invoices.ts` | ❌ does not exist |
| `record_invoice_payment` | `use-invoices.ts` | ❌ does not exist |

### Existing Functions (shared)

| Function | Source | Status |
|---|---|---|
| `has_role` | exists in public | ✅ used by RoleManagement, use-admin-access |
| `handle_new_user` | exists in public | ✅ trigger on auth.users |
| `handle_updated_at` | exists in public | ✅ generic timestamp updater |

---

## 3. Schema Drift Analysis

### 3.1 Migration vs Live DB Conflicts

#### `20250101_create_wallet_tables.sql` — ⚠️ WOULD FAIL
- **`CREATE TABLE profiles`**: CONFLICTS — `profiles` already exists as a VIEW to `shared_services.profiles`. Cannot create table with same name.
- **`CREATE TABLE user_roles`**: CONFLICTS — `user_roles` already exists as a VIEW to `auth_gateway.user_roles`. Cannot create table with same name.
- **`CREATE TABLE user_preferences`**: CONFLICTS — `user_preferences` already exists as a VIEW to `shared_services.user_preferences`. Cannot create table with same name.
- **`CREATE TABLE wallets`**: Would work (doesn't exist) BUT references `auth.users(id)` — need to verify FK to reserved schema is allowed.
- **`CREATE TABLE bank_accounts`**: Would work (doesn't exist) BUT references `auth.users(id)`.
- **`CREATE TRIGGER on auth.users`**: ⛔ VIOLATES rule against modifying reserved `auth` schema. The trigger already exists anyway (`handle_new_user`).

#### `20251119000000_create_business_tools.sql` — ⚠️ PARTIALLY WOULD FAIL
- **`inventory_items` references `products(id)`**: `products` is a VIEW. FK to a view may fail. Need to verify.
- **`invoices` references `customers(id)`**: Would work IF `customers` is created first in same migration (it is).
- **`invoice_items` references `products(id)`**: Same view FK issue.
- **`customers` references `profiles(id)`**: `profiles` is a VIEW. FK to a view will fail.

#### `20260104000001_add_atomic_rpc_functions.sql` — ⚠️ WOULD FAIL
- All 3 RPCs reference tables (`inventory_items`, `invoices`, `invoice_items`, `invoice_payments`, `stock_alerts`) that don't exist yet.
- **Column mismatch**: `record_invoice_payment` inserts `transaction_id` but the table schema defines `reference_number`. This would cause a runtime error.

#### `20260104000000_add_seed_data.sql` — ⚠️ PARTIALLY WOULD FAIL
- `INSERT INTO products` — `products` is a view. Insert may work via CRUD functions but `ON CONFLICT (sku)` won't work — the products view doesn't expose `sku` column.
- `INSERT INTO feature_flags` — `feature_flags` is a view. `ON CONFLICT (name)` won't work — name isn't a primary key on the view.

### 3.2 Column Mismatches

| Object | Migration expects | Live DB has | Issue |
|---|---|---|---|
| `user_roles` | `role TEXT` | `role USER-DEFINED (enum)` | Migration defines TEXT, live uses enum. Hook works either way. |
| `user_roles` | no `updated_at` | has `updated_at` | Extra column in live, harmless. |
| `user_preferences` | key-value (`preference_key`, `preference_value`) | trade-specific columns (`industry_focus`, `regions_of_interest`, etc.) | **COMPLETE SCHEMA MISMATCH** — `use-user-preferences.tsx` uses key-value pattern but live schema has fixed columns. |
| `profiles` | migration has `avatar_url`, `phone` | view lacks `avatar_url`, `phone` | Columns not exposed in view. |
| `invoice_payments` (migration) | `reference_number` | — | RPC uses `transaction_id` instead. Mismatch. |

### 3.3 Function Drift

| Function | Migration definition | Live state | Drift |
|---|---|---|---|
| `handle_new_user` | Inserts into `profiles` + `wallets` | Exists but definition unknown | ⚠️ May try to insert into view `profiles` — could work via CRUD func or fail. Wallet insert will fail (table doesn't exist). |
| `record_invoice_payment` | References `transaction_id` column | Does not exist | Column name mismatch with table definition (`reference_number`). |

---

## 4. Proposed Delta Repair Strategy

### DO NOT APPLY (blocked or conflicting)

| Migration file | Reason |
|---|---|
| `20250101_create_wallet_tables.sql` | Conflicts with existing views for profiles, user_roles, user_preferences. Tries to attach trigger to auth schema. |
| `20260104000000_add_seed_data.sql` | Inserts into views with ON CONFLICT on non-existent constraints. |

### SAFE TO CREATE (seftec-owned, no conflicts)

These tables need to be created as **new seftec-owned base tables** in the `public` schema. They don't conflict with any existing view or table.

| Table | FK dependencies | Notes |
|---|---|---|
| `customers` | Remove FK to `profiles(id)` — profiles is a view, not a table | Change `customer_profile_id` to plain UUID, no FK |
| `customer_interactions` | FK to `customers(id)` ✅ | Create after customers |
| `customer_tags` | FK to `customers(id)` ✅ | Create after customers |
| `customer_segments` | No FK issues ✅ | |
| `inventory_items` | Remove FK to `products(id)` — products is a view | Change to plain UUID, no FK |
| `inventory_adjustments` | FK to `inventory_items(id)` ✅ | Create after inventory_items |
| `stock_alerts` | FK to `inventory_items(id)` ✅ | Create after inventory_items |
| `invoices` | FK to `customers(id)` ✅ | Create after customers |
| `invoice_items` | FK to `invoices(id)` ✅; Remove FK to `products(id)` — view | Change products FK to plain UUID |
| `invoice_payments` | FK to `invoices(id)` ✅ | Fix `reference_number` vs `transaction_id` |
| `wallets` | Remove FK to `auth.users(id)` — reserved schema | Use plain UUID for `user_id` |
| `bank_accounts` | Remove FK to `auth.users(id)` — reserved schema | Use plain UUID for `user_id` |

### RPC FUNCTIONS TO CREATE

| Function | Fix needed |
|---|---|
| `adjust_inventory_stock` | ✅ As-is from migration (references seftec-owned tables) |
| `create_invoice_with_items` | ✅ As-is from migration |
| `record_invoice_payment` | ⚠️ Fix: change `transaction_id` → `reference_number` to match table schema |

### MIGRATIONS TO SKIP/IGNORE (already handled by shared schemas)

| Object | Reason |
|---|---|
| `profiles` table | Already exists as shared view |
| `user_roles` table | Already exists as shared view |
| `user_preferences` table (key-value version) | View exists with different schema. Hook needs to adapt to live schema, OR create separate seftec-specific preferences table. |
| `handle_new_user` trigger | Already exists. Do NOT recreate or modify. |
| `on_auth_user_created` trigger | Already exists. Do NOT modify auth schema. |

---

## 5. Hooks/Pages Unblocked After Reconciliation

| File | `@ts-nocheck`? | Tables needed | Unblocked? |
|---|---|---|---|
| `src/hooks/use-invoices.ts` | Yes | invoices, invoice_items, invoice_payments, customers | ✅ after delta migration |
| `src/hooks/use-inventory.ts` | Yes | inventory_items, inventory_adjustments, stock_alerts, products (view) | ✅ after delta migration |
| `src/hooks/use-customers.ts` | Yes | customers, customer_interactions | ✅ after delta migration |
| `src/hooks/use-admin-access.ts` | No | user_roles (view) | ✅ already works |
| `src/pages/RoleManagement.tsx` | No | user_roles (view), profiles (view) | ✅ already works |
| `src/hooks/use-marketplace-orders.ts` | Yes | order_items (view) | ⚠️ needs types.ts regen only |
| `src/hooks/use-analytics.ts` | Yes | order_items (view) | ⚠️ needs types.ts regen only |
| `src/pages/Orders.tsx` | Yes | orders, order_items, products (views) | ⚠️ needs types.ts regen only |
| `src/services/FeatureFlagManager.ts` | Yes | feature_flags (view) | ⚠️ needs types.ts regen only |
| `src/pages/DevOps/SaySwitchAdmin.tsx` | Yes | say_orders (doesn't exist) | ❌ remains blocked |
| `src/hooks/use-recommendations.tsx` | Yes | recommendations (view) | ⚠️ needs types.ts regen only |
| `src/components/ui/chart.tsx` | Yes | N/A (recharts types) | ❌ unrelated to schema |
| `src/components/ui/resizable.tsx` | Yes | N/A (library types) | ❌ unrelated to schema |

---

## 6. Objects That Should Be Moved to Better Isolation Later

| Object | Current location | Recommendation |
|---|---|---|
| SME tables (customers, inventory, invoices) | Will be in `public` schema | Move to `seftec` schema with public facade views (matches the pattern used by other projects) |
| `wallets`, `bank_accounts` | Will be in `public` schema | Consider moving to `seftec` schema or `shared_services` depending on cross-project needs |
| `handle_new_user` function | `public` schema | Currently inserts into shared `profiles` view AND non-existent `wallets`. Needs audit — wallet insert would fail silently or error. |
| Seed data in migrations | `20260104000000_add_seed_data.sql` | Should be a separate seed script, not a migration. Cannot ON CONFLICT against views. |

---

## 7. Recommended Execution Order

### Step 1: Delta migration (seftec-owned SME tables)
Create customers, inventory, invoice, wallet, bank_account tables with:
- NO FKs to views (products, profiles)
- NO FKs to auth.users
- NO trigger on auth schema
- RLS policies scoped to `auth.uid()`

### Step 2: RPC functions
Create `adjust_inventory_stock`, `create_invoice_with_items`, `record_invoice_payment` with the `transaction_id` → `reference_number` fix.

### Step 3: Types regeneration
After migration, types.ts will be auto-regenerated to include new base tables.

### Step 4: Remove @ts-nocheck
Update hooks to use proper types from regenerated types.ts.

### Step 5: Adapt user_preferences hook
Either adapt `use-user-preferences.tsx` to the live schema (trade-specific columns) OR create a seftec-specific key-value preferences table.

---

## 8. Summary

**Root cause**: The repo migrations were written assuming a single-project database, but the live DB is a shared multi-schema environment where most "tables" are actually views to tables owned by other projects/schemas.

**Key finding**: None of the SME tables (invoices, inventory, customers, wallets) exist in any form. They need to be created fresh, but with FK constraints adjusted to avoid referencing views or reserved schemas.

**No repair/ALTER needed**: Since the SME tables don't exist at all, this is a clean CREATE operation — but scoped correctly to avoid the conflicts identified above.
