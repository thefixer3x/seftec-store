
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Handle the auth callback
    const handleCallback = async () => {
      try {
        // Show a welcome toast
        toast({
          title: "Authentication successful",
          description: "You have been successfully signed in.",
        });
        
        // Redirect to the auth test page or dashboard
        navigate('/auth-test');
      } catch (error) {
        console.error('Error handling auth callback:', error);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "There was a problem signing you in. Please try again.",
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
