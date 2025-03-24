
import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set light mode on initial load for consistency with Index page
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please sign in to view your profile",
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast]);

  // If at /profile root, redirect to /profile/dashboard
  if (!loading && user && location.pathname === '/profile') {
    return <Navigate to="/profile/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh] bg-seftec-slate dark:bg-seftec-darkNavy">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading profile...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-seftec-slate dark:bg-seftec-darkNavy">
      <DashboardSidebar />
      <div className="p-4 md:p-6 flex-1 overflow-auto bg-white dark:bg-seftec-darkNavy">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
