import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { AccountDetails } from '@/components/profile/AccountDetails';
import { CreateNotificationForm } from '@/components/notifications/CreateNotificationForm';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('tab', activeTab);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }, [activeTab, location.pathname, location.search, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'dashboard';
    setActiveTab(tab);
  }, [location.search]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!user) return null;

  const isDashboardTab = [
    'dashboard', 'wallet', 'stores', 'marketplace', 'customers', 
    'invoices', 'transaction', 'inventory', 'bill-payment', 'account', 'settings'
  ].includes(activeTab);

  if (isDashboardTab) {
    return (
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <ProfileForm />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <AccountDetails />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <CreateNotificationForm />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
