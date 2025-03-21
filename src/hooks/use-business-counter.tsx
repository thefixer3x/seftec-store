
import { useState, useEffect } from 'react';
import { calculateBusinessCount } from '@/lib/utils';

export function useBusinessCounter(initialCount: number = 3746) {
  const [count, setCount] = useState<number>(initialCount);
  
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

  return count;
}
