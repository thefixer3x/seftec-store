
import React, { useState, useEffect } from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import { AuthToggle } from './AuthToggle';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { SocialAuthButtons } from './SocialAuthButtons';
import { MagicLinkForm } from './MagicLinkForm';
import { MFAVerificationForm } from './MFAVerificationForm';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
  onSuccess?: () => void;
  isRegister?: boolean;
}

export function AuthForm({ onSuccess, isRegister }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(isRegister || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'password' | 'magic-link'>('password');
  const [showMFA, setShowMFA] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string>('');
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const callbackUrl = searchParams.get("callbackUrl");

  // If the user is signed in but needs to verify MFA, show the MFA verification form
  useEffect(() => {
    // For real MFA setup, we would:
    // 1. Check if the user signed in successfully but needs MFA
    // 2. Show the MFA verification form if needed
    // For now, we'll simulate this with a local state
    if (user && localStorage.getItem('needs_mfa')) {
      setShowMFA(true);
      setMfaFactorId(localStorage.getItem('mfa_factor_id') || '');
      localStorage.removeItem('needs_mfa');
    }
  }, [user]);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleForgotPassword = () => {
    setIsResetPassword(true);
  };

  const handleMFASuccess = () => {
    setShowMFA(false);
    if (onSuccess) onSuccess();
  };

  if (showMFA) {
    return <MFAVerificationForm factorId={mfaFactorId} onSuccess={handleMFASuccess} />;
  }

  if (isResetPassword) {
    return <ResetPasswordForm onBack={() => setIsResetPassword(false)} />;
  }
  
  return (
    <div className="grid gap-6">
      <AuthToggle isSignUp={isSignUp} onToggle={toggleAuthMode} />
      
      {isSignUp ? (
        <SignUpForm 
          onSuccess={onSuccess} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
      ) : (
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="password" onClick={() => setAuthMode('password')}>
              Password
            </TabsTrigger>
            <TabsTrigger value="magic-link" onClick={() => setAuthMode('magic-link')}>
              Magic Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="password">
            <SignInForm 
              onSuccess={onSuccess} 
              onForgotPassword={handleForgotPassword} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
          </TabsContent>
          
          <TabsContent value="magic-link">
            <MagicLinkForm 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
          </TabsContent>
        </Tabs>
      )}
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
      
      <SocialAuthButtons onSuccess={onSuccess} />
    </div>
  );
}
