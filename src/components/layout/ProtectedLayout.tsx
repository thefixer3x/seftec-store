
import React, { ReactNode, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export interface ProtectedLayoutProps {
  children?: ReactNode;
  redirectTo?: string;
  loadingComponent?: ReactNode;
}

/**
 * A wrapper component that handles authentication checks and redirects
 * for protected routes in a consistent way
 */
export const ProtectedLayout = ({
  children,
  redirectTo = '/login',
  loadingComponent
}: ProtectedLayoutProps) => {
  const { isAuthenticated, isLoading } = useProtectedRoute({
    redirectTo
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isLoading, isAuthenticated, navigate, redirectTo]);

  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading...</div>
      </div>
    );
  }

  // Only render children or Outlet if authenticated
  if (!isAuthenticated) return null;

  return children ? <>{children}</> : <Outlet />;
};
