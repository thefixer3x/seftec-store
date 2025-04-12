
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DefiTabs = () => {
  const [activeTab, setActiveTab] = useState('market');
  
  return (
    <div className="w-full">
      <Tabs defaultValue="market" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="market">Market Leadership</TabsTrigger>
          <TabsTrigger value="technical">Technical Solution</TabsTrigger>
          <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold">Market Leadership Position</h3>
            <p>
              Seftec has established itself as a leader in the enterprise DeFi space, with over 150+ enterprise 
              clients and recognition from major industry analysts. Our platform processes over $2.5B in 
              monthly transaction volume, making us one of the largest secure DeFi access platforms globally.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">Key Success Stories</h4>
            <ul>
              <li><strong>Global Bank Integration</strong> - Helped a top 10 global bank reduce settlement times from T+2 to under 15 minutes while maintaining full regulatory compliance.</li>
              <li><strong>Supply Chain Finance Revolution</strong> - Enabled a Fortune 500 manufacturer to establish a blockchain-based supply chain finance program that reduced financing costs by 64%.</li>
            </ul>
            
            <h4 className="text-xl font-semibold mt-4">Competitive Advantages</h4>
            <ul>
              <li>Industry-leading ISO 20022 compliance and integration capabilities</li>
              <li>Bank-grade security with enterprise SLAs and support</li>
              <li>Hybrid architecture supporting both public and private blockchains</li>
              <li>Comprehensive regulatory compliance framework</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold">Technical Solution</h3>
            <p>
              Seftec's enterprise DeFi access platform bridges the gap between traditional financial systems and 
              blockchain networks through a secure, scalable infrastructure designed specifically for institutional use.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">ISO 20022 Integration</h4>
            <p>
              Our platform natively supports ISO 20022 message formats, allowing seamless interoperability between 
              banking systems and blockchain networks. This integration enables financial institutions to maintain 
              their existing systems while accessing DeFi capabilities and liquidity.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">Security Framework</h4>
            <ul>
              <li>Multi-layered encryption and key management system</li>
              <li>Real-time transaction monitoring with AI-powered risk detection</li>
              <li>Institutional-grade custody solutions with multi-signature authorization</li>
              <li>Comprehensive audit trails and compliance reporting</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold">Strategic Roadmap</h3>
            <p>
              Our development roadmap reflects our commitment to leading enterprise DeFi innovation while 
              maintaining the highest standards of security and compliance.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">Q3 2025: Cross-Chain Settlement Protocol</h4>
            <p>
              Launch of our proprietary cross-chain settlement protocol enabling instant finality across 
              multiple blockchain networks while maintaining full regulatory compliance and auditability.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">Q4 2025: Enterprise DeFi Marketplace</h4>
            <p>
              Introduction of the first regulated enterprise DeFi marketplace, allowing institutional 
              participants to access yield-generating opportunities with built-in risk assessment.
            </p>
            
            <h4 className="text-xl font-semibold mt-4">Q1 2026: Global Expansion</h4>
            <p>
              Expansion of regulatory coverage to include APAC markets with local presence in Singapore, 
              Tokyo, and Sydney, complementing our existing operations in North America and Europe.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DefiTabs;
