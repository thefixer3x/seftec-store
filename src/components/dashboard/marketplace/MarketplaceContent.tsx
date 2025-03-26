
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import MarketplaceTabs from './MarketplaceTabs';
import ReceivedTab from './tabs/ReceivedTab';
import BidsTab from './tabs/BidsTab';
import OffersTab from './tabs/OffersTab';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface MarketplaceContentProps {
  activeTab: 'received' | 'bids' | 'offers';
  isLoading: boolean;
  handleTabChange: (value: 'received' | 'bids' | 'offers') => void;
}

const MarketplaceContent = ({ activeTab, isLoading, handleTabChange }: MarketplaceContentProps) => {
  return (
    <Card className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
      <Tabs 
        defaultValue="received" 
        value={activeTab} 
        onValueChange={(value) => handleTabChange(value as 'received' | 'bids' | 'offers')}
        className="w-full"
      >
        <MarketplaceTabs activeTab={activeTab} handleTabChange={handleTabChange} />

        <CardContent className="p-0">
          <ErrorBoundary>
            <ReceivedTab isLoading={isLoading} />
            <BidsTab isLoading={isLoading} />
            <OffersTab isLoading={isLoading} />
          </ErrorBoundary>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MarketplaceContent;
