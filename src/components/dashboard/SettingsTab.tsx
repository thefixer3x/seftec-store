
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';
import SettingsSidebar from './settings/SettingsSidebar';
import BusinessProfileTab from './settings/BusinessProfileTab';
import PersonalProfileTab from './settings/PersonalProfileTab';
import PasswordTab from './settings/PasswordTab';
import PinTab from './settings/PinTab';
import VerificationStatus from './settings/VerificationStatus';

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <VerificationStatus status={verificationStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Tabs 
            orientation="vertical" 
            defaultValue="business" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <SettingsSidebar activeTab={activeTab} />
          </Tabs>
        </div>

        <div className="lg:col-span-3">
          <TabsContent value="business" className="mt-0 p-0">
            <BusinessProfileTab 
              verificationStatus={verificationStatus} 
              setVerificationStatus={setVerificationStatus} 
            />
          </TabsContent>

          <TabsContent value="personal" className="mt-0 p-0">
            <PersonalProfileTab />
          </TabsContent>

          <TabsContent value="password" className="mt-0 p-0">
            <PasswordTab />
          </TabsContent>

          <TabsContent value="pin" className="mt-0 p-0">
            <PinTab />
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
