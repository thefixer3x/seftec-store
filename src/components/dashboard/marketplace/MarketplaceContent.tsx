
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrdersTable from './OrdersTable';
import EmptyState from './EmptyState';
import TableSkeleton from './TableSkeleton';
import { orderData } from './types';

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

        <CardContent className="p-0">
          <TabsContent value="received" className="m-0 p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : (
              <OrdersTable orders={orderData} />
            )}
          </TabsContent>

          <TabsContent value="bids" className="m-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : (
              <EmptyState type="bids" />
            )}
          </TabsContent>

          <TabsContent value="offers" className="m-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : (
              <EmptyState type="offers" />
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MarketplaceContent;
