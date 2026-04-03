import { createClient } from '@supabase/supabase-js';

/**
 * Feature flags for partially implemented database surfaces.
 * Keep disabled only for flows that still do not have a live backend path.
 */
export const FEATURE_FLAGS = {
  STOCK_ALERTS: true,
  INVOICES: true,
  INVOICE_ITEMS: true,
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
      // Log a warning only for surfaces that are still intentionally deferred.
      const deferredTables = ['say_orders', 'say_wallet_snapshots', 'subscription_payments'];
      if (deferredTables.includes(table)) {
        console.warn(`Accessing deferred table surface: ${table}`);
      }
      return supabase.from(table as any);
    },
  };
}
