
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AccountSidebar from './AccountSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AccountLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      toast({
        title: "Authentication required",
        description: "Please sign in to access your account settings",
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading account settings...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">Account Settings</h1>
        <p className="text-seftec-navy/70 dark:text-white/70 mt-1">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-1'}`}>
          <AccountSidebar />
        </div>
        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
