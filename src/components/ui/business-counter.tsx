
import React, { useEffect, useState } from 'react';
import { cn, calculateBusinessCount } from '@/lib/utils';

interface BusinessCounterProps {
  className?: string;
}

const BusinessCounter: React.FC<BusinessCounterProps> = ({ className }) => {
  const [count, setCount] = useState<number>(3746);
  
  useEffect(() => {
    // Calculate initial count on component mount
    const initialCount = calculateBusinessCount();
    setCount(initialCount);
    
    // Update count every 24 hours
    const intervalId = setInterval(() => {
      setCount(calculateBusinessCount());
    }, 24 * 60 * 60 * 1000);
    
    // Add a small animation effect with minor count increases every few seconds
    const animationInterval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 10000);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(animationInterval);
    };
  }, []);
  
  return (
    <div className={cn('text-center py-12', className)}>
      <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-2">
        Growing Business Community
      </h3>
      <div className="flex items-center justify-center mb-4">
        <span className="text-5xl font-bold text-seftec-gold dark:text-seftec-teal transition-all duration-300 animate-pulse">
          {count.toLocaleString()}
        </span>
      </div>
      <p className="text-seftec-navy/70 dark:text-white/70 max-w-lg mx-auto">
        Active businesses and counting! Our marketplace is growing by 6% every two weeks 
        as more companies discover the benefits of our secure global trading platform.
      </p>
    </div>
  );
};

export default BusinessCounter;
