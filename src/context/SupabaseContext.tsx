import React, { createContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create Supabase context
export const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

interface SupabaseProviderProps {
  children: React.ReactNode;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

/**
 * Supabase Provider
 * 
 * Provides the Supabase client instance to all child components
 */
export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
  supabaseUrl,
  supabaseAnonKey
}) => {
  const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
