# Stripe Subscription Integration - Complete Setup Guide

**Date:** 2025-11-20  
**Status:** ✅ Code Complete | ⚠️ Migration Needed

---

## ✅ Current Status

### What's Already Done

1. **Edge Functions Deployed** ✅
   - `stripe-subscription` - Active (deployed 2025-07-12)
   - `stripe-webhook` - Active (deployed 2025-09-28)
   - All Stripe functions are live and active

2. **Secrets Configured** ✅
   - `STRIPE_SECRET_KEY` - Set
   - `STRIPE_WEBHOOK_SECRET` - Set
   - `Stripe_PK` - Set (Publishable Key)
   - `Stripe_SK` - Set (Secret Key)

3. **Frontend Components** ✅
   - `SubscriptionManager.tsx` - Complete UI
   - `use-subscription.ts` - React hook
   - `PaymentSuccess.tsx` - Success page

4. **Code Quality** ✅
   - Error handling implemented
   - Authentication checks in place
   - CORS configured
   - TypeScript types defined

---

## ⚠️ Required Action: Database Migration

### Issue
The `subscriptions` table is missing Stripe-specific columns that the code expects.

### Migration File
**Location:** `supabase/migrations/20251120000000_add_stripe_subscription_columns.sql`

**What it does:**
- Adds `stripe_customer_id` column
- Adds `stripe_subscription_id` column
- Adds `plan_name` column
- Adds `current_period_start` column
- Adds `current_period_end` column
- Adds `trial_end` column
- Creates indexes for performance
- Adds unique constraint on `user_id` for Stripe subscriptions

### How to Apply

**Option 1: Via Supabase Dashboard (Recommended)**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `20251120000000_add_stripe_subscription_columns.sql`
3. Paste and run
4. Verify with `verify_stripe_schema.sql`

**Option 2: Via CLI**
```bash
supabase db push --linked
```

**Option 3: Manual SQL**
Run the migration SQL directly in your database.

---

## 🔧 Code Fixes Applied

### 1. Fixed Upsert Logic
**Problem:** Code used `onConflict: 'user_id'` but table didn't have unique constraint on `user_id`.

**Solution:** Updated `stripe-subscription/index.ts` to:
- Check for existing subscription first
- Update if exists, insert if new
- Properly handle the `UNIQUE (provider, subscription_id)` constraint

### 2. Added Unique Index
Migration now creates a unique index on `user_id` for Stripe subscriptions to support one subscription per user.

---

## 🧪 Testing Checklist

### Pre-Testing
- [ ] Apply migration (see above)
- [ ] Verify schema with `verify_stripe_schema.sql`
- [ ] Confirm secrets are set
- [ ] Check functions are deployed

### Test Scenarios

#### 1. Create Checkout Session
- [ ] Navigate to subscription page
- [ ] Click "Subscribe" on Basic plan
- [ ] Verify Stripe checkout opens
- [ ] Complete test payment
- [ ] Verify redirect to success page

#### 2. Subscription Status
- [ ] Check subscription appears in database
- [ ] Verify `stripe_customer_id` is set
- [ ] Verify `plan_name` is correct
- [ ] Check status is "active" after payment

#### 3. Customer Portal
- [ ] Click "Manage Subscription"
- [ ] Verify Stripe portal opens
- [ ] Test cancellation flow
- [ ] Verify webhook updates status

#### 4. Webhook Events
- [ ] Test `checkout.session.completed` event
- [ ] Test `customer.subscription.updated` event
- [ ] Test `customer.subscription.deleted` event
- [ ] Verify database updates correctly

#### 5. Free Trial
- [ ] New user without subscription
- [ ] Verify 15-day trial is created
- [ ] Check `trial_end` date is set

---

## 🔗 Webhook Configuration

### Stripe Dashboard Setup

1. **Go to:** Stripe Dashboard → Developers → Webhooks
2. **Add Endpoint:**
   ```
   https://[your-project].supabase.co/functions/v1/stripe-webhook
   ```
3. **Select Events:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`

4. **Copy Webhook Secret:**
   - Should match `STRIPE_WEBHOOK_SECRET` in Supabase secrets

### Test Webhook Locally
```bash
stripe listen --forward-to https://[your-project].supabase.co/functions/v1/stripe-webhook
```

---

## 📊 Verification Queries

### Check Schema
```sql
-- Run verify_stripe_schema.sql
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'subscriptions'
  AND column_name IN (
    'stripe_customer_id',
    'stripe_subscription_id',
    'plan_name',
    'current_period_start',
    'current_period_end',
    'trial_end'
  );
```

### Check Subscriptions
```sql
SELECT 
  user_id,
  plan_name,
  status,
  stripe_customer_id,
  current_period_end
FROM subscriptions
WHERE provider = 'stripe'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🚀 Deployment Steps

1. **Apply Migration**
   ```bash
   # Via Dashboard SQL Editor (recommended)
   # Or
   supabase db push --linked
   ```

2. **Verify Schema**
   - Run `verify_stripe_schema.sql`
   - Should return 6 rows

3. **Test Integration**
   - Run through test scenarios above
   - Monitor function logs
   - Check webhook events

4. **Configure Webhook**
   - Set up in Stripe Dashboard
   - Test with `stripe listen`

5. **Monitor**
   - Check function logs regularly
   - Monitor webhook delivery
   - Review subscription status updates

---

## 📝 Files Created/Modified

### New Files
- ✅ `supabase/migrations/20251120000000_add_stripe_subscription_columns.sql`
- ✅ `verify_stripe_schema.sql`
- ✅ `test_stripe_integration.sh`
- ✅ `STRIPE_INTEGRATION_COMPLETE.md`
- ✅ `STRIPE_SUBSCRIPTION_STATUS.md`

### Modified Files
- ✅ `supabase/functions/stripe-subscription/index.ts` (fixed upsert logic)

---

## ✅ Summary

| Component | Status | Action Needed |
|-----------|--------|---------------|
| Edge Functions | ✅ Deployed | None |
| Secrets | ✅ Configured | None |
| Frontend | ✅ Complete | None |
| Database Schema | ⚠️ Missing Columns | **Apply Migration** |
| Webhook Config | ⚠️ Unknown | Verify in Stripe Dashboard |
| Testing | ⏳ Pending | Run test scenarios |

---

## 🎯 Next Steps

1. **IMMEDIATE:** Apply migration via Supabase Dashboard SQL Editor
2. **VERIFY:** Run `verify_stripe_schema.sql` to confirm columns exist
3. **TEST:** Run through test scenarios
4. **CONFIGURE:** Set up webhook in Stripe Dashboard
5. **MONITOR:** Watch function logs and webhook events

**Once migration is applied, the integration will be fully functional!** 🚀

