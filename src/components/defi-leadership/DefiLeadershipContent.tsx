
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import MarketLeadershipSection from './MarketLeadershipSection';
import TechnicalSolutionSection from './TechnicalSolutionSection';
import StrategicRoadmapSection from './StrategicRoadmapSection';

const DefiLeadershipContent = () => {
  return (
    <Tabs defaultValue="market" className="mt-6">
      <TabsContent value="market">
        <MarketLeadershipSection />
      </TabsContent>
      
      <TabsContent value="technical">
        <TechnicalSolutionSection />
      </TabsContent>
      
      <TabsContent value="roadmap">
        <StrategicRoadmapSection />
      </TabsContent>
    </Tabs>
  );
};

export default DefiLeadershipContent;
