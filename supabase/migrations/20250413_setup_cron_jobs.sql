
-- Create a function to set up a cron job that will call our Edge Function
CREATE OR REPLACE FUNCTION public.setup_cache_cleanup_cron(
  job_name TEXT,
  schedule TEXT,
  function_url TEXT,
  anon_key TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  job_id TEXT;
BEGIN
  -- Check if the job already exists
  SELECT name INTO job_id FROM cron.job WHERE name = job_name;
  
  -- If job exists, drop it first
  IF job_id IS NOT NULL THEN
    PERFORM cron.unschedule(job_id);
  END IF;
  
  -- Create a new scheduled job
  SELECT cron.schedule(
    job_name,
    schedule,
    $$
    SELECT net.http_post(
      url:='$$ || function_url || $$',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer $$ || anon_key || $$"}'::jsonb,
      body:='{}'::jsonb
    ) AS request_id;
    $$
  ) INTO job_id;
  
  RETURN job_id;
END;
$function$;

-- Create security policy for the cron job function
CREATE POLICY "Only admins can set up cron jobs"
ON public.system_error_logs
FOR ALL
USING (public.is_admin());
