
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DefiHighlightSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-seftec-slate dark:from-seftec-darkNavy dark:to-black">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-seftec-teal/10 text-seftec-teal dark:bg-seftec-teal/20 mb-4">
            DeFi Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-4">
            Pioneering ISO 20022 Compliant DeFi Solutions
          </h2>
          <p className="text-seftec-navy/70 dark:text-white/70 text-lg">
            Seftec leads the industry with our secure enterprise DeFi access platform that bridges traditional banking with blockchain innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
            <div className="font-bold text-2xl text-seftec-gold mb-2">10,000+</div>
            <div className="text-seftec-navy dark:text-white font-medium">Enterprise Users</div>
            <p className="text-seftec-navy/70 dark:text-white/70 mt-2 text-sm">
              Trusted by businesses across 30+ countries
            </p>
          </div>
          
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
            <div className="font-bold text-2xl text-seftec-teal mb-2">$1.2B</div>
            <div className="text-seftec-navy dark:text-white font-medium">Transaction Volume</div>
            <p className="text-seftec-navy/70 dark:text-white/70 mt-2 text-sm">
              Securely processed through our platform
            </p>
          </div>
          
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
            <div className="font-bold text-2xl text-seftec-purple mb-2">35%</div>
            <div className="text-seftec-navy dark:text-white font-medium">Cost Reduction</div>
            <p className="text-seftec-navy/70 dark:text-white/70 mt-2 text-sm">
              Average savings on cross-border payments
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild variant="default" className="group">
            <Link to="/defi-leadership" className="inline-flex items-center">
              Explore Our DeFi Leadership
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
