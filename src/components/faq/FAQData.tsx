import React from 'react';
import { FAQItem } from './FAQCategory';

// Platform Overview FAQs
export const platformOverviewFAQs: FAQItem[] = [
  {
    id: "what-is-seftec-store",
    question: "What is Seftec.Store?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store is a secure B2B marketplace platform designed to connect businesses with verified suppliers and buyers. Our platform streamlines procurement, simplifies transactions, and provides advanced tools for business growth.</p>
        <p>We combine traditional marketplace functionality with AI-powered features to offer a modern solution for businesses of all sizes looking to expand their supply chain networks securely.</p>
      </>
    )
  },
  {
    id: "who-can-use",
    question: "Who can use Seftec.Store?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store is designed for:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Manufacturers seeking reliable distribution channels</li>
          <li>Wholesalers looking to expand their supplier or buyer networks</li>
          <li>Retailers searching for direct-to-manufacturer relationships</li>
          <li>Service providers offering B2B solutions</li>
          <li>Importers and exporters seeking simplified cross-border trade</li>
        </ul>
        <p>All businesses undergo verification to ensure a trusted ecosystem of legitimate enterprises.</p>
      </>
    )
  },
  {
    id: "key-features",
    question: "What are the key features of Seftec.Store?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store offers a comprehensive suite of features:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Verified Business Network</strong> - All participants undergo verification</li>
          <li><strong>Secure Transactions</strong> - Multiple payment options with fraud protection</li>
          <li><strong>BizGenie AI Assistant</strong> - Personalized business insights and recommendations</li>
          <li><strong>Multi-branch Management</strong> - Control multiple locations from one account</li>
          <li><strong>Trade Finance Solutions</strong> - Access to financing options for growth</li>
          <li><strong>Comprehensive Analytics</strong> - Track performance and identify opportunities</li>
          <li><strong>Digital Wallet</strong> - Manage funds and transactions securely</li>
        </ul>
      </>
    )
  },
  {
    id: "costs",
    question: "How much does it cost to use Seftec.Store?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store offers flexible pricing options:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Basic Access</strong> - Free account with limited features for new businesses</li>
          <li><strong>Business Plan</strong> - $49/month with full marketplace access and basic analytics</li>
          <li><strong>Enterprise Plan</strong> - $199/month with advanced features, dedicated support, and API access</li>
          <li><strong>Custom Solutions</strong> - Tailored enterprise pricing for specific requirements</li>
        </ul>
        <p>Transaction fees vary by payment method and transaction volume, starting at 2.5% per transaction. Volume discounts are available for high-volume users.</p>
      </>
    )
  }
];

// Account Management FAQs
export const accountManagementFAQs: FAQItem[] = [
  {
    id: "create-account",
    question: "How do I create a business account?",
    answer: (
      <>
        <p className="mb-3">Creating a business account on Seftec.Store is simple:</p>
        <ol className="list-decimal pl-6 mb-3 space-y-2">
          <li>Click "Get Started" on the top right of our homepage</li>
          <li>Select "Sign Up" and enter your business email</li>
          <li>Complete the basic profile with your company information</li>
          <li>Verify your email address via the confirmation link</li>
          <li>Submit required documentation for business verification</li>
          <li>Once verified, customize your dashboard and preferences</li>
        </ol>
        <p>The verification process typically takes 1-3 business days, during which you'll have limited platform access.</p>
      </>
    )
  },
  {
    id: "verification",
    question: "What documents are required for business verification?",
    answer: (
      <>
        <p className="mb-3">For standard business verification, we require:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Business registration certificate or equivalent</li>
          <li>Tax identification number</li>
          <li>Proof of business address (utility bill within last 3 months)</li>
          <li>Government-issued ID of the account administrator</li>
        </ul>
        <p className="mb-3">Additional documents may be required depending on your business type, location, or transaction volume:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Industry-specific licenses or permits</li>
          <li>Corporate structure documentation</li>
          <li>Bank account verification</li>
        </ul>
        <p>All documents are processed securely with industry-standard encryption.</p>
      </>
    )
  },
  {
    id: "multiple-users",
    question: "Can I add multiple users to my business account?",
    answer: (
      <>
        <p className="mb-3">Yes, Seftec.Store supports multi-user accounts with role-based permissions:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Administrator</strong> - Full account access including user management</li>
          <li><strong>Manager</strong> - Can create listings, process orders, and manage inventory</li>
          <li><strong>Staff</strong> - Limited access for day-to-day operations</li>
          <li><strong>Finance</strong> - Access to financial transactions and reports only</li>
          <li><strong>Viewer</strong> - Read-only access to designated areas</li>
        </ul>
        <p className="mb-3">To add users:</p>
        <ol className="list-decimal pl-6 mb-3 space-y-2">
          <li>Navigate to Settings {'>'} Team Members</li>
          <li>Click "Add Team Member"</li>
          <li>Enter their email and assign appropriate role</li>
          <li>Set specific permissions if needed</li>
        </ol>
        <p>Business and Enterprise plans have unlimited user seats, while Basic accounts are limited to 2 users.</p>
      </>
    )
  },
  {
    id: "manage-branches",
    question: "How do I manage multiple branches or locations?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store's multi-branch management allows you to oversee multiple business locations from a single dashboard:</p>
        <ol className="list-decimal pl-6 mb-3 space-y-2">
          <li>Go to Dashboard {'>'} Stores</li>
          <li>Click "Create Branch" to add a new location</li>
          <li>Enter the branch details including address and contact information</li>
          <li>Assign branch managers and staff as needed</li>
          <li>Set inventory and order routing preferences</li>
        </ol>
        <p className="mb-3">Each branch can have:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Separate inventory management</li>
          <li>Branch-specific pricing</li>
          <li>Dedicated staff assignments</li>
          <li>Individual performance analytics</li>
        </ul>
        <p>This feature is available on Business and Enterprise plans. Basic accounts are limited to a single location.</p>
      </>
    )
  }
];

// Transactions & Payments FAQs
export const transactionsPaymentsFAQs: FAQItem[] = [
  {
    id: "payment-methods",
    question: "What payment methods are accepted?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store supports multiple secure payment methods:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Credit/Debit Cards</strong> - Major cards including Visa, Mastercard, American Express</li>
          <li><strong>Bank Transfers</strong> - Direct ACH and wire transfers</li>
          <li><strong>Digital Wallet</strong> - Internal platform wallet for fast transactions</li>
          <li><strong>Trade Credit</strong> - Approved businesses can utilize net-30/60/90 terms</li>
          <li><strong>Letter of Credit</strong> - For international transactions</li>
          <li><strong>Escrow Services</strong> - For high-value or first-time transactions</li>
        </ul>
        <p>All payment processing is fully encrypted and compliant with PCI DSS standards.</p>
      </>
    )
  },
  {
    id: "transaction-fees",
    question: "What are the transaction fees?",
    answer: (
      <>
        <p className="mb-3">Transaction fees vary based on payment method and account tier:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Credit/Debit Cards</strong> - 2.9% + $0.30 per transaction</li>
          <li><strong>Bank Transfers</strong> - 1.5% (min $5, max $25)</li>
          <li><strong>Platform Wallet</strong> - 1% for external withdrawals, free for internal transfers</li>
          <li><strong>International Transactions</strong> - Additional 1.5% currency conversion fee</li>
        </ul>
        <p className="mb-3">Volume discounts are available:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>$10,000-$50,000 monthly volume: 10% fee reduction</li>
          <li>$50,001-$250,000 monthly volume: 20% fee reduction</li>
          <li>$250,001+ monthly volume: Custom pricing</li>
        </ul>
        <p>Enterprise accounts receive preferential rates based on their specific agreement.</p>
      </>
    )
  },
  {
    id: "refund-policy",
    question: "What is the refund and dispute policy?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store has a structured approach to refunds and disputes:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Platform Transaction Fees</strong> - Non-refundable once a transaction is processed</li>
          <li><strong>Product/Service Disputes</strong> - Must be initiated within 14 days of delivery</li>
          <li><strong>Resolution Process</strong> - Three-step approach: direct negotiation, platform mediation, and if necessary, arbitration</li>
        </ul>
        <p className="mb-3">For order disputes:</p>
        <ol className="list-decimal pl-6 mb-3 space-y-2">
          <li>Navigate to Orders {'>'} View Details on the disputed order</li>
          <li>Click "Open Dispute" and select the reason</li>
          <li>Provide evidence and requested information</li>
          <li>Our dispute resolution team will review within 3-5 business days</li>
        </ol>
        <p>Enterprise accounts have access to a dedicated dispute manager for expedited resolution.</p>
      </>
    )
  },
  {
    id: "trade-finance",
    question: "How does the Trade Finance feature work?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store's Trade Finance solutions help bridge the gap between order placement and payment:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Purchase Order Financing</strong> - Get funds to fulfill large orders</li>
          <li><strong>Invoice Factoring</strong> - Convert unpaid invoices to immediate cash</li>
          <li><strong>Supply Chain Financing</strong> - Support your suppliers while extending your payment terms</li>
          <li><strong>Inventory Financing</strong> - Secure capital based on inventory value</li>
        </ul>
        <p className="mb-3">To apply for Trade Finance:</p>
        <ol className="list-decimal pl-6 mb-3 space-y-2">
          <li>Verify your business account (minimum 6 months platform history required)</li>
          <li>Navigate to Wallet {'>'} Trade Finance</li>
          <li>Select the appropriate financing option</li>
          <li>Complete the application with required financial documents</li>
          <li>Receive a decision typically within 2-3 business days</li>
        </ol>
        <p>Rates are competitive and determined based on business history, transaction volume, and credit assessment.</p>
      </>
    )
  }
];

// Security & Compliance FAQs
export const securityComplianceFAQs: FAQItem[] = [
  {
    id: "data-security",
    question: "How is my business data protected?",
    answer: (
      <>
        <p className="mb-3">We implement comprehensive measures to protect your business data:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Encryption</strong> - All data is encrypted both in transit (TLS 1.3) and at rest (AES-256)</li>
          <li><strong>Access Controls</strong> - Role-based access control and multi-factor authentication</li>
          <li><strong>Regular Audits</strong> - Independent security audits and penetration testing</li>
          <li><strong>AI Monitoring</strong> - Our BizGenie system actively monitors for suspicious activities</li>
          <li><strong>Data Isolation</strong> - Strict segregation of client data</li>
          <li><strong>Secure Infrastructure</strong> - Hosted on ISO 27001 certified cloud infrastructure</li>
        </ul>
        <p>Our security protocols are regularly updated to address emerging threats and vulnerabilities.</p>
      </>
    )
  },
  {
    id: "compliance",
    question: "What compliance standards does Seftec.Store adhere to?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store complies with major international standards and regulations:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>PCI DSS Level 1</strong> - For payment card processing</li>
          <li><strong>GDPR</strong> - For European data protection requirements</li>
          <li><strong>CCPA</strong> - For California consumer privacy requirements</li>
          <li><strong>ISO 27001</strong> - Information security management</li>
          <li><strong>SOC 2 Type II</strong> - Security, availability, and confidentiality</li>
          <li><strong>KYC/AML</strong> - Know Your Customer and Anti-Money Laundering regulations</li>
        </ul>
        <p className="mb-3">We maintain dedicated compliance teams to ensure ongoing adherence to these standards and any new regulatory requirements. Compliance documentation is available to Enterprise customers upon request.</p>
      </>
    )
  },
  {
    id: "fraud-protection",
    question: "How does Seftec.Store prevent fraud?",
    answer: (
      <>
        <p className="mb-3">Our multi-layered fraud prevention system includes:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Business Verification</strong> - Rigorous vetting of all platform participants</li>
          <li><strong>AI-Powered Monitoring</strong> - Machine learning algorithms detect unusual patterns</li>
          <li><strong>Transaction Screening</strong> - Real-time assessment of payment risks</li>
          <li><strong>Secure Authentication</strong> - Multi-factor authentication for all accounts</li>
          <li><strong>IP Intelligence</strong> - Geographical anomaly detection</li>
          <li><strong>Behavioral Analytics</strong> - Monitoring of user session behavior</li>
        </ul>
        <p className="mb-3">For high-value transactions, additional security measures activate automatically:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Enhanced verification steps</li>
          <li>Manual review by our security team</li>
          <li>Escrow payment options</li>
        </ul>
        <p>Our fraud prevention system is continuously updated based on emerging threats and industry best practices.</p>
      </>
    )
  },
  {
    id: "secure-transactions",
    question: "How do you ensure transaction security?",
    answer: (
      <>
        <p className="mb-3">Transaction security is ensured through multiple protective layers:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>PCI DSS Compliance</strong> - All payment processing adheres to PCI DSS Level 1</li>
          <li><strong>Tokenization</strong> - Payment details are tokenized, not stored directly</li>
          <li><strong>Escrow Options</strong> - For high-value or first-time transactions</li>
          <li><strong>Blockchain Verification</strong> - Immutable transaction records</li>
          <li><strong>3D Secure</strong> - Additional authentication for card transactions</li>
          <li><strong>Real-time Monitoring</strong> - Automated systems flag suspicious transactions</li>
        </ul>
        <p>Our platform maintains segregated financial processing systems with dedicated security controls and continuous monitoring.</p>
      </>
    )
  }
];

// Support & Integration FAQs
export const supportIntegrationFAQs: FAQItem[] = [
  {
    id: "customer-support",
    question: "How can I contact customer support?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store offers multiple support channels:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Live Chat</strong> - Available Monday-Friday, 8am-8pm EST</li>
          <li><strong>Email Support</strong> - support@seftec.store with 24-hour response time</li>
          <li><strong>Phone Support</strong> - Business and Enterprise plans have access to phone support</li>
          <li><strong>Knowledge Base</strong> - Comprehensive documentation and tutorials</li>
          <li><strong>Community Forum</strong> - Connect with other users for tips and best practices</li>
        </ul>
        <p className="mb-3">Support access varies by account tier:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Basic</strong> - Email support with 48-hour response time</li>
          <li><strong>Business</strong> - Email and chat support with 24-hour response time</li>
          <li><strong>Enterprise</strong> - Priority support with dedicated account manager</li>
        </ul>
        <p>For urgent matters, Enterprise customers can use the priority support hotline.</p>
      </>
    )
  },
  {
    id: "system-integration",
    question: "Does Seftec.Store integrate with other business systems?",
    answer: (
      <>
        <p className="mb-3">Yes, Seftec.Store offers extensive integration capabilities:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>ERP Systems</strong> - SAP, Oracle, Microsoft Dynamics, NetSuite</li>
          <li><strong>Accounting Software</strong> - QuickBooks, Xero, FreshBooks, Sage</li>
          <li><strong>CRM Platforms</strong> - Salesforce, HubSpot, Zoho</li>
          <li><strong>Inventory Management</strong> - Fishbowl, Cin7, TradeGecko</li>
          <li><strong>Shipping & Logistics</strong> - ShipStation, Shippo, Freightos</li>
          <li><strong>Payment Processors</strong> - Stripe, PayPal, Square</li>
        </ul>
        <p className="mb-3">Integration methods include:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>API Access</strong> - RESTful API with comprehensive documentation</li>
          <li><strong>Webhooks</strong> - Real-time event notifications</li>
          <li><strong>Pre-built Connectors</strong> - For common business applications</li>
          <li><strong>Custom Integration</strong> - Available for Enterprise customers</li>
        </ul>
        <p>Our API documentation is available at developers.seftec.store. Enterprise accounts include integration support hours with our technical team.</p>
      </>
    )
  },
  {
    id: "training",
    question: "Is training available for new users?",
    answer: (
      <>
        <p className="mb-3">Seftec.Store provides multiple training resources:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Onboarding Wizard</strong> - Interactive tour of key platform features</li>
          <li><strong>Video Tutorials</strong> - Step-by-step guides for common processes</li>
          <li><strong>Documentation</strong> - Comprehensive knowledge base</li>
          <li><strong>Webinars</strong> - Weekly live sessions on various platform features</li>
          <li><strong>Virtual Training</strong> - Scheduled sessions for Business and Enterprise accounts</li>
        </ul>
        <p className="mb-3">Training options by account tier:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Basic</strong> - Self-service onboarding and knowledge base access</li>
          <li><strong>Business</strong> - Includes two hours of virtual training</li>
          <li><strong>Enterprise</strong> - Customized training program and dedicated onboarding specialist</li>
        </ul>
        <p>Additional training sessions can be purchased separately. Our certification program is also available for power users who want to demonstrate platform expertise.</p>
      </>
    )
  },
  {
    id: "ai-assistant",
    question: "How does the BizGenie AI assistant work?",
    answer: (
      <>
        <p className="mb-3">BizGenie is our AI-powered business assistant that offers:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Market Intelligence</strong> - Industry trends and competitive insights</li>
          <li><strong>Business Recommendations</strong> - Personalized suggestions for growth</li>
          <li><strong>Process Optimization</strong> - Identifies efficiency opportunities</li>
          <li><strong>Fraud Detection</strong> - Monitors for suspicious activities</li>
          <li><strong>Natural Language Interface</strong> - Ask questions in plain language</li>
        </ul>
        <p className="mb-3">BizGenie learns from:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Your transaction history and business patterns</li>
          <li>Market data and industry benchmarks</li>
          <li>Platform-wide trends (anonymized)</li>
          <li>Your direct interactions and feedback</li>
        </ul>
        <p>BizGenie is available as a chat interface in your dashboard and can also deliver proactive insights via notifications. Advanced AI features are available on Business and Enterprise plans, while Basic accounts receive limited functionality.</p>
      </>
    )
  }
];

// Import DeFi FAQs
import { defiFAQs } from './FAQData-DeFi';
export { defiFAQs };
