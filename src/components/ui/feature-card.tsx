
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  index = 0
}) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className={cn(
        'feature-card relative bg-white p-8 rounded-2xl soft-shadow border border-seftec-slate animate-fade-up',
        className
      )}
      style={{ animationDelay }}
    >
      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-seftec-navy to-seftec-navy/80 p-3 rounded-xl shadow-md">
        <Icon
          className={cn('text-white', iconClassName)}
          size={24}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-seftec-navy mb-3">{title}</h3>
        <p className="text-seftec-navy/70">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
