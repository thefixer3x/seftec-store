
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import BusinessProfileTab from './settings/BusinessProfileTab';
import PersonalProfileTab from './settings/PersonalProfileTab';
import PasswordTab from './settings/PasswordTab';
import PinTab from './settings/PinTab';
import SettingsSidebar from './settings/SettingsSidebar';
import RoutingDiagram from './RoutingDiagram';

const SettingsTab = () => {
  const [currentTab, setCurrentTab] = useState('personal');
  const [currentSubTab, setCurrentSubTab] = useState('business-profile');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('pending');
  const isMobile = useIsMobile();
  const [showRoutes, setShowRoutes] = useState(false);

  const toggleRoutes = () => {
    setShowRoutes(!showRoutes);
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
        <button 
          onClick={toggleRoutes}
          className="px-4 py-2 text-sm bg-seftec-slate dark:bg-seftec-navy/50 hover:bg-seftec-slate/80 dark:hover:bg-seftec-navy/70 text-seftec-navy dark:text-white rounded-md transition-colors"
        >
          {showRoutes ? 'Hide Routes' : 'Show Routes'}
        </button>
      </div>
      
      {showRoutes && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Routes Overview</CardTitle>
            <CardDescription>All available routes in the application</CardDescription>
          </CardHeader>
          <CardContent>
            <RoutingDiagram />
          </CardContent>
        </Card>
      )}

      {isMobile ? (
        <Tabs defaultValue="personal" onValueChange={setCurrentTab} value={currentTab}>
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
            <BusinessProfileTab 
              verificationStatus={verificationStatus}
              setVerificationStatus={setVerificationStatus}
            />
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
            <SettingsSidebar 
              activeTab={currentTab} 
              setActiveTab={setCurrentTab}
              activeSubTab={currentSubTab}
              setActiveSubTab={setCurrentSubTab}
            />
          </div>
          <div className="col-span-3">
            {currentTab === 'personal' && <PersonalProfileTab />}
            {currentTab === 'business' && (
              <BusinessProfileTab 
                verificationStatus={verificationStatus}
                setVerificationStatus={setVerificationStatus}
              />
            )}
            {currentTab === 'password' && <PasswordTab />}
            {currentTab === 'pin' && <PinTab />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
