
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/auth';

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
  user: User | null;
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
  
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast, redirectTo, message.title, message.description]);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
    error
  };
};
