# Stripe Subscription - Functional Test Guide

**Status:** ✅ Code Fixed | Ready for Testing

---

## 🔧 Issues Fixed

### 1. **`get_subscription` Missing Provider Filter**
- **Problem:** Could return PayPal subscriptions instead of Stripe
- **Fix:** Added `.eq('provider', 'stripe')` filter

### 2. **Free Trial Insert Missing Required Fields**
- **Problem:** `subscription_id` and `plan_id` are NOT NULL but weren't being set
- **Fix:** Added all required fields when creating free trial

### 3. **Upsert Logic Fixed**
- **Problem:** `onConflict: 'user_id'` didn't work with table constraints
- **Fix:** Changed to check-then-update-or-insert pattern

---

## ✅ What's Working Now

1. **Function Deployed** ✅
   - Updated `stripe-subscription` function deployed
   - All fixes applied

2. **Database Schema** ✅
   - Migration applied (you mentioned Peter did this)
   - Stripe columns should exist

3. **Secrets Configured** ✅
   - `STRIPE_SECRET_KEY` - Set
   - `STRIPE_WEBHOOK_SECRET` - Set

---

## 🧪 How to Test (In Your Browser)

### Step 1: Open Your App
1. Navigate to your subscription page
2. Open browser DevTools (F12)
3. Go to Console tab

### Step 2: Test Subscription Fetch
In console, run:
```javascript
// Make sure you're logged in first
const { data, error } = await supabase.functions.invoke('stripe-subscription', {
  body: { action: 'get_subscription' }
});

console.log('✅ Subscription Data:', data);
console.log('❌ Error:', error);
```

**Expected:**
- Returns subscription object OR creates free trial
- No errors

### Step 3: Test Checkout Creation
In console, run:
```javascript
const { data, error } = await supabase.functions.invoke('stripe-subscription', {
  body: { action: 'create_checkout', plan: 'basic' }
});

console.log('✅ Checkout URL:', data?.url);
console.log('❌ Error:', error);

// If successful, open the URL
if (data?.url) {
  window.open(data.url, '_blank');
}
```

**Expected:**
- Returns `{ url: "https://checkout.stripe.com/..." }`
- Opens Stripe checkout page
- No errors

### Step 4: Test in UI
1. Click "Subscribe" button on Basic or Premium plan
2. Should open Stripe checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Should redirect to success page

---

## 🐛 Troubleshooting

### Error: "Missing authorization header"
**Fix:** Make sure you're logged in

### Error: "No subscription found" (customer portal)
**Fix:** Create a subscription first

### Error: "Failed to create checkout session"
**Check:**
1. Browser console for detailed error
2. Supabase function logs
3. Stripe API key is valid

### Checkout doesn't open
**Check:**
1. Browser popup blocker disabled
2. Console for JavaScript errors
3. Network tab for failed requests

---

## 📊 Verify Database

After testing, check your database:
```sql
SELECT 
  user_id,
  provider,
  plan_name,
  status,
  stripe_customer_id,
  stripe_subscription_id,
  current_period_end
FROM subscriptions
WHERE provider = 'stripe'
ORDER BY created_at DESC
LIMIT 10;
```

---

## ✅ Success Criteria

- [ ] `get_subscription` returns data (no errors)
- [ ] `create_checkout` returns URL (no errors)
- [ ] Stripe checkout page opens
- [ ] Payment can be completed
- [ ] Subscription appears in database
- [ ] Webhook updates subscription status

---

## 🚀 Next Steps

1. **Test Now:** Use the browser console tests above
2. **Check Logs:** Monitor Supabase function logs
3. **Verify Database:** Check subscription records
4. **Test Webhook:** Complete a payment and verify webhook fires

**The service should now be fully functional!** 🎉

