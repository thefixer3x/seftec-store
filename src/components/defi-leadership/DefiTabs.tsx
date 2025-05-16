
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketLeadershipSection } from './MarketLeadershipSection';
import { TechnicalSolutionSection } from './TechnicalSolutionSection';
import { StrategicRoadmapSection } from './StrategicRoadmapSection';

export const DefiTabs = () => {
  const [activeTab, setActiveTab] = useState('market');
  
  return (
    <Tabs defaultValue="market" className="w-full mt-8" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="market">Market Leadership</TabsTrigger>
        <TabsTrigger value="technical">Technical Solution</TabsTrigger>
        <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
      </TabsList>
      
      <TabsContent value="market" className="mt-6">
        <MarketLeadershipSection isActive={activeTab === 'market'} />
      </TabsContent>
      
      <TabsContent value="technical" className="mt-6">
        <TechnicalSolutionSection isActive={activeTab === 'technical'} />
      </TabsContent>
      
      <TabsContent value="roadmap" className="mt-6">
        <StrategicRoadmapSection isActive={activeTab === 'roadmap'} />
      </TabsContent>
    </Tabs>
  );
};
