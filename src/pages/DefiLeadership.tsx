
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { DefiLeadershipContent } from '@/components/defi-leadership/DefiLeadershipContent';
import { DefiHero } from '@/components/defi-leadership/DefiHero';

const DefiLeadership = () => {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-seftec-darkNavy min-h-screen">
        <DefiHero />
        <DefiLeadershipContent />
      </div>
    </MainLayout>
  );
};

export default DefiLeadership;
