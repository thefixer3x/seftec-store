
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  premium?: boolean;
  secure?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, premium, secure }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-md transition-all duration-300">
      <div className={cn(
        "flex-shrink-0 p-2 rounded-md",
        "bg-gradient-to-br from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple",
        "text-white"
      )}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-seftec-navy dark:text-white">{title}</h4>
          {premium && (
            <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full">Premium</span>
          )}
          {secure && (
            <Shield size={14} className="text-seftec-teal" />
          )}
        </div>
        <p className="text-sm text-seftec-navy/70 dark:text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
