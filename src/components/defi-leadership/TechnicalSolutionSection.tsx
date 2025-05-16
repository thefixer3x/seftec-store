
import React from 'react';
import { Shield, Layers, Workflow } from 'lucide-react';

const TechnicalSolutionSection = () => {
  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">
          Our Technical Solution
        </h3>
        <p className="text-seftec-navy/70 dark:text-white/70">
          Seftec's platform creates a bridge between traditional finance and DeFi, leveraging ISO 20022 standards to ensure interoperability and compliance.
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Layers className="h-6 w-6 text-seftec-gold mr-3" />
              <h4 className="text-lg font-semibold">ISO 20022 Integration</h4>
            </div>
            <p className="mb-4">
              Our platform fully integrates ISO 20022 standards to ensure messages between traditional banks and blockchain networks are standardized and universally understood.
            </p>
            <ul className="space-y-2 pl-6 list-disc">
              <li>Standardized financial messaging across chains</li>
              <li>Seamless interoperability with banking systems</li>
              <li>Rich, structured data for enhanced compliance</li>
              <li>Future-proofed for global financial standards</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-seftec-teal mr-3" />
              <h4 className="text-lg font-semibold">Security Framework</h4>
            </div>
            <p className="mb-4">
              Enterprise-grade security is at the core of our platform, ensuring peace of mind for businesses transacting on our network.
            </p>
            <ul className="space-y-2 pl-6 list-disc">
              <li>Multi-party computation (MPC) cryptography</li>
              <li>Hardware security modules (HSMs)</li>
              <li>Ongoing security audits by top firms</li>
              <li>Regulatory compliance in 30+ jurisdictions</li>
              <li>Sophisticated AML/KYC automation</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <Workflow className="h-6 w-6 text-seftec-purple mr-3" />
            <h4 className="text-lg font-semibold">Integration Examples</h4>
          </div>
          <p className="mb-4">
            Our platform enables enterprises to seamlessly integrate with both traditional and decentralized finance systems:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">ERP Integration</h5>
              <p className="text-sm">Connect your existing enterprise systems like SAP, Oracle, or Microsoft Dynamics directly to blockchain payment rails without changing your workflow.</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Banking System Bridges</h5>
              <p className="text-sm">Connect directly to existing banking infrastructure through our certified ISO 20022 message translation layer.</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Treasury Management</h5>
              <p className="text-sm">Allow corporate treasurers to manage both traditional and crypto assets from one secure interface.</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Regulatory Reporting</h5>
              <p className="text-sm">Automated compliance reports for financial authorities across multiple jurisdictions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSolutionSection;
