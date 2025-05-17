
import React from 'react';
import { Calendar, Milestone, Target, Users } from 'lucide-react';

export const StrategicRoadmapSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">Product Development Timeline</h3>
        
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-seftec-navy/20 dark:bg-white/20"></div>
          
          <div className="space-y-12">
            {/* Q2 2025 */}
            <div className="relative pl-16">
              <div className="absolute left-0 w-10 h-10 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-seftec-gold dark:text-seftec-teal mb-1">Q2 2025</div>
                <h4 className="text-lg font-semibold mb-2 text-seftec-navy dark:text-white">
                  Enhanced Enterprise DeFi Dashboard
                </h4>
                <ul className="space-y-2 text-seftec-navy/80 dark:text-white/80">
                  <li>• Advanced treasury management tools for digital assets</li>
                  <li>• Multi-jurisdiction compliance automation</li>
                  <li>• Integration with major ERP systems</li>
                </ul>
              </div>
            </div>
            
            {/* Q4 2025 */}
            <div className="relative pl-16">
              <div className="absolute left-0 w-10 h-10 rounded-full bg-seftec-navy dark:bg-white/80 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white dark:text-seftec-navy" />
              </div>
              <div>
                <div className="text-sm font-medium text-seftec-navy dark:text-white/80 mb-1">Q4 2025</div>
                <h4 className="text-lg font-semibold mb-2 text-seftec-navy dark:text-white">
                  Cross-Chain Liquidity Protocol
                </h4>
                <ul className="space-y-2 text-seftec-navy/80 dark:text-white/80">
                  <li>• Enterprise-grade liquidity pools with institutional access controls</li>
                  <li>• Market-making capabilities for treasury departments</li>
                  <li>• Dynamic yield optimization with risk management guardrails</li>
                </ul>
              </div>
            </div>
            
            {/* Q2 2026 */}
            <div className="relative pl-16">
              <div className="absolute left-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Q2 2026</div>
                <h4 className="text-lg font-semibold mb-2 text-seftec-navy dark:text-white">
                  Enterprise DeFi Marketplace
                </h4>
                <ul className="space-y-2 text-seftec-navy/80 dark:text-white/80">
                  <li>• Tokenized real-world asset exchange for institutional investors</li>
                  <li>• Fully compliant securities token offering platform</li>
                  <li>• Enterprise-grade lending protocols with automated risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">Strategic Partnerships</h3>
          
          <div className="space-y-5">
            <div className="flex items-start">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-2 rounded-full mr-4">
                <Users className="h-5 w-5 text-seftec-navy dark:text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-seftec-navy dark:text-white">Global Banking Alliance</h4>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Partnership with consortium of 12 major banks to develop ISO 20022 
                  compliant DeFi solutions for institutional clients.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-2 rounded-full mr-4">
                <Users className="h-5 w-5 text-seftec-navy dark:text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-seftec-navy dark:text-white">Enterprise Blockchain Consortium</h4>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Founding member of industry-wide initiative to establish 
                  standards for enterprise blockchain adoption.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-2 rounded-full mr-4">
                <Users className="h-5 w-5 text-seftec-navy dark:text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-seftec-navy dark:text-white">Regulatory Technology Integration</h4>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Strategic integration with leading RegTech providers to enhance 
                  compliance capabilities across multiple jurisdictions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">Upcoming DeFi Capabilities</h3>
          
          <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm mb-6">
            <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">Enterprise Treasury Management</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Target className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-seftec-navy dark:text-white">Digital Asset Custody Solution</span>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    Institutional-grade custody with governance controls and multi-party approval workflows
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Target className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-seftec-navy dark:text-white">Yield Generation Strategies</span>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    Risk-assessed DeFi yield strategies tailored for corporate treasury requirements
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">Cross-Border Payment Optimization</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Target className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-seftec-navy dark:text-white">Real-Time Settlement Network</span>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    24/7 settlement capability with ISO 20022 compliant messaging across borders
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Target className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-seftec-navy dark:text-white">Multi-Currency Liquidity Pools</span>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    Optimized FX rates through blockchain-based liquidity with reduced counterparty risk
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
