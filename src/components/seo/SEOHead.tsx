import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoManager, SEOPageConfig } from '@/services/SEOManager';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  og?: SEOPageConfig['og'];
  twitter?: SEOPageConfig['twitter'];
  robots?: string;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  keywords,
  og,
  twitter,
  robots,
  structuredData,
  breadcrumbs,
}) => {
  const location = useLocation();
  const pageConfig = seoManager.getPageConfig(location.pathname);

  const resolvedTitle = seoManager.resolveTitle(title || pageConfig.title);
  const resolvedDescription = description || pageConfig.description;
  const resolvedCanonical = seoManager.resolveCanonical(canonical, location.pathname);
  const resolvedKeywords = keywords?.join(', ') || pageConfig.keywords?.join(', ') || '';
  const resolvedRobots = seoManager.resolveRobots(robots || pageConfig.robots);

  const resolvedOg = {
    title: og?.title || resolvedTitle,
    description: og?.description || resolvedDescription,
    image: og?.image || seoManager.getConfig().defaultImage,
    type: og?.type || 'website',
  };

  const resolvedTwitter = {
    card: twitter?.card || 'summary_large_image',
    title: twitter?.title || resolvedTitle,
    description: twitter?.description || resolvedDescription,
    image: twitter?.image || resolvedOg.image,
  };

  const jsonLd = structuredData || seoManager.getStructuredData(location.pathname);

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      }
    : null;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      <meta name="robots" content={resolvedRobots} />
      <link rel="canonical" href={resolvedCanonical} />

      <meta property="og:type" content={resolvedOg.type} />
      <meta property="og:title" content={resolvedOg.title} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedOg.image} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={seoManager.getConfig().siteName} />
      <meta property="og:locale" content={seoManager.getConfig().locale} />

      <meta name="twitter:card" content={resolvedTwitter.card} />
      <meta name="twitter:title" content={resolvedTwitter.title} />
      <meta name="twitter:description" content={resolvedTwitter.description} />
      <meta name="twitter:image" content={resolvedTwitter.image} />
      {seoManager.getConfig().twitterHandle && (
        <meta name="twitter:site" content={seoManager.getConfig().twitterHandle} />
      )}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
