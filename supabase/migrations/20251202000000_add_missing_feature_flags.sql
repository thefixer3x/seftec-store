-- Add missing feature flags for comprehensive platform functionality
-- Created: 2025-12-02

-- Insert social_auth feature flag (for OAuth social login)
INSERT INTO feature_flags (name, description, enabled, rollout_pct)
VALUES (
  'social_auth',
  'Enable social authentication (OAuth) for Google, GitHub, Twitter, Facebook, and Apple',
  true,
  100
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = NOW();

-- Insert enhanced_ai_responses feature flag
INSERT INTO feature_flags (name, description, enabled, rollout_pct)
VALUES (
  'enhanced_ai_responses',
  'Enable enhanced AI responses with improved contextual understanding',
  false,
  0
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = NOW();

-- Insert interactive_demo feature flag
INSERT INTO feature_flags (name, description, enabled, rollout_pct)
VALUES (
  'interactive_demo',
  'Enable interactive product demos and tutorials',
  false,
  0
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = NOW();

-- Insert advanced_analytics feature flag
INSERT INTO feature_flags (name, description, enabled, rollout_pct)
VALUES (
  'advanced_analytics',
  'Enable advanced analytics dashboard with detailed insights',
  false,
  25
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = NOW();

-- Insert mobile_optimizations feature flag
INSERT INTO feature_flags (name, description, enabled, rollout_pct)
VALUES (
  'mobile_optimizations',
  'Enable mobile-specific UI/UX optimizations',
  true,
  100
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  updated_at = NOW();

-- Add comment for tracking
COMMENT ON TABLE feature_flags IS 'Feature flags for controlling platform features and gradual rollouts. Updated 2025-12-02 to include social auth and other missing flags.';
