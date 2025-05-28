
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export const DesktopNav = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {siteConfig.mainNav.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-seftec-gold dark:hover:text-seftec-teal relative group",
            location.pathname === item.href
              ? "text-seftec-navy dark:text-white"
              : "text-seftec-navy/70 dark:text-white/70"
          )}
        >
          {item.title}
          <span className={cn(
            "absolute -bottom-1 left-0 w-0 h-0.5 bg-seftec-gold dark:bg-seftec-teal transition-all duration-300 group-hover:w-full",
            location.pathname === item.href && "w-full"
          )} />
        </Link>
      ))}
    </nav>
  );
};
