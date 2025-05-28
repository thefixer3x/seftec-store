-- SaySwitch Payment Integration Schema
-- Provides comprehensive African payment solutions
-- Compatible with existing SEFTEC Store infrastructure

-- Core SaySwitch orders table - tracks all transactions
CREATE TABLE public.say_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.profiles(id), -- For B2B
  type TEXT CHECK (type IN ('checkout', 'bill', 'transfer', 'virtual_account')),
  provider TEXT, -- MTN, GOTV, IBEDC, etc.
  currency TEXT DEFAULT 'NGN',
  amount DECIMAL(19,4),
  fee DECIMAL(19,4),
  total_amount DECIMAL(19,4) GENERATED ALWAYS AS (amount + COALESCE(fee, 0)) STORED,
  status TEXT DEFAULT 'pending',
  reference TEXT UNIQUE,
  say_reference TEXT, -- SaySwitch's reference
  recipient_details JSONB, -- Stores account/phone/meter details
  raw_request JSONB, -- Full request for debugging
  raw_response JSONB, -- Full response for debugging
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Wallet snapshots for balance tracking
CREATE TABLE public.say_wallet_snapshots (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.profiles(id),
  currency TEXT,
  balance DECIMAL(19,4),
  available_balance DECIMAL(19,4),
  ledger_balance DECIMAL(19,4),
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Virtual accounts for collections
CREATE TABLE public.say_virtual_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.profiles(id),
  account_number TEXT UNIQUE,
  account_name TEXT,
  bank_name TEXT,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'active',
  say_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Beneficiaries for transfers
CREATE TABLE public.say_beneficiaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  account_number TEXT,
  account_name TEXT,
  bank_code TEXT,
  bank_name TEXT,
  verified BOOLEAN DEFAULT false,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bill payment favorites
CREATE TABLE public.say_bill_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT, -- airtime, data, tv, electricity
  provider TEXT,
  customer_id TEXT, -- phone, smartcard, meter number
  nickname TEXT,
  metadata JSONB, -- Store plan details, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.say_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.say_wallet_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.say_virtual_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.say_beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.say_bill_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own SaySwitch orders" 
ON public.say_orders FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE id = say_orders.org_id
));

CREATE POLICY "Users can create own orders" 
ON public.say_orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own wallet snapshots" 
ON public.say_wallet_snapshots FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE id = say_wallet_snapshots.org_id
));

CREATE POLICY "Users can view own virtual accounts" 
ON public.say_virtual_accounts FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE id = say_virtual_accounts.org_id
));

CREATE POLICY "Users can manage own beneficiaries" 
ON public.say_beneficiaries FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bill favorites" 
ON public.say_bill_favorites FOR ALL 
USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_say_orders_user_status ON public.say_orders(user_id, status);
CREATE INDEX idx_say_orders_reference ON public.say_orders(reference);
CREATE INDEX idx_say_orders_created ON public.say_orders(created_at DESC);
CREATE INDEX idx_say_virtual_accounts_user ON public.say_virtual_accounts(user_id);
CREATE INDEX idx_say_beneficiaries_user ON public.say_beneficiaries(user_id);

-- Add feature flags
INSERT INTO public.feature_flags (name, enabled, rollout_pct, description) VALUES
('sayswitch_payments', false, 0, 'SaySwitch payment processing integration'),
('sayswitch_bills', false, 0, 'SaySwitch bill payment services'),
('sayswitch_transfers', false, 0, 'SaySwitch money transfer services')
ON CONFLICT (name) DO NOTHING;
