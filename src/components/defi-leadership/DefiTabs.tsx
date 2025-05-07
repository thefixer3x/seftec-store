
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const DefiTabs = () => {
  return (
    <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
      <TabsTrigger value="market">Market Leadership</TabsTrigger>
      <TabsTrigger value="technical">Technical Solution</TabsTrigger>
      <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
    </TabsList>
  );
};

export default DefiTabs;
