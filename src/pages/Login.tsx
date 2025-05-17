
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Shield, Fingerprint } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const {
    user,
    loading,
    signInWithBiometric
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [biometricSupported, setBiometricSupported] = useState(false);
  
  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || '/profile/dashboard';

  useEffect(() => {
    // Check if biometric authentication is supported
    const checkBiometricSupport = async () => {
      try {
        // Check if the Web Authentication API is available
        if (window.PublicKeyCredential) {
          // Check if the browser supports biometric authentication
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setBiometricSupported(available);
        }
      } catch (error) {
        console.error('Error checking biometric support:', error);
        setBiometricSupported(false);
      }
    };
    
    checkBiometricSupport();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      console.log("User authenticated, redirecting to:", from);
      navigate(from, {
        replace: true
      });
    }
  }, [user, loading, navigate, from]);

  const handleBiometricLogin = async () => {
    try {
      await signInWithBiometric();
      toast({
        title: "Biometric authentication successful",
        description: "Welcome back to seftechub.com",
      });
      // Note: redirection is handled by the useEffect above
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Biometric authentication failed",
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading...</div>
      </div>;
  }
  
  return <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-white/5 shadow-lg rounded-lg p-8 border border-seftec-navy/10 dark:border-white/10 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <Icons.logo className="h-10 w-10 text-seftec-gold dark:text-seftec-teal" />
          </div>
          
          <div className="mb-6 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate/50 border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90 mx-auto">
              <Shield size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
              Welcome Back
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-3 text-center text-seftec-navy dark:text-white">Sign In to seftechub.com</h1>
          <p className="text-seftec-navy/70 dark:text-white/70 text-center mb-8">
            Access your personalized financial insights and business analytics
          </p>
          
          {biometricSupported && (
            <div className="mb-6">
              <Button 
                onClick={handleBiometricLogin} 
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-5 border-dashed"
              >
                <Fingerprint className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                <span>Sign in with Biometric</span>
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-seftec-navy/10 dark:border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-seftec-darkNavy text-muted-foreground">or continue with</span>
                </div>
              </div>
            </div>
          )}
          
          <AuthForm />
          
          <div className="mt-6 text-center">
            <Link to="/social-login-test">
              
            </Link>
          </div>
        </div>
      </div>
    </div>;
};

export default Login;
