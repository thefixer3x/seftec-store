-- AI Consent Management System
-- Ensures GDPR compliance and user trust

-- User consent tracking table
CREATE TABLE public.user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('data_processing', 'ai_personalization', 'marketing')),
  granted BOOLEAN DEFAULT false,
  granted_at TIMESTAMP WITH TIME ZONE,
  revoked_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI activity logs for tracking user interactions
CREATE TABLE public.user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'view_product', 'search', 'add_to_cart', 'chat_interaction'
  action_data JSONB,
  ai_processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_consents
CREATE POLICY "Users can manage own consents" 
ON public.user_consents 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for user_activity_logs
CREATE POLICY "Users can view own activity" 
ON public.user_activity_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity logs" 
ON public.user_activity_logs 
FOR INSERT 
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_user_consents_user_type ON public.user_consents(user_id, consent_type);
CREATE INDEX idx_user_activity_logs_user_created ON public.user_activity_logs(user_id, created_at DESC);
CREATE INDEX idx_user_activity_logs_action_type ON public.user_activity_logs(action_type);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_consents_updated_at 
BEFORE UPDATE ON public.user_consents 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();