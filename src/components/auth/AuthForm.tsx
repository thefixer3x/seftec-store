
import React, { useState } from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import { AuthToggle } from './AuthToggle';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useSearchParams } from 'react-router-dom';

interface AuthFormProps {
  onSuccess?: () => void;
  isRegister?: boolean;
}

export function AuthForm({ onSuccess, isRegister }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(isRegister || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleForgotPassword = () => {
    setIsResetPassword(true);
  };

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
        <SignInForm 
          onSuccess={onSuccess} 
          onForgotPassword={handleForgotPassword} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
      )}
      
      <SocialAuthButtons onSuccess={onSuccess} />
    </div>
  );
}
