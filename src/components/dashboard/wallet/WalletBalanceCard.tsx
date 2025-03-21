
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const WalletBalanceCard = () => {
  return (
    <Card className="bg-green-100 shadow-sm border">
      <CardContent className="p-6">
        <p className="text-green-800 mb-2">Wallet balance</p>
        <h2 className="text-4xl font-bold">NGN12,500.00</h2>
        <div className="flex mt-4 space-x-4">
          <Button className="bg-blue-700 hover:bg-blue-800">
            Send Money
            <ArrowUp className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
            Fund Wallet
            <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;
