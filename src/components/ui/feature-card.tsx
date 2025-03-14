
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, Shield } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  index?: number;
  secure?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  index = 0,
  secure = false
}) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className={cn(
        'feature-card relative p-8 rounded-2xl soft-shadow border',
        'bg-white border-seftec-slate dark:bg-seftec-darkNavy/80 dark:border-white/10',
        'animate-fade-up',
        className
      )}
      style={{ animationDelay }}
    >
      <div className={cn(
        'absolute -top-4 -left-4 p-3 rounded-xl shadow-md',
        'bg-gradient-to-br from-seftec-navy to-seftec-navy/80',
        'dark:from-seftec-teal dark:to-seftec-purple'
      )}>
        <Icon
          className={cn('text-white', iconClassName)}
          size={24}
        />
      </div>
      {secure && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 text-xs text-seftec-navy/60 dark:text-white/60">
            <Shield size={12} className="text-seftec-teal" />
            <span>Secured</span>
          </div>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">{title}</h3>
        <p className="text-seftec-navy/70 dark:text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
