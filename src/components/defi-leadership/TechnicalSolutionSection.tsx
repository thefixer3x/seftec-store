
import React from 'react';
import { Shield, Link as LinkIcon, LockKeyhole, Zap, FileCheck } from 'lucide-react';

export const TechnicalSolutionSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">Our Enterprise DeFi Platform</h3>
        <p className="text-lg text-seftec-navy/80 dark:text-white/80 mb-8 max-w-3xl">
          The seftec Enterprise DeFi Access Platform provides secure, compliant, and scalable access 
          to decentralized finance opportunities while maintaining the robust controls and security 
          required by large organizations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg shadow-sm">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="font-semibold mb-2 text-seftec-navy dark:text-white">Enterprise-Grade Security</h4>
            <p className="text-seftec-navy/70 dark:text-white/70">
              Multi-signature authorization, hardware security modules, and MPC cryptography 
              ensure institutional-level protection of assets.
            </p>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg shadow-sm">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="font-semibold mb-2 text-seftec-navy dark:text-white">Seamless Integration</h4>
            <p className="text-seftec-navy/70 dark:text-white/70">
              API-first architecture allows for easy integration with existing enterprise 
              systems and workflows without disruption.
            </p>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg shadow-sm">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <FileCheck className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="font-semibold mb-2 text-seftec-navy dark:text-white">Complete Compliance</h4>
            <p className="text-seftec-navy/70 dark:text-white/70">
              Built-in regulatory compliance features for KYC, AML, and reporting 
              requirements across global jurisdictions.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">ISO 20022 Compliance & Integration</h3>
        
        <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">Bridging Traditional & Blockchain Finance</h4>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Our ISO 20022 compliant messaging framework ensures seamless interoperability between 
                traditional banking systems and blockchain networks, enabling:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Zap className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">End-to-end payment tracking with rich data</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">Standardized financial messaging across platforms</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">Automated regulatory reporting and compliance</span>
                </li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">Technical Implementation</h4>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Our platform's ISO 20022 integration provides a comprehensive solution for financial institutions:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <LockKeyhole className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">Message translation layer between legacy systems and blockchain networks</span>
                </li>
                <li className="flex items-start">
                  <LockKeyhole className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">Data enrichment and validation for cross-border payments</span>
                </li>
                <li className="flex items-start">
                  <LockKeyhole className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span className="text-seftec-navy/80 dark:text-white/80">Smart contracts that enforce ISO 20022 standards on-chain</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
