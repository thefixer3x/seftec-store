
import React from 'react';
import { CheckCircle, User, Building, Award } from 'lucide-react';

export const MarketLeadershipSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-seftec-navy dark:text-white">Market Position & Recognition</h3>
        
        <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">250+</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">$4.2B</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70">Transaction Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">32</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">99.9%</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70">Platform Uptime</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium mb-2 text-seftec-navy dark:text-white">Industry Recognition</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Award className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <span className="text-seftec-navy/80 dark:text-white/80">2024 FinTech Breakthrough Award for Best Enterprise DeFi Platform</span>
              </li>
              <li className="flex items-start">
                <Award className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <span className="text-seftec-navy/80 dark:text-white/80">Recognized by Gartner as a DeFi Leader for Enterprise Solutions</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-seftec-navy dark:text-white">Competitive Advantages</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <span className="text-seftec-navy/80 dark:text-white/80">ISO 20022 compliance integration with traditional banking systems</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <span className="text-seftec-navy/80 dark:text-white/80">Enterprise-grade security with multi-signature authorization</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <span className="text-seftec-navy/80 dark:text-white/80">Regulatory compliance across 30+ jurisdictions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <span className="text-seftec-navy/80 dark:text-white/80">Seamless API integration with existing enterprise systems</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="space-y-8">
        <h3 className="text-2xl font-bold mb-4 text-seftec-navy dark:text-white">Enterprise Success Stories</h3>
        
        <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-seftec-navy/10 dark:bg-white/10 p-3 rounded-full mr-4">
              <Building className="h-6 w-6 text-seftec-navy dark:text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-seftec-navy dark:text-white">Global Logistics Corporation</h4>
              <p className="text-sm text-seftec-navy/60 dark:text-white/60">Fortune 500 Shipping & Logistics</p>
            </div>
          </div>
          <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
            Reduced cross-border payment settlement times from 3-5 days to under 1 hour while 
            cutting transaction costs by 63% through our DeFi payment infrastructure.
          </p>
          <div className="text-sm font-medium text-seftec-gold dark:text-seftec-teal">
            $1.2B annual transaction volume
          </div>
        </div>
        
        <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-seftec-navy/10 dark:bg-white/10 p-3 rounded-full mr-4">
              <Building className="h-6 w-6 text-seftec-navy dark:text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-seftec-navy dark:text-white">International Banking Group</h4>
              <p className="text-sm text-seftec-navy/60 dark:text-white/60">Top 10 European Financial Institution</p>
            </div>
          </div>
          <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
            Implemented our secure DeFi bridge to offer corporate clients access to blockchain-based 
            financial products while maintaining full regulatory compliance.
          </p>
          <div className="text-sm font-medium text-seftec-gold dark:text-seftec-teal">
            Serving 120+ corporate clients
          </div>
        </div>
      </div>
    </div>
  );
};
