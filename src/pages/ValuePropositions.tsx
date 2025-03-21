
import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';
import { siteConfig } from '@/config/site';

const ValuePropositions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container">
        <MainNav items={siteConfig.mainNav} />
      </div>
      <main className="flex-grow pt-20">
        <SolutionsSection />
        <ValuePropositionsDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default ValuePropositions;
