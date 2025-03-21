
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import PaymentTransactions from './PaymentTransactions';
import LoanTransactions from './LoanTransactions';
import TradeFinanceTransactions from './TradeFinanceTransactions';

interface TransactionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="payment" value={activeTab} onValueChange={onTabChange}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList className="bg-gray-100 p-1 rounded-md">
            <TabsTrigger 
              value="payment" 
              className={`rounded-md ${activeTab === 'payment' ? 'bg-white shadow-sm' : ''}`}
            >
              Payment Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="loan" 
              className={`rounded-md ${activeTab === 'loan' ? 'bg-white shadow-sm' : ''}`}
            >
              Loan Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="trade" 
              className={`rounded-md ${activeTab === 'trade' ? 'bg-white shadow-sm' : ''}`}
            >
              Trade Finance
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search References" 
                className="pl-10 w-full sm:w-64" 
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
