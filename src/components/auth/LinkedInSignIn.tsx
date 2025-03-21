
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Linkedin } from 'lucide-react';

interface LinkedInSignInProps {
  className?: string;
  onSuccess?: () => void;
}

export function LinkedInSignIn({ className, onSuccess }: LinkedInSignInProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
        },
      });

      if (error) throw error;
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error signing in with LinkedIn:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className={className}
      onClick={handleSignIn}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Linkedin className="mr-2 h-4 w-4" />
          Sign in with LinkedIn
        </>
      )}
    </Button>
  );
}
