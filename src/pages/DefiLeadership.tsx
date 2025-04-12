
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DefiHero from '@/components/defi-leadership/DefiHero';
import DefiTabs from '@/components/defi-leadership/DefiTabs';
import MarketLeadershipSection from '@/components/defi-leadership/MarketLeadershipSection';
import TechnicalSolutionSection from '@/components/defi-leadership/TechnicalSolutionSection';
import StrategicRoadmapSection from '@/components/defi-leadership/StrategicRoadmapSection';
import HomeFAQSection from '@/components/sections/HomeFAQSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import BizGenieChatInterface from '@/components/ai/BizGenieChatInterface';
import BizGenieStats from '@/components/ai/BizGenieStats';
import { ChevronRight, ArrowUpRight, BookOpen, FileText, Users } from 'lucide-react';
import FeatureCard from '@/components/ui/feature-card';

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
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-3/4">
            <div className="mb-8 flex items-start">
              <div>
                <Badge variant="outline" className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-200">
                  Seftec Leadership
                </Badge>
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Leading the Enterprise DeFi Revolution</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                  Seftec bridges traditional finance with blockchain technology, providing enterprises with secure, 
                  compliant access to decentralized financial systems.
                </p>
              </div>
            </div>
            
            <DefiTabs />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <FeatureCard
                title="ISO 20022 Compliance"
                description="Seamless interoperability with banking systems through native support for financial messaging standards"
                icon={FileText}
                defiRelated={true}
                index={0}
              />
              
              <FeatureCard
                title="Enterprise Security"
                description="Bank-grade security measures with multi-layered encryption and hardware security modules"
                icon={BookOpen}
                secure={true}
                index={1}
              />
              
              <FeatureCard
                title="Global Partnerships"
                description="Strategic alliances with financial institutions and technology providers worldwide"
                icon={Users}
                index={2}
              />
            </div>
          </div>
          
          <div className="md:w-1/4">
            <Card className="shadow-md border border-gray-200 dark:border-gray-700 h-full">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <div className="border-l-4 border-blue-600 pl-4 mb-2">
                  <CardTitle className="text-xl">BizGenie DeFi Advisor</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get AI-powered insights on DeFi strategies and opportunities
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="h-[500px]">
                  <BizGenieChatInterface 
                    systemPrompt={defiSystemPrompt}
                    placeholder="Ask about DeFi trends, ISO 20022, or enterprise blockchain..."
                    isPremium={user?.email?.endsWith('@seftec.com')}
                  />
                </div>
                
                {user && <BizGenieStats />}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Resources & Downloads</h3>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              View all resources <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                  DeFi Integration Whitepaper
                  <ArrowUpRight size={16} className="ml-2 text-blue-600 dark:text-blue-400" />
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Learn how enterprises can safely integrate DeFi capabilities while maintaining regulatory compliance.
                </p>
                <div className="mt-4 flex items-center">
                  <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800">PDF</Badge>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">12 pages</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                  ISO 20022 Technical Guide
                  <ArrowUpRight size={16} className="ml-2 text-blue-600 dark:text-blue-400" />
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Technical specifications for implementing ISO 20022 messaging with blockchain integration.
                </p>
                <div className="mt-4 flex items-center">
                  <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800">PDF</Badge>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">24 pages</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                  Case Study Collection
                  <ArrowUpRight size={16} className="ml-2 text-blue-600 dark:text-blue-400" />
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Success stories from enterprises that have implemented Seftec's DeFi solutions.
                </p>
                <div className="mt-4 flex items-center">
                  <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800">ZIP</Badge>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">5 case studies</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <MarketLeadershipSection />
      <TechnicalSolutionSection />
      <StrategicRoadmapSection />
      
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <HomeFAQSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default DefiLeadership;
