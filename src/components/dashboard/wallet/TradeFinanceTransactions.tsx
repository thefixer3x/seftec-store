
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const TradeFinanceTransactions = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Briefcase className="h-12 w-12 mb-3 text-muted-foreground/30" />
          <p className="font-medium text-muted-foreground">No trade finance transactions</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Active letters of credit and trade guarantees will appear here.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-3">
            Visit the Trade Finance page to apply for new facilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeFinanceTransactions;
