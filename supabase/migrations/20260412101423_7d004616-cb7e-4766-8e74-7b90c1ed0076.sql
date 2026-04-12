
-- Fix the trigger function to insert directly into the real table
-- The view's INSTEAD OF INSERT trigger passes NULL for unset columns,
-- bypassing the underlying table's defaults. Direct insert uses them.
CREATE OR REPLACE FUNCTION public.initialize_notification_settings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO shared_services.notification_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
