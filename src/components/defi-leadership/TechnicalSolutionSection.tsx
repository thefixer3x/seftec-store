
import React from 'react';
import { Shield, Link, Layers, Lock } from 'lucide-react';

const TechnicalSolutionSection = () => {
  return (
    <section id="technical-solution" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Technical Solution
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Secure, compliant, and enterprise-ready DeFi infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            <Link className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">ISO 20022 Integration</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Seamless interoperability between traditional banking systems and blockchain networks through native 
              support for ISO 20022 message formats.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Real-time message conversion between legacy systems and blockchain protocols</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Preservation of essential data elements and business content</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Regulatory-compliant reporting and audit capabilities</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Security Framework</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Institutional-grade security measures designed to protect digital assets and transactions 
              while maintaining regulatory compliance.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Multi-layered encryption and key management system</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Real-time transaction monitoring with AI-powered risk detection</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Hardware security module (HSM) integration</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            <Layers className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Hybrid Architecture</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Flexible deployment options that bridge public and private blockchain networks with existing enterprise systems.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Support for major public blockchains including Ethereum, Solana, and Polkadot</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Private permissioned network deployment options</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Integration with legacy ERP and banking systems</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            <Lock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Compliance Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Built-in compliance controls and reporting capabilities to satisfy regulatory requirements across multiple jurisdictions.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Automated KYC/AML verification for DeFi transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Transaction monitoring and suspicious activity reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Comprehensive audit trails and compliance documentation</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Integration Example</h3>
          <img 
            src="/placeholder.svg" 
            alt="Seftec Integration Diagram" 
            className="mx-auto rounded-lg shadow-lg mb-6 max-w-full h-auto"
          />
          <p className="text-gray-600 dark:text-gray-300">
            The Seftec platform serves as the secure bridge between enterprise systems and DeFi protocols, 
            with ISO 20022 message handling ensuring data integrity and compliance throughout the process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSolutionSection;
