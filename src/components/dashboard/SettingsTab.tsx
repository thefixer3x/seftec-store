import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import SettingsSidebar from './settings/SettingsSidebar';
import BusinessProfileTab from './settings/BusinessProfileTab';
import PersonalProfileTab from './settings/PersonalProfileTab';
import PasswordTab from './settings/PasswordTab';
import PinTab from './settings/PinTab';
import VerificationStatus from './settings/VerificationStatus';
import { useIsMobile } from '@/hooks/use-mobile';
import DarkModeSwitch from '@/components/ui/dark-mode-switch';

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [activeSubTab, setActiveSubTab] = useState("business-profile");
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');
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
