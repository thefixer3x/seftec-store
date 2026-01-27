
# Login Infrastructure Investigation Report & Fix Plan

## Executive Summary

After a thorough investigation of the authentication system, I've identified **5 distinct issues** that are causing persistent login problems. The good news is that the core authentication architecture is solid—the problems are configuration and synchronization issues that can be fixed without changing the infrastructure.

---

## Current Architecture Analysis

### Authentication Flow (Existing - Well Designed)
```text
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   SignInForm    │────▶│   AuthContext    │────▶│  Supabase Auth  │
│   (UI Layer)    │     │  (State Manager) │     │   (Backend)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  useAuthState    │
                        │  (Session Hook)  │
                        └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │ fetchUserProfile │
                        │ (Database Query) │
                        └──────────────────┘
```

### Component Flow:
1. `SignInForm.tsx` - Collects credentials
2. `AuthContext.tsx` - Calls `handleSignIn()` from `auth-utils.ts`
3. `use-auth-state.ts` - Listens to `onAuthStateChange` events
4. `fetchUserProfile()` - Queries `profiles` table for user data

---

## Issues Identified

### Issue 1: Build Error - Invalid TypeScript Compiler Option (CRITICAL)
**Status:** 🔴 Blocking Build  
**Location:** `tsconfig.json` (line 18) and `tsconfig.app.json` (line 23)

**Problem:** The `suppressImplicitAnyIndexErrors` option was deprecated in TypeScript 5.0+ and removed entirely. This causes build failures.

**Evidence:**
```json
"suppressImplicitAnyIndexErrors": true  // ❌ Invalid option
```

**Fix:** Remove this deprecated option from both config files.

---

### Issue 2: Profile Type Mismatch (HIGH)
**Status:** 🟡 Causes Silent Failures  
**Location:** `src/types/auth.ts` vs actual database schema

**Problem:** The `Profile` type in code doesn't match the actual `profiles` table columns in the database.

**Code Type Definition:**
```typescript
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  business_type: string | null;
  is_vendor: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  // Missing: email, full_name, stripe_customer_id, subscription_tier
};
```

**Actual Database Schema (from query):**
- `id`, `first_name`, `last_name`, `full_name`, `email`, `company_name`, `business_type`, `is_vendor`, `stripe_customer_id`, `subscription_tier`, `created_at`, `updated_at`

**Impact:** Profile fetching may fail silently or return incomplete data, causing authentication state issues.

---

### Issue 3: Missing Database Tables (HIGH)
**Status:** 🔴 Referenced but Don't Exist  

**Problem:** The code references `wallets` and `bank_accounts` tables but they don't exist in the database.

**Evidence from query:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name IN ('wallets', 'bank_accounts', 'user_sessions')
-- Result: Only 'user_sessions' exists
```

The migration file `20250101_create_wallet_tables.sql` exists but was never applied, OR the tables were created then deleted.

**Impact:** The `handle_new_user()` trigger attempts to insert into a non-existent `wallets` table, which could cause signup failures.

---

### Issue 4: Trigger Function Mismatch (HIGH)
**Status:** 🟡 Inconsistent  
**Location:** Database trigger `handle_new_user()`

**Problem:** The trigger function in the database differs from the migration file.

**Database version (actual):**
```sql
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
```

**Migration file version:**
```sql
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO public.wallets (user_id, balance, currency)
  VALUES (NEW.id, 0.00, 'NGN');
  
  RETURN NEW;
END;
```

**Impact:** The trigger expects `first_name` and `last_name` in `raw_user_meta_data`, but the signup form in `SignUpForm.tsx` only sends `first_name` (line 44-46).

---

### Issue 5: Security Vulnerability in Biometric Auth (MEDIUM)
**Status:** 🟡 Security Risk (Already noted in memory)  
**Location:** `src/utils/auth-utils.ts` lines 34-36 and 129-132

**Problem:** Passwords are being stored in localStorage for biometric simulation.

```typescript
localStorage.setItem('temp_auth_key', password);  // ❌ Security risk
```

**Impact:** Not directly causing login failures, but is a security concern.

---

## Recommended Fix Plan

### Phase 1: Fix Build Errors (Immediate - Required)

**Step 1.1: Remove deprecated TypeScript option**

Files to modify:
- `tsconfig.json` - Remove line 18 (`"suppressImplicitAnyIndexErrors": true`)
- `tsconfig.app.json` - Remove line 23 (`"suppressImplicitAnyIndexErrors": true`)

### Phase 2: Synchronize Profile Type (High Priority)

**Step 2.1: Update Profile type definition**

File: `src/types/auth.ts`

Add missing fields to match database:
- `email: string | null`
- `full_name: string | null`
- `stripe_customer_id: string | null`
- `subscription_tier: string | null`

### Phase 3: Fix Database Schema (High Priority)

**Step 3.1: Create missing tables**

Apply a migration to create:
- `wallets` table (if needed for the app)
- `bank_accounts` table (if needed for the app)

OR update the `handle_new_user()` trigger to remove wallet creation if not needed.

**Step 3.2: Verify trigger is correctly bound**

Ensure the trigger `on_auth_user_created` exists and fires on `auth.users` INSERT.

### Phase 4: Fix Signup Metadata Alignment (Medium Priority)

**Step 4.1: Update SignUpForm to send correct metadata**

Either:
- Option A: Update `SignUpForm.tsx` to split the name into `first_name` and `last_name` 
- Option B: Update the trigger to handle `name` or `first_name` only

Currently the signup sends:
```typescript
await signUp(values.email, values.password, { first_name: values.name });
```

But `handleSignUp` in `auth-utils.ts` (line 117-120) sends:
```typescript
data: {
  first_name: userData.first_name,
  last_name: userData.last_name,  // undefined!
}
```

### Phase 5: Remove Security Vulnerability (Low Priority)

**Step 5.1: Remove localStorage password storage**

File: `src/utils/auth-utils.ts`

Remove lines that store password in localStorage and implement proper WebAuthn or session-based biometric tracking.

---

## Technical Details for Implementation

### Files Requiring Changes:

| File | Change Type | Priority |
|------|-------------|----------|
| `tsconfig.json` | Remove deprecated option | Critical |
| `tsconfig.app.json` | Remove deprecated option | Critical |
| `src/types/auth.ts` | Add missing Profile fields | High |
| `src/utils/auth-utils.ts` | Fix metadata mapping in signUp | High |
| Database trigger | Align with signup data | High |
| `src/utils/auth-utils.ts` | Remove localStorage password | Medium |

### Verification Steps After Fix:

1. Build succeeds without TypeScript errors
2. New user signup creates profile correctly
3. Login retrieves complete profile data
4. Session persists across page refreshes
5. Protected routes accessible after login

---

## Root Cause Summary

The persistent login errors stem from a **cascade of misalignments**:

1. **Build fails** due to deprecated TypeScript option → App can't compile
2. **Profile type mismatch** → TypeScript may incorrectly type profile data
3. **Signup metadata mismatch** → Profile created with NULL `last_name`
4. **Missing tables** → If trigger fails, user creation might fail silently

The architecture is sound. These are configuration synchronization issues that accumulated over time. The fix maintains the existing infrastructure while aligning all components.
