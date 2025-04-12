
import React from 'react';
import { ArrowRight, Calendar, Target, Globe } from 'lucide-react';

const StrategicRoadmapSection = () => {
  return (
    <section id="strategic-roadmap" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Strategic Roadmap
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our vision for the future of enterprise DeFi
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-blue-600"></div>
            
            {/* Q3 2025 */}
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-odd:group-first:translate-y-px">
                <div className="absolute left-0 sm:left-0 h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center transform sm:translate-y-0.5 translate-x-1 sm:translate-x-6">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-xl font-bold text-blue-600 sm:pl-8 sm:translate-y-0.5">Q3 2025</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:pl-8 mx-auto sm:mx-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Cross-Chain Settlement Protocol</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Launch of our proprietary cross-chain settlement protocol enabling instant finality 
                      across multiple blockchain networks while maintaining full regulatory compliance.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Atomic cross-chain settlement with regulatory compliance</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Support for 12+ major blockchain networks</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Institutional-grade security and auditability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Q4 2025 */}
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-odd:group-first:translate-y-px">
                <div className="absolute left-0 sm:left-0 h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center transform sm:translate-y-0.5 translate-x-1 sm:translate-x-6">
                  <Target className="h-6 w-6" />
                </div>
                <div className="text-xl font-bold text-blue-600 sm:pl-8 sm:translate-y-0.5">Q4 2025</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:pl-8 mx-auto sm:mx-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Enterprise DeFi Marketplace</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Introduction of the first regulated enterprise DeFi marketplace, allowing institutional 
                      participants to access yield-generating opportunities with built-in risk assessment.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Curated DeFi protocols with institutional-grade risk ratings</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Automated compliance monitoring and reporting</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Treasury management optimization tools</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Q1 2026 */}
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-odd:group-first:translate-y-px">
                <div className="absolute left-0 sm:left-0 h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center transform sm:translate-y-0.5 translate-x-1 sm:translate-x-6">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="text-xl font-bold text-blue-600 sm:pl-8 sm:translate-y-0.5">Q1 2026</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:pl-8 mx-auto sm:mx-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Global Expansion</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Expansion of regulatory coverage to include APAC markets with local presence in 
                      Singapore, Tokyo, and Sydney, complementing our existing operations.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Compliance with MAS, JFSA, and ASIC regulatory frameworks</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Regional infrastructure for enhanced performance</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span>Strategic partnerships with regional financial institutions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Future Benefits for Enterprise Clients</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-3">Enhanced Liquidity Access</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Unlock access to global liquidity pools with institutional safeguards and compliance controls
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-3">Operational Efficiency</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Reduce settlement times and operational costs while maintaining enterprise-grade security
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-3">Competitive Advantage</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay ahead of the digital finance transformation with cutting-edge DeFi capabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmapSection;
