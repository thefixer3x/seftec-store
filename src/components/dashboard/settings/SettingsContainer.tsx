
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import SettingsNavigation from './SettingsNavigation';
import { PersonalProfileTab } from './PersonalProfileTab';
import { BusinessProfileTab } from './BusinessProfileTab';
import { PasswordTab } from './PasswordTab';
import { PinTab } from './PinTab';

const SettingsContainer = () => {
  const [activeTab, setActiveTab] = useState('personal');

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
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      {/* Navigation Sidebar */}
      <div className="lg:w-1/4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <SettingsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <Card className="p-6">
          {renderContent()}
        </Card>
      </div>
    </div>
  );
};

export default SettingsContainer;
