
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Users } from 'lucide-react';

const MarketLeadershipSection = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">
          Our Market Leadership Position
        </h3>
        <p className="text-seftec-navy/70 dark:text-white/70">
          Seftec has established itself as a recognized leader in the DeFi space, providing enterprise-grade solutions that bridge traditional finance with blockchain technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Key Metrics</CardTitle>
            <TrendingUp className="h-5 w-5 text-seftec-teal" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Over 10,000 enterprise users worldwide</li>
              <li>• $1.2B in transaction volume processed</li>
              <li>• 99.99% transaction success rate</li>
              <li>• 35% reduction in cross-border payment fees</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Success Stories</CardTitle>
            <Users className="h-5 w-5 text-seftec-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Global Manufacturing Corp</h4>
                <p className="text-sm text-muted-foreground">Reduced payment settlement from 5 days to 15 minutes</p>
              </div>
              <div>
                <h4 className="font-medium">Transcontinental Logistics</h4>
                <p className="text-sm text-muted-foreground">Saved $2.5M annually in transaction fees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Competitive Edges</CardTitle>
            <Award className="h-5 w-5 text-seftec-purple" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• ISO 20022 compliant infrastructure</li>
              <li>• Military-grade security protocols</li>
              <li>• Seamless banking system integration</li>
              <li>• Fully audited smart contracts</li>
              <li>• Enterprise-level SLAs with 24/7 support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketLeadershipSection;
