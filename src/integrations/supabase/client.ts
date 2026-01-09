
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Load Supabase credentials from environment variables
// These must be set in your .env file (see .env.example for template)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Flag to track if Supabase is properly configured
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Log warning instead of throwing if env vars are missing
// This allows the app to render gracefully with limited functionality
if (!isSupabaseConfigured) {
  const missing = [];
  if (!SUPABASE_URL) missing.push('VITE_SUPABASE_URL');
  if (!SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY');
  
  console.warn(
    `Missing required Supabase environment variables: ${missing.join(', ')}\n` +
    `Please create a .env file in the project root with these variables.\n` +
    `See .env.example for a template.\n` +
    `The app will run with limited functionality.`
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Create a placeholder client that returns empty results when not configured
// This prevents runtime errors when Supabase is not set up
export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

// Helper functions for authentication
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session?.user || null;
};

export const getCurrentUserId = async () => {
  const user = await getCurrentUser();
  return user?.id || null;
};

export const getUserProfile = async () => {
  const userId = await getCurrentUserId();

  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};
