
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { useI18nContext } from '@/components/ui/language-toggle';

export const DesktopNav = () => {
  const location = useLocation();
  const { t, currentLanguage } = useI18nContext();
  const [forceUpdate, setForceUpdate] = React.useState(0);

  // Listen for language changes and force re-render
  React.useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('language-updated', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'seftec-language') {
        setForceUpdate(prev => prev + 1);
      }
    });

    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('language-updated', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  // Map navigation titles to translation keys
  const getNavTitle = (title: string) => {
    const titleMap: Record<string, string> = {
      'Home': t('nav.home', 'Home'),
      'Solutions': t('nav.solutions', 'Solutions'),
      'BizTools': t('nav.biztools', 'BizTools'),
      'Enterprise DeFi': t('nav.defi', 'Enterprise DeFi'),
      'About Us': t('nav.about', 'About Us'),
    };
    return titleMap[title] || title;
  };

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
          {getNavTitle(item.title)}
          <span className={cn(
            "absolute -bottom-1 left-0 w-0 h-0.5 bg-seftec-gold dark:bg-seftec-teal transition-all duration-300 group-hover:w-full",
            location.pathname === item.href && "w-full"
          )} />
        </Link>
      ))}
    </nav>
  );
};
