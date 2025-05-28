-- Create the system error logs table
CREATE TABLE IF NOT EXISTS public.system_error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  error_message TEXT NOT NULL,
  error_context JSONB,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID
);

-- Create is_admin helper function if it doesn't exist
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  -- Check if the current user has admin role
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  );
$$;

-- Enable RLS on the system error logs table
ALTER TABLE public.system_error_logs ENABLE ROW LEVEL SECURITY;

-- Create Trigger Function for Audit Logging
CREATE OR REPLACE FUNCTION handle_system_error()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Log new errors to the console
  RAISE LOG 'System Error: %', NEW.error_message;
  RETURN NEW;
END;
$$;

-- Create Insert Trigger for Error Logging
CREATE TRIGGER on_error_insert
  AFTER INSERT ON public.system_error_logs
  FOR EACH ROW
  EXECUTE FUNCTION handle_system_error();