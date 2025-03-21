
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionsTable from './TransactionsTable';

interface TransactionsCardProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TransactionsCard = ({ activeTab, setActiveTab }: TransactionsCardProps) => {
  const dummyTransactions = [
    {
      id: '1',
      date: '2025-03-18T12:41:33.000+00:00',
      from: 'GTBank/ABBA EGA',
      accountNumber: '0000132503181340210000372044401',
      referenceNumber: '20625031800166790002',
      amount: '+100'
    }
  ];

  return (
    <Card className="my-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <Tabs 
          defaultValue="payment" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="payment">Payment Transactions</TabsTrigger>
            <TabsTrigger value="loan">Loan Transactions</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="payment" className="mt-0">
          <TransactionsTable transactions={dummyTransactions} />
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span>Total Transaction Value</span>
              </div>
              <div className="text-2xl font-bold">₦935,670.00</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="loan" className="mt-0">
          <div className="p-8 text-center text-gray-500">
            No loan transactions available
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
