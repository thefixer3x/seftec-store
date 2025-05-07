
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Layers, Network, LockKeyhole, Server, Workflow } from 'lucide-react';

const TechnicalSolutionSection = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-3">Enterprise DeFi Access Platform</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Seftec's secure enterprise DeFi access platform enables traditional financial institutions to connect with decentralized finance protocols while maintaining regulatory compliance, security, and operational efficiency.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Layers className="h-5 w-5 mr-2 text-seftec-teal" />
                Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Our platform uses a modular, multi-layer architecture that separates concerns between protocol access, compliance checks, and enterprise integration, ensuring flexibility and security.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Network className="h-5 w-5 mr-2 text-seftec-purple" />
                Connectivity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Supporting multiple blockchain networks including Ethereum, Polygon, Avalanche, and Solana, with robust node infrastructure and redundancy to ensure 99.99% uptime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ISO 20022 Integration */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-3">ISO 20022 Compliance</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <p className="text-blue-700 dark:text-blue-300">
            Our platform implements full ISO 20022 message standards, enabling seamless integration between traditional financial messaging and blockchain-based transactions, ensuring banks and financial institutions can maintain existing workflows while leveraging DeFi capabilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Message Translation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatic conversion between ISO 20022 XML formats and blockchain transaction formats
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Common Data Model</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unified data representation across traditional and DeFi systems
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Interoperability</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seamless communication with SWIFT, SEPA, and other financial networks
            </p>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Security & Compliance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-seftec-teal mb-4" />
              <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Multi-layer Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hardware security modules, multi-sig authorization, and biometric authentication
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <LockKeyhole className="h-10 w-10 text-seftec-purple mb-4" />
              <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Encryption</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                End-to-end encryption for all data in transit and at rest
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Server className="h-10 w-10 text-seftec-gold mb-4" />
              <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Auditing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Immutable audit trails and real-time compliance monitoring
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 md:col-span-3">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Workflow className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="font-medium text-seftec-navy dark:text-white mb-2">Risk Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automated risk assessment, circuit breakers, and parameter limits to prevent unexpected losses
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Examples */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">Integration Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Use Case</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Traditional System</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">DeFi Protocol</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Integration Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Cross-border Payments</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">SWIFT</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Circle, USDC</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">API Gateway + Message Translation</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Treasury Management</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">SAP Treasury</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Aave, Compound</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Yield Aggregator + Risk Controls</td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Trade Finance</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Letters of Credit</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Smart Contracts</td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Document Verification + Oracle Bridge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TechnicalSolutionSection;
