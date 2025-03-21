
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoanSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Active Loan Card */}
      <Card className="bg-blue-100 dark:bg-blue-900 border-none">
        <CardContent className="pt-6">
          <div className="mb-2 text-sm text-blue-700 dark:text-blue-300">Active loan</div>
          <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">NGNO</div>
        </CardContent>
      </Card>

      {/* Loan Limit Card */}
      <Card className="bg-gradient-to-r from-blue-700 to-indigo-800 border-none text-white">
        <CardContent className="pt-6">
          <div className="mb-2 text-xl">Your Loan Limit is</div>
          <div className="text-5xl font-bold text-yellow-400">100.0K</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-white" />
              <span>Disbursement within 24hrs</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-white" />
              <span>Pay small small</span>
            </div>
          </div>
          <Button className="mt-4 bg-yellow-400 text-blue-900 hover:bg-yellow-500">
            Request loan <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanSummaryCards;
