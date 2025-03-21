
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
import { Sparkle } from 'lucide-react';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(tabParam);

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

  // Update URL when tab changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('tab', activeTab);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }, [activeTab, location.pathname, navigate]);

  // Update active tab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab') || 'dashboard';
    setActiveTab(tab);
  }, [location.search, searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh] bg-seftec-slate dark:bg-seftec-darkNavy">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading profile...</div>
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
      <div className="flex h-screen overflow-hidden bg-seftec-slate dark:bg-seftec-darkNavy">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-seftec-slate dark:bg-seftec-darkNavy min-h-screen">
      <div className="animate-fade-up">
        <div className="mb-8">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/50 border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90">
              <Sparkle size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal animate-sparkle" />
              Your Profile Settings
            </span>
          </div>
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white">Your Dashboard</h1>
        </div>
        
        <Tabs 
          defaultValue="dashboard" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="mb-6 bg-white/50 dark:bg-white/5 border border-seftec-navy/10 dark:border-white/10 w-full justify-start overflow-x-auto">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-seftec-gold/10 data-[state=active]:text-seftec-navy dark:data-[state=active]:bg-seftec-teal/10 dark:data-[state=active]:text-seftec-teal">Dashboard</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-seftec-gold/10 data-[state=active]:text-seftec-navy dark:data-[state=active]:bg-seftec-teal/10 dark:data-[state=active]:text-seftec-teal">Profile</TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-seftec-gold/10 data-[state=active]:text-seftec-navy dark:data-[state=active]:bg-seftec-teal/10 dark:data-[state=active]:text-seftec-teal">Account</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-seftec-gold/10 data-[state=active]:text-seftec-navy dark:data-[state=active]:bg-seftec-teal/10 dark:data-[state=active]:text-seftec-teal">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="outline-none">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <ProfileForm />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="outline-none">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <AccountDetails />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="outline-none">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <CreateNotificationForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
