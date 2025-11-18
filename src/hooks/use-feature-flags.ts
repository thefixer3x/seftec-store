import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define available feature flags
export type FeatureFlag =
  | "enhanced_ai_responses"
  | "social_auth"
  | "interactive_demo"
  | "advanced_analytics"
  | "trade_finance_enhancements"
  | "mobile_optimizations";

// Default flag values (fallback if database fetch fails)
const defaultFlags: Record<FeatureFlag, boolean> = {
  enhanced_ai_responses: false,
  social_auth: false,
  interactive_demo: false,
  advanced_analytics: false,
  trade_finance_enhancements: false,
  mobile_optimizations: false,
};

/**
 * Hook to retrieve and manage feature flags
 * This enables gradual rollout of features and A/B testing
 */
export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<FeatureFlag, boolean>>(defaultFlags);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFeatureFlags() {
      try {
        setLoading(true);

        // Check if supabase client is available
        if (!supabase || !supabase.from) {
          console.warn('Supabase client not available, using default feature flags');
          setFlags(defaultFlags);
          setLoading(false);
          return;
        }

        // Attempt to fetch feature flags from Supabase
        // Try feature_flags table first, fall back to defaults if it doesn't exist
        // Note: Limit set to 100. If you need more feature flags, consider using pagination
        // or increasing this limit based on your application's requirements.
        const { data, error } = await supabase
          .from('feature_flags')
          .select('name, enabled')
          .limit(100);

        if (error) {
          console.warn('Feature flags table not available, using defaults:', error.message);
          // Fall back to default flags - this is not an error condition
          setFlags(defaultFlags);
          setLoading(false);
          return;
        }

        // Parse feature flags from database
        if (data && Array.isArray(data)) {
          const fetchedFlags = { ...defaultFlags };
          data.forEach((flag: any) => {
            if (flag.name in defaultFlags) {
              fetchedFlags[flag.name as FeatureFlag] = flag.enabled === true;
            }
          });
          setFlags(fetchedFlags);
        } else {
          setFlags(defaultFlags);
        }

      } catch (err) {
        console.warn("Error fetching feature flags, using defaults:", err);
        // Don't set error state - just use defaults
        setFlags(defaultFlags);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatureFlags();
  }, []);

  /**
   * Check if a specific feature flag is enabled
   */
  const isEnabled = (flag: FeatureFlag): boolean => {
    return flags[flag] === true;
  };

  return {
    flags,
    isEnabled,
    loading,
    error
  };
}
