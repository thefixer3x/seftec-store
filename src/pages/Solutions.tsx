
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SolutionsSection from '@/components/sections/SolutionsSection';
import BusinessCounter from "@/components/ui/business-counter";
import { useDocumentTitle } from '@/hooks/use-document-title';

const Solutions = () => {
  // Set page title
  useDocumentTitle('Enterprise Solutions | SEFTEC');
  
  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Solutions;
