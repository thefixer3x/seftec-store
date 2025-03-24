
import React, { useState, useEffect } from 'react';
import { FileText, BadgeDollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import SettingsSidebar from './settings/SettingsSidebar';
import BusinessProfileTab from './settings/BusinessProfileTab';
import PersonalProfileTab from './settings/PersonalProfileTab';
import PasswordTab from './settings/PasswordTab';
import PinTab from './settings/PinTab';
import VerificationStatus from './settings/VerificationStatus';
import { useIsMobile } from '@/hooks/use-mobile';
import DarkModeSwitch from '@/components/ui/dark-mode-switch';
import { AccountDetails } from '@/components/profile/AccountDetails';
import { CreateNotificationForm } from '@/components/notifications/CreateNotificationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [activeSubTab, setActiveSubTab] = useState("business-profile");
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('verified');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (activeTab !== 'business') {
      setActiveSubTab('business-profile');
    }
  }, [activeTab]);

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white">Settings</h1>
          <VerificationStatus status={verificationStatus} />
        </div>
        <DarkModeSwitch className="ml-auto" />
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'} gap-8`}>
        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-1'}`}>
          <Tabs 
            defaultValue="business" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700 dark:bg-gray-800/20"
          >
            <TabsList className="flex flex-col w-full justify-start rounded-none bg-gray-50 dark:bg-gray-800/50 p-0">
              <SettingsSidebar 
                activeTab={activeTab} 
                setActiveSubTab={setActiveSubTab}
                activeSubTab={activeSubTab}
              />
            </TabsList>
            
            <TabsContent value="business" className="mt-0 p-0 hidden" />
            <TabsContent value="personal" className="mt-0 p-0 hidden" />
            <TabsContent value="account" className="mt-0 p-0 hidden" />
            <TabsContent value="notifications" className="mt-0 p-0 hidden" />
            <TabsContent value="subscription" className="mt-0 p-0 hidden" />
            <TabsContent value="password" className="mt-0 p-0 hidden" />
            <TabsContent value="pin" className="mt-0 p-0 hidden" />
          </Tabs>
        </div>

        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
          {activeTab === "business" && (
            <>
              {activeSubTab === "business-profile" && (
                <BusinessProfileTab 
                  verificationStatus={verificationStatus} 
                  setVerificationStatus={setVerificationStatus} 
                />
              )}
              
              {activeSubTab === "business-account" && (
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r">
                    <h2 className="text-2xl font-bold text-gray-800">Business Account</h2>
                    <p className="text-gray-600 mt-1">Manage your business account settings</p>
                  </div>
                  <AccountDetails />
                </div>
              )}
              
              {activeSubTab === "business-notifications" && (
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r">
                    <h2 className="text-2xl font-bold text-gray-800">Business Notifications</h2>
                    <p className="text-gray-600 mt-1">Configure your business notification preferences</p>
                  </div>
                  <CreateNotificationForm />
                </div>
              )}
            </>
          )}

          {activeTab === "personal" && (
            <PersonalProfileTab />
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r dark:bg-blue-900/20 dark:border-blue-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Account</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your account settings and preferences</p>
              </div>
              <AccountDetails />
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r dark:bg-blue-900/20 dark:border-blue-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Configure your notification preferences</p>
              </div>
              <CreateNotificationForm />
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r dark:bg-blue-900/20 dark:border-blue-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Subscription</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your subscription plans and billing</p>
              </div>
              
              <Card className="border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-seftec-navy dark:text-white">Current Plan</CardTitle>
                  <CardDescription className="text-seftec-navy/70 dark:text-white/70">
                    View your current subscription plan details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-seftec-navy dark:text-white">Free Plan</h3>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70 mt-1">Basic features for individuals</p>
                      </div>
                      <BadgeDollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-seftec-navy dark:text-white">$0</span>
                      <span className="ml-1 text-sm text-seftec-navy/70 dark:text-white/70">/month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-seftec-navy dark:text-white">Available Plans</h4>
                    
                    <div className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-seftec-navy dark:text-white">Premium Plan</h3>
                          <p className="text-sm text-seftec-navy/70 dark:text-white/70">Advanced features for businesses</p>
                        </div>
                        <span className="text-lg font-semibold text-seftec-navy dark:text-white">$29/month</span>
                      </div>
                      <Button className="mt-4 w-full" variant="outline">Upgrade to Premium</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-seftec-navy dark:text-white">Enterprise Plan</h3>
                          <p className="text-sm text-seftec-navy/70 dark:text-white/70">Custom solutions for large organizations</p>
                        </div>
                        <span className="text-lg font-semibold text-seftec-navy dark:text-white">Custom</span>
                      </div>
                      <Button className="mt-4 w-full" variant="outline">Contact Sales</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "password" && (
            <PasswordTab />
          )}

          {activeTab === "pin" && (
            <PinTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
