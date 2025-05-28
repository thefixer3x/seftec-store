
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketLeadershipSection } from './MarketLeadershipSection';
import { TechnicalSolutionSection } from './TechnicalSolutionSection';
import { StrategicRoadmapSection } from './StrategicRoadmapSection';

export const DefiTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("leadership");

  return (
    <section className="py-12 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <Tabs defaultValue="leadership" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-seftec-slate dark:bg-seftec-navy/30">
              <TabsTrigger value="leadership" className="text-sm md:text-base">Market Leadership</TabsTrigger>
              <TabsTrigger value="technical" className="text-sm md:text-base">Technical Solution</TabsTrigger>
              <TabsTrigger value="roadmap" className="text-sm md:text-base">Strategic Roadmap</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="leadership">
            <div className="animate-fadeIn">
              <MarketLeadershipSection />
            </div>
          </TabsContent>
          
          <TabsContent value="technical">
            <div className="animate-fadeIn">
              <TechnicalSolutionSection />
            </div>
          </TabsContent>
          
          <TabsContent value="roadmap">
            <div className="animate-fadeIn">
              <StrategicRoadmapSection />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
