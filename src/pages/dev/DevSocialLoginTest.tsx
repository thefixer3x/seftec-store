
import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { GoogleSignIn } from '@/components/auth/GoogleSignIn';
import { TwitterSignIn } from '@/components/auth/TwitterSignIn';
import { LinkedInSignIn } from '@/components/auth/LinkedInSignIn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { withErrorBoundary } from '@/components/ui/error-boundary';

const DevSocialLoginTestContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleSuccess = () => {
    toast({
      title: "Authentication successful",
      description: "You have been successfully signed in.",
    });
    navigate('/dev/social-login');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Social Login Test</h2>
          <p className="text-muted-foreground mb-6">
            This page allows testing of social login integration with various providers.
          </p>
          
          <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6">
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
              </div>
            )}
            
            <div className="mt-6 text-xs text-center text-slate-500 dark:text-slate-400">
              <p>All social logins will redirect to the auth-callback page before returning here.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DevSocialLoginTest = withErrorBoundary(DevSocialLoginTestContent, {
  onError: (error, errorInfo) => {
    console.error("DevSocialLoginTest error:", error, errorInfo);
  },
  fallback: (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Social Login Test Error</h2>
      <p className="text-red-600 dark:text-red-300 mt-2">
        We encountered an issue while loading the social login test. Please try refreshing the page.
      </p>
    </div>
  )
});

export default DevSocialLoginTest;
