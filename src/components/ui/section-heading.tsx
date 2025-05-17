
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  labelClassName?: string;
  useDefaultFont?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  label,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
  labelClassName,
  useDefaultFont = false
}) => {
  return (
    <div 
      className={cn(
        'mb-12 space-y-3',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
          'font-sans': useDefaultFont
        },
        className
      )}
    >
      {label && (
        <span 
          className={cn(
            'inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-seftec-navy/10 text-seftec-navy rounded-full animate-fade-in dark:bg-white/10 dark:text-white',
            labelClassName
          )}
        >
          {label}
        </span>
      )}
      <h2 
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold text-seftec-navy leading-tight animate-fade-up dark:text-white',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={cn(
            'text-lg text-seftec-navy/70 max-w-3xl mx-auto animate-fade-up animate-delay-200 dark:text-white/70',
            align === 'left' ? 'mr-auto' : '',
            align === 'right' ? 'ml-auto' : '',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
