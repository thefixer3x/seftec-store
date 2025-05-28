
import React from 'react';
import { StrategicRoadmap } from './sections/StrategicRoadmap';

export const StrategicRoadmapSection = () => {
  return (
    <div className="py-16 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">
            Strategic Roadmap 2025-2026
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive roadmap outlines key milestones, strategic partnerships, 
            and innovative capabilities that will define the future of enterprise DeFi.
          </p>
        </div>

        <StrategicRoadmap />
      </div>
    </div>
  );
};
