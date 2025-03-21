
import React from 'react';

interface CounterDisplayProps {
  count: number;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <span className="text-5xl font-bold text-seftec-gold dark:text-seftec-teal transition-all duration-300 animate-pulse">
        {count.toLocaleString()}
      </span>
    </div>
  );
};

export default CounterDisplay;
