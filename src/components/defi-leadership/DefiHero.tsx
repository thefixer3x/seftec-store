
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp } from 'lucide-react';

export const DefiHero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-white to-seftec-slate dark:from-seftec-darkNavy dark:to-seftec-navy/90">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center gap-3 mb-6">
            <Badge variant="outline" className="bg-seftec-gold/10 border-seftec-gold/30 text-seftec-navy dark:bg-seftec-teal/10 dark:border-seftec-teal/30 dark:text-white px-3 py-1">
              <Shield className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal" />
              ISO 20022 Compliant
            </Badge>
            <Badge variant="outline" className="bg-seftec-navy/10 border-seftec-navy/30 text-seftec-navy dark:bg-white/10 dark:border-white/30 dark:text-white px-3 py-1">
              <TrendingUp className="h-4 w-4 mr-2 text-seftec-navy dark:text-white" />
              Enterprise DeFi Leadership
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-seftec-navy dark:text-white">
            Leading the DeFi Revolution for Enterprise
          </h1>
          
          <p className="text-lg md:text-xl text-seftec-navy/70 dark:text-white/70 mb-8 max-w-3xl mx-auto">
            seftec is pioneering secure, compliant, and scalable decentralized finance solutions 
            that bridge traditional banking with blockchain innovation for global enterprises.
          </p>
        </div>
      </div>
    </section>
  );
};
