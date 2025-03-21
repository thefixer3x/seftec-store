
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Handle the auth callback
    const handleCallback = async () => {
      try {
        console.log("Auth callback page loaded");
        
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          throw sessionError;
        }
        
        if (session) {
          console.log("Successfully authenticated:", session.user?.email);
          
          // Show a welcome toast
          toast({
            title: "Authentication successful",
            description: "You have been successfully signed in.",
          });
          
          // Redirect to the dashboard
          navigate('/dashboard');
        } else {
          console.log("No session found, authentication may have failed");
          // Handle the case where no session was found
          toast({
            variant: "destructive",
            title: "Authentication incomplete",
            description: "The authentication process wasn't completed. Please try again.",
          });
          navigate('/');
        }
      } catch (error: any) {
        console.error('Error handling auth callback:', error);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error.message || "There was a problem signing you in. Please try again.",
        });
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-lg">Completing sign-in...</p>
    </div>
  );
};

export default AuthCallback;
