
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoanSummaryCards from '../summary/LoanSummaryCards';
import WalletBalanceCard from '../summary/WalletBalanceCard';
import TransactionsCard from '../transactions/TransactionsCard';
import StoresCard from '../stores/StoresCard';

const DashboardContent = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("payment");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {profile?.first_name || 'User'}</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's an overview of your account</p>
      </div>

      <LoanSummaryCards />
      <WalletBalanceCard />
      <TransactionsCard activeTab={activeTab} setActiveTab={setActiveTab} />
      <StoresCard />
    </main>
  );
};

export default DashboardContent;
