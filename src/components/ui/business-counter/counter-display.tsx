
import React from 'react';
import { cn } from '@/lib/utils';

interface CounterDisplayProps {
  count: number;
  highlightColor?: string;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, highlightColor = "text-seftec-gold" }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <span className={cn("text-5xl font-bold dark:text-seftec-teal transition-all duration-300 animate-pulse", highlightColor)}>
        {count.toLocaleString()}
      </span>
    </div>
  );
};

export default CounterDisplay;
