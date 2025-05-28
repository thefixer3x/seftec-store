
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import BusinessProfileTab from './settings/BusinessProfileTab';
import PersonalProfileTab from './settings/PersonalProfileTab';
import PasswordTab from './settings/PasswordTab';
import PinTab from './settings/PinTab';
import SettingsSidebar from './settings/SettingsSidebar';

const SettingsTab = () => {
  const [currentTab, setCurrentTab] = useState('personal');
  const [currentSubTab, setCurrentSubTab] = useState('business-profile');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('pending');
  const isMobile = useIsMobile();

  // Handle business sub-tab content
  const renderBusinessContent = () => {
    // Here we would normally render different content based on the currentSubTab
    // For now, we're just returning the BusinessProfileTab
    return (
      <BusinessProfileTab 
        verificationStatus={verificationStatus}
        setVerificationStatus={setVerificationStatus}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {isMobile ? (
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="pin">PIN</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PersonalProfileTab />
          </TabsContent>
          <TabsContent value="business">
            {renderBusinessContent()}
          </TabsContent>
          <TabsContent value="password">
            <PasswordTab />
          </TabsContent>
          <TabsContent value="pin">
            <PinTab />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <Card>
              <CardContent className="p-4">
                <Tabs value={currentTab} onValueChange={setCurrentTab} orientation="vertical" className="h-full">
                  <SettingsSidebar 
                    activeTab={currentTab} 
                    setActiveTab={setCurrentTab}
                    activeSubTab={currentSubTab}
                    setActiveSubTab={setCurrentSubTab}
                  />
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <Tabs value={currentTab}>
              <TabsContent value="personal">
                <PersonalProfileTab />
              </TabsContent>
              <TabsContent value="business">
                {renderBusinessContent()}
              </TabsContent>
              <TabsContent value="password">
                <PasswordTab />
              </TabsContent>
              <TabsContent value="pin">
                <PinTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
