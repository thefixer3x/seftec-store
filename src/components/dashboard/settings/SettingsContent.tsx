
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SettingsSidebar from './SettingsSidebar';
import BusinessProfileTab from './BusinessProfileTab';
import PersonalProfileTab from './PersonalProfileTab';
import PasswordTab from './PasswordTab';
import PinTab from './PinTab';
import { Card } from '@/components/ui/card';

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('business');
  const [activeSubTab, setActiveSubTab] = useState('business-profile');
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeTab) {
      case 'business':
        switch (activeSubTab) {
          case 'business-profile':
            return <BusinessProfileTab />;
          case 'business-account':
            return (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Business Account Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Business account management features coming soon.</p>
              </Card>
            );
          case 'business-notifications':
            return (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Business Notifications</h3>
                <p className="text-gray-600 dark:text-gray-400">Business notification settings coming soon.</p>
              </Card>
            );
          default:
            return <BusinessProfileTab />;
        }
      case 'personal':
        return <PersonalProfileTab />;
      case 'password':
        return <PasswordTab />;
      case 'pin':
        return <PinTab />;
      default:
        return <BusinessProfileTab />;
    }
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
      <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-1'}`}>
        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />
      </div>
      <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsContent;
