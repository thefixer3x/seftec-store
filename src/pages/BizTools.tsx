
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BizToolsHeader from '@/components/sections/BizToolsHeader';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';
import BusinessCounterSection from '@/components/sections/BusinessCounterSection';

const BizTools: React.FC = () => {
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <MainLayout>
      <main>
        {/* Header */}
        <BizToolsHeader />

        {/* Powerful Tools for Modern Businesses Dashboard */}
        <ValuePropositionsDashboard />

        {/* Value Propositions Section */}
        <ValuePropositionsSection />
        
        {/* Business Counter Section */}
        <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
          <div className="container mx-auto px-6">
            <BusinessCounterSection />
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default BizTools;
