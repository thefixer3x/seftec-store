
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Trophy, BarChart3, Users, Building, ArrowRight } from 'lucide-react';

const MarketLeadershipSection = () => {
  const metrics = [
    { label: 'Enterprise Clients', value: '300+', icon: <Building className="h-6 w-6 text-seftec-teal" /> },
    { label: 'Active Users', value: '25,000+', icon: <Users className="h-6 w-6 text-seftec-purple" /> },
    { label: 'Transaction Volume', value: '$2.3B', icon: <BarChart3 className="h-6 w-6 text-seftec-gold" /> },
    { label: 'Industry Awards', value: '12', icon: <Trophy className="h-6 w-6 text-amber-500" /> }
  ];

  const caseStudies = [
    {
      company: 'Global Bank Inc.',
      description: 'Reduced cross-border settlement times from 3 days to 30 minutes while maintaining full ISO 20022 compliance.',
      results: '87% cost reduction in transaction fees'
    },
    {
      company: 'Enterprise Solutions Ltd.',
      description: 'Integrated DeFi liquidity pools with traditional treasury operations for improved capital efficiency.',
      results: '40% increase in working capital utilization'
    }
  ];

  const advantages = [
    'ISO 20022 Compliance: Full compatibility with global banking standards',
    'Enterprise-Grade Security: SOC 2 Type II and ISO 27001 certified platform',
    'Regulatory Alignment: Built-in compliance with global financial regulations',
    'Seamless Integration: Connects with existing ERP and banking systems'
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Market Leadership Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">{metric.icon}</div>
                <div className="text-3xl font-bold text-seftec-navy dark:text-white mb-1">{metric.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Market Share */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Market Penetration</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">Enterprise DeFi Solutions</span>
              <span className="font-medium text-seftec-navy dark:text-white">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">ISO 20022 Compliant Providers</span>
              <span className="font-medium text-seftec-navy dark:text-white">62%</span>
            </div>
            <Progress value={62} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">DeFi Settlement Solutions</span>
              <span className="font-medium text-seftec-navy dark:text-white">38%</span>
            </div>
            <Progress value={38} className="h-2" />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Enterprise Case Studies</h2>
        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border-l-4 border-l-seftec-teal">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">{study.company}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-2 rounded flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  <span>{study.results}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitive Advantages */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Competitive Advantages</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <ul className="space-y-4">
            {advantages.map((advantage, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 mt-1">
                  <Check className="h-5 w-5 text-seftec-teal" />
                </span>
                <span className="text-gray-700 dark:text-gray-200">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MarketLeadershipSection;
