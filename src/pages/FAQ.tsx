
import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { EnhancedFAQSection } from '@/components/sections/EnhancedFAQSection';

const FAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SEFTEC and what services do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEFTEC is a comprehensive enterprise DeFi access platform that combines AI-powered B2B marketplace functionality with advanced financial services. We provide trade finance, multi-country business registration, global compliance monitoring, cashflow management, risk analytics, and ISO 20022 compliant solutions for businesses worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "How does SEFTEC's AI assistant help my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI assistant, BizGenie, provides personalized business insights, market analysis, financial forecasting, compliance recommendations, and strategic planning assistance. It learns from your business patterns to offer increasingly relevant advice."
        }
      },
      {
        "@type": "Question",
        "name": "What DeFi services does SEFTEC offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEFTEC provides enterprise-grade DeFi services including yield farming, liquidity provision, staking, cross-chain swaps, decentralized lending/borrowing, and CBDC integration. All services are compliant with regulatory requirements and feature institutional-grade security."
        }
      },
      {
        "@type": "Question",
        "name": "Can SEFTEC help me register my business in multiple countries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SEFTEC offers multi-country business registration services covering 20+ jurisdictions including UK, EU member states, Singapore, and more. Our platform streamlines the incorporation process and ensures compliance with local regulations."
        }
      },
      {
        "@type": "Question",
        "name": "What trade finance services does SEFTEC provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEFTEC offers comprehensive trade finance including letters of credit, trade guarantees, supply chain financing, invoice factoring, export financing, and blockchain-based trade documentation. We support both traditional and innovative financing methods."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Comprehensive Guide | SEFTEC Enterprise DeFi Platform</title>
        <meta 
          name="description" 
          content="Find detailed answers about SEFTEC's enterprise DeFi platform, B2B marketplace, trade finance, business registration, AI services, compliance, and more. Comprehensive FAQ covering all platform features." 
        />
        <meta 
          name="keywords" 
          content="SEFTEC FAQ, enterprise DeFi questions, B2B marketplace help, trade finance FAQ, business registration questions, AI assistant help, blockchain services, compliance questions, payment solutions, technical support" 
        />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://seftechub.com/faq" />
        
        {/* Open Graph */}
        <meta property="og:title" content="FAQ - Comprehensive Guide | SEFTEC Enterprise DeFi Platform" />
        <meta property="og:description" content="Find detailed answers about SEFTEC's enterprise DeFi platform, B2B marketplace, trade finance, AI services, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seftechub.com/faq" />
        <meta property="og:image" content="https://seftechub.com/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Comprehensive Guide | SEFTEC Enterprise DeFi Platform" />
        <meta name="twitter:description" content="Find detailed answers about SEFTEC's enterprise DeFi platform, B2B marketplace, trade finance, AI services, and more." />
        <meta name="twitter:image" content="https://seftechub.com/og-image.png" />
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "SEFTEC Platform FAQ - Comprehensive Guide",
            "description": "Detailed frequently asked questions covering all aspects of SEFTEC's enterprise DeFi platform",
            "author": {
              "@type": "Organization",
              "name": "SEFTEC DYNAMICS"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SEFTEC DYNAMICS",
              "logo": {
                "@type": "ImageObject",
                "url": "https://seftechub.com/og-image.png"
              }
            },
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://seftechub.com/faq"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-seftec-darkNavy">
        <MainNav items={siteConfig.mainNav} />
        
        <main className="pt-[56px]">
          <EnhancedFAQSection />
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default FAQ;
