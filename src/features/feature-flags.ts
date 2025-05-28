/**
 * Feature Flags Module
 * 
 * This module provides a simple, reliable implementation of feature flags
 * that works in both development and production environments.
 */

// Define feature flags constants
export const FEATURE_FLAGS = {
  SAYSWITCH_PAYMENTS: 'sayswitch_payments',
  SAYSWITCH_BILLS: 'sayswitch_bills',
  SAYSWITCH_TRANSFERS: 'sayswitch_transfers',
  PAYPAL_PAYMENTS: 'paypal_payments',
  AI_RECOMMENDATIONS: 'ai_recommendations',
} as const;

export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

// Default configuration for development mode
const devDefaults: Record<string, boolean> = {
  [FEATURE_FLAGS.SAYSWITCH_PAYMENTS]: true,
  [FEATURE_FLAGS.SAYSWITCH_BILLS]: true,
  [FEATURE_FLAGS.SAYSWITCH_TRANSFERS]: true,
  [FEATURE_FLAGS.PAYPAL_PAYMENTS]: true,
  [FEATURE_FLAGS.AI_RECOMMENDATIONS]: true,
};

/**
 * Simple feature flag checker for development and quick testing
 * In a real app, this would check against a backend/database
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  // In development, use the dev defaults
  if (import.meta.env.DEV) {
    return devDefaults[flag] ?? true;
  }
  
  // In production, we would check against database
  // For now, enable only SaySwitch features
  return flag.startsWith('sayswitch');
}

/**
 * React hook for checking feature flags
 * This is a simplified version that always works, even without backend
 */
export function useFeatureFlag(flag: FeatureFlag) {
  return {
    isEnabled: isFeatureEnabled(flag),
    isLoading: false,
  };
}
