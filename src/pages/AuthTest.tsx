
import React from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from '@/components/auth/UserProfileDropdown';

const AuthTest = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Auth Test Page</h1>
        <div className="flex items-center gap-4">
          <UserProfileDropdown />
        </div>
      </div>
      
      <div className="grid gap-6 justify-center">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-medium mb-4">Test AuthModal</h2>
          <p className="mb-4">Click the button below to open the authentication modal:</p>
          <AuthModal>
            <Button>Open Auth Modal</Button>
          </AuthModal>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
