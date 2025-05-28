
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import SettingsNavigation from './SettingsNavigation';
import PersonalProfileTab from './PersonalProfileTab';
import BusinessProfileTab from './BusinessProfileTab';
import PasswordTab from './PasswordTab';
import PinTab from './PinTab';
import { useIsMobile } from '@/hooks/use-mobile';

const SettingsContainer = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalProfileTab />;
      case 'business':
        return <BusinessProfileTab />;
      case 'password':
        return <PasswordTab />;
      case 'pin':
        return <PinTab />;
      default:
        return <PersonalProfileTab />;
    }
  };

  return (
    <div className={`flex flex-col space-y-4 md:space-y-0 ${isMobile ? '' : 'lg:flex-row lg:gap-6'} max-w-full mx-auto overflow-hidden`}>
      {/* Navigation Sidebar */}
      <div className={`${isMobile ? 'w-full' : 'lg:w-1/4 lg:min-w-[250px] lg:max-w-[300px]'}`}>
        <Card className="p-4 md:p-6 h-fit">
          <h2 className="text-base md:text-lg font-semibold mb-4 text-seftec-navy dark:text-white">Settings</h2>
          <SettingsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </Card>
      </div>

      {/* Main Content */}
      <div className={`${isMobile ? 'w-full' : 'lg:w-3/4 lg:flex-1'} min-w-0`}>
        <Card className="p-4 md:p-6 overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            {renderContent()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsContainer;
