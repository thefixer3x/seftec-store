
import React from 'react';
import { MarketMetrics } from './sections/MarketMetrics';
import { CaseStudies } from './sections/CaseStudies';

export const MarketLeadershipSection = () => {
  return (
    <div className="py-16 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">
            Market Leadership Position
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            SEFTEC leads the enterprise DeFi revolution with proven metrics, global reach, 
            and transformative results for Fortune 500 companies worldwide.
          </p>
        </div>

        <div className="space-y-16">
          <MarketMetrics />
          <CaseStudies />
        </div>
      </div>
    </div>
  );
};
