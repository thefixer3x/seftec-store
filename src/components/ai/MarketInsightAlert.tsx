
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface MarketInsightAlertProps {
  marketInsight: string;
}

const MarketInsightAlert: React.FC<MarketInsightAlertProps> = ({ marketInsight }) => {
  return (
    <Alert className="bg-seftec-navy/5 dark:bg-white/5 border-seftec-teal/30">
      <TrendingUp className="h-4 w-4 text-seftec-teal" />
      <AlertTitle className="text-seftec-navy dark:text-white">Live Market Insight</AlertTitle>
      <AlertDescription className="text-seftec-navy/70 dark:text-white/70">
        {marketInsight}
      </AlertDescription>
    </Alert>
  );
};

export default MarketInsightAlert;
