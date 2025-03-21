
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdatePasswordForm } from '@/components/auth/UpdatePasswordForm';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const [isValidLink, setIsValidLink] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is a valid reset password link
    const hash = window.location.hash;
    
    if (!hash || !hash.includes('type=recovery')) {
      setIsValidLink(false);
      toast({
        variant: "destructive",
        title: "Invalid or expired link",
        description: "This password reset link is invalid or has expired.",
      });
      // Redirect to sign-in after a brief delay
      setTimeout(() => navigate('/'), 3000);
      return;
    }
    
    setIsValidLink(true);
  }, [navigate, toast]);

  if (isValidLink === null) {
    return (
      <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-lg">Verifying your request...</p>
        </div>
      </div>
    );
  }

  if (isValidLink === false) {
    return (
      <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid or Expired Link</h1>
          <p>Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
