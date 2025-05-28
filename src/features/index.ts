
// Feature flags system for enabling/disabling features
export const FEATURE_FLAGS = {
  SAYSWITCH_PAYMENTS: 'sayswitch_payments',
  SAYSWITCH_BILLS: 'sayswitch_bills', 
  SAYSWITCH_TRANSFERS: 'sayswitch_transfers',
} as const;

export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

// Simple feature flag checker - in a real app this would check against a backend/config
export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  // For now, enable all SaySwitch features
  return flag.startsWith('sayswitch');
};

export const useFeatureFlag = (flag: FeatureFlag) => {
  return {
    isEnabled: isFeatureEnabled(flag),
  };
};
