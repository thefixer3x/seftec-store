
import React from 'react';
import { GoogleSignIn } from './GoogleSignIn';
import { TwitterSignIn } from './TwitterSignIn';
import { LinkedInSignIn } from './LinkedInSignIn';

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
}

export function SocialAuthButtons({ onSuccess }: SocialAuthButtonsProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <GoogleSignIn onSuccess={onSuccess} />
        <TwitterSignIn onSuccess={onSuccess} />
        <LinkedInSignIn onSuccess={onSuccess} />
      </div>
    </>
  );
}
