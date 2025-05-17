
import React from 'react';
import { Card } from '@/components/ui/card';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from '@/components/auth/UserProfileDropdown';
import { withErrorBoundary } from '@/components/ui/error-boundary';

const DevAuthTestContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Auth Test</h2>
          <p className="text-muted-foreground mb-6">
            This page allows testing of various authentication components and flows.
          </p>
          
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-lg font-medium mb-4">User Profile Dropdown</h3>
              <p className="mb-4">Test the user dropdown component:</p>
              <div className="flex justify-end">
                <UserProfileDropdown />
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-lg font-medium mb-4">Auth Modal</h3>
              <p className="mb-4">Open the authentication modal component:</p>
              <AuthModal>
                <Button>Open Auth Modal</Button>
              </AuthModal>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DevAuthTest = withErrorBoundary(DevAuthTestContent, {
  onError: (error, errorInfo) => {
    console.error("DevAuthTest error:", error, errorInfo);
  },
  fallback: (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Auth Test Error</h2>
      <p className="text-red-600 dark:text-red-300 mt-2">
        We encountered an issue while loading the auth test components. Please try refreshing the page.
      </p>
    </div>
  )
});

export default DevAuthTest;
