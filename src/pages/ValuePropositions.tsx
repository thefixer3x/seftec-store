
import React, { useEffect } from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';
import BusinessCounter from "@/components/ui/business-counter";
import { siteConfig } from '@/config/site';

const ValuePropositions = () => {
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-seftec-darkNavy">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-grow pt-20">
        <SolutionsSection />
        <ValuePropositionsDashboard />
        
        {/* Business Counter Section */}
        <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
          <div className="container mx-auto px-6">
            <BusinessCounter />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ValuePropositions;
