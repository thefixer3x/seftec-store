
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  index?: number;
  secure?: boolean;
  defiRelated?: boolean;
  link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  index = 0,
  secure = false,
  defiRelated = false,
  link
}) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;
  
  const CardContent = () => (
    <>
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
      {defiRelated && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 text-xs bg-seftec-gold/10 dark:bg-seftec-teal/10 px-2 py-1 rounded-full text-seftec-gold dark:text-seftec-teal">
            <span>DeFi Powered</span>
          </div>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">{title}</h3>
        <p className="text-seftec-navy/70 dark:text-white/70">{description}</p>
      </div>
    </>
  );

  const cardClasses = cn(
    'feature-card relative p-8 rounded-2xl soft-shadow border',
    'bg-white border-seftec-slate dark:bg-seftec-darkNavy/80 dark:border-white/10',
    'animate-fade-up',
    link && 'hover:border-seftec-gold/50 dark:hover:border-seftec-teal/50 transition-colors cursor-pointer',
    className
  );

  if (link) {
    return (
      <Link 
        to={link}
        className={cardClasses}
        style={{ animationDelay }}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div
      className={cardClasses}
      style={{ animationDelay }}
    >
      <CardContent />
    </div>
  );
};

export default FeatureCard;
