
-- Create a table to store user-generated business plans if they consent
CREATE TABLE IF NOT EXISTS public.business_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  business_idea TEXT NOT NULL,
  target_customers TEXT,
  revenue_model TEXT,
  competition TEXT,
  competitive_advantages TEXT,
  funding_needs TEXT,
  generated_plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.business_plans ENABLE ROW LEVEL SECURITY;

-- Users can view only their own plans
CREATE POLICY "Users can view their own business plans" 
  ON public.business_plans 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can create their own plans
CREATE POLICY "Users can create their own business plans" 
  ON public.business_plans 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER set_business_plans_updated_at
  BEFORE UPDATE ON public.business_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
