
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import PaymentTransactions from './PaymentTransactions';
import LoanTransactions from './LoanTransactions';
import TradeFinanceTransactions from './TradeFinanceTransactions';
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
          <TabsList className={`bg-gray-100 p-1 rounded-md ${isMobile ? 'overflow-x-auto w-full' : ''}`}>
            <TabsTrigger 
              value="payment" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'payment' ? 'bg-white shadow-sm' : ''}`}
            >
              {isMobile ? 'Payments' : 'Payment Transactions'}
            </TabsTrigger>
            <TabsTrigger 
              value="loan" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'loan' ? 'bg-white shadow-sm' : ''}`}
            >
              {isMobile ? 'Loans' : 'Loan Transactions'}
            </TabsTrigger>
            <TabsTrigger 
              value="trade" 
              className={`rounded-md ${isMobile ? 'text-sm' : ''} ${activeTab === 'trade' ? 'bg-white shadow-sm' : ''}`}
            >
              {isMobile ? 'Trade' : 'Trade Finance'}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 w-full">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder={isMobile ? "Search..." : "Search References"} 
                className="pl-10 w-full" 
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
