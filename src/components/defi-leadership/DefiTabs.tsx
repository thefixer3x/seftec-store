
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DefiTabs = () => {
  return (
    <div className="mb-10">
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-2xl mx-auto">
          <TabsTrigger value="market">Market Leadership</TabsTrigger>
          <TabsTrigger value="technical">Technical Solution</TabsTrigger>
          <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DefiTabs;
