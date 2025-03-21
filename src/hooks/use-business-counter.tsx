
import { useState, useEffect } from 'react';
import { calculateBusinessCount } from '@/lib/utils';

interface BusinessCounterData {
  businessCount: number;
  financeDeals: number;
}

export function useBusinessCounter(initialCount: number = 3746) {
  const [data, setData] = useState<BusinessCounterData>({
    businessCount: initialCount,
    financeDeals: Math.floor(initialCount * 0.21) // 21% of business count
  });
  
  useEffect(() => {
    // Calculate initial count on component mount
    const initialBusinessCount = calculateBusinessCount();
    const initialFinanceDeals = Math.floor(initialBusinessCount * 0.21);
    
    setData({
      businessCount: initialBusinessCount,
      financeDeals: initialFinanceDeals
    });
    
    // Update count every 24 hours
    const intervalId = setInterval(() => {
      const newBusinessCount = calculateBusinessCount();
      setData({
        businessCount: newBusinessCount,
        financeDeals: Math.floor(newBusinessCount * 0.21)
      });
    }, 24 * 60 * 60 * 1000);
    
    // Add a small animation effect with minor count increases every few seconds
    const animationInterval = setInterval(() => {
      setData(prev => {
        const newBusinessCount = prev.businessCount + 1;
        return {
          businessCount: newBusinessCount,
          financeDeals: Math.floor(newBusinessCount * 0.21)
        };
      });
    }, 10000);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(animationInterval);
    };
  }, []);

  return data;
}
