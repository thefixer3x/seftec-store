
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
}

/**
 * Responsive grid component with mobile-first approach
 * Provides consistent grid layouts across breakpoints
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  gap = { mobile: 4, tablet: 6, desktop: 8, large: 8 }
}) => {
  const gridClasses = cn(
    'grid w-full',
    // Mobile-first columns
    `grid-cols-${cols.mobile}`,
    cols.tablet && `md:grid-cols-${cols.tablet}`,
    cols.desktop && `lg:grid-cols-${cols.desktop}`,
    cols.large && `xl:grid-cols-${cols.large}`,
    // Mobile-first gaps
    `gap-${gap.mobile}`,
    gap.tablet && `md:gap-${gap.tablet}`,
    gap.desktop && `lg:gap-${gap.desktop}`,
    gap.large && `xl:gap-${gap.large}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

/**
 * Responsive container with consistent padding and max-width
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  padding = { mobile: 'px-4', tablet: 'px-6', desktop: 'px-8' },
  maxWidth = '7xl'
}) => {
  const containerClasses = cn(
    'mx-auto w-full',
    // Max width
    maxWidth !== 'full' && `max-w-${maxWidth}`,
    // Mobile-first padding
    padding.mobile,
    padding.tablet && `md:${padding.tablet}`,
    padding.desktop && `lg:${padding.desktop}`,
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  loading?: 'lazy' | 'eager';
}

/**
 * Responsive image component with optimized loading
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  aspectRatio = 'video',
  loading = 'lazy'
}) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[3/4]'
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg', aspectClasses[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};
