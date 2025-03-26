
import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useResponsive } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Profile = () => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  
  // If at /profile root, redirect to /profile/dashboard
  if (location.pathname === '/profile') {
    return <Navigate to="/profile/dashboard" replace />;
  }

  const loadingComponent = (
    <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh] bg-seftec-slate dark:bg-seftec-darkNavy">
      <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading profile...</div>
    </div>
  );

  return (
    <ProtectedLayout loadingComponent={loadingComponent} redirectTo="/">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-seftec-slate dark:bg-seftec-darkNavy">
        <DashboardSidebar />
        <div className="p-4 md:p-6 flex-1 overflow-auto bg-white dark:bg-seftec-darkNavy">
          <Outlet />
        </div>
        
        {/* Add floating theme toggle for mobile view in profile section */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default Profile;
