
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, TrendingUp } from 'lucide-react';

interface MarketLeadershipSectionProps {
  isActive: boolean;
}

export const MarketLeadershipSection: React.FC<MarketLeadershipSectionProps> = ({ isActive }) => {
  const metricsData = [
    { value: '500K+', label: 'Enterprise Users' },
    { value: '35+', label: 'Countries Served' },
    { value: '$2.8B', label: 'Monthly Transaction Volume' },
  ];

  const advantages = [
    'ISO 20022 compliant DeFi integrations',
    'Enterprise-grade security with multi-layer protection',
    'Real-time cross-border settlements',
    'AI-powered risk management'
  ];

  const caseStudies = [
    {
      company: 'Global Finance Corp',
      result: 'Reduced settlement times by 94% and lowered transaction costs by 71%',
    },
    {
      company: 'TransNational Holdings',
      result: 'Automated compliance reporting saved 2,500+ staff hours per quarter',
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in" style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* Key Metrics */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricsData.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-seftec-teal">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Enterprise Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">{study.company}</CardTitle>
                  <Badge className="bg-green-500 text-white">Success Story</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">{study.result}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitive Advantages */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Competitive Advantages</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((advantage, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-seftec-teal flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200">{advantage}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Industry Recognition */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Industry Recognition</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500">2024</Badge>
                  <span className="font-medium">DeFi Excellence Award</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">FinTech Global</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500">2023</Badge>
                  <span className="font-medium">Enterprise Blockchain Innovation</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">World Economic Forum</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500">2023</Badge>
                  <span className="font-medium">Top 10 DeFi Solutions</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Forbes Fintech</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
