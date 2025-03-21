
import React from 'react';
import { cn } from '@/lib/utils';
import { useBusinessCounter } from '@/hooks/use-business-counter';
import CounterDisplay from './business-counter/counter-display';
import CounterDescription from './business-counter/counter-description';

interface BusinessCounterProps {
  className?: string;
}

const BusinessCounter: React.FC<BusinessCounterProps> = ({ className }) => {
  const counterData = useBusinessCounter();
  
  return (
    <div className={cn('text-center py-12', className)}>
      <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-2">
        Growing Business Community
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CounterDisplay count={counterData.businessCount} />
          <CounterDescription />
        </div>
        <div>
          <CounterDisplay count={counterData.financeDeals} highlightColor="text-seftec-teal" />
          <p className="text-seftec-navy/70 dark:text-white/70 max-w-lg mx-auto">
            Trade finance deals approved, representing 21% of our business community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCounter;
