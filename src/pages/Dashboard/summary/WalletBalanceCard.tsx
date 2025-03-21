
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WalletBalanceCard = () => {
  return (
    <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-none">
      <CardContent className="pt-6">
        <div className="mb-2 text-sm text-green-700 dark:text-green-300">Wallet balance</div>
        <div className="text-4xl font-bold text-green-900 dark:text-green-100">NGN8,880.00</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
            Send Money <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button variant="outline">
            Fund Wallet <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;
