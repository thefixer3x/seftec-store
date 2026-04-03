import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { OrganizationJsonLd, WebSiteJsonLd } from './JsonLd';

interface SEOLayoutProps {
  children: React.ReactNode;
}

export const SEOLayout: React.FC<SEOLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <SEOHead />
      {isHomePage && (
        <>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
        </>
      )}
      {children}
    </>
  );
};

export default SEOLayout;
