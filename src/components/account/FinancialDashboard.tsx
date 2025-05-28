
import React from 'react';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionManager from './SubscriptionManager';
import VirtualCardManager from './VirtualCardManager';
import ConnectAccountManager from './ConnectAccountManager';
import EdocBankConnection from '@/components/edoc/EdocBankConnection';

const FinancialDashboard = () => {
  return (
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
        <TabsTrigger value="cards">Virtual Cards</TabsTrigger>
        <TabsTrigger value="connect">Marketplace Selling</TabsTrigger>
        <TabsTrigger value="banking">Bank Analysis</TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="subscription">
          <SubscriptionManager />
        </TabsContent>
        
        <TabsContent value="cards">
          <VirtualCardManager />
        </TabsContent>
        
        <TabsContent value="connect">
          <ConnectAccountManager />
        </TabsContent>
        
        <TabsContent value="banking">
          <EdocBankConnection />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default FinancialDashboard;
