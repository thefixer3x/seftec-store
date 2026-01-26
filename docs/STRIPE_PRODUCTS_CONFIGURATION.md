# Stripe Products & Configuration Verification

**Date:** 2025-11-20  
**Purpose:** Verify Stripe products match Supabase code configuration

---

## 🔍 Current Configuration in Code

### Subscription Products (stripe-subscription function)

**Basic Plan:**
- Price: $15.00/month (1500 cents)
- Product Name: "Seftec Basic Plan"
- Created: Dynamically via `price_data` (not pre-configured)

**Premium Plan:**
- Price: $27.00/month (2700 cents)
- Product Name: "Seftec Premium Plan"
- Created: Dynamically via `price_data` (not pre-configured)

### One-Time Payment Products (create-stripe-checkout function)

**Configuration:**
- Uses `price_data` with dynamic product creation
- Product name: "Seftec Marketplace Payment" (default)
- Amount: Dynamic based on request

---

## ⚠️ Issue Found: Products Not Pre-Configured

**Current Implementation:**
- Products are created **on-the-fly** using `price_data` in checkout sessions
- No pre-configured products/prices in Stripe Dashboard
- Each checkout creates a new product entry

**Problems:**
1. ❌ Products created dynamically (not reusable)
2. ❌ No centralized product management
3. ❌ Harder to track subscriptions in Stripe Dashboard
4. ❌ Webhook matching relies on `unit_amount` comparison (fragile)

---

## ✅ Recommended: Pre-Configure Products in Stripe

### Step 1: Create Products in Stripe Dashboard

**Basic Plan Product:**
```bash
stripe products create \
  --name="Seftec Basic Plan" \
  --description="Basic subscription plan with unlimited transactions"
```

**Premium Plan Product:**
```bash
stripe products create \
  --name="Seftec Premium Plan" \
  --description="Premium subscription plan with advanced features"
```

### Step 2: Create Prices for Products

**Basic Plan Price ($15/month):**
```bash
stripe prices create \
  --product=prod_BASIC_PLAN_ID \
  --unit-amount=1500 \
  --currency=usd \
  --recurring[interval]=month
```

**Premium Plan Price ($27/month):**
```bash
stripe prices create \
  --product=prod_PREMIUM_PLAN_ID \
  --unit-amount=2700 \
  --currency=usd \
  --recurring[interval]=month
```

### Step 3: Update Code to Use Price IDs

Instead of `price_data`, use `price` with the price ID:

```typescript
// OLD (current):
line_items: [{
  price_data: {
    unit_amount: 1500,
    currency: "usd",
    recurring: { interval: "month" },
    product_data: { name: "Seftec Basic Plan" }
  }
}]

// NEW (recommended):
line_items: [{
  price: "price_BASIC_PLAN_ID", // Use pre-configured price
  quantity: 1
}]
```

---

## 🔍 Current Stripe Products Found

From Stripe CLI check:
- Found 1 price: `price_1SGWU62KF4vMCpn8IAwgubjR`
  - Amount: $4.99/month (499 cents)
  - Product: `prod_TCwMlWxNGa534G`
  - Name: "SubTrack Pro Monthly"
  - **Does NOT match** Supabase configuration ($15/$27)

---

## 📋 Action Items

### Immediate (Optional but Recommended)

1. **Create Products in Stripe Dashboard:**
   - Basic Plan: $15/month
   - Premium Plan: $27/month

2. **Get Price IDs:**
   - Save price IDs from Stripe Dashboard
   - Update code to use price IDs instead of `price_data`

3. **Update Code:**
   - Modify `stripe-subscription/index.ts` to use price IDs
   - Store price IDs in environment variables or config

### Current Status (Works but Not Ideal)

✅ **Current implementation works** - Creates products dynamically  
⚠️ **Not ideal** - Harder to manage and track  
✅ **Webhook matching** - Uses `unit_amount` comparison (works but fragile)

---

## 🧪 Testing Card Tokenization

### Current Implementation

**Checkout Sessions:**
- ✅ Uses `payment_method_types: ["card"]`
- ✅ Cards are saved to customer automatically in subscription mode
- ✅ Payment methods can be retrieved via customer object

**Missing:**
- ❌ No explicit SetupIntent for saving cards without payment
- ❌ No payment method management UI
- ❌ No saved payment methods list

### To Add Card Tokenization:

1. **Create SetupIntent:**
```typescript
const setupIntent = await stripe.setupIntents.create({
  customer: customerId,
  payment_method_types: ['card'],
});
```

2. **Save Payment Method:**
```typescript
await stripe.paymentMethods.attach(paymentMethodId, {
  customer: customerId,
});
```

3. **List Saved Payment Methods:**
```typescript
const paymentMethods = await stripe.paymentMethods.list({
  customer: customerId,
  type: 'card',
});
```

---

## ✅ Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Subscription Checkout | ✅ Works | Creates products dynamically |
| One-Time Payment | ✅ Works | Uses `create-stripe-checkout` |
| Card Tokenization | ⚠️ Partial | Cards saved in subscription mode, no explicit SetupIntent |
| Products in Stripe | ❌ Not Pre-Configured | Products created on-the-fly |
| Price Matching | ⚠️ Fragile | Uses `unit_amount` comparison |

---

## 🎯 Recommendations

1. **Keep Current (Quick):**
   - Works as-is
   - No changes needed
   - Products created automatically

2. **Improve (Better):**
   - Pre-configure products in Stripe
   - Use price IDs in code
   - Better tracking and management

3. **Add Card Management:**
   - Add SetupIntent for saving cards
   - Add payment method management UI
   - Allow users to save/select cards

**Current implementation is functional but could be improved with pre-configured products.**

