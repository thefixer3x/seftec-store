
import React from 'react';
import { Activity, Zap, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';

export const PerformanceMetrics = () => {
  const { t } = useTranslation();

  const metrics = [
    {
      icon: Activity,
      title: t('performance.uptime', 'System Uptime'),
      value: "99.97%",
      description: t('performance.last_30_days', 'Last 30 days'),
      progress: 99.97,
      color: "text-green-600"
    },
    {
      icon: Zap,
      title: t('performance.response_time', 'API Response Time'),
      value: "< 200ms",
      description: t('performance.average_response', 'Average response time'),
      progress: 85,
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: t('performance.success_rate', 'Transaction Success Rate'),
      value: "99.9%",
      description: t('performance.successful_transactions', 'Successful DeFi transactions'),
      progress: 99.9,
      color: "text-seftec-gold"
    },
    {
      icon: Clock,
      title: t('performance.processing_speed', 'Processing Speed'),
      value: "< 3 sec",
      description: t('performance.average_processing', 'Average transaction processing'),
      progress: 92,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-2">
          {t('performance.title', 'Performance Dashboard')}
        </h2>
        <p className="text-muted-foreground">
          {t('performance.subtitle', 'Real-time system performance and reliability metrics')}
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
