export interface SEOPageConfig {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  og?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'product' | 'article';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: string;
  structuredData?: object;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
  locale?: string;
}

const DEFAULT_SEO: SEOConfig = {
  siteName: 'SEFTEC B2B Trade Hub',
  siteUrl: 'https://www.seftechub.com',
  defaultTitle: 'SEFTEC B2B Trade Hub — B2B Ecommerce Platform',
  defaultDescription: 'Open-source B2B ecommerce platform with marketplace, multi-currency payments, trade finance, AI business tools, and real-time notifications.',
  defaultImage: 'https://www.seftechub.com/og-image.png',
  twitterHandle: '@seftechub',
  locale: 'en_US',
};

const PAGE_CONFIGS: Record<string, SEOPageConfig> = {
  '/': {
    title: 'SEFTEC B2B Trade Hub — B2B Ecommerce Platform',
    description: 'Open-source B2B ecommerce platform with marketplace, multi-currency payments (Stripe, PayPal, SaySwitch), trade finance, AI-powered business tools, and real-time notifications.',
    keywords: ['b2b', 'ecommerce', 'marketplace', 'trade finance', 'payments', 'stripe', 'open-source'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SEFTEC B2B Trade Hub',
      url: 'https://www.seftechub.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.seftechub.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  },
  '/about': {
    title: 'About SEFTEC — B2B Trade Hub Platform',
    description: 'Learn about SEFTEC\'s mission to democratize B2B trade with open-source technology, seamless payments, and AI-powered business intelligence.',
    keywords: ['about', 'company', 'b2b', 'mission', 'team'],
  },
  '/contact': {
    title: 'Contact SEFTEC — Get in Touch',
    description: 'Contact the SEFTEC team for partnerships, support, or enterprise inquiries about our B2B trade platform.',
    keywords: ['contact', 'support', 'partnership', 'enterprise'],
  },
  '/solutions': {
    title: 'SEFTEC Solutions — B2B Platform Features',
    description: 'Explore SEFTEC\'s comprehensive B2B solutions: marketplace, trade finance, multi-currency payments, AI business tools, and real-time notifications.',
    keywords: ['solutions', 'features', 'marketplace', 'trade finance', 'payments'],
  },
  '/value-propositions': {
    title: 'SEFTEC Value Propositions — Why Choose Us',
    description: 'Discover why businesses choose SEFTEC for B2B trade: open-source flexibility, multi-provider payments, AI insights, and trade finance.',
    keywords: ['value', 'benefits', 'advantages', 'b2b'],
  },
  '/biztools': {
    title: 'Business Tools — SEFTEC Dashboard',
    description: 'Manage inventory, customers, and financial reporting with SEFTEC\'s integrated business tools dashboard.',
    keywords: ['business tools', 'inventory', 'customers', 'reporting', 'dashboard'],
    robots: 'index, follow',
  },
  '/bizgenie': {
    title: 'BizGenie AI — AI-Powered Business Assistant',
    description: 'Get AI-powered business insights, market analysis, and personalized recommendations with SEFTEC\'s BizGenie AI assistant.',
    keywords: ['ai', 'bizgenie', 'business intelligence', 'chatbot', 'automation'],
    og: {
      type: 'website',
    },
  },
  '/faq': {
    title: 'FAQ — Frequently Asked Questions',
    description: 'Find answers to common questions about SEFTEC B2B Trade Hub, payments, trade finance, and getting started.',
    keywords: ['faq', 'help', 'questions', 'support'],
  },
  '/shop': {
    title: 'Shop — B2B Marketplace',
    description: 'Browse and purchase products from verified B2B suppliers on SEFTEC\'s secure marketplace.',
    keywords: ['shop', 'marketplace', 'b2b', 'products', 'suppliers'],
  },
  '/products': {
    title: 'Products — B2B Product Catalog',
    description: 'Explore our comprehensive B2B product catalog with detailed specifications, pricing, and supplier information.',
    keywords: ['products', 'catalog', 'b2b', 'suppliers'],
  },
  '/terms': {
    title: 'Terms of Service — SEFTEC',
    description: 'Read SEFTEC\'s Terms of Service governing the use of our B2B trade platform.',
    keywords: ['terms', 'legal', 'service'],
    robots: 'noindex',
  },
  '/privacy': {
    title: 'Privacy Policy — SEFTEC',
    description: 'Learn how SEFTEC protects your data and privacy while providing B2B trade services.',
    keywords: ['privacy', 'policy', 'data protection'],
    robots: 'noindex',
  },
  '/cookies': {
    title: 'Cookie Policy — SEFTEC',
    description: 'Understanding how SEFTEC uses cookies and similar technologies on our B2B platform.',
    keywords: ['cookies', 'policy', 'tracking'],
    robots: 'noindex',
  },
  '/security': {
    title: 'Security — SEFTEC Platform Security',
    description: 'SEFTEC prioritizes security with PCI-DSS compliance, encrypted transactions, and multi-factor authentication.',
    keywords: ['security', 'encryption', 'pci-dss', 'authentication'],
  },
  '/defi-leadership': {
    title: 'DeFi Leadership — SEFTEC Innovation',
    description: 'Leading the intersection of decentralized finance and B2B trade with innovative blockchain-powered solutions.',
    keywords: ['defi', 'blockchain', 'leadership', 'innovation'],
  },
  '/login': {
    title: 'Login — SEFTEC B2B Trade Hub',
    description: 'Login to your SEFTEC account to access the B2B marketplace, trade finance, and business tools.',
    keywords: ['login', 'signin', 'account'],
    robots: 'noindex, nofollow',
  },
  '/register': {
    title: 'Register — Join SEFTEC B2B Trade Hub',
    description: 'Create your SEFTEC account to start trading, accessing trade finance, and using AI business tools.',
    keywords: ['register', 'signup', 'account', 'join'],
    robots: 'noindex, nofollow',
  },
  '/dashboard': {
    title: 'Dashboard — SEFTEC Business Hub',
    description: 'Your SEFTEC dashboard: manage orders, wallet, marketplace, trade finance, and business analytics.',
    keywords: ['dashboard', 'business', 'orders', 'wallet'],
    robots: 'noindex, nofollow',
  },
};

class SEOManager {
  private config: SEOConfig;

  constructor(config: Partial<SEOConfig> = {}) {
    this.config = { ...DEFAULT_SEO, ...config };
  }

  getConfig(): SEOConfig {
    return { ...this.config };
  }

  getPageConfig(path: string): SEOPageConfig {
    const normalizedPath = this.normalizePath(path);
    return PAGE_CONFIGS[normalizedPath] || this.getDefaultPageConfig();
  }

  private normalizePath(path: string): string {
    if (path.startsWith('/dashboard')) return '/dashboard';
    if (path.startsWith('/profile')) return '/dashboard';
    return path;
  }

  private getDefaultPageConfig(): SEOPageConfig {
    return {
      title: this.config.defaultTitle,
      description: this.config.defaultDescription,
    };
  }

  resolveTitle(pageTitle?: string): string {
    if (!pageTitle) return this.config.defaultTitle;
    return `${pageTitle} | ${this.config.siteName}`;
  }

  resolveCanonical(canonical?: string, currentPath?: string): string {
    if (canonical) return canonical;
    return `${this.config.siteUrl}${currentPath || ''}`;
  }

  resolveRobots(robots?: string): string {
    return robots || 'index, follow';
  }

  getStructuredData(path: string): object | undefined {
    const pageConfig = this.getPageConfig(path);
    return pageConfig.structuredData;
  }

  getAllPaths(): string[] {
    return Object.keys(PAGE_CONFIGS);
  }
}

export const seoManager = new SEOManager();
export default SEOManager;
