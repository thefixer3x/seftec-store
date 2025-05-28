
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface SeftecHubProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * SeftecHub component that displays the Seftec logo and links to the homepage
 */
export function SeftecHub({ children, className }: SeftecHubProps) {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center space-x-2 transition-opacity hover:opacity-80",
        className
      )}
      aria-label="Go to Seftec homepage"
    >
      <Icons.shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
      <span className="font-bold">
        <span className="text-seftec-navy dark:text-white">Seftec</span>
        <span className="text-[#DAA520] dark:text-[#DAA520]">HUB</span>
      </span>
      {children}
    </Link>
  );
}
