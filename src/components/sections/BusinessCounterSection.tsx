
import React from 'react';
import BusinessCounter from "@/components/ui/business-counter";
import { Badge } from "@/components/ui/badge";

const BusinessCounterSection: React.FC = () => {
  return (
    <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-400/30">
            SANDBOX MODE
          </Badge>
        </div>
        <BusinessCounter />
      </div>
    </section>
  );
};

export default BusinessCounterSection;
