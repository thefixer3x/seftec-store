
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Icons } from '@/components/icons';
import { Apple, Facebook, Github, Loader2 } from 'lucide-react';

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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Facebook className="mr-2 h-4 w-4" />
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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
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
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Apple className="mr-2 h-4 w-4" />
        )}
        Apple
      </Button>
    </div>
  );
}
