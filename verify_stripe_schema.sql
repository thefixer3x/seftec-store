-- Verification script to check if Stripe columns exist
-- Run this via Supabase SQL Editor or via CLI

SELECT 
  column_name,
  data_type,
  is_nullable
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

-- If this returns 6 rows, all columns exist
-- If it returns fewer, migration is needed

