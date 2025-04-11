
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleSignIn } from '@/components/auth/GoogleSignIn';
import { TwitterSignIn } from '@/components/auth/TwitterSignIn';
import { LinkedInSignIn } from '@/components/auth/LinkedInSignIn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const SocialLoginTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleSuccess = () => {
    toast({
      title: "Authentication successful",
      description: "You have been successfully signed in.",
    });
    navigate('/profile?tab=dashboard');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Social Login Test</h1>
          
          {user ? (
            <div className="text-center">
              <p className="mb-4">You are signed in as: {user.email}</p>
              <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <p className="text-center mb-4">Test signing in with these providers:</p>
              
              <GoogleSignIn onSuccess={handleSuccess} />
              <TwitterSignIn onSuccess={handleSuccess} />
              <LinkedInSignIn onSuccess={handleSuccess} />
              
              <div className="mt-4 text-center">
                <Button variant="link" onClick={() => navigate('/login')}>
                  Return to Login Page
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-xs text-center text-slate-500 dark:text-slate-400">
            <p>All social logins will redirect to the auth-callback page before returning here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginTest;
