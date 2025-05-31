
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Utility component for responsive visibility based on breakpoints
 */
interface ResponsiveShowProps {
  children: React.ReactNode;
  on?: 'mobile' | 'tablet' | 'desktop' | 'large';
  above?: 'mobile' | 'tablet' | 'desktop';
  below?: 'tablet' | 'desktop' | 'large';
  className?: string;
}

export const ResponsiveShow: React.FC<ResponsiveShowProps> = ({
  children,
  on,
  above,
  below,
  className
}) => {
  let classes = '';

  if (on) {
    switch (on) {
      case 'mobile':
        classes = 'block md:hidden';
        break;
      case 'tablet':
        classes = 'hidden md:block lg:hidden';
        break;
      case 'desktop':
        classes = 'hidden lg:block xl:hidden';
        break;
      case 'large':
        classes = 'hidden xl:block';
        break;
    }
  }

  if (above) {
    switch (above) {
      case 'mobile':
        classes = 'hidden md:block';
        break;
      case 'tablet':
        classes = 'hidden lg:block';
        break;
      case 'desktop':
        classes = 'hidden xl:block';
        break;
    }
  }

  if (below) {
    switch (below) {
      case 'tablet':
        classes = 'block md:hidden';
        break;
      case 'desktop':
        classes = 'block lg:hidden';
        break;
      case 'large':
        classes = 'block xl:hidden';
        break;
    }
  }

  return (
    <div className={cn(classes, className)}>
      {children}
    </div>
  );
};

/**
 * Responsive spacing utility component
 */
interface ResponsiveSpacingProps {
  children: React.ReactNode;
  className?: string;
  py?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  px?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  my?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  mx?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
}

export const ResponsiveSpacing: React.FC<ResponsiveSpacingProps> = ({
  children,
  className,
  py,
  px,
  my,
  mx
}) => {
  const spacingClasses = cn(
    // Padding Y
    py?.mobile && `py-${py.mobile}`,
    py?.tablet && `md:py-${py.tablet}`,
    py?.desktop && `lg:py-${py.desktop}`,
    py?.large && `xl:py-${py.large}`,
    
    // Padding X
    px?.mobile && `px-${px.mobile}`,
    px?.tablet && `md:px-${px.tablet}`,
    px?.desktop && `lg:px-${px.desktop}`,
    px?.large && `xl:px-${px.large}`,
    
    // Margin Y
    my?.mobile && `my-${my.mobile}`,
    my?.tablet && `md:my-${my.tablet}`,
    my?.desktop && `lg:my-${my.desktop}`,
    my?.large && `xl:my-${my.large}`,
    
    // Margin X
    mx?.mobile && `mx-${mx.mobile}`,
    mx?.tablet && `md:mx-${mx.tablet}`,
    mx?.desktop && `lg:mx-${mx.desktop}`,
    mx?.large && `xl:mx-${mx.large}`,
    
    className
  );

  return (
    <div className={spacingClasses}>
      {children}
    </div>
  );
};

/**
 * Responsive text sizing utility component
 */
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    mobile?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    tablet?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    desktop?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    large?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  };
  weight?: {
    mobile?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    tablet?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    desktop?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    large?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  };
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className,
  size,
  weight
}) => {
  const textClasses = cn(
    // Text sizes
    size?.mobile && `text-${size.mobile}`,
    size?.tablet && `md:text-${size.tablet}`,
    size?.desktop && `lg:text-${size.desktop}`,
    size?.large && `xl:text-${size.large}`,
    
    // Font weights
    weight?.mobile && `font-${weight.mobile}`,
    weight?.tablet && `md:font-${weight.tablet}`,
    weight?.desktop && `lg:font-${weight.desktop}`,
    weight?.large && `xl:font-${weight.large}`,
    
    className
  );

  return (
    <div className={textClasses}>
      {children}
    </div>
  );
};
