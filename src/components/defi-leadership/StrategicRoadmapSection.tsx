
import React from 'react';
import { Milestone, Target, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const StrategicRoadmapSection = () => {
  const milestones = [
    {
      quarter: "Q2 2024",
      title: "Enhanced Trading Features",
      items: [
        "Advanced order matching engine",
        "Cross-chain settlement protocol",
        "Institutional lending platform"
      ]
    },
    {
      quarter: "Q3 2024",
      title: "Global Expansion",
      items: [
        "APAC region deployment",
        "Latin America market entry",
        "Global partner network expansion"
      ]
    },
    {
      quarter: "Q4 2024",
      title: "New DeFi Products",
      items: [
        "Tokenized real-world assets",
        "Enterprise yield optimization",
        "Cross-border payment solutions"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-12">Strategic Roadmap</h2>
          
          <div className="space-y-8">
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Milestone className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Development Milestones
              </h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="p-4 rounded-lg bg-seftec-slate/50 dark:bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-seftec-navy dark:text-white">{milestone.title}</h4>
                      <span className="text-sm font-medium text-seftec-gold dark:text-seftec-teal">{milestone.quarter}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                      {milestone.items.map((item, itemIndex) => (
                        <li key={itemIndex}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Target className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Strategic Partnerships
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Current Partners</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• Major global banks</li>
                    <li>• Payment networks</li>
                    <li>• Technology providers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Upcoming Partnerships</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• Central banks</li>
                    <li>• Regional clearinghouses</li>
                    <li>• Financial institutions</li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Users className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Client Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Immediate Impact</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• Reduced operational costs</li>
                    <li>• Faster settlement times</li>
                    <li>• Enhanced security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Future Benefits</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• New revenue streams</li>
                    <li>• Global market access</li>
                    <li>• Innovative DeFi products</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmapSection;
