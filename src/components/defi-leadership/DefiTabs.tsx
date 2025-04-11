
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketLeadershipSection from "./MarketLeadershipSection";
import TechnicalSolutionSection from "./TechnicalSolutionSection";
import StrategicRoadmapSection from "./StrategicRoadmapSection";

const DefiTabs = () => {
  return (
    <Tabs defaultValue="leadership" className="container px-4 md:px-6 py-12">
      <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
        <TabsTrigger value="leadership" className="text-sm md:text-base">Market Leadership</TabsTrigger>
        <TabsTrigger value="solution" className="text-sm md:text-base">Technical Solution</TabsTrigger>
        <TabsTrigger value="roadmap" className="text-sm md:text-base" id="roadmap">Strategic Roadmap</TabsTrigger>
      </TabsList>

      <TabsContent value="leadership" className="space-y-12">
        <MarketLeadershipSection />
      </TabsContent>

      <TabsContent value="solution" className="space-y-12">
        <TechnicalSolutionSection />
      </TabsContent>

      <TabsContent value="roadmap" className="space-y-12">
        <StrategicRoadmapSection />
      </TabsContent>
    </Tabs>
  );
};

export default DefiTabs;
