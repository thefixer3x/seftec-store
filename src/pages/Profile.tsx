
import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useResponsive } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ErrorBoundary, withErrorBoundary } from '@/components/ui/error-boundary';

interface ProfileProps {
  defaultPath?: string;
}

const ProfileContent: React.FC<ProfileProps> = ({ defaultPath = '/profile/dashboard' }) => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  
  // If at /profile root, redirect to /profile/dashboard
  if (location.pathname === '/profile') {
    return <Navigate to={defaultPath} replace />;
  }

  const loadingComponent = (
    <div className="container mx-auto px-4 py-6 md:py-10 flex justify-center items-center min-h-[50vh] bg-seftec-slate dark:bg-seftec-darkNavy">
      <div className="animate-pulse text-base md:text-lg text-seftec-navy dark:text-white">Loading profile...</div>
    </div>
  );

  return (
    <ProtectedLayout loadingComponent={loadingComponent} redirectTo="/">
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-seftec-slate dark:bg-seftec-darkNavy">
        <DashboardSidebar />
        <div className="p-3 md:p-4 lg:p-6 flex-1 overflow-y-auto bg-white dark:bg-seftec-darkNavy">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
        
        {/* Add floating theme toggle only for mobile view in profile section */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
};

// Apply the withErrorBoundary HOC to the component
const Profile = withErrorBoundary(ProfileContent, {
  onError: (error, errorInfo) => {
    console.error("Profile error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-6 md:py-10 flex justify-center items-center min-h-[50vh] bg-seftec-slate dark:bg-seftec-darkNavy">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Profile Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your profile. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default Profile;
