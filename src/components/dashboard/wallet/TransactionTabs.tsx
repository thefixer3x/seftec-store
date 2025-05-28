
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Package } from 'lucide-react';
import PaymentTransactions from './PaymentTransactions';
import LoanTransactions from './LoanTransactions';
import TradeFinanceTransactions from './TradeFinanceTransactions';
import BulkPaymentTransactions from './BulkPaymentTransactions';
import { useIsMobile } from '@/hooks/use-mobile';

interface TransactionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-4 md:mt-8">
      <Tabs defaultValue="payment" value={activeTab} onValueChange={onTabChange}>
        <div className="flex flex-col space-y-4 mb-4">
          <TabsList className={`bg-gray-100 dark:bg-seftec-darkNavy/30 p-1 rounded-md ${isMobile ? 'overflow-x-auto w-full' : ''}`}>
            <TabsTrigger 
              value="payment" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'payment' ? 'bg-white dark:bg-seftec-darkNavy text-seftec-navy dark:text-white shadow-sm' : 'text-seftec-navy/80 dark:text-white/80'}`}
            >
              {isMobile ? 'Payments' : 'Payment Transactions'}
            </TabsTrigger>
            <TabsTrigger 
              value="loan" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'loan' ? 'bg-white dark:bg-seftec-darkNavy text-seftec-navy dark:text-white shadow-sm' : 'text-seftec-navy/80 dark:text-white/80'}`}
            >
              {isMobile ? 'Loans' : 'Loan Transactions'}
            </TabsTrigger>
            <TabsTrigger 
              value="trade" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'trade' ? 'bg-white dark:bg-seftec-darkNavy text-seftec-navy dark:text-white shadow-sm' : 'text-seftec-navy/80 dark:text-white/80'}`}
            >
              {isMobile ? 'Trade' : 'Trade Finance'}
            </TabsTrigger>
            <TabsTrigger 
              value="bulk" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'bulk' ? 'bg-white dark:bg-seftec-darkNavy text-seftec-navy dark:text-white shadow-sm' : 'text-seftec-navy/80 dark:text-white/80'}`}
            >
              <Package className="h-4 w-4 mr-1 inline-block" />
              {isMobile ? 'Bulk' : 'Bulk Payments'}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 w-full">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder={isMobile ? "Search..." : "Search References"} 
                className="pl-10 w-full border-seftec-navy/10 dark:border-white/10 text-seftec-navy dark:text-white"
              />
            </div>
            <Button variant="outline" size="icon" className="border-seftec-navy/10 dark:border-white/10">
              <Filter className="h-4 w-4 text-seftec-navy dark:text-white" />
            </Button>
          </div>
        </div>

        <TabsContent value="payment" className="mt-0 p-0">
          <PaymentTransactions />
        </TabsContent>

        <TabsContent value="loan" className="mt-0 p-0">
          <LoanTransactions />
        </TabsContent>

        <TabsContent value="trade" className="mt-0 p-0">
          <TradeFinanceTransactions />
        </TabsContent>

        <TabsContent value="bulk" className="mt-0 p-0">
          <BulkPaymentTransactions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
