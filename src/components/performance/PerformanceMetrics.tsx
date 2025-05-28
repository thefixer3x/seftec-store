
import React from 'react';
import { Activity, Zap, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const PerformanceMetrics = () => {
  const metrics = [
    {
      icon: Activity,
      title: "System Uptime",
      value: "99.97%",
      description: "Last 30 days",
      progress: 99.97,
      color: "text-green-600"
    },
    {
      icon: Zap,
      title: "API Response Time",
      value: "< 200ms",
      description: "Average response time",
      progress: 85,
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Transaction Success Rate",
      value: "99.9%",
      description: "Successful DeFi transactions",
      progress: 99.9,
      color: "text-seftec-gold"
    },
    {
      icon: Clock,
      title: "Processing Speed",
      value: "< 3 sec",
      description: "Average transaction processing",
      progress: 92,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-2">
          Performance Dashboard
        </h2>
        <p className="text-muted-foreground">
          Real-time system performance and reliability metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <CardDescription className="mb-3">
                {metric.description}
              </CardDescription>
              <Progress value={metric.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
