
import React from 'react';
import { DefiHero } from '@/components/defi-leadership/DefiHero';
import { DefiTabs } from '@/components/defi-leadership/DefiTabs';
import MainLayout from '@/components/layout/MainLayout';

const DefiLeadership = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <DefiHero />
        <DefiTabs />
      </div>
    </MainLayout>
  );
};

export default DefiLeadership;
