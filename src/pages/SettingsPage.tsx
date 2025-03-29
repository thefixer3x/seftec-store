
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import SettingsTab from '@/components/dashboard/SettingsTab';

const SettingsPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <SettingsTab />
    </div>
  );
};

const SettingsPage = withErrorBoundary(SettingsPageContent, {
  onError: (error, errorInfo) => {
    console.error("Settings page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Settings Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading settings. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default SettingsPage;
