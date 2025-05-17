
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UseProtectedRouteOptions {
  redirectTo?: string;
  message?: {
    title?: string;
    description?: string;
  };
}

export interface ProtectedRouteResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error?: Error;
}

/**
 * Custom hook to handle protected routes with consistent behavior
 */
export const useProtectedRoute = (options: UseProtectedRouteOptions = {}): ProtectedRouteResult => {
  const { 
    redirectTo = '/login', 
    message = {
      title: "Authentication required",
      description: "Please sign in to access this area"
    }
  } = options;
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      // Store the current location so we can redirect back after login
      console.log("Redirecting to login from:", location.pathname);
      navigate(redirectTo, { 
        state: { from: location.pathname },
        replace: true 
      });
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast, redirectTo, message.title, message.description, location.pathname]);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
    error: undefined
  };
};
