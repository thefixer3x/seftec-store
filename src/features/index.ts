/**
 * Features Index Module
 * Re-exports from feature-specific modules
 */

// Re-export feature flags
export {
  FEATURE_FLAGS,
  isFeatureEnabled,
  useFeatureFlag,
  useFeatureFlags,
  type FeatureFlag
} from './feature-flags';

// Any other feature exports would go here
export * from './ai-assistant';
export * from './auth';
export * from './b2c-shop';
export * from './marketplace';
export * from './sayswitch';
