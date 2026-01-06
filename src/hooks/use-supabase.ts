import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to access the Supabase client instance
 * 
 * This hook provides access to the authenticated Supabase client
 * from anywhere in the application.
 * 
 * @returns The authenticated Supabase client instance
 */
export function useSupabaseClient() {
  return supabase;
}
