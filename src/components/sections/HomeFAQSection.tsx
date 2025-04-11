
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/section-heading';
import FAQSection from '@/components/faq/FAQSection';

const HomeFAQSection = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our B2B marketplace platform"
          align="center"
          className="mb-8"
        />
        
        <div className="max-w-4xl mx-auto">
          <FAQSection compact />
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
            <Link to="/faq">
              View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;
