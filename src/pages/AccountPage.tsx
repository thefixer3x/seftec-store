
import React from 'react';
import { Outlet } from 'react-router-dom';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import AccountSidebar from '@/components/account/AccountSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AccountPageContent = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 md:mb-6">Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
        <div className={`${isMobile ? "col-span-1" : "md:col-span-1"} mb-3 md:mb-0`}>
          <div className="h-full">
            <AccountSidebar />
          </div>
        </div>
        <div className={`${isMobile ? "col-span-1" : "md:col-span-3"}`}>
          <div className="bg-white dark:bg-seftec-darkNavy/30 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm">
            <Outlet />
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
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-400">Account Error</h2>
        <p className="text-sm sm:text-base text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your account. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default AccountPage;
