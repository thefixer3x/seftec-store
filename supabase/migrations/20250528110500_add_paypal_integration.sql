-- PayPal Integration Migration
-- Creates tables and functions for PayPal subscription payments
-- Timestamp: 2025-05-28 11:05:00

-- Create feature flag for PayPal if it doesn't exist
INSERT INTO public.feature_flags (name, enabled, description)
VALUES ('paypal_payments', false, 'Enable PayPal payment integration')
ON CONFLICT (name) DO NOTHING;

-- Ensure subscriptions table exists
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('stripe', 'paypal')),
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  custom_id TEXT,
  payment_source TEXT,
  raw_response JSONB,
  needs_review BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activated_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancel_reason TEXT,
  UNIQUE (provider, subscription_id)
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Create webhook logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  resource_id TEXT,
  resource_type TEXT,
  raw_event JSONB,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create subscription payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.subscription_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  subscription_id TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, transaction_id)
);

-- Create subscription refunds table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.subscription_refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  subscription_id TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  refund_date TIMESTAMPTZ NOT NULL,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, transaction_id)
);

-- Create user subscriptions table for easy access checks
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_subscribed BOOLEAN NOT NULL DEFAULT FALSE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  subscription_provider TEXT,
  plan_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user payments table for consolidated payment history
CREATE TABLE IF NOT EXISTS public.user_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  payment_date TIMESTAMPTZ NOT NULL,
  payment_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, transaction_id)
);

-- Create index on user_id for payments
CREATE INDEX IF NOT EXISTS idx_user_payments_user_id ON public.user_payments(user_id);

-- Create function to update user subscription access
CREATE OR REPLACE FUNCTION update_user_subscription_access(p_user_id UUID, p_has_access BOOLEAN)
RETURNS VOID AS $$
BEGIN
  -- Update user_subscriptions table
  INSERT INTO public.user_subscriptions (user_id, is_subscribed, updated_at)
  VALUES (p_user_id, p_has_access, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    is_subscribed = p_has_access,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_subscriptions
    WHERE user_id = $1 AND is_subscribed = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply Row Level Security (RLS)

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Admins can do everything with subscriptions
CREATE POLICY "Admins can do everything with subscriptions" 
  ON public.subscriptions FOR ALL 
  USING (is_admin());

-- Enable RLS on user_subscriptions
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- User subscriptions policies
CREATE POLICY "Users can view their own subscription status" 
  ON public.user_subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- Admins can do everything with user_subscriptions
CREATE POLICY "Admins can do everything with user_subscriptions" 
  ON public.user_subscriptions FOR ALL 
  USING (is_admin());

-- Enable RLS on user_payments
ALTER TABLE public.user_payments ENABLE ROW LEVEL SECURITY;

-- User payments policies
CREATE POLICY "Users can view their own payments" 
  ON public.user_payments FOR SELECT 
  USING (auth.uid() = user_id);

-- Admins can do everything with user_payments
CREATE POLICY "Admins can do everything with user_payments" 
  ON public.user_payments FOR ALL 
  USING (is_admin());

-- Only admins can access webhook logs
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can access webhook logs" 
  ON public.webhook_logs FOR ALL 
  USING (is_admin());

-- Only admins can access subscription payments
ALTER TABLE public.subscription_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can access subscription payments" 
  ON public.subscription_payments FOR ALL 
  USING (is_admin());

-- Only admins can access subscription refunds
ALTER TABLE public.subscription_refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can access subscription refunds" 
  ON public.subscription_refunds FOR ALL 
  USING (is_admin());

-- Grant permissions for authenticated users
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT SELECT ON public.user_subscriptions TO authenticated;
GRANT SELECT ON public.user_payments TO authenticated;

-- Grant execute permissions for functions
GRANT EXECUTE ON FUNCTION has_active_subscription TO authenticated;
