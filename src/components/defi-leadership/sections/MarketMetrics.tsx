
import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const MarketMetrics = () => {
  const metrics = [
    {
      icon: Users,
      label: "Enterprise Clients",
      value: "500+",
      growth: "+127% YoY",
      description: "Fortune 500 companies trust our platform"
    },
    {
      icon: Globe,
      label: "Countries Served",
      value: "45",
      growth: "+15 new markets",
      description: "Global reach across 6 continents"
    },
    {
      icon: TrendingUp,
      label: "Transaction Volume",
      value: "$2.3B",
      growth: "+89% QoQ",
      description: "Processed through our DeFi infrastructure"
    },
    {
      icon: Award,
      label: "Industry Recognition",
      value: "12",
      growth: "Awards in 2024",
      description: "Leading DeFi innovation awards"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <metric.icon className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
              <Badge variant="secondary" className="text-xs">
                {metric.growth}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                {metric.value}
              </h3>
              <p className="text-sm font-medium text-seftec-navy/70 dark:text-white/70">
                {metric.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
