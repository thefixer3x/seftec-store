
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from './layout/DashboardLayout';
import DashboardContent from './layout/DashboardContent';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please sign in to view your dashboard",
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
