
import React, { createContext, useContext, ReactNode } from 'react';
import { useFeatureFlags, FeatureFlag } from '@/hooks/use-feature-flags';

// Create context with default values
interface FeatureFlagContextType {
  isEnabled: (flag: FeatureFlag) => boolean;
  loading: boolean;
  error: Error | null;
}

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  isEnabled: () => false,
  loading: true,
  error: null,
});

export const useFeatureFlag = () => useContext(FeatureFlagContext);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
  const { isEnabled, loading, error } = useFeatureFlags();

  return (
    <FeatureFlagContext.Provider value={{ isEnabled, loading, error }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

/**
 * HOC to conditionally render a component based on a feature flag
 */
export const withFeatureFlag = (flag: FeatureFlag, FallbackComponent?: React.ComponentType) => 
  <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
      const { isEnabled, loading } = useFeatureFlag();
      
      if (loading) return null;
      
      if (isEnabled(flag)) {
        return <Component {...props} />;
      }
      
      return FallbackComponent ? <FallbackComponent /> : null;
    };
};

/**
 * Component to conditionally render content based on a feature flag
 */
export const FeatureGate: React.FC<{
  flag: FeatureFlag;
  children: ReactNode;
  fallback?: ReactNode;
}> = ({ flag, children, fallback = null }) => {
  const { isEnabled, loading } = useFeatureFlag();
  
  if (loading) return null;
  
  return isEnabled(flag) ? <>{children}</> : <>{fallback}</>;
};
