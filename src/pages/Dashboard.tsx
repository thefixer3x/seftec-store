
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import DashboardHighlights from '@/components/dashboard/DashboardHighlights';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useIsMobile } from '@/hooks/use-mobile';
import BizGenieDashboard from '@/components/ai/BizGenieDashboard';

interface DashboardProps {
  title?: string;
}

const DashboardContent: React.FC<DashboardProps> = ({ title = "Dashboard" }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{title}</h1>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8">
        Welcome to your personalized dashboard. View your insights, analytics, and quick actions.
      </p>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <ErrorBoundary>
          <DashboardHighlights />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <BizGenieDashboard />
        </ErrorBoundary>
      </div>
    </div>
  );
};

// Apply the withErrorBoundary HOC to the component
const Dashboard = withErrorBoundary(DashboardContent, {
  onError: (error, errorInfo) => {
    console.error("Dashboard error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-400">Dashboard Error</h2>
        <p className="text-sm sm:text-base text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your dashboard. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default Dashboard;
