
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LoanTransactions = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="dark:bg-seftec-charcoal dark:border-white/10">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-between items-center'} mb-6`}>
          <Button variant="outline" className="text-sm px-3 py-1 h-auto dark:border-white/20 dark:text-white">
            Last 30 days ▼
          </Button>
          <Card className={`border p-4 bg-gray-50 dark:bg-seftec-darkNavy/50 dark:border-white/10 ${isMobile ? 'w-full' : ''}`}>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal" />
              <div>
                <p className="text-seftec-navy font-medium dark:text-white/80">Total Loan Amount</p>
                <p className="text-2xl font-bold text-seftec-navy dark:text-white">₦5,000.00</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="border-t dark:border-white/10 pt-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-500 text-sm dark:text-gray-400 truncate">2025-03-10T14:45:00.000+00:00</div>
              <div className="font-medium text-seftec-navy dark:text-white truncate">Loan Disbursement</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">LOAN98765432100</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Due Date: 2025-04-10</div>
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">+ 5,000</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanTransactions;
