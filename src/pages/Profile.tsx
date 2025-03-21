import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { AccountDetails } from '@/components/profile/AccountDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateNotificationForm } from '@/components/notifications/CreateNotificationForm';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
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
