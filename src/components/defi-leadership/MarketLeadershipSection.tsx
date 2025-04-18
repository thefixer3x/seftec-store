
import React from 'react';
import { Shield, Trophy, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MarketLeadershipSection = () => {
  const caseStudies = [
    {
      client: "Global Bank Corp",
      result: "60% reduction in cross-border transaction costs",
      description: "Implemented DeFi-powered international settlements system"
    },
    {
      client: "Enterprise Solutions Ltd",
      result: "89% faster payment processing",
      description: "Automated trade finance with smart contracts"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-12">Market Leadership Position</h2>
          
          <div className="space-y-8">
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Trophy className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Industry Recognition
              </h3>
              <ul className="space-y-3 text-seftec-navy/70 dark:text-white/70">
                <li>• Top DeFi Innovation Award 2024 - Enterprise Blockchain Awards</li>
                <li>• ISO 20022 Certified Implementation Partner</li>
                <li>• Recognized by Gartner as DeFi Market Leader</li>
              </ul>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Briefcase className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Enterprise Case Studies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((study, index) => (
                  <div key={index} className="p-4 rounded-lg bg-seftec-slate/50 dark:bg-white/5">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">{study.client}</h4>
                    <p className="text-seftec-gold dark:text-seftec-teal font-medium mb-2">{study.result}</p>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">{study.description}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-white/50 dark:bg-white/5">
              <h3 className="flex items-center text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                <Shield className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                Competitive Advantages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Security & Compliance</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• ISO 20022 compliant infrastructure</li>
                    <li>• Multi-layer security protocols</li>
                    <li>• Real-time compliance monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Technology Edge</h4>
                  <ul className="space-y-2 text-sm text-seftec-navy/70 dark:text-white/70">
                    <li>• AI-powered risk management</li>
                    <li>• Hybrid blockchain architecture</li>
                    <li>• Enterprise-grade scalability</li>
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

export default MarketLeadershipSection;
