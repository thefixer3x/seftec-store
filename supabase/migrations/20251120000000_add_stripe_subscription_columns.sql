-- Add Stripe-specific columns to subscriptions table
-- This migration adds the columns needed for Stripe subscription integration
-- while maintaining compatibility with existing PayPal integration

-- Add Stripe-specific columns
ALTER TABLE public.subscriptions 
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS plan_name TEXT,
  ADD COLUMN IF NOT EXISTS current_period_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trial_end TIMESTAMPTZ;

-- Add unique constraint on user_id for Stripe subscriptions (one subscription per user)
-- This allows the upsert with onConflict: 'user_id' to work properly
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_user_id_unique 
  ON public.subscriptions(user_id) 
  WHERE stripe_customer_id IS NOT NULL;

-- Create indexes for Stripe lookups (improves query performance)
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id 
  ON public.subscriptions(stripe_customer_id) 
  WHERE stripe_customer_id IS NOT NULL;
  
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id 
  ON public.subscriptions(stripe_subscription_id) 
  WHERE stripe_subscription_id IS NOT NULL;

-- Create index for plan_name lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_name 
  ON public.subscriptions(plan_name) 
  WHERE plan_name IS NOT NULL;

-- Add comment to document the dual-purpose nature of this table
COMMENT ON TABLE public.subscriptions IS 
  'Stores subscriptions for both Stripe and PayPal. 
   Stripe uses: stripe_customer_id, stripe_subscription_id, plan_name, current_period_start/end, trial_end
   PayPal uses: subscription_id, provider, plan_id';

