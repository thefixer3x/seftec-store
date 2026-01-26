# How to Apply Stripe Subscription Migration

**Status:** Migration file ready, needs to be applied to database

---

## 🎯 Quick Summary

✅ **Code:** Complete and deployed  
✅ **Secrets:** Configured  
✅ **Functions:** Active  
⚠️ **Database:** Migration needed  

---

## 📋 Step-by-Step Instructions

### Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `mxtsdgkwzjzlttpotole`

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy Migration SQL**
   ```bash
   cat supabase/migrations/20251120000000_add_stripe_subscription_columns.sql
   ```
   Or open the file and copy its contents.

4. **Paste and Run**
   - Paste the SQL into the editor
   - Click "Run" or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)
   - Wait for success message

5. **Verify Schema**
   - Run this query to verify columns were added:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns
   WHERE table_schema = 'public' 
     AND table_name = 'subscriptions'
     AND column_name IN (
       'stripe_customer_id',
       'stripe_subscription_id',
       'plan_name',
       'current_period_start',
       'current_period_end',
       'trial_end'
     )
   ORDER BY column_name;
   ```
   - Should return **6 rows**

---

### Method 2: Supabase CLI (If connection works)

```bash
# Try to push migration
supabase db push --linked

# If that fails due to connection, use Method 1
```

---

## ✅ Verification Checklist

After applying migration, verify:

- [ ] Migration SQL executed successfully
- [ ] Verification query returns 6 rows
- [ ] No errors in Supabase logs
- [ ] Can test subscription creation

---

## 🧪 Test After Migration

1. **Test Checkout Creation**
   - Navigate to subscription page in your app
   - Click "Subscribe" on a plan
   - Should open Stripe checkout (no errors)

2. **Check Database**
   ```sql
   SELECT * FROM subscriptions 
   WHERE provider = 'stripe' 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

3. **Test Webhook** (if configured)
   - Complete a test payment
   - Check webhook logs in Stripe Dashboard
   - Verify subscription status updated in database

---

## 🚨 Troubleshooting

### If Migration Fails

**Error: "column already exists"**
- ✅ Good! Columns already exist, migration not needed
- Verify with the verification query above

**Error: "permission denied"**
- Check you're using the correct database role
- Try running as service role in SQL Editor

**Error: "relation does not exist"**
- The `subscriptions` table might not exist
- Run the PayPal integration migration first:
  - `supabase/migrations/20250528110500_add_paypal_integration.sql`

### If Verification Query Returns 0 Rows

- Migration didn't apply correctly
- Check Supabase logs for errors
- Re-run migration SQL
- Contact support if issues persist

---

## 📞 Support

If you encounter issues:
1. Check Supabase Dashboard → Logs
2. Review migration SQL for syntax errors
3. Verify database connection
4. Check Supabase status page

---

**Once migration is applied, your Stripe subscription integration will be fully functional!** 🎉

