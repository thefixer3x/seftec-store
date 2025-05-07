
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DefiTabs from '@/components/defi-leadership/DefiTabs';
import MarketLeadershipSection from '@/components/defi-leadership/MarketLeadershipSection';
import TechnicalSolutionSection from '@/components/defi-leadership/TechnicalSolutionSection';
import StrategicRoadmapSection from '@/components/defi-leadership/StrategicRoadmapSection';

const DefiLeadershipPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">DeFi Leadership</h1>
        <p className="text-lg text-muted-foreground">
          Seftec's pioneering role in decentralized finance, enterprise-grade solutions, and future roadmap.
        </p>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <DefiTabs />
        
        <div className="mt-6">
          <TabsContent value="market">
            <MarketLeadershipSection />
          </TabsContent>
          
          <TabsContent value="technical">
            <TechnicalSolutionSection />
          </TabsContent>
          
          <TabsContent value="roadmap">
            <StrategicRoadmapSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DefiLeadershipPage;
