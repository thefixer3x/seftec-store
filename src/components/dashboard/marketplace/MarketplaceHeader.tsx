
import React from 'react';
import { ArrowLeft, FileCheck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const MarketplaceHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
      <div className="flex items-center">
        <Button variant="ghost" className="p-1 sm:p-2 mr-2 sm:mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="ml-1 sm:ml-2 text-xs sm:text-base">{!isMobile && "Go Back"}</span>
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Marketplace</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your orders, bids, and offers</p>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-2 sm:mt-0">
        <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
          <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Export
        </Button>
        <Button size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700">
          <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          New Order
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
