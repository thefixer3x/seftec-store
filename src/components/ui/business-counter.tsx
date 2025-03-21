
import React from 'react';
import { cn } from '@/lib/utils';
import { useBusinessCounter } from '@/hooks/use-business-counter';
import CounterDisplay from './business-counter/counter-display';
import CounterDescription from './business-counter/counter-description';

interface BusinessCounterProps {
  className?: string;
}

const BusinessCounter: React.FC<BusinessCounterProps> = ({ className }) => {
  const count = useBusinessCounter();
  
  return (
    <div className={cn('text-center py-12', className)}>
      <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-2">
        Growing Business Community
      </h3>
      <CounterDisplay count={count} />
      <CounterDescription />
    </div>
  );
};

export default BusinessCounter;
