
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { DefiHero } from '@/components/defi-leadership/DefiHero';
import { DefiLeadershipContent } from '@/components/defi-leadership/DefiLeadershipContent';
import { DefiTabs } from '@/components/defi-leadership/DefiTabs';

const DefiLeadership: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <DefiHero />
        <DefiTabs />
        <DefiLeadershipContent />
      </div>
    </MainLayout>
  );
};

export default DefiLeadership;
