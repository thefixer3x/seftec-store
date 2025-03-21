
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const WalletBalanceCard = () => {
  return (
    <Card className="bg-seftec-slate dark:bg-seftec-charcoal shadow-sm border border-seftec-lightgray dark:border-white/10">
      <CardContent className="p-6">
        <p className="text-seftec-navy dark:text-white/80 mb-2">Wallet balance</p>
        <h2 className="text-4xl font-bold text-seftec-navy dark:text-white">NGN12,500.00</h2>
        <div className="flex mt-4 space-x-4">
          <Button className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
            Send Money
            <ArrowUp className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/10 dark:border-seftec-teal dark:text-seftec-teal dark:hover:bg-seftec-teal/10">
            Fund Wallet
            <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;
