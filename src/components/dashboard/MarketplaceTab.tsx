
import React, { useState } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import MarketplaceHeader from './marketplace/MarketplaceHeader';
import MarketplaceContent from './marketplace/MarketplaceContent';
import { MarketplaceTabProps } from './marketplace/types';

// Main component
const MarketplaceTab: React.FC<MarketplaceTabProps> = ({ initialTab = "received" }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'bids' | 'offers'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  const handleTabChange = (value: 'received' | 'bids' | 'offers') => {
    setIsLoading(true);
    setActiveTab(value);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <ErrorBoundary>
      <div className="w-full">
        <MarketplaceHeader />
        <MarketplaceContent 
          activeTab={activeTab}
          isLoading={isLoading}
          handleTabChange={handleTabChange}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MarketplaceTab;
