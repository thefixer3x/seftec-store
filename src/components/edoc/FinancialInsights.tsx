
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Inbox } from 'lucide-react';

export const FinancialInsights = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Financial Insights</h2>
        <p className="text-sm text-muted-foreground">Key performance indicators for your business.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <Inbox className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-1">No financial data available</h3>
            <p className="text-sm text-muted-foreground/70 max-w-sm">
              Connect a bank account via E-Doc to see AI-powered financial insights here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
