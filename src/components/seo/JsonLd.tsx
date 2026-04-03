import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export const OrganizationJsonLd: React.FC<OrganizationJsonLdProps> = ({
  name = 'SEFTEC',
  url = 'https://www.seftechub.com',
  logo = 'https://www.seftechub.com/logo.png',
  description = 'Open-source B2B ecommerce platform with marketplace, trade finance, and AI business tools.',
  sameAs = [
    'https://twitter.com/seftechub',
    'https://linkedin.com/company/seftec',
    'https://github.com/thefixer3x/seftec-store',
  ],
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${url}/contact`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
}

export const WebSiteJsonLd: React.FC<WebSiteJsonLdProps> = ({
  name = 'SEFTEC B2B Trade Hub',
  url = 'https://www.seftechub.com',
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEFTEC',
      url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface ProductJsonLdProps {
  name: string;
  description?: string;
  image?: string;
  price?: string;
  currency?: string;
  availability?: string;
  url?: string;
}

export const ProductJsonLd: React.FC<ProductJsonLdProps> = ({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'https://schema.org/InStock',
  url,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability,
      url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface FAQJsonLdProps {
  questions: Array<{ question: string; answer: string }>;
}

export const FAQJsonLd: React.FC<FAQJsonLdProps> = ({ questions }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default { OrganizationJsonLd, WebSiteJsonLd, ProductJsonLd, FAQJsonLd };
