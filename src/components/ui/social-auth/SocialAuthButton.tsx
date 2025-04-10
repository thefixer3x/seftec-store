
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FeatureGate } from '@/components/ui/feature-flags/FeatureFlagProvider';

interface SocialAuthButtonProps {
  provider: 'google' | 'twitter' | 'linkedin';
  onClick: () => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Social authentication button with loading state and feature flag
 */
const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({ 
  provider, 
  onClick, 
  className,
  children
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleAuth = async () => {
    try {
      setIsLoading(true);
      await onClick();
    } catch (error) {
      console.error(`${provider} auth error:`, error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate provider-specific CSS classes for styling
  const providerClasses = {
    google: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100",
    twitter: "bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]",
    linkedin: "bg-[#0077B5] text-white hover:bg-[#006699]"
  };
  
  const baseContent = (
    <Button
      className={`w-full ${providerClasses[provider]} ${className || ''}`}
      onClick={handleAuth}
      disabled={isLoading}
      type="button"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <span className="flex items-center justify-center">
          {children || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
        </span>
      )}
    </Button>
  );
  
  return (
    <FeatureGate 
      flag="social_auth"
      fallback={
        <Button className={`w-full opacity-50 cursor-not-allowed ${providerClasses[provider]} ${className || ''}`} disabled>
          <span className="flex items-center justify-center">
            {children || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
          </span>
        </Button>
      }
    >
      {baseContent}
    </FeatureGate>
  );
};

export default SocialAuthButton;
