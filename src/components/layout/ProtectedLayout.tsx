
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MainNav } from '@/components/ui/navbar';
import { siteConfig } from '@/config/site';
import { SeftecHub } from '@/components/ui/seftec-hub';

interface ProtectedLayoutProps {
  children: ReactNode;
  redirectTo?: string;
  loadingComponent?: ReactNode;
}

export const ProtectedLayout = ({
  children,
  redirectTo = '/login',
  loadingComponent,
}: ProtectedLayoutProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While checking auth status, show loading component or default loading UI
  if (loading) {
    return loadingComponent || (
      <div className="min-h-screen flex flex-col">
        <MainNav items={siteConfig.mainNav} />
        <div className="container mx-auto px-4 py-2 mt-[56px] border-b border-gray-100 dark:border-gray-800">
          <SeftecHub />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};
