
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import AccountSidebar from '@/components/account/AccountSidebar';

const AccountPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AccountSidebar />
        </div>
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-seftec-darkNavy/30 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please select an option from the sidebar to manage your account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountPage = withErrorBoundary(AccountPageContent, {
  onError: (error, errorInfo) => {
    console.error("Account page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Account Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your account. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default AccountPage;
