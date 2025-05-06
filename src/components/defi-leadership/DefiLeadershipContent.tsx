
import React from 'react';

const DefiLeadershipContent = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Market Leadership Position</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-3">Industry Recognition</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Seftec has established itself as a frontrunner in the decentralized finance space, with our enterprise-grade solutions being adopted by over 120 financial institutions worldwide. Our DeFi access platform processes more than $2.8 billion in monthly transaction volume, representing a 35% increase year-over-year.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded text-center">
                <p className="text-2xl font-bold text-seftec-teal">120+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Financial institutions</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded text-center">
                <p className="text-2xl font-bold text-seftec-teal">$2.8B</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly volume</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded text-center">
                <p className="text-2xl font-bold text-seftec-teal">35%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">YoY growth</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-3">Enterprise Success Stories</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-seftec-teal pl-4">
                <h4 className="font-medium">Global Banking Leader</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Implemented seftec's DeFi access platform to bridge traditional banking systems with blockchain networks, resulting in 42% reduction in cross-border transaction costs and 87% faster settlement times.
                </p>
              </div>
              <div className="border-l-4 border-seftec-gold pl-4">
                <h4 className="font-medium">Fortune 500 Financial Services Group</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Leveraged our ISO 20022 compliant solutions to build a unified payment system connecting traditional rails to multiple blockchain networks, processing over 1.2 million transactions daily with 99.99% uptime.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-seftec-darkNavy/50 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-3">Key Competitive Advantages</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Industry-first ISO 20022 compliant DeFi access platform</li>
              <li>Enterprise-grade security with multi-layer encryption and zero-knowledge proofs</li>
              <li>Unified API connecting traditional financial systems to multiple blockchain networks</li>
              <li>Compliance-first approach with built-in regulatory reporting</li>
              <li>24/7 enterprise support with dedicated solution architects</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefiLeadershipContent;
