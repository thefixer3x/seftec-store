
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Milestone, RoadmapEvent } from '@/types';

const roadmapMilestones: Milestone[] = [
  {
    quarter: 'Q3 2025',
    title: 'Enterprise DeFi 2.0 Launch',
    description: 'Next generation of our core platform with enhanced ISO 20022 capabilities.',
    status: 'upcoming'
  },
  {
    quarter: 'Q4 2025',
    title: 'Global Banking Network Expansion',
    description: 'Integration with 50+ additional banking partners across APAC and LATAM.',
    status: 'upcoming'
  },
  {
    quarter: 'Q1 2026',
    title: 'Central Bank Digital Currency Support',
    description: 'Full integration capabilities with emerging CBDCs across major economies.',
    status: 'planned'
  },
  {
    quarter: 'Q2 2026',
    title: 'Institutional DeFi Suite',
    description: 'Advanced tools for institutional investors entering the DeFi ecosystem.',
    status: 'planned'
  }
];

const upcomingPartnerships: RoadmapEvent[] = [
  {
    title: 'Major European Banking Consortium',
    description: 'Strategic partnership to provide DeFi infrastructure for 12 European banks',
    timeline: 'Partnership announcement in Q3 2025'
  },
  {
    title: 'Supply Chain Finance Network',
    description: 'Collaboration with global logistics and supply chain platforms',
    timeline: 'Beta launch in Q4 2025'
  },
  {
    title: 'Institutional Custody Solution',
    description: 'Joint venture with leading security firm for institutional-grade custody',
    timeline: 'Development begins Q3 2025'
  }
];

const StrategicRoadmapSection = () => {
  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">
          Our Strategic Roadmap
        </h3>
        <p className="text-seftec-navy/70 dark:text-white/70">
          Seftec's ambitious plan to expand our DeFi leadership position and deliver enhanced value to enterprise clients.
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold">Product Development Timeline</h4>
        <div className="relative">
          <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-seftec-gold via-seftec-teal to-seftec-purple"></div>
          <div className="space-y-8 pl-12">
            {roadmapMilestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-seftec-gold"></div>
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-seftec-slate dark:bg-seftec-darkNavy/70 text-seftec-navy dark:text-white/80 mb-2">
                    {milestone.quarter}
                  </span>
                  <h5 className="text-lg font-medium">{milestone.title}</h5>
                  <p className="text-seftec-navy/70 dark:text-white/70 mt-1">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Partnerships</CardTitle>
            <CardDescription>Strategic collaborations to expand our ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPartnerships.map((partnership, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                  <h6 className="font-medium">{partnership.title}</h6>
                  <p className="text-sm text-muted-foreground mt-1">{partnership.description}</p>
                  <p className="text-xs text-seftec-teal dark:text-seftec-gold mt-2">{partnership.timeline}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming DeFi Offerings</CardTitle>
            <CardDescription>New capabilities benefiting enterprise clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h6 className="font-medium">Real-Time Cross-Border Settlement</h6>
                <p className="text-sm text-muted-foreground mt-1">
                  Instant settlement across 120+ countries with automatic FX optimization
                </p>
                <p className="text-xs text-seftec-teal dark:text-seftec-gold mt-2">
                  Full release in Q3 2025
                </p>
              </div>
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h6 className="font-medium">Enterprise Yield Strategies</h6>
                <p className="text-sm text-muted-foreground mt-1">
                  Compliant treasury management tools for accessing DeFi yields
                </p>
                <p className="text-xs text-seftec-teal dark:text-seftec-gold mt-2">
                  Beta launch in Q4 2025
                </p>
              </div>
              <div>
                <h6 className="font-medium">Tokenized Real-World Assets</h6>
                <p className="text-sm text-muted-foreground mt-1">
                  Infrastructure for enterprises to tokenize and trade traditional assets
                </p>
                <p className="text-xs text-seftec-teal dark:text-seftec-gold mt-2">
                  Development begins Q1 2026
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategicRoadmapSection;
