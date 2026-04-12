
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Landmark } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LoanTransactions = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="dark:bg-seftec-charcoal dark:border-white/10">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-between items-center'} mb-6`}>
          <Card className={`border p-4 bg-muted/30 dark:border-white/10 ${isMobile ? 'w-full' : ''}`}>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground font-medium">Total Loan Amount</p>
                <p className="text-2xl font-bold text-foreground">₦0.00</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Landmark className="h-12 w-12 mb-3 text-muted-foreground/30" />
          <p className="font-medium text-muted-foreground">No loan transactions</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Loan disbursements and repayments will appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanTransactions;
