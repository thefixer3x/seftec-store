
import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, MessageCircle } from 'lucide-react';

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
          "py-3 px-4 font-medium text-sm transition-colors relative flex items-center gap-2 flex-1 justify-center",
          activeMode === 'chat' 
            ? "text-seftec-navy dark:text-white border-b-2 border-seftec-gold dark:border-seftec-teal bg-seftec-gold/10 dark:bg-seftec-teal/10" 
            : "text-seftec-navy/60 dark:text-white/60 hover:text-seftec-navy/80 dark:hover:text-white/80 hover:bg-seftec-slate/20 dark:hover:bg-white/5"
        )}
        aria-selected={activeMode === 'chat'}
      >
        <MessageCircle className="h-4 w-4" />
        Ask BizGenie
      </button>
      <button
        onClick={() => onModeChange('plan')}
        className={cn(
          "py-3 px-4 font-medium text-sm transition-colors relative flex items-center gap-2 flex-1 justify-center",
          activeMode === 'plan' 
            ? "text-seftec-navy dark:text-white border-b-2 border-seftec-gold dark:border-seftec-teal bg-seftec-gold/10 dark:bg-seftec-teal/10" 
            : "text-seftec-navy/60 dark:text-white/60 hover:text-seftec-navy/80 dark:hover:text-white/80 hover:bg-seftec-slate/20 dark:hover:bg-white/5"
        )}
        aria-selected={activeMode === 'plan'}
      >
        <FileText className="h-4 w-4" />
        Business Plan Mode
      </button>
    </div>
  );
};

export default ModeTabs;
