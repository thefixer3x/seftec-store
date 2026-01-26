import { createClient } from '@supabase/supabase-js';

/**
 * Feature flags for unimplemented database tables
 * Set to false to disable queries to tables that don't exist yet
 */
export const FEATURE_FLAGS = {
  STOCK_ALERTS: false,
  INVOICES: false,
  INVOICE_ITEMS: false,
  SAY_ORDERS: false,
  TRADE_FINANCE: false,
  MARKETPLACE_ORDERS: false,
  WALLET_SNAPSHOTS: false,
  SUBSCRIPTION_PAYMENTS: false,
} as const;

/**
 * Safe query wrapper that catches errors from missing tables
 * @param queryFn - Function that performs the Supabase query
 * @param fallbackValue - Value to return if query fails
 */
export async function safeQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  fallbackValue: T
): Promise<{ data: T; error: null } | { data: null; error: any }> {
  try {
    const result = await queryFn();
    if (result.error) {
      console.warn('Query error (may be expected for unimplemented features):', result.error.message);
      return { data: fallbackValue, error: null };
    }
    return { data: result.data ?? fallbackValue, error: null };
  } catch (error: any) {
    console.warn('Query exception (may be expected for unimplemented features):', error.message);
    return { data: fallbackValue, error };
  }
}

/**
 * Type-safe Supabase client wrapper that doesn't throw on missing tables
 */
export function createSafeSupabaseClient(supabase: ReturnType<typeof createClient>) {
  return {
    ...supabase,
    from: (table: string) => {
      // Log a warning if accessing a potentially missing table
      const missingTables = ['stock_alerts', 'invoices', 'invoice_items', 'say_orders'];
      if (missingTables.includes(table)) {
        console.warn(`Accessing potentially unimplemented table: ${table}`);
      }
      return supabase.from(table as any);
    },
  };
}
