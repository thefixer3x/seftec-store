
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import SectionHeading from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import FAQSection from '@/components/faq/FAQSection';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Seftec.Store's B2B marketplace platform"
          align="center"
          className="mb-12"
        />

        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default FAQ;
