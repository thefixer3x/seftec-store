
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import MarketLeadershipSection from './MarketLeadershipSection';
import TechnicalSolutionSection from './TechnicalSolutionSection';
import StrategicRoadmapSection from './StrategicRoadmapSection';

const DefiLeadershipContent = () => {
  return (
    <div className="mt-6">
      <TabsContent value="market" className="mt-0">
        <MarketLeadershipSection />
      </TabsContent>
      
      <TabsContent value="technical" className="mt-0">
        <TechnicalSolutionSection />
      </TabsContent>
      
      <TabsContent value="roadmap" className="mt-0">
        <StrategicRoadmapSection />
      </TabsContent>
    </div>
  );
};

export default DefiLeadershipContent;
