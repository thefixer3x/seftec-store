import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Brain
} from 'lucide-react';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';

interface FinancialInsight {
  id: string;
  insight_type: string;
  title: string;
  description: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
  created_at: string;
}

interface CashFlowData {
  total_income: number;
  total_expenses: number;
  net_flow: number;
  income_trend: number;
  expense_trend: number;
  period: string;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  transaction_count: number;
}

interface BankAccount {
  id: string;
  bank_name: string;
  consent_status: string;
}

interface FinancialInsightsProps {
  bankAccounts: BankAccount[];
}

export const FinancialInsights: React.FC<FinancialInsightsProps> = ({ bankAccounts }) => {
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [cashFlow, setCashFlow] = useState<CashFlowData | null>(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { getFinancialInsights, getCashFlowAnalysis } = useEdocIntegration();

  const activeAccounts = bankAccounts.filter(account => account.consent_status === 'active');

  useEffect(() => {
    if (activeAccounts.length > 0) {
      loadFinancialData();
    }
  }, [activeAccounts.length]);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load insights for all active accounts
      const allInsights: FinancialInsight[] = [];
      const allCashFlow: CashFlowData[] = [];
      const allCategories: CategoryBreakdown[] = [];

      for (const account of activeAccounts) {
        const accountInsights = await getFinancialInsights(account.id);
        const accountCashFlow = await getCashFlowAnalysis(account.id);
        
        if (accountInsights) {
          allInsights.push(...accountInsights.insights || []);
          if (accountInsights.cash_flow) {
            allCashFlow.push(accountInsights.cash_flow);
          }
          if (accountInsights.category_breakdown) {
            allCategories.push(...accountInsights.category_breakdown);
          }
        }
      }

      // Aggregate cash flow data
      if (allCashFlow.length > 0) {
        const aggregatedCashFlow = allCashFlow.reduce((acc, curr) => ({
          total_income: acc.total_income + curr.total_income,
          total_expenses: acc.total_expenses + curr.total_expenses,
          net_flow: acc.net_flow + curr.net_flow,
          income_trend: (acc.income_trend + curr.income_trend) / 2,
          expense_trend: (acc.expense_trend + curr.expense_trend) / 2,
          period: curr.period
        }));
        setCashFlow(aggregatedCashFlow);
      }

      // Aggregate category breakdown
      const categoryMap = new Map<string, CategoryBreakdown>();
      allCategories.forEach(cat => {
        const existing = categoryMap.get(cat.category);
        if (existing) {
          existing.amount += cat.amount;
          existing.transaction_count += cat.transaction_count;
        } else {
          categoryMap.set(cat.category, { ...cat });
        }
      });

      const aggregatedCategories = Array.from(categoryMap.values());
      const totalSpending = aggregatedCategories.reduce((sum, cat) => sum + cat.amount, 0);
      
      // Recalculate percentages
      aggregatedCategories.forEach(cat => {
        cat.percentage = totalSpending > 0 ? (cat.amount / totalSpending) * 100 : 0;
      });

      setCategoryBreakdown(aggregatedCategories.sort((a, b) => b.amount - a.amount));
      setInsights(allInsights.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }));

    } catch (err) {
      setError('Failed to load financial insights');
      console.error('Error loading financial insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  if (activeAccounts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No AI Insights Available</h3>
          <p className="text-gray-600">
            Connect and sync your bank accounts to get AI-powered financial insights
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Financial Insights
          </CardTitle>
          <CardDescription>
            AI-powered analysis of your financial patterns and personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end mb-4">
            <Button onClick={loadFinancialData} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Refresh Insights
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Analyzing your financial data...</span>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Cash Flow</TabsTrigger>
                <TabsTrigger value="categories">Spending Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {cashFlow ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(cashFlow.total_income)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {cashFlow.income_trend > 0 ? '+' : ''}{cashFlow.income_trend.toFixed(1)}% from last period
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(cashFlow.total_expenses)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {cashFlow.expense_trend > 0 ? '+' : ''}{cashFlow.expense_trend.toFixed(1)}% from last period
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
                        <DollarSign className={`h-4 w-4 ${cashFlow.net_flow >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold ${cashFlow.net_flow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(cashFlow.net_flow)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {cashFlow.net_flow >= 0 ? 'Positive' : 'Negative'} cash flow
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-600">No cash flow data available. Sync your transactions to see insights.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                {categoryBreakdown.length > 0 ? (
                  <div className="space-y-4">
                    {categoryBreakdown.slice(0, 10).map((category, index) => (
                      <Card key={category.category}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{category.category}</span>
                            <span className="text-sm text-gray-600">
                              {formatCurrency(category.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <Progress value={category.percentage} className="flex-1 mr-4" />
                            <span className="text-sm text-gray-600">
                              {category.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {category.transaction_count} transactions
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">No spending analysis available. Sync your transactions to see category breakdown.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                {insights.length > 0 ? (
                  <div className="space-y-4">
                    {insights.map((insight) => (
                      <Card key={insight.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {getTrendIcon(insight.trend)}
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                            </div>
                            <Badge className={getPriorityColor(insight.priority)}>
                              {insight.priority.toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-4">{insight.description}</p>
                          
                          {insight.value && (
                            <div className="mb-4">
                              <span className="text-sm text-gray-600">Impact Value: </span>
                              <span className="font-semibold">{formatCurrency(insight.value)}</span>
                            </div>
                          )}

                          {insight.recommendations && insight.recommendations.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Recommendations:
                              </h4>
                              <ul className="space-y-1">
                                {insight.recommendations.map((rec, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mt-4 text-xs text-gray-500">
                            Generated: {new Date(insight.created_at).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">No AI Insights Yet</h3>
                      <p className="text-gray-600">
                        Sync your transactions and come back later for personalized financial insights and recommendations.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};