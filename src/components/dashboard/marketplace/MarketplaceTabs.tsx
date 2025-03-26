
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarketplaceTabsProps {
  activeTab: 'received' | 'bids' | 'offers';
  handleTabChange: (value: 'received' | 'bids' | 'offers') => void;
}

const MarketplaceTabs: React.FC<MarketplaceTabsProps> = ({ activeTab, handleTabChange }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 px-4">
      <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
        <TabsTrigger 
          value="received" 
          className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'received' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
        >
          Received Orders
        </TabsTrigger>
        <TabsTrigger 
          value="bids" 
          className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'bids' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
        >
          My Bids
        </TabsTrigger>
        <TabsTrigger 
          value="offers" 
          className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'offers' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
        >
          My Offers
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default MarketplaceTabs;
