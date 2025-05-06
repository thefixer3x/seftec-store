
import React from 'react';
import { cn } from '@/lib/utils';

interface ModeTabsProps {
  activeMode: 'chat' | 'plan';
  onModeChange: (mode: 'chat' | 'plan') => void;
}

const ModeTabs: React.FC<ModeTabsProps> = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex border-b border-seftec-slate/30 dark:border-seftec-charcoal mb-4">
      <button
        onClick={() => onModeChange('chat')}
        className={cn(
          "py-2 px-4 font-medium text-sm transition-colors relative",
          activeMode === 'chat' 
            ? "text-seftec-navy dark:text-white border-b-2 border-seftec-gold dark:border-seftec-teal" 
            : "text-seftec-navy/60 dark:text-white/60 hover:text-seftec-navy/80 dark:hover:text-white/80"
        )}
        aria-selected={activeMode === 'chat'}
      >
        Ask Anything
      </button>
      <button
        onClick={() => onModeChange('plan')}
        className={cn(
          "py-2 px-4 font-medium text-sm transition-colors relative",
          activeMode === 'plan' 
            ? "text-seftec-navy dark:text-white border-b-2 border-seftec-gold dark:border-seftec-teal" 
            : "text-seftec-navy/60 dark:text-white/60 hover:text-seftec-navy/80 dark:hover:text-white/80"
        )}
        aria-selected={activeMode === 'plan'}
      >
        Business Plan
      </button>
    </div>
  );
};

export default ModeTabs;
