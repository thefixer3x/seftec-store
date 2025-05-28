import { useContext } from 'react';
import { SupabaseContext } from '@/context/SupabaseContext';

/**
 * Hook to access the Supabase client instance
 * 
 * This hook provides access to the authenticated Supabase client
 * from anywhere in the application.
 * 
 * @returns The authenticated Supabase client instance
 */
export function useSupabaseClient() {
  const context = useContext(SupabaseContext);
  
  if (context === undefined) {
    throw new Error('useSupabaseClient must be used within a SupabaseProvider');
  }
  
  return context;
}
