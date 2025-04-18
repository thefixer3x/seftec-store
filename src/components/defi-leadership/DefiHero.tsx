
import React from 'react';
import { Shield, TrendingUp, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DefiHero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-seftec-navy/5 to-transparent dark:from-seftec-purple/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 border border-seftec-gold/20 dark:border-seftec-teal/20 mb-6">
            <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
            <span className="text-sm font-medium text-seftec-navy dark:text-white">ISO 20022 Compliant</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-seftec-navy dark:text-white">
            Pioneering Enterprise DeFi Solutions
          </h1>
          
          <p className="text-xl text-seftec-navy/70 dark:text-white/70 mb-12 max-w-2xl mx-auto">
            Seftec is transforming enterprise finance with secure, compliant DeFi solutions that bridge traditional banking and blockchain innovation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-seftec-navy/10 dark:border-white/10">
              <TrendingUp className="h-8 w-8 text-seftec-gold dark:text-seftec-teal mb-4 mx-auto" />
              <h3 className="font-semibold text-seftec-navy dark:text-white mb-2">$2.5B+</h3>
              <p className="text-sm text-seftec-navy/70 dark:text-white/70">Transaction Volume</p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-seftec-navy/10 dark:border-white/10">
              <Lock className="h-8 w-8 text-seftec-gold dark:text-seftec-teal mb-4 mx-auto" />
              <h3 className="font-semibold text-seftec-navy dark:text-white mb-2">100%</h3>
              <p className="text-sm text-seftec-navy/70 dark:text-white/70">Regulatory Compliance</p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-seftec-navy/10 dark:border-white/10">
              <Shield className="h-8 w-8 text-seftec-gold dark:text-seftec-teal mb-4 mx-auto" />
              <h3 className="font-semibold text-seftec-navy dark:text-white mb-2">500+</h3>
              <p className="text-sm text-seftec-navy/70 dark:text-white/70">Enterprise Clients</p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-seftec-navy dark:bg-gradient-to-r dark:from-seftec-teal dark:to-seftec-purple text-white"
          >
            Explore Our Solutions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DefiHero;
