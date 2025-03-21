
import React, { useState } from 'react';
import BankAccountInfo from './wallet/BankAccountInfo';
import WalletBalanceCard from './wallet/WalletBalanceCard';
import TransactionTabs from './wallet/TransactionTabs';

const WalletTab = () => {
  const [transactionTab, setTransactionTab] = useState("payment");

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Account Info */}
        <BankAccountInfo />

        {/* Empty Card for Layout */}
        <div></div>

        {/* Wallet Balance Card */}
        <WalletBalanceCard />
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
