
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';

interface InsightData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export const FinancialInsights = () => {
  const { loading, error, listBankConsents } = useEdocIntegration();
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [consents, setConsents] = useState<any[]>([]);

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    const result = await listBankConsents();
    if (result) {
      setConsents(result);
    }
  };

  useEffect(() => {
    if (consents.length > 0) {
      // Mock insights data - in production this would come from the hook
      setInsights([
        {
          title: 'Average Monthly Income',
          value: '₦2,450,000',
          change: '+12.5%',
          trend: 'up',
          description: 'Compared to previous period'
        },
        {
          title: 'Monthly Expenses',
          value: '₦1,850,000',
          change: '-5.2%',
          trend: 'down',
          description: 'Reduction in operational costs'
        },
        {
          title: 'Cash Flow',
          value: '₦600,000',
          change: '+18.7%',
          trend: 'up',
          description: 'Net positive cash flow'
        },
        {
          title: 'Transaction Volume',
          value: '324',
          change: '+8.3%',
          trend: 'up',
          description: 'Total transactions this period'
        }
      ]);
    }
  }, [consents]);

  const handlePeriodChange = (period: '7d' | '30d' | '90d') => {
    setSelectedPeriod(period);
    // In production, you would fetch new data based on the selected period
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Financial Insights</h2>
        <p className="text-sm text-muted-foreground">Key performance indicators for your business.</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={selectedPeriod === '7d' ? 'default' : 'outline'}
          onClick={() => handlePeriodChange('7d')}
          size="sm"
        >
          7 Days
        </Button>
        <Button
          variant={selectedPeriod === '30d' ? 'default' : 'outline'}
          onClick={() => handlePeriodChange('30d')}
          size="sm"
        >
          30 Days
        </Button>
        <Button
          variant={selectedPeriod === '90d' ? 'default' : 'outline'}
          onClick={() => handlePeriodChange('90d')}
          size="sm"
        >
          90 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {insight.title}
                {insight.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {insight.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
              </CardTitle>
              <CardDescription>{insight.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <div className="text-sm text-muted-foreground">{insight.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
