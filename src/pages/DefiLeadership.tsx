
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DefiHero from '@/components/defi-leadership/DefiHero';
import DefiTabs from '@/components/defi-leadership/DefiTabs';
import MarketLeadershipSection from '@/components/defi-leadership/MarketLeadershipSection';
import TechnicalSolutionSection from '@/components/defi-leadership/TechnicalSolutionSection';
import StrategicRoadmapSection from '@/components/defi-leadership/StrategicRoadmapSection';
import HomeFAQSection from '@/components/sections/HomeFAQSection';

import BizGenieChatInterface from '@/components/ai/BizGenieChatInterface';
import BizGenieStats from '@/components/ai/BizGenieStats';
import { useAuth } from '@/context/AuthContext';

const DefiLeadership = () => {
  const { user } = useAuth();
  
  // BizGenie system prompt customized for DeFi insights
  const defiSystemPrompt = `
    You are BizGenie, a specialized AI assistant for financial and DeFi insights.
    Focus on providing accurate, current information about decentralized finance,
    blockchain technology, and enterprise solutions. Include relevant metrics and examples
    when appropriate. Be concise but thorough, and avoid speculation.
  `;

  return (
    <MainLayout>
      <DefiHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <DefiTabs />
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 mb-2">
              <h2 className="text-2xl font-bold">BizGenie DeFi Advisor</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get AI-powered insights on DeFi strategies and opportunities
              </p>
            </div>
            
            <div className="h-[500px]">
              <BizGenieChatInterface 
                systemPrompt={defiSystemPrompt}
                placeholder="Ask about DeFi trends, ISO 20022, or enterprise blockchain..."
                isPremium={user?.email?.endsWith('@seftec.com')}
              />
            </div>
            
            {user && <BizGenieStats />}
          </div>
        </div>
      </div>
      
      <MarketLeadershipSection />
      <TechnicalSolutionSection />
      <StrategicRoadmapSection />
      <HomeFAQSection />
    </MainLayout>
  );
};

export default DefiLeadership;
