
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';

const CustomersPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Customers</h1>
      <div className="bg-white dark:bg-seftec-darkNavy/30 p-6 rounded-lg shadow-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Your customers dashboard will be available soon.
        </p>
      </div>
    </div>
  );
};

const CustomersPage = withErrorBoundary(CustomersPageContent, {
  onError: (error, errorInfo) => {
    console.error("Customers page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Customers Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your customers. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default CustomersPage;
