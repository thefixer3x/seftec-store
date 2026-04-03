import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { seoManager, SEOPageConfig } from '@/services/SEOManager';

export interface UseSEOOptions {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  robots?: string;
  og?: SEOPageConfig['og'];
  twitter?: SEOPageConfig['twitter'];
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export const useSEO = (options: UseSEOOptions = {}) => {
  const location = useLocation();
  const pageConfig = seoManager.getPageConfig(location.pathname);

  const seo = useMemo(() => {
    const resolvedTitle = options.title || pageConfig.title;
    const resolvedDescription = options.description || pageConfig.description;
    const resolvedCanonical = options.canonical || seoManager.resolveCanonical(undefined, location.pathname);
    const resolvedKeywords = options.keywords?.join(', ') || pageConfig.keywords?.join(', ') || '';
    const resolvedRobots = options.robots || pageConfig.robots || 'index, follow';

    return {
      title: seoManager.resolveTitle(resolvedTitle),
      description: resolvedDescription,
      canonical: resolvedCanonical,
      keywords: resolvedKeywords,
      robots: resolvedRobots,
      og: {
        title: options.og?.title || resolvedTitle,
        description: options.og?.description || resolvedDescription,
        image: options.og?.image || seoManager.getConfig().defaultImage,
        type: options.og?.type || 'website',
        url: resolvedCanonical,
        siteName: seoManager.getConfig().siteName,
      },
      twitter: {
        card: options.twitter?.card || 'summary_large_image',
        title: options.twitter?.title || resolvedTitle,
        description: options.twitter?.description || resolvedDescription,
        image: options.twitter?.image || seoManager.getConfig().defaultImage,
      },
      structuredData: options.structuredData || seoManager.getStructuredData(location.pathname),
      breadcrumbs: options.breadcrumbs,
    };
  }, [options, pageConfig, location.pathname]);

  return seo;
};

export default useSEO;
