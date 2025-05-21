
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Icons } from '@/components/icons';

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
}

export function SocialAuthButtons({ onSuccess }: SocialAuthButtonsProps) {
  const [isLoading, setIsLoading] = React.useState<{
    google: boolean;
    facebook: boolean;
    github: boolean;
    apple: boolean;
  }>({
    google: false,
    facebook: false,
    github: false,
    apple: false
  });
  
  const { signInWithOAuth } = useAuth();

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      await signInWithOAuth(provider);
      // Note: Because this redirects, onSuccess won't be called here
      // The success flow is handled in the AuthCallback page
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading.google}
        onClick={() => handleSocialSignIn('google')}
      >
        {isLoading.google ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      
      <Button
        variant="outline"
        type="button"
        disabled={isLoading.facebook}
        onClick={() => handleSocialSignIn('facebook')}
      >
        {isLoading.facebook ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.facebook className="mr-2 h-4 w-4" />
        )}
        Facebook
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading.github}
        onClick={() => handleSocialSignIn('github')}
      >
        {isLoading.github ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading.apple}
        onClick={() => handleSocialSignIn('apple')}
      >
        {isLoading.apple ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.apple className="mr-2 h-4 w-4" />
        )}
        Apple
      </Button>
    </div>
  );
}
