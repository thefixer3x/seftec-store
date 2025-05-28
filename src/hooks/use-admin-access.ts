import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';

export type AdminRole = 'superadmin' | 'admin' | 'developer' | null;

/**
 * Hook to check if the current user has admin access and handle redirection
 * if they don't have sufficient permissions.
 * 
 * @param requiredRole - The minimum role required to access the page
 * @param redirectPath - Where to redirect if permission check fails
 * @returns Object containing loading state and admin role
 */
export const useAdminAccess = (
  requiredRole: AdminRole = 'admin',
  redirectPath: string = '/profile/dashboard'
) => {
  const { user, isLoading } = useAuthState();
  const navigate = useNavigate();
  const [adminRole, setAdminRole] = useState<AdminRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (isLoading) return;

      if (!user) {
        navigate('/login', { replace: true });
        return;
      }

      // In a real app, you would fetch this from your user metadata or permissions system
      // For now, we'll determine based on email domain or specific test emails
      
      let userRole: AdminRole = null;

      // Example check - in production, replace with actual permission check
      if (user.email === 'superadmin@seftec.com' || user.email?.includes('superadmin')) {
        userRole = 'superadmin';
      } else if (user.email === 'admin@seftec.com' || user.email?.includes('admin')) {
        userRole = 'admin';
      } else if (user.email === 'developer@seftec.com' || user.email?.includes('developer')) {
        userRole = 'developer';
      }

      setAdminRole(userRole);
      setLoading(false);

      // Check if the user's role is sufficient for the required role
      const hasAccess = checkRoleAccess(userRole, requiredRole);
      
      if (!hasAccess) {
        navigate(redirectPath, { replace: true });
      }
    };

    checkAdminAccess();
  }, [user, isLoading, navigate, redirectPath, requiredRole]);

  // Check if a user's role has sufficient access for the required role
  const checkRoleAccess = (userRole: AdminRole, requiredRole: AdminRole): boolean => {
    if (!userRole) return false;
    if (!requiredRole) return true;

    const roleHierarchy: Record<string, number> = {
      'superadmin': 3,
      'admin': 2,
      'developer': 1
    };

    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  };

  return { loading, adminRole };
};