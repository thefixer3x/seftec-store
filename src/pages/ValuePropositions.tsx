
import React, { useEffect } from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-grow">
        {/* Value Propositions Header */}
        <div className="py-12 bg-gray-50 dark:bg-seftec-navy/30">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-4 text-seftec-navy dark:text-white">Our Value Propositions</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Discover how our platform creates unique value for your business through intelligent solutions.
            </p>
          </div>
        </div>

        <ValuePropositionsSection />
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
