
import React from 'react';
import { TechnicalIntegration } from './sections/TechnicalIntegration';

export const TechnicalSolutionSection = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">
            Enterprise DeFi Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our secure, ISO 20022 compliant platform bridges traditional banking 
            with blockchain innovation, delivering enterprise-grade DeFi solutions.
          </p>
        </div>

        <TechnicalIntegration />
      </div>
    </div>
  );
};
