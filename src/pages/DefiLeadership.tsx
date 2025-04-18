
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DefiHero from '@/components/defi-leadership/DefiHero';
import DefiTabs from '@/components/defi-leadership/DefiTabs';
import { Toaster } from '@/components/ui/toaster';

const DefiLeadership = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-seftec-darkNavy">
        <DefiHero />
        <DefiTabs />
      </div>
      <Toaster />
    </MainLayout>
  );
};

export default DefiLeadership;
