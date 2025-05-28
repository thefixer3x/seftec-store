import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthState } from '@/hooks/use-auth-state';

/**
 * Conditionally renders a developer tools link only for superadmin users
 */
const AdminAccessLink = () => {
  const { user } = useAuthState();
  
  // Check if the current user has superadmin access
  // In a real app, this would be determined by user permissions or role
  const isSuperAdmin = user?.email === 'superadmin@seftec.com' || 
                       user?.email?.includes('superadmin');
  
  if (!isSuperAdmin) {
    return null;
  }
  
  return (
    <Link 
      to="/profile/developer" 
      className="flex items-center px-3 py-2 text-sm rounded-md text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
    >
      <Shield className="mr-2 h-4 w-4" />
      <span>Developer Tools</span>
    </Link>
  );
};

export default AdminAccessLink;