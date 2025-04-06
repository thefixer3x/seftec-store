
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyStores from './MyStores';
import MyStaff from './MyStaff';
import MarketplaceTab from './MarketplaceTab';
import WalletTab from './WalletTab';
import SettingsTab from './SettingsTab';
import TradeFinanceTab from './TradeFinanceTab';
import DashboardHighlights from './DashboardHighlights';
import QuickActions from './QuickActions';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardContent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentTab = pathSegments[pathSegments.length - 1];
  const isMobile = useIsMobile();

  const renderTabContent = () => {
    switch (currentTab) {
      case 'stores':
        return <div className="space-y-4 sm:space-y-6 animate-fade-up">
            <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center">
                <Button variant="ghost" className="p-0 mr-2 sm:mr-4 hover:bg-seftec-slate/50 dark:hover:bg-seftec-darkNavy/50">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-seftec-navy dark:text-seftec-teal" />
                  <span className="text-xs sm:text-base text-seftec-navy dark:text-white">Go Back</span>
                </Button>
                <h1 className="text-xl sm:text-2xl font-bold text-seftec-navy dark:text-white">My Branches</h1>
              </div>
              <Button size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white transition-all">
                Create Branch
              </Button>
            </div>
            <MyStores />
            <MyStaff />
          </div>;
      case 'marketplace':
        return <div className="animate-fade-up"><MarketplaceTab /></div>;
      case 'wallet':
        return <div className="animate-fade-up w-full"><WalletTab /></div>;
      case 'trade-finance':
        return <div className="animate-fade-up w-full"><TradeFinanceTab /></div>;
      case 'settings':
        return <div className="animate-fade-up"><SettingsTab /></div>;
      case 'dashboard':
      default:
        return <div className="space-y-4 sm:space-y-6 animate-fade-up">
            <div className="mb-4 sm:mb-8">
              <div className="inline-block mb-2 sm:mb-4">
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-xs sm:text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90">
                  <Sparkle size={isMobile ? 12 : 14} className="mr-1 sm:mr-2 text-seftec-gold dark:text-seftec-teal animate-sparkle" />
                  Welcome to your personalized dashboard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white">Control Room</h1>
              <p className="text-sm sm:text-base text-seftec-navy/70 dark:text-white/70 mt-1 sm:mt-2">
                View your insights, analytics, and quick actions tailored for your business.
              </p>
            </div>
            
            <QuickActions />
            <DashboardHighlights />
          </div>;
    }
  };

  return <>{renderTabContent()}</>;
};

export default DashboardContent;
