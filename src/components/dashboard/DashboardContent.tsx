
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyStores from './MyStores';
import MyStaff from './MyStaff';
import MarketplaceTab from './MarketplaceTab';
import WalletTab from './WalletTab';
import SettingsTab from './SettingsTab';
import DashboardHighlights from './DashboardHighlights';
import QuickActions from './QuickActions';

const DashboardContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab') || 'dashboard';

  const renderTabContent = () => {
    switch(tab) {
      case 'stores':
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" className="p-0 mr-4 hover:bg-seftec-slate/50 dark:hover:bg-seftec-darkNavy/50">
                  <ArrowLeft className="h-5 w-5 mr-2 text-seftec-navy dark:text-seftec-teal" />
                  <span className="text-seftec-navy dark:text-white">Go Back</span>
                </Button>
                <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">My Stores</h1>
              </div>
              <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white transition-all">Create Store</Button>
            </div>
            <MyStores />
            <MyStaff />
          </div>
        );
      case 'marketplace':
        return <div className="animate-fade-up"><MarketplaceTab /></div>;
      case 'wallet':
        return <div className="animate-fade-up w-full"><WalletTab /></div>;
      case 'settings':
        return <div className="animate-fade-up"><SettingsTab /></div>;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90">
                  <Sparkle size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal animate-sparkle" />
                  Welcome to your personalized dashboard
                </span>
              </div>
              <h1 className="text-3xl font-bold text-seftec-navy dark:text-white">Control Room</h1>
              <p className="text-seftec-navy/70 dark:text-white/70 mt-2">
                View your insights, analytics, and quick actions tailored for your business.
              </p>
            </div>
            
            <QuickActions />
            <DashboardHighlights />
          </div>
        );
    }
  };

  return (
    <div className="p-6 flex-1 overflow-auto bg-white dark:bg-seftec-darkNavy">
      {renderTabContent()}
    </div>
  );
};

export default DashboardContent;
