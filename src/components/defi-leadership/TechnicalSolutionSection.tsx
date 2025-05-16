
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Workflow, Globe, FileCode } from 'lucide-react';

interface TechnicalSolutionSectionProps {
  isActive: boolean;
}

export const TechnicalSolutionSection: React.FC<TechnicalSolutionSectionProps> = ({ isActive }) => {
  const securityMeasures = [
    'Hardware Security Modules (HSMs) for key management',
    'Multi-Party Computation (MPC) cryptography',
    'Zero-knowledge proof verifications',
    'Real-time transaction monitoring with AI anomaly detection'
  ];

  const integrationExamples = [
    'Seamless connection with legacy ERP and accounting systems',
    'API-based integration with traditional banking infrastructure',
    'Smart contract automation for trade finance',
    'Cross-chain interoperability with major blockchain networks'
  ];

  return (
    <div className="space-y-10 animate-fade-in" style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* Platform Overview */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Secure Enterprise DeFi Platform</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Seftec's enterprise DeFi access platform bridges traditional finance and decentralized technologies 
              through a secure, compliant infrastructure. Our platform enables businesses to leverage the efficiency 
              and transparency of blockchain while maintaining the security and compliance standards required by 
              enterprise organizations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-seftec-teal" />
                  <h4 className="font-semibold">Enterprise-Grade Security</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 pl-7">
                  Multi-layered security architecture with HSM protection, MPC cryptography, and continuous 
                  monitoring to ensure institutional-level protection.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-seftec-teal" />
                  <h4 className="font-semibold">Global Compliance Framework</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 pl-7">
                  Automated regulatory compliance across multiple jurisdictions with built-in reporting 
                  and audit trail capabilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* ISO 20022 Integration */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">ISO 20022 Integration</h3>
        <Card>
          <CardHeader>
            <CardTitle>Bridging Traditional Banking & Blockchain</CardTitle>
            <CardDescription>
              ISO 20022 is the international standard for financial messaging that enables seamless 
              interoperability between financial institutions globally.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300">
                Seftec's implementation of ISO 20022 standards creates a unified framework for financial 
                messaging across traditional and blockchain systems. This enables:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2 text-seftec-navy dark:text-white">Standardized Data Exchange</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Common data format across all financial systems reduces errors and improves straight-through processing.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2 text-seftec-navy dark:text-white">Enhanced Messaging Capabilities</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rich, structured data enables more complex financial products and services across blockchain and traditional systems.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2 text-seftec-navy dark:text-white">Regulatory Compliance</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built-in compliance with global financial reporting requirements and anti-money laundering protocols.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2 text-seftec-navy dark:text-white">Future-Proof Architecture</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Support for evolving financial technologies and emerging market requirements through extensible design.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Security Measures */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Security & Risk Management</h3>
        <ul className="grid grid-cols-1 gap-4">
          {securityMeasures.map((measure, index) => (
            <li key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <Shield className="h-5 w-5 text-seftec-teal flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200">{measure}</span>
            </li>
          ))}
        </ul>
      </section>
      
      {/* Integration Examples */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Integration Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {integrationExamples.map((example, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <FileCode className="h-5 w-5 text-seftec-teal mt-1" />
                  <p className="text-gray-700 dark:text-gray-300">{example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
