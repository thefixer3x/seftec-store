
import React from 'react';
import { Shield, Lock, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';

const TechnicalSolutionSection = () => {
  return (
    <section className="py-20 bg-seftec-slate dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-12">Technical Solution</h2>
          
          <div className="space-y-8">
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Layers className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Enterprise DeFi Platform
              </h3>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Our secure enterprise DeFi access platform enables seamless integration between traditional banking systems and blockchain solutions, providing:
              </p>
              <ul className="space-y-2 text-seftec-navy/70 dark:text-white/70">
                <li>• Automated trade finance workflows</li>
                <li>• Real-time settlement capabilities</li>
                <li>• Multi-currency support</li>
                <li>• Smart contract-based escrow services</li>
              </ul>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Shield className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                ISO 20022 Integration
              </h3>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Complete ISO 20022 compliance ensures interoperability with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-seftec-navy dark:text-white">Banking Systems</h4>
                  <ul className="text-sm text-seftec-navy/70 dark:text-white/70 space-y-1">
                    <li>• SWIFT network integration</li>
                    <li>• Cross-border payment systems</li>
                    <li>• Real-time gross settlement</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-seftec-navy dark:text-white">Blockchain Solutions</h4>
                  <ul className="text-sm text-seftec-navy/70 dark:text-white/70 space-y-1">
                    <li>• Smart contract automation</li>
                    <li>• DLT settlement networks</li>
                    <li>• Stablecoin integration</li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Lock className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Security & Risk Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Security Measures</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• Multi-signature wallets</li>
                    <li>• Hardware security modules</li>
                    <li>• 24/7 monitoring</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Risk Protocols</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• AI-driven risk assessment</li>
                    <li>• Automated compliance checks</li>
                    <li>• Real-time fraud detection</li>
                    <li>• Transaction monitoring</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSolutionSection;
