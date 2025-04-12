
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Link, Layers } from 'lucide-react';

const DefiTabs = () => {
  const [activeTab, setActiveTab] = useState('market');
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-up">
      <Tabs defaultValue="market" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <TabsTrigger value="market" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Market Leadership</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="technical" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Technical Solution</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Strategic Roadmap</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="mt-6 animate-fade-up">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Market Leadership Position</h3>
            <p>
              Seftec has established itself as a leader in the enterprise DeFi space, with over 150+ enterprise 
              clients and recognition from major industry analysts. Our platform processes over $2.5B in 
              monthly transaction volume, making us one of the largest secure DeFi access platforms globally.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-6 border-l-4 border-blue-500">
              <h4 className="text-xl font-semibold mt-0 text-blue-800 dark:text-blue-300">Key Success Stories</h4>
              <ul className="mt-2 space-y-2">
                <li><strong>Global Bank Integration</strong> - Helped a top 10 global bank reduce settlement times from T+2 to under 15 minutes while maintaining full regulatory compliance.</li>
                <li><strong>Supply Chain Finance Revolution</strong> - Enabled a Fortune 500 manufacturer to establish a blockchain-based supply chain finance program that reduced financing costs by 64%.</li>
              </ul>
            </div>
            
            <h4 className="text-xl font-semibold mt-4 text-blue-900 dark:text-blue-300">Competitive Advantages</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-blue-100 text-blue-500 rounded-full dark:bg-blue-900 dark:text-blue-300">✓</span>
                Industry-leading ISO 20022 compliance
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-blue-100 text-blue-500 rounded-full dark:bg-blue-900 dark:text-blue-300">✓</span>
                Bank-grade security with enterprise SLAs
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-blue-100 text-blue-500 rounded-full dark:bg-blue-900 dark:text-blue-300">✓</span>
                Hybrid blockchain architecture
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-blue-100 text-blue-500 rounded-full dark:bg-blue-900 dark:text-blue-300">✓</span>
                Comprehensive regulatory compliance
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6 animate-fade-up">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Technical Solution</h3>
            <p>
              Seftec's enterprise DeFi access platform bridges the gap between traditional financial systems and 
              blockchain networks through a secure, scalable infrastructure designed specifically for institutional use.
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg my-6 border-l-4 border-indigo-500">
              <h4 className="text-xl font-semibold mt-0 text-indigo-800 dark:text-indigo-300">ISO 20022 Integration</h4>
              <p className="mt-2">
                Our platform natively supports ISO 20022 message formats, allowing seamless interoperability between 
                banking systems and blockchain networks. This integration enables financial institutions to maintain 
                their existing systems while accessing DeFi capabilities and liquidity.
              </p>
            </div>
            
            <h4 className="text-xl font-semibold mt-4 text-blue-900 dark:text-blue-300">Security Framework</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-indigo-100 text-indigo-500 rounded-full dark:bg-indigo-900 dark:text-indigo-300">✓</span>
                Multi-layered encryption and key management
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-indigo-100 text-indigo-500 rounded-full dark:bg-indigo-900 dark:text-indigo-300">✓</span>
                Real-time AI-powered risk detection
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-indigo-100 text-indigo-500 rounded-full dark:bg-indigo-900 dark:text-indigo-300">✓</span>
                Institutional-grade custody solutions
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-indigo-100 text-indigo-500 rounded-full dark:bg-indigo-900 dark:text-indigo-300">✓</span>
                Comprehensive audit trails
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-6 animate-fade-up">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Strategic Roadmap</h3>
            <p>
              Our development roadmap reflects our commitment to leading enterprise DeFi innovation while 
              maintaining the highest standards of security and compliance.
            </p>
            
            <div className="space-y-6 mt-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="text-xl font-semibold mt-0 text-purple-800 dark:text-purple-300">Q3 2025: Cross-Chain Settlement Protocol</h4>
                <p className="mt-2">
                  Launch of our proprietary cross-chain settlement protocol enabling instant finality across 
                  multiple blockchain networks while maintaining full regulatory compliance and auditability.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-xl font-semibold mt-0 text-blue-800 dark:text-blue-300">Q4 2025: Enterprise DeFi Marketplace</h4>
                <p className="mt-2">
                  Introduction of the first regulated enterprise DeFi marketplace, allowing institutional 
                  participants to access yield-generating opportunities with built-in risk assessment.
                </p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="text-xl font-semibold mt-0 text-indigo-800 dark:text-indigo-300">Q1 2026: Global Expansion</h4>
                <p className="mt-2">
                  Expansion of regulatory coverage to include APAC markets with local presence in Singapore, 
                  Tokyo, and Sydney, complementing our existing operations in North America and Europe.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DefiTabs;
