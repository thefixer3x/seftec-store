
import React, { useState } from 'react';
import BankAccountInfo from './wallet/BankAccountInfo';
import WalletBalanceCard from './wallet/WalletBalanceCard';
import TransactionTabs from './wallet/TransactionTabs';
import { useIsMobile } from '@/hooks/use-mobile';

const WalletTab = () => {
  const [transactionTab, setTransactionTab] = useState("payment");
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-6">
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
    </div>
  );
};

export default WalletTab;
