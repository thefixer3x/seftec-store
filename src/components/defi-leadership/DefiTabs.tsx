
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefiLeadershipContent from './DefiLeadershipContent';

export const DefiTabs = () => {
  return (
    <Tabs defaultValue="market" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="market">Market Leadership</TabsTrigger>
        <TabsTrigger value="technical">Technical Solution</TabsTrigger>
        <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
      </TabsList>
      <DefiLeadershipContent />
    </Tabs>
  );
};
