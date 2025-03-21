
import React from 'react';
import BusinessCounter from "@/components/ui/business-counter";
import { Badge } from "@/components/ui/badge";

const BusinessCounterSection: React.FC = () => {
  return (
    <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30">
            LIVE
          </Badge>
        </div>
        <BusinessCounter />
      </div>
    </section>
  );
};

export default BusinessCounterSection;
