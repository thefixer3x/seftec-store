
export interface FAQItem {
  question: string;
  answer: string;
  tags?: string[];
}

export interface FAQCategory {
  title: string;
  description: string;
  icon: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: "Platform Overview",
    description: "Learn about SEFTEC's core platform and services",
    icon: "Building2",
    items: [
      {
        question: "What is SEFTEC and what services do you provide?",
        answer: "SEFTEC is a comprehensive enterprise DeFi access platform that combines AI-powered B2B marketplace functionality with advanced financial services. We provide trade finance, multi-country business registration, global compliance monitoring, cashflow management, risk analytics, and ISO 20022 compliant solutions for businesses worldwide.",
        tags: ["platform", "overview", "services"]
      },
      {
        question: "What makes SEFTEC different from other B2B platforms?",
        answer: "SEFTEC uniquely combines enterprise-grade DeFi infrastructure with traditional business services. Our platform features ISO 20022 compliance, AI-powered business advisory, multi-chain blockchain integration, regulatory sandbox participation, and comprehensive trade finance solutions - all in one unified platform.",
        tags: ["differentiation", "unique", "features"]
      },
      {
        question: "Who can use SEFTEC's platform?",
        answer: "SEFTEC serves enterprises, SMEs, startups, financial institutions, and business service providers globally. Our platform is designed for businesses seeking secure, compliant, and efficient access to DeFi services, trade finance, and international business registration.",
        tags: ["target", "users", "eligibility"]
      },
      {
        question: "In which countries is SEFTEC available?",
        answer: "SEFTEC operates globally with specific focus on markets including the UK, EU, Singapore, Japan, Brazil, Mexico, and expanding to 25+ countries. We maintain regulatory compliance and partnerships in each jurisdiction we serve.",
        tags: ["countries", "availability", "global"]
      }
    ]
  },
  {
    title: "Account & Authentication",
    description: "Account setup, security, and authentication processes",
    icon: "Shield",
    items: [
      {
        question: "How do I create an account on SEFTEC?",
        answer: "Creating an account is simple: visit our registration page, provide your business details, complete email verification, and go through our streamlined KYB (Know Your Business) process. Our AI assistant will guide you through each step of the onboarding process.",
        tags: ["registration", "account", "setup"]
      },
      {
        question: "What verification documents do I need?",
        answer: "Required documents typically include: business registration certificates, tax identification numbers, director/shareholder identification, proof of business address, and financial statements. Specific requirements vary by jurisdiction and business type.",
        tags: ["verification", "documents", "KYB"]
      },
      {
        question: "How secure is my data on SEFTEC?",
        answer: "We implement enterprise-grade security including hardware security modules (HSM), multi-party computation (MPC) cryptography, end-to-end encryption, SOC 2 compliance, and comprehensive audit trails. Your data is protected by multiple layers of security and stored in compliance with GDPR and other data protection regulations.",
        tags: ["security", "data", "privacy"]
      },
      {
        question: "Can I enable two-factor authentication (2FA)?",
        answer: "Yes, SEFTEC supports multiple 2FA options including SMS, authenticator apps (Google Authenticator, Authy), and hardware security keys. We strongly recommend enabling 2FA for enhanced account security.",
        tags: ["2FA", "authentication", "security"]
      },
      {
        question: "How do I reset my password or recover my account?",
        answer: "Use the 'Forgot Password' link on the login page to initiate password reset via email. For account recovery, contact our support team with proper identification. We also offer account recovery through verified backup methods you can set up in your security settings.",
        tags: ["password", "recovery", "account"]
      }
    ]
  },
  {
    title: "Business Registration & Compliance",
    description: "Multi-country business setup and regulatory compliance",
    icon: "FileText",
    items: [
      {
        question: "Can SEFTEC help me register my business in multiple countries?",
        answer: "Yes, SEFTEC offers multi-country business registration services covering 20+ jurisdictions including UK, EU member states, Singapore, and more. Our platform streamlines the incorporation process and ensures compliance with local regulations.",
        tags: ["registration", "multi-country", "incorporation"]
      },
      {
        question: "What compliance frameworks does SEFTEC support?",
        answer: "SEFTEC supports comprehensive compliance frameworks including ISO 20022, SOX, GDPR, AML/KYC, PCI DSS, and jurisdiction-specific regulations. Our platform provides automated compliance monitoring and reporting to ensure ongoing adherence.",
        tags: ["compliance", "frameworks", "regulations"]
      },
      {
        question: "How long does business registration take?",
        answer: "Registration timelines vary by jurisdiction: UK (1-3 days), Singapore (1-2 weeks), EU member states (1-4 weeks). Our platform provides real-time status updates and expedited processing options where available.",
        tags: ["timeline", "registration", "processing"]
      },
      {
        question: "Do you provide ongoing compliance monitoring?",
        answer: "Yes, SEFTEC offers continuous compliance monitoring including regulatory change alerts, automated filing reminders, compliance score tracking, and detailed audit trails. Our AI system proactively identifies potential compliance issues.",
        tags: ["monitoring", "ongoing", "compliance"]
      }
    ]
  },
  {
    title: "DeFi & Blockchain Services",
    description: "Decentralized finance and blockchain integration",
    icon: "Coins",
    items: [
      {
        question: "What DeFi services does SEFTEC offer?",
        answer: "SEFTEC provides enterprise-grade DeFi services including yield farming, liquidity provision, staking, cross-chain swaps, decentralized lending/borrowing, and CBDC integration. All services are compliant with regulatory requirements and feature institutional-grade security.",
        tags: ["DeFi", "services", "blockchain"]
      },
      {
        question: "Which blockchains does SEFTEC support?",
        answer: "SEFTEC supports multiple blockchains including Ethereum, Polygon, Arbitrum, and preparing for additional chains. Our multi-chain architecture enables seamless cross-chain transactions and unified liquidity management.",
        tags: ["blockchain", "multi-chain", "networks"]
      },
      {
        question: "How does SEFTEC ensure DeFi security?",
        answer: "Our DeFi infrastructure includes smart contract audits, multi-signature wallets, insurance coverage, real-time monitoring, and emergency pause mechanisms. We use battle-tested protocols and maintain comprehensive risk management systems.",
        tags: ["DeFi", "security", "risk"]
      },
      {
        question: "Can I access traditional banking alongside DeFi services?",
        answer: "Yes, SEFTEC bridges traditional banking with DeFi through ISO 20022 compliant interfaces, CBDC integration, and partnerships with major financial institutions including JPMorgan Chase, HSBC, and Deutsche Bank.",
        tags: ["banking", "traditional", "integration"]
      }
    ]
  },
  {
    title: "AI & Business Advisory",
    description: "AI-powered business insights and recommendations",
    icon: "Brain",
    items: [
      {
        question: "How does SEFTEC's AI assistant help my business?",
        answer: "Our AI assistant, BizGenie, provides personalized business insights, market analysis, financial forecasting, compliance recommendations, and strategic planning assistance. It learns from your business patterns to offer increasingly relevant advice.",
        tags: ["AI", "assistant", "business"]
      },
      {
        question: "What kind of business plans can the AI generate?",
        answer: "BizGenie can generate comprehensive business plans including market analysis, financial projections, competitive landscape assessment, growth strategies, risk analysis, and funding recommendations tailored to your industry and goals.",
        tags: ["business", "plans", "AI"]
      },
      {
        question: "Is my business data used to train SEFTEC's AI?",
        answer: "No, your proprietary business data is never used to train our AI models. We maintain strict data segregation and use only anonymized, aggregated market data for AI improvements. Your business information remains confidential and secure.",
        tags: ["AI", "privacy", "data"]
      },
      {
        question: "Can the AI help with financial forecasting?",
        answer: "Yes, our AI provides sophisticated financial forecasting including cashflow projections, revenue modeling, expense optimization recommendations, and scenario planning. It integrates with your financial data to provide accurate, actionable insights.",
        tags: ["forecasting", "financial", "AI"]
      }
    ]
  },
  {
    title: "Trade Finance & Payments",
    description: "International trade finance and payment solutions",
    icon: "CreditCard",
    items: [
      {
        question: "What trade finance services does SEFTEC provide?",
        answer: "SEFTEC offers comprehensive trade finance including letters of credit, trade guarantees, supply chain financing, invoice factoring, export financing, and blockchain-based trade documentation. We support both traditional and innovative financing methods.",
        tags: ["trade", "finance", "services"]
      },
      {
        question: "Which payment methods does SEFTEC support?",
        answer: "We support multiple payment gateways including Stripe for international transactions, SaySwitch for local payments, PayPal for global coverage, bank transfers, cryptocurrency payments, and CBDC transactions where available.",
        tags: ["payments", "methods", "gateways"]
      },
      {
        question: "How fast are international payments processed?",
        answer: "International payment processing varies by method: blockchain transactions (minutes to hours), traditional wire transfers (1-3 business days), and our expedited services (same day). Real-time tracking is available for all transactions.",
        tags: ["payments", "international", "speed"]
      },
      {
        question: "What are the fees for trade finance services?",
        answer: "Our fee structure is transparent and competitive: trade finance (0.5-2.5% depending on risk and term), payment processing (1-3%), and subscription tiers starting from basic (free) to enterprise (custom pricing). Contact us for detailed pricing based on your needs.",
        tags: ["fees", "pricing", "trade"]
      }
    ]
  },
  {
    title: "Marketplace & B2B Trading",
    description: "B2B marketplace features and trading capabilities",
    icon: "Store",
    items: [
      {
        question: "How does SEFTEC's B2B marketplace work?",
        answer: "Our AI-powered B2B marketplace connects verified businesses globally. Features include smart matching algorithms, automated quote generation, secure escrow services, integrated trade finance, and comprehensive seller/buyer verification.",
        tags: ["marketplace", "B2B", "trading"]
      },
      {
        question: "How are suppliers and buyers verified?",
        answer: "We use comprehensive verification including business registration validation, financial background checks, trade reference verification, compliance screening, and ongoing performance monitoring. All participants undergo rigorous KYB processes.",
        tags: ["verification", "suppliers", "buyers"]
      },
      {
        question: "Can I integrate my existing e-commerce platform?",
        answer: "Yes, SEFTEC provides APIs and webhooks for seamless integration with popular e-commerce platforms like Shopify, WooCommerce, Magento, and custom solutions. Our integration supports inventory sync, order management, and payment processing.",
        tags: ["integration", "e-commerce", "API"]
      },
      {
        question: "What dispute resolution mechanisms are available?",
        answer: "SEFTEC offers multi-tier dispute resolution including automated mediation, expert arbitration, escrow protection, and legal support. Our smart contracts include dispute mechanisms, and we partner with international arbitration institutions.",
        tags: ["disputes", "resolution", "arbitration"]
      }
    ]
  },
  {
    title: "Pricing & Subscriptions",
    description: "Subscription plans, pricing, and billing information",
    icon: "DollarSign",
    items: [
      {
        question: "What subscription plans does SEFTEC offer?",
        answer: "SEFTEC offers tiered plans: Basic (free with core features), Professional ($99/month with advanced tools), Enterprise ($499/month with full features), and Custom (tailored solutions). Each plan includes different transaction limits and feature access.",
        tags: ["subscription", "plans", "pricing"]
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a 30-day free trial of our Professional plan with full access to most features. No credit card required for the trial, and you can upgrade or downgrade at any time based on your needs.",
        tags: ["trial", "free", "access"]
      },
      {
        question: "How is billing handled?",
        answer: "Billing is processed monthly or annually (with discounts for annual payments). We accept major credit cards, bank transfers, and cryptocurrency payments. All billing is transparent with detailed invoicing and usage tracking.",
        tags: ["billing", "payment", "invoicing"]
      },
      {
        question: "Can I change or cancel my subscription?",
        answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time through your account settings. Changes take effect at the next billing cycle, and we provide prorated billing for plan changes.",
        tags: ["subscription", "change", "cancel"]
      }
    ]
  },
  {
    title: "Technical Support & API",
    description: "Technical assistance, API documentation, and integrations",
    icon: "Code",
    items: [
      {
        question: "What technical support does SEFTEC provide?",
        answer: "We offer 24/7 technical support through multiple channels: live chat, email, phone support (for Enterprise clients), comprehensive documentation, video tutorials, and dedicated account managers for Enterprise customers.",
        tags: ["support", "technical", "assistance"]
      },
      {
        question: "Does SEFTEC provide API access?",
        answer: "Yes, SEFTEC offers comprehensive RESTful APIs with detailed documentation, SDKs for popular programming languages, webhook support, sandbox environment for testing, and rate limiting appropriate to your subscription level.",
        tags: ["API", "technical", "integration"]
      },
      {
        question: "How can I integrate SEFTEC with my existing systems?",
        answer: "Integration options include RESTful APIs, webhooks, pre-built connectors for popular platforms, custom integration consulting, and white-label solutions. Our technical team provides implementation support and best practices guidance.",
        tags: ["integration", "systems", "technical"]
      },
      {
        question: "What SLA do you guarantee?",
        answer: "SEFTEC guarantees 99.9% uptime SLA for all paid plans, with 99.95% for Enterprise customers. We provide real-time status monitoring, incident response within 15 minutes, and compensation for SLA breaches.",
        tags: ["SLA", "uptime", "reliability"]
      }
    ]
  }
];
