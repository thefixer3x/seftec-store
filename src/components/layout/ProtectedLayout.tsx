
import React, { ReactNode, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    // Add console log to track authentication status changes
    console.log("ProtectedLayout - Auth status:", { isAuthenticated, isLoading, path: location.pathname });
    
    if (!isLoading && !isAuthenticated) {
      console.log("ProtectedLayout - Redirecting to:", redirectTo, "from:", location.pathname);
      // Ensure we're redirecting to paths on the main domain, not subdomains
      navigate(redirectTo, { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [isLoading, isAuthenticated, navigate, redirectTo, location.pathname]);

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
  if (!isAuthenticated) {
    console.log("ProtectedLayout - Not authenticated, returning null");
    return null;
  }

  console.log("ProtectedLayout - Authenticated, rendering content");
  return children ? <>{children}</> : <Outlet />;
};
