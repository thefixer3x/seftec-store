-- AI Recommendations System
-- Personalized product recommendations based on user behavior

-- Products table (if not exists)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI recommendations table
CREATE TABLE public.ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  score DECIMAL(3,2) CHECK (score >= 0 AND score <= 1), -- Confidence score 0.00 to 1.00
  reason TEXT, -- Why this was recommended
  recommendation_type TEXT DEFAULT 'personalized' CHECK (recommendation_type IN ('personalized', 'trending', 'similar', 'cross_sell')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
);

-- User product interactions for building recommendations
CREATE TABLE public.user_product_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('view', 'click', 'add_to_cart', 'purchase', 'like', 'share')),
  interaction_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_product_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_recommendations
CREATE POLICY "Users can view own recommendations" 
ON public.ai_recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

-- RLS Policies for user_product_interactions
CREATE POLICY "Users can view own interactions" 
ON public.user_product_interactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert interactions" 
ON public.user_product_interactions 
FOR INSERT 
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_ai_recommendations_user_score ON public.ai_recommendations(user_id, score DESC);
CREATE INDEX idx_ai_recommendations_expires ON public.ai_recommendations(expires_at);
CREATE INDEX idx_user_interactions_user_product ON public.user_product_interactions(user_id, product_id);
CREATE INDEX idx_user_interactions_type_created ON public.user_product_interactions(interaction_type, created_at DESC);

-- Function to clean up expired recommendations
CREATE OR REPLACE FUNCTION cleanup_expired_recommendations()
RETURNS void AS $$
BEGIN
  DELETE FROM public.ai_recommendations WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Insert sample products for testing
INSERT INTO public.products (name, description, price, category) VALUES
('Business Analytics Dashboard', 'Real-time business insights and analytics', 99.99, 'software'),
('AI Chat Assistant', 'Intelligent customer support automation', 149.99, 'ai'),
('E-commerce Starter Kit', 'Complete online store solution', 199.99, 'ecommerce'),
('Payment Gateway Integration', 'Secure payment processing system', 79.99, 'fintech'),
('Mobile App Template', 'Cross-platform mobile application', 129.99, 'mobile')
ON CONFLICT DO NOTHING;