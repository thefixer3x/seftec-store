
import React, { useEffect } from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import SolutionsSection from '@/components/sections/SolutionsSection';
import BusinessCounter from "@/components/ui/business-counter";
import { siteConfig } from '@/config/site';
import { Toaster } from "@/components/ui/toaster";

const Solutions = () => {
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-seftec-darkNavy">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-grow pt-20">
        <div className="py-12 bg-gray-50 dark:bg-seftec-navy/30">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-4 text-seftec-navy dark:text-white">Our Solutions</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Discover how our marketplace platform can transform your business operations.
            </p>
          </div>
        </div>
        
        <SolutionsSection />
        
        {/* Business Counter Section */}
        <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
          <div className="container mx-auto px-6">
            <BusinessCounter />
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Solutions;
