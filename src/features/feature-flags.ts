/**
 * Feature Flags Module
 *
 * Enhanced implementation with database integration, real-time updates,
 * caching, and rollout percentage support.
 *
 * @see src/services/FeatureFlagManager.ts for core implementation
 */

import { useState, useEffect } from 'react';
import { getFeatureFlagManager } from '@/services/FeatureFlagManager';
import { supabase } from '@/integrations/supabase/client';

// Define feature flags constants
export const FEATURE_FLAGS = {
  SAYSWITCH_PAYMENTS: 'sayswitch_payments',
  SAYSWITCH_BILLS: 'sayswitch_bills',
  SAYSWITCH_TRANSFERS: 'sayswitch_transfers',
  PAYPAL_PAYMENTS: 'paypal_payments',
  AI_RECOMMENDATIONS: 'ai_recommendations',
} as const;

export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

/**
 * Check if a feature is enabled
 *
 * @param flag - Feature flag name
 * @param userId - Optional user ID for rollout percentage calculation
 * @returns Promise<boolean>
 *
 * @example
 * ```typescript
 * const isEnabled = await isFeatureEnabled(FEATURE_FLAGS.SAYSWITCH_PAYMENTS, user.id);
 * ```
 */
export async function isFeatureEnabled(
  flag: FeatureFlag,
  userId?: string
): Promise<boolean> {
  const manager = getFeatureFlagManager();
  const result = await manager.isFeatureEnabled(flag, userId);
  return result.isEnabled;
}

/**
 * React hook for checking feature flags with real-time updates
 *
 * Features:
 * - Automatic subscription to real-time flag changes
 * - Loading states during initial fetch
 * - Error handling with fallback
 * - User-specific rollout support
 *
 * @param flag - Feature flag name
 * @param userId - Optional user ID for rollout percentage
 * @returns Object with isEnabled, isLoading, and error
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { isEnabled, isLoading } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS);
 *
 *   if (isLoading) return <Spinner />;
 *   if (!isEnabled) return <ComingSoon />;
 *
 *   return <SaySwitchPaymentForm />;
 * }
 * ```
 */
export function useFeatureFlag(flag: FeatureFlag, userId?: string) {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const manager = getFeatureFlagManager();

    // Initial fetch
    const checkFlag = async () => {
      try {
        setIsLoading(true);
        const result = await manager.isFeatureEnabled(flag, userId);

        if (mounted) {
          setIsEnabled(result.isEnabled);
          setError(null);
        }
      } catch (err) {
        console.error(`[useFeatureFlag] Error checking ${flag}:`, err);
        if (mounted) {
          setError(err as Error);
          // Fallback to disabled state on error
          setIsEnabled(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkFlag();

    // Subscribe to real-time updates
    const unsubscribe = manager.subscribe(async () => {
      if (mounted) {
        // Re-check flag when changes occur
        const result = await manager.isFeatureEnabled(flag, userId);
        setIsEnabled(result.isEnabled);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [flag, userId]);

  return {
    isEnabled,
    isLoading,
    error,
  };
}

/**
 * React hook for checking multiple feature flags at once
 *
 * @param flags - Array of feature flag names
 * @param userId - Optional user ID for rollout percentage
 * @returns Object with flags status map, isLoading, and error
 *
 * @example
 * ```typescript
 * function Dashboard() {
 *   const { flags, isLoading } = useFeatureFlags([
 *     FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
 *     FEATURE_FLAGS.PAYPAL_PAYMENTS,
 *   ]);
 *
 *   if (isLoading) return <Spinner />;
 *
 *   return (
 *     <>
 *       {flags[FEATURE_FLAGS.SAYSWITCH_PAYMENTS] && <SaySwitchCard />}
 *       {flags[FEATURE_FLAGS.PAYPAL_PAYMENTS] && <PayPalCard />}
 *     </>
 *   );
 * }
 * ```
 */
export function useFeatureFlags(flags: FeatureFlag[], userId?: string) {
  const [flagsStatus, setFlagsStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const manager = getFeatureFlagManager();

    // Initial fetch for all flags
    const checkAllFlags = async () => {
      try {
        setIsLoading(true);
        const results: Record<string, boolean> = {};

        await Promise.all(
          flags.map(async (flag) => {
            const result = await manager.isFeatureEnabled(flag, userId);
            results[flag] = result.isEnabled;
          })
        );

        if (mounted) {
          setFlagsStatus(results);
          setError(null);
        }
      } catch (err) {
        console.error('[useFeatureFlags] Error checking flags:', err);
        if (mounted) {
          setError(err as Error);
          // Fallback to all disabled on error
          const fallback: Record<string, boolean> = {};
          flags.forEach(flag => {
            fallback[flag] = false;
          });
          setFlagsStatus(fallback);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAllFlags();

    // Subscribe to real-time updates
    const unsubscribe = manager.subscribe(async () => {
      if (mounted) {
        // Re-check all flags when changes occur
        const results: Record<string, boolean> = {};
        await Promise.all(
          flags.map(async (flag) => {
            const result = await manager.isFeatureEnabled(flag, userId);
            results[flag] = result.isEnabled;
          })
        );
        setFlagsStatus(results);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [JSON.stringify(flags), userId]);

  return {
    flags: flagsStatus,
    isLoading,
    error,
  };
}

/**
 * Get current user ID from Supabase session
 * Utility for feature flag hooks
 */
export async function getCurrentUserId(): Promise<string | undefined> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id;
  } catch (error) {
    console.error('[getCurrentUserId] Error getting session:', error);
    return undefined;
  }
}

/**
 * Hook that automatically uses the current user's ID
 *
 * @param flag - Feature flag name
 * @returns Object with isEnabled, isLoading, and error
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { isEnabled, isLoading } = useFeatureFlagForCurrentUser(
 *     FEATURE_FLAGS.SAYSWITCH_PAYMENTS
 *   );
 *
 *   // Automatically uses the logged-in user's ID for rollout calculation
 * }
 * ```
 */
export function useFeatureFlagForCurrentUser(flag: FeatureFlag) {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    getCurrentUserId().then(setUserId);
  }, []);

  return useFeatureFlag(flag, userId);
}
