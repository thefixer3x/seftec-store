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
        
        // Attempt to fetch feature flags from Supabase
        // In a real implementation, this would connect to a feature_flags table
        // For now, we'll simulate this with user preferences or a mock response
        
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .single();
          
        if (error) {
          throw error;
        }
        
        // In production, this would be replaced with actual feature flag data
        // For demonstration, we'll set some flags based on environment or other factors
        const isDevelopment = process.env.NODE_ENV === 'development';
        const isTestAccount = data?.trade_frequency === 'test';
        
        setFlags({
          ...defaultFlags,
          // Enable some features based on environment or user data
          enhanced_ai_responses: isDevelopment || isTestAccount,
          interactive_demo: isDevelopment,
          // Others remain disabled by default
        });
        
      } catch (err) {
        console.error("Error fetching feature flags:", err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching feature flags'));
        // Fall back to default flags
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
