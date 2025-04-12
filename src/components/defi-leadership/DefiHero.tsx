
import React from 'react';
import { Shield, TrendingUp, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DefiHero = () => {
  return (
    <div className="relative py-16 sm:py-24 bg-gradient-to-r from-seftec-slate to-white dark:from-seftec-navy/30 dark:to-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <div className="flex items-center mb-6">
            <Badge variant="outline" className="bg-seftec-gold/10 dark:bg-seftec-teal/10 text-seftec-gold dark:text-seftec-teal border-seftec-gold/20 dark:border-seftec-teal/20 px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="font-medium">DeFi Leadership</span>
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-seftec-navy dark:text-white mb-6">
            Pioneering <span className="text-seftec-gold dark:text-seftec-teal">Enterprise DeFi</span> Solutions
          </h1>
          
          <p className="text-xl text-seftec-navy/70 dark:text-white/70 mb-8 max-w-3xl">
            Seftec is leading the transformation of enterprise finance through ISO 20022 compliant decentralized financial solutions that bridge traditional banking with blockchain innovation.
          </p>
          
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <div>
                <h3 className="font-medium text-seftec-navy dark:text-white">ISO 20022 Compliant</h3>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Global standard compatibility</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full mr-4">
                <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <div>
                <h3 className="font-medium text-seftec-navy dark:text-white">Enterprise-Grade Security</h3>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Bank-level protection</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <div>
                <h3 className="font-medium text-seftec-navy dark:text-white">Future-Ready Architecture</h3>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Adaptable to evolving DeFi landscape</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
