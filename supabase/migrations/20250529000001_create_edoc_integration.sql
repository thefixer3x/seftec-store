-- E-Doc Bank Statement Integration Schema
-- Provides bank statement on-demand service with proper consent management
-- Compatible with existing SEFTEC Store infrastructure

-- Feature flags table (enhance existing if needed)
CREATE TABLE IF NOT EXISTS public.feature_flags (
  name TEXT PRIMARY KEY,
  enabled BOOLEAN DEFAULT false,
  rollout_pct INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations/Business profiles table
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT,
  business_type TEXT,
  registration_number TEXT,
  tax_id TEXT,
  address JSONB,
  contact_info JSONB,
  edoc_markup_pct NUMERIC DEFAULT 20.0, -- E-Doc fee markup percentage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- E-Doc bank consent management
CREATE TABLE public.edoc_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_profile_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  edoc_consent_id TEXT UNIQUE, -- From E-Doc API response
  bank_name TEXT NOT NULL,
  bank_code TEXT,
  account_number_masked TEXT, -- Last 4 digits only for display
  account_name TEXT,
  consent_status TEXT NOT NULL DEFAULT 'created' CHECK (consent_status IN ('created', 'active', 'revoked', 'error', 'expired')),
  consent_url TEXT, -- E-Doc authorization URL
  redirect_url TEXT,
  error_message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  import_complete BOOLEAN DEFAULT false,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_frequency TEXT DEFAULT 'daily' CHECK (sync_frequency IN ('manual', 'daily', 'weekly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  raw_response JSONB -- Store full E-Doc payload for audit
);

-- Bank transactions from E-Doc
CREATE TABLE public.edoc_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_id UUID REFERENCES public.edoc_consents(id) ON DELETE CASCADE,
  edoc_transaction_id TEXT UNIQUE,
  transaction_date DATE NOT NULL,
  amount NUMERIC NOT NULL,
  is_credit BOOLEAN NOT NULL,
  running_balance NUMERIC,
  narration TEXT,
  reference_number TEXT,
  transaction_type TEXT,
  category TEXT, -- AI-generated category
  subcategory TEXT, -- AI-generated subcategory
  merchant_name TEXT, -- AI-extracted merchant
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 1),
  tags TEXT[], -- AI-generated tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  raw_data JSONB -- Store complete transaction data from E-Doc
);

-- API usage tracking for billing
CREATE TABLE public.edoc_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_id UUID REFERENCES public.edoc_consents(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('consent_create', 'data_fetch', 'transaction_sync', 'analysis_run')),
  api_calls_count INTEGER DEFAULT 1,
  cost_usd NUMERIC DEFAULT 0, -- E-Doc base fee
  markup_applied NUMERIC DEFAULT 0, -- Our markup amount
  total_cost_usd NUMERIC GENERATED ALWAYS AS (cost_usd + markup_applied) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI-powered financial analysis results
CREATE TABLE public.edoc_financial_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_id UUID REFERENCES public.edoc_consents(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN (
    'cash_flow_analysis', 
    'expense_categorization', 
    'revenue_pattern', 
    'financial_health_score',
    'spending_trends',
    'income_stability',
    'seasonal_patterns'
  )),
  analysis_period_start DATE NOT NULL,
  analysis_period_end DATE NOT NULL,
  analysis_data JSONB NOT NULL,
  insights JSONB, -- Key insights and findings
  recommendations JSONB, -- AI recommendations
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business insights and AI recommendations
CREATE TABLE public.business_financial_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_id UUID REFERENCES public.edoc_consents(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN (
    'cash_flow_trend', 
    'expense_anomaly', 
    'revenue_opportunity', 
    'cost_optimization',
    'seasonal_planning',
    'risk_alert',
    'growth_indicator'
  )),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  recommendation TEXT,
  action_items JSONB, -- Specific action steps
  priority_level TEXT DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'critical')),
  impact_score NUMERIC CHECK (impact_score >= 0 AND impact_score <= 10),
  potential_savings NUMERIC, -- Estimated financial impact
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'dismissed', 'completed')),
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enhanced consent tracking (extend existing user_consents)
INSERT INTO public.user_consents (user_id, consent_type, granted) 
SELECT id, 'bank_data_processing', false 
FROM auth.users 
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_consents 
  WHERE user_id = auth.users.id AND consent_type = 'bank_data_processing'
);

-- Enable RLS on all tables
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edoc_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edoc_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edoc_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edoc_financial_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_financial_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Business profiles - users can only manage their own
CREATE POLICY "Users can manage own business profile" 
ON public.business_profiles FOR ALL 
USING (auth.uid() = user_id);

-- E-Doc consents - users can only access their own
CREATE POLICY "Users can manage own bank consents" 
ON public.edoc_consents FOR ALL 
USING (auth.uid() = user_id);

-- Transactions - users can only see their transactions
CREATE POLICY "Users can view own bank transactions" 
ON public.edoc_transactions FOR SELECT 
USING (consent_id IN (SELECT id FROM public.edoc_consents WHERE user_id = auth.uid()));

-- Usage logs - users can view their own usage
CREATE POLICY "Users can view own usage logs" 
ON public.edoc_usage_logs FOR SELECT 
USING (auth.uid() = user_id);

-- Financial analysis - users can view their own analysis
CREATE POLICY "Users can view own financial analysis" 
ON public.edoc_financial_analysis FOR SELECT 
USING (consent_id IN (SELECT id FROM public.edoc_consents WHERE user_id = auth.uid()));

-- Business insights - users can manage their own insights
CREATE POLICY "Users can manage own business insights" 
ON public.business_financial_insights FOR ALL 
USING (auth.uid() = user_id);

-- Performance indexes
CREATE INDEX idx_edoc_consents_user_status ON public.edoc_consents(user_id, consent_status);
CREATE INDEX idx_edoc_consents_edoc_id ON public.edoc_consents(edoc_consent_id) WHERE edoc_consent_id IS NOT NULL;
CREATE INDEX idx_edoc_transactions_consent_date ON public.edoc_transactions(consent_id, transaction_date DESC);
CREATE INDEX idx_edoc_transactions_amount_credit ON public.edoc_transactions(amount, is_credit);
CREATE INDEX idx_edoc_transactions_category ON public.edoc_transactions(category) WHERE category IS NOT NULL;
CREATE INDEX idx_edoc_usage_date_user ON public.edoc_usage_logs(usage_date, user_id);
CREATE INDEX idx_business_insights_user_priority ON public.business_financial_insights(user_id, priority_level, status);
CREATE INDEX idx_business_profiles_user ON public.business_profiles(user_id);

-- Utility functions

-- Function to get cash flow summary
CREATE OR REPLACE FUNCTION get_cash_flow_summary(
  p_consent_id UUID,
  p_days_back INTEGER DEFAULT 30
)
RETURNS TABLE(
  period_start DATE,
  period_end DATE,
  total_inflow NUMERIC,
  total_outflow NUMERIC,
  net_flow NUMERIC,
  transaction_count BIGINT,
  avg_daily_balance NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (CURRENT_DATE - INTERVAL '%s days')::DATE as period_start,
    CURRENT_DATE as period_end,
    COALESCE(SUM(CASE WHEN t.is_credit THEN t.amount ELSE 0 END), 0) as total_inflow,
    COALESCE(SUM(CASE WHEN NOT t.is_credit THEN t.amount ELSE 0 END), 0) as total_outflow,
    COALESCE(SUM(CASE WHEN t.is_credit THEN t.amount ELSE -t.amount END), 0) as net_flow,
    COUNT(*) as transaction_count,
    COALESCE(AVG(t.running_balance), 0) as avg_daily_balance
  FROM public.edoc_transactions t
  WHERE t.consent_id = p_consent_id
    AND t.transaction_date >= CURRENT_DATE - INTERVAL '%s days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to categorize transactions using AI patterns
CREATE OR REPLACE FUNCTION categorize_transaction(p_narration TEXT, p_amount NUMERIC, p_is_credit BOOLEAN)
RETURNS TABLE(category TEXT, subcategory TEXT, confidence NUMERIC) AS $$
BEGIN
  -- Simple rule-based categorization (can be enhanced with AI later)
  IF p_is_credit THEN
    IF p_narration ILIKE '%salary%' OR p_narration ILIKE '%payroll%' THEN
      RETURN QUERY SELECT 'Income'::TEXT, 'Salary'::TEXT, 0.9::NUMERIC;
    ELSIF p_narration ILIKE '%transfer%' OR p_narration ILIKE '%deposit%' THEN
      RETURN QUERY SELECT 'Income'::TEXT, 'Transfer'::TEXT, 0.7::NUMERIC;
    ELSE
      RETURN QUERY SELECT 'Income'::TEXT, 'Other'::TEXT, 0.5::NUMERIC;
    END IF;
  ELSE
    IF p_narration ILIKE '%atm%' OR p_narration ILIKE '%withdrawal%' THEN
      RETURN QUERY SELECT 'Cash & ATM'::TEXT, 'ATM Withdrawal'::TEXT, 0.9::NUMERIC;
    ELSIF p_narration ILIKE '%grocery%' OR p_narration ILIKE '%supermarket%' THEN
      RETURN QUERY SELECT 'Food & Dining'::TEXT, 'Groceries'::TEXT, 0.8::NUMERIC;
    ELSIF p_narration ILIKE '%fuel%' OR p_narration ILIKE '%petrol%' THEN
      RETURN QUERY SELECT 'Transportation'::TEXT, 'Fuel'::TEXT, 0.8::NUMERIC;
    ELSIF p_narration ILIKE '%rent%' OR p_narration ILIKE '%mortgage%' THEN
      RETURN QUERY SELECT 'Housing'::TEXT, 'Rent/Mortgage'::TEXT, 0.9::NUMERIC;
    ELSE
      RETURN QUERY SELECT 'General'::TEXT, 'Other'::TEXT, 0.4::NUMERIC;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-categorize transactions
CREATE OR REPLACE FUNCTION auto_categorize_transaction()
RETURNS TRIGGER AS $$
DECLARE
  cat_result RECORD;
BEGIN
  -- Only categorize if not already categorized
  IF NEW.category IS NULL THEN
    SELECT * INTO cat_result 
    FROM categorize_transaction(NEW.narration, NEW.amount, NEW.is_credit);
    
    NEW.category := cat_result.category;
    NEW.subcategory := cat_result.subcategory;
    NEW.confidence_score := cat_result.confidence;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_categorize_transaction
BEFORE INSERT OR UPDATE ON public.edoc_transactions
FOR EACH ROW EXECUTE FUNCTION auto_categorize_transaction();

-- Insert E-Doc specific feature flags
INSERT INTO public.feature_flags (name, enabled, rollout_pct, description) VALUES
('edoc_integration', false, 0, 'E-Doc bank statement integration for premium users'),
('edoc_alpha_testing', false, 0, 'Alpha testing access for E-Doc integration'),
('edoc_ai_analysis', false, 0, 'AI-powered financial analysis of bank data'),
('edoc_business_insights', false, 0, 'AI-generated business insights and recommendations'),
('edoc_auto_sync', false, 0, 'Automatic daily synchronization of bank data')
ON CONFLICT (name) DO NOTHING;