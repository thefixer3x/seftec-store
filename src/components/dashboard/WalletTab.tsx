
import React, { useState } from 'react';
import BankAccountInfo from './wallet/BankAccountInfo';
import WalletBalanceCard from './wallet/WalletBalanceCard';
import TransactionTabs from './wallet/TransactionTabs';
import FinancialDashboard from '@/components/account/FinancialDashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp } from 'lucide-react';

const WalletTab = () => {
  const [transactionTab, setTransactionTab] = useState("payment");
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-4 md:space-y-6 p-2 md:p-0">
      {/* Wallet Balance always at top on mobile */}
      {isMobile && (
        <WalletBalanceCard />
      )}
      
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
        {/* Bank Account Info */}
        <BankAccountInfo />

        {/* Wallet Balance Card - Only show here on desktop */}
        {!isMobile && (
          <WalletBalanceCard />
        )}
      </div>

      {/* Transactions Section */}
      <TransactionTabs 
        activeTab={transactionTab} 
        onTabChange={setTransactionTab} 
      />

      {/* Financial Services Section */}
      <Card className="mt-6 md:mt-8 bg-white dark:bg-seftec-darkNavy/80 border border-seftec-navy/10 dark:border-white/10">
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
            <CardTitle className="text-lg md:text-xl text-seftec-navy dark:text-white">Financial Services</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <FinancialDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletTab;
