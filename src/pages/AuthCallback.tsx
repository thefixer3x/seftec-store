
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  
  const provider = searchParams.get("provider") || "unknown";
  
  useEffect(() => {
    // Handle the auth callback
    const handleCallback = async () => {
      try {
        setIsProcessing(true);
        
        // Wait a brief moment to ensure auth state has updated
        setTimeout(async () => {
          // If we have a user after the auth redirect, consider it successful
          if (user) {
            // Refresh the profile to get the latest data
            await refreshProfile();
            
            // Show a welcome toast
            toast({
              title: "Authentication successful",
              description: `You have been successfully signed in with ${provider}.`,
            });
            
            // Redirect to the social login test page or profile
            navigate('/social-login-test');
          } else {
            // If no user is found after the redirect, something went wrong
            toast({
              variant: "destructive",
              title: "Authentication failed",
              description: "There was a problem signing you in. Please try again.",
            });
            navigate('/login');
          }
          
          setIsProcessing(false);
        }, 1000);
      } catch (error) {
        console.error('Error handling auth callback:', error);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "There was a problem signing you in. Please try again.",
        });
        setIsProcessing(false);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, toast, user, provider, refreshProfile]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-lg">Completing sign-in with {provider}...</p>
      {isProcessing && (
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      )}
    </div>
  );
};

export default AuthCallback;
