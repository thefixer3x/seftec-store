
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import FinancialDashboard from '@/components/account/FinancialDashboard';

const FinancialPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Financial Services</h1>
      <FinancialDashboard />
    </div>
  );
};

const FinancialPage = withErrorBoundary(FinancialPageContent, {
  onError: (error, errorInfo) => {
    console.error("Financial page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Financial Dashboard Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading the financial dashboard. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default FinancialPage;
