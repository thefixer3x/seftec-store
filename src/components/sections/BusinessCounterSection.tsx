
import React from 'react';
import BusinessCounter from "@/components/ui/business-counter";

const BusinessCounterSection: React.FC = () => {
  return (
    <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <BusinessCounter />
      </div>
    </section>
  );
};

export default BusinessCounterSection;
