
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Chrome } from 'lucide-react';

interface GoogleSignInProps {
  className?: string;
  onSuccess?: () => void;
}

export function GoogleSignIn({ className, onSuccess }: GoogleSignInProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
        },
      });

      if (error) throw error;
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </>
      )}
    </Button>
  );
}
