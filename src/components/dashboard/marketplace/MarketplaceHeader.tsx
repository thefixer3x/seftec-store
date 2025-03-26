
import React from 'react';
import { ArrowLeft, FileCheck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MarketplaceHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
      <div className="flex items-center">
        <Button variant="ghost" className="p-2 mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-2">Go Back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your orders, bids, and offers</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
          <FileCheck className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ShoppingBag className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
