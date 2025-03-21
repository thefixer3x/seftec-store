
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyStores from './MyStores';
import MyStaff from './MyStaff';
import MarketplaceTab from './MarketplaceTab';
import WalletTab from './WalletTab';
import SettingsTab from './SettingsTab';
import DashboardHighlights from './DashboardHighlights';

const DashboardContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab') || 'dashboard';

  const renderTabContent = () => {
    switch(tab) {
      case 'stores':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" className="p-0 mr-4">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Go Back
                </Button>
                <h1 className="text-2xl font-bold">My Stores</h1>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600">Create Store</Button>
            </div>
            <MyStores />
            <MyStaff />
          </div>
        );
      case 'marketplace':
        return <MarketplaceTab />;
      case 'wallet':
        return <WalletTab />;
      case 'settings':
        return <SettingsTab />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to your personalized dashboard. View your insights, analytics, and quick actions.
            </p>
            <DashboardHighlights />
          </div>
        );
    }
  };

  return (
    <div className="p-6 flex-1 overflow-auto">
      {renderTabContent()}
    </div>
  );
};

export default DashboardContent;
