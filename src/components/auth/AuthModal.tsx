
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AuthForm } from './AuthForm';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  children?: React.ReactNode;
}

export function AuthModal({ children }: AuthModalProps) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  // If user is already logged in, don't show the auth form in modal
  if (user) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AuthForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
