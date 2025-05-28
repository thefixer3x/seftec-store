import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';

// Cache for feature flags to avoid unnecessary refetches
let featureFlagsCache: Record<string, boolean> = {};

/**
 * Checks if a feature is enabled based on the feature flag system
 * 
 * @param featureName - The name of the feature to check
 * @param userId - Optional user ID for percentage-based rollouts
 * @returns boolean indicating if the feature is enabled
 */
export function isFeatureEnabled(featureName: string, userId?: string): boolean {
  // If we have a cached result, return it
  if (featureName in featureFlagsCache) {
    return featureFlagsCache[featureName];
  }
  
  // For server-side rendering or initial state, default to false
  // The hook will update this value once loaded
  return false;
}

/**
 * React hook for checking feature flags
 * 
 * @param featureName - The name of the feature to check
 * @returns Object containing isEnabled status and loading state
 */
export function useFeatureFlag(featureName: string) {
  const supabase = useSupabaseClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['featureFlag', featureName],
    queryFn: async () => {
      // Check if user is admin first (admins get all features)
      const { data: isAdmin } = await supabase.rpc('is_admin');
      
      if (isAdmin) {
        return { enabled: true, reason: 'admin' };
      }
      
      // Check feature flag
      const { data: featureFlag, error } = await supabase
        .from('feature_flags')
        .select('enabled, rollout_pct')
        .eq('name', featureName)
        .single();
      
      if (error) {
        console.error(`Error fetching feature flag ${featureName}:`, error);
        return { enabled: false, reason: 'error' };
      }
      
      if (!featureFlag) {
        return { enabled: false, reason: 'not_found' };
      }
      
      // If feature is fully enabled
      if (featureFlag.enabled && !featureFlag.rollout_pct) {
        featureFlagsCache[featureName] = true;
        return { enabled: true, reason: 'fully_enabled' };
      }
      
      // If feature is enabled with percentage rollout
      if (featureFlag.enabled && featureFlag.rollout_pct) {
        // Get authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          return { enabled: false, reason: 'not_authenticated' };
        }
        
        // Use user ID for consistent hashing
        const hash = hashString(user.id);
        const normalizedHash = (hash % 100) + 1; // 1-100
        
        const isUserEnabled = normalizedHash <= featureFlag.rollout_pct;
        featureFlagsCache[featureName] = isUserEnabled;
        
        return { 
          enabled: isUserEnabled, 
          reason: isUserEnabled ? 'percentage_enabled' : 'percentage_disabled',
          rollout_pct: featureFlag.rollout_pct
        };
      }
      
      // Feature is disabled
      featureFlagsCache[featureName] = false;
      return { enabled: false, reason: 'disabled' };
    },
    staleTime: 60 * 1000, // Cache for 1 minute
  });
  
  // Update cache whenever we get new data
  if (data?.enabled !== undefined) {
    featureFlagsCache[featureName] = data.enabled;
  }
  
  return {
    isEnabled: data?.enabled || false,
    isLoading,
    error,
    reason: data?.reason,
    rolloutPercentage: data?.rollout_pct
  };
}

/**
 * Simple string hashing function
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * List of all feature flags used in the application
 */
export const FEATURE_FLAGS = {
  SAYSWITCH_PAYMENTS: 'sayswitch_payments',
  SAYSWITCH_BILLS: 'sayswitch_bills',
  SAYSWITCH_TRANSFERS: 'sayswitch_transfers',
};
