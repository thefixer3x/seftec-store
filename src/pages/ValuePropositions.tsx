
import React from 'react';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';
import MainLayout from '@/components/layout/MainLayout';

const ValuePropositions = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <main className="flex-1">
          <SolutionsSection />
          <ValuePropositionsDashboard />
        </main>
      </div>
    </MainLayout>
  );
};

export default ValuePropositions;
