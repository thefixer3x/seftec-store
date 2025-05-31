
import React, { useEffect } from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';
import BizToolsHeader from '@/components/sections/BizToolsHeader';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';
import BusinessCounterSection from '@/components/sections/BusinessCounterSection';
import { Toaster } from "@/components/ui/toaster";

const BizTools: React.FC = () => {
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-grow">
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
      <Footer />
      <Toaster />
    </div>
  );
};

export default BizTools;
