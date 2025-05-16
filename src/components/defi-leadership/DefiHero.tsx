
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const DefiHero = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-3">
        <Badge className="bg-gradient-to-r from-seftec-teal to-seftec-purple text-white px-3 py-1">
          <Shield className="h-3 w-3 mr-1" /> ISO 20022 Compliant
        </Badge>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-seftec-navy dark:text-white mb-4">
        DeFi Leadership at Seftec
      </h1>
      
      <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-3xl mx-auto">
        Leading the decentralized finance revolution with secure enterprise solutions,
        ISO 20022 compliance, and innovative cross-border payment capabilities
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-400/30 py-1.5">
          Enterprise DeFi
        </Badge>
        <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-400/30 py-1.5">
          Cross-Border Payments
        </Badge>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-400/30 py-1.5">
          Blockchain Security
        </Badge>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-400/30 py-1.5">
          Financial Compliance
        </Badge>
      </div>
    </div>
  );
};
