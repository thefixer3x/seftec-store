
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

export function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <Button
          variant="link"
          className="gap-x-1 pl-0 capitalize"
          onClick={onToggle}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </p>
    </div>
  );
}
