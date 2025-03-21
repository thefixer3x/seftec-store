
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Twitter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TwitterSignInProps {
  className?: string;
  onSuccess?: () => void;
}

export function TwitterSignIn({ className, onSuccess }: TwitterSignInProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      // Get the current URL to use as redirect base
      const redirectUrl = `${window.location.origin}/auth-callback`;
      console.log("Twitter sign-in redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl,
          // Add scopes if needed
          scopes: 'tweet.read users.read',
        },
      });

      if (error) {
        console.error('Twitter OAuth error:', error);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error.message || "Failed to sign in with Twitter",
        });
        throw error;
      }
      
      console.log("Twitter OAuth initiated:", data);
      // onSuccess callback is handled by the redirect
    } catch (error: any) {
      console.error('Error signing in with Twitter:', error);
      toast({
        variant: "destructive",
        title: "Twitter sign-in failed",
        description: error.message || "There was a problem signing in with Twitter",
      });
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
          <Twitter className="mr-2 h-4 w-4" />
          Sign in with Twitter
        </>
      )}
    </Button>
  );
}
