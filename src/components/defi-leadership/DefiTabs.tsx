
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketLeadershipSection from './MarketLeadershipSection';
import TechnicalSolutionSection from './TechnicalSolutionSection';
import StrategicRoadmapSection from './StrategicRoadmapSection';

const DefiTabs = () => {
  return (
    <Tabs defaultValue="market" className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <TabsList className="h-16">
            <TabsTrigger value="market" className="text-base">
              Market Leadership
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-base">
              Technical Solution
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-base">
              Strategic Roadmap
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
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

export default DefiTabs;
