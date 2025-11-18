-- Enable all feature flags and set rollout to 100%
-- This migration fixes the critical blocker where flags were disabled by default

-- Update existing feature flags to enabled state
UPDATE public.feature_flags
SET
  enabled = true,
  rollout_pct = 100,
  updated_at = NOW()
WHERE name IN (
  'sayswitch_payments',
  'sayswitch_bills',
  'sayswitch_transfers',
  'paypal_payments',
  'ai_recommendations'
);

-- Insert any missing feature flags
INSERT INTO public.feature_flags (name, enabled, rollout_pct, description)
VALUES
  ('sayswitch_payments', true, 100, 'SaySwitch payment processing integration'),
  ('sayswitch_bills', true, 100, 'SaySwitch bill payment services (airtime, data, TV, electricity)'),
  ('sayswitch_transfers', true, 100, 'SaySwitch money transfer services'),
  ('paypal_payments', true, 100, 'PayPal international payment processing'),
  ('ai_recommendations', true, 100, 'AI-powered business recommendations and insights')
ON CONFLICT (name) DO UPDATE
SET
  enabled = EXCLUDED.enabled,
  rollout_pct = EXCLUDED.rollout_pct,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Add comment explaining the change
COMMENT ON TABLE public.feature_flags IS 'Feature flag configuration table with real-time updates support. All flags enabled by default as of 2025-11-18.';
