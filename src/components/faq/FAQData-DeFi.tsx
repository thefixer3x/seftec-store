
import React from 'react';
import { FAQItem } from './FAQCategory';

// DeFi FAQs
export const defiFAQs: FAQItem[] = [
  {
    id: "what-is-defi",
    question: "What is Decentralized Finance (DeFi)?",
    answer: (
      <>
        <p className="mb-3">Decentralized Finance (DeFi) refers to a financial system built on blockchain technology that operates without traditional intermediaries like banks or financial institutions. Instead, DeFi uses smart contracts and decentralized applications (dApps) to enable financial services.</p>
        <p className="mb-3">Key characteristics of DeFi include:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Non-custodial management of assets (users maintain control of their funds)</li>
          <li>Transparent and auditable transactions on public blockchains</li>
          <li>Programmable financial services through smart contracts</li>
          <li>Open access to anyone with an internet connection</li>
          <li>Composability, allowing different protocols to work together seamlessly</li>
        </ul>
        <p>Seftec provides enterprise-grade DeFi solutions that merge the innovation of decentralized finance with the security and compliance requirements of institutional users.</p>
      </>
    )
  },
  {
    id: "defi-enterprise-benefits",
    question: "How can DeFi benefit my enterprise?",
    answer: (
      <>
        <p className="mb-3">Enterprise DeFi solutions offer several significant advantages for businesses:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Reduced Costs</strong> - Elimination of intermediaries and automation through smart contracts can significantly lower transaction and operational costs</li>
          <li><strong>Faster Settlements</strong> - Near-instant settlement of transactions compared to traditional systems that may take days</li>
          <li><strong>Enhanced Liquidity</strong> - Access to global liquidity pools and capital markets without geographic restrictions</li>
          <li><strong>Improved Transparency</strong> - Complete audit trails and immutable transaction records</li>
          <li><strong>Process Automation</strong> - Smart contracts enable automated business logic execution without human intervention</li>
          <li><strong>24/7 Operation</strong> - Financial services available around the clock without banking hours limitations</li>
          <li><strong>New Business Models</strong> - Tokenization and programmable assets enable innovative revenue streams</li>
        </ul>
        <p>Seftec's platform delivers these benefits while maintaining the security, compliance, and governance frameworks enterprises require.</p>
      </>
    )
  },
  {
    id: "defi-security",
    question: "How secure are enterprise DeFi solutions?",
    answer: (
      <>
        <p className="mb-3">Enterprise DeFi security is fundamentally different from both traditional finance and public DeFi protocols. Seftec implements multiple layers of security:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Rigorous Smart Contract Auditing</strong> - All code undergoes extensive security audits by multiple independent firms</li>
          <li><strong>Multi-Signature Controls</strong> - Critical operations require multiple authorized approvals</li>
          <li><strong>Role-Based Access Controls</strong> - Granular permissions limit exposure based on user roles</li>
          <li><strong>Real-Time Monitoring</strong> - Advanced threat detection systems with 24/7 security operations</li>
          <li><strong>Insurance Coverage</strong> - Comprehensive policies protect against potential security breaches</li>
          <li><strong>Secure Custody Solutions</strong> - Option for institutional-grade custody of digital assets</li>
          <li><strong>Regular Security Assessments</strong> - Ongoing penetration testing and vulnerability scanning</li>
        </ul>
        <p className="mb-3">Our security framework meets or exceeds the standards of traditional financial institutions, with additional protections specific to blockchain technology.</p>
        <p>For clients with specific security requirements, we offer customized security solutions tailored to your risk profile and compliance needs.</p>
      </>
    )
  },
  {
    id: "defi-vs-traditional",
    question: "How does enterprise DeFi compare to traditional financial services?",
    answer: (
      <>
        <p className="mb-3">Enterprise DeFi and traditional financial services differ in several key aspects:</p>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white dark:bg-seftec-darkNavy/50 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-seftec-navy dark:text-white">Feature</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-seftec-navy dark:text-white">Traditional Finance</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-seftec-navy dark:text-white">Enterprise DeFi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Settlement Time</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">T+1 to T+3 days</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Near-instant to minutes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Operational Hours</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Business hours, weekdays</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">24/7/365</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Intermediaries</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Multiple (banks, clearinghouses)</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Minimal or none</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Transaction Costs</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Generally higher</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Generally lower</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Transparency</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Limited, often opaque</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">High, with auditable records</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Automation</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Limited, often manual processes</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">High, via smart contracts</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy dark:text-white">Geographic Limitations</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Often significant</td>
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-seftec-navy/70 dark:text-white/70">Minimal</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-seftec-navy dark:text-white">Innovation Cycle</td>
                <td className="py-3 px-4 text-sm text-seftec-navy/70 dark:text-white/70">Slow, years for new products</td>
                <td className="py-3 px-4 text-sm text-seftec-navy/70 dark:text-white/70">Rapid, continuous development</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p>Seftec's approach combines the best of both worlds—the innovation and efficiency of DeFi with the security and regulatory compliance of traditional finance—creating enterprise solutions that deliver meaningful business value.</p>
      </>
    )
  },
  {
    id: "defi-compliance",
    question: "How does Seftec ensure regulatory compliance in DeFi solutions?",
    answer: (
      <>
        <p className="mb-3">Regulatory compliance is a cornerstone of Seftec's enterprise DeFi approach. We implement a comprehensive compliance framework that addresses the unique challenges of blockchain-based financial services:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>ISO 20022 Compliance</strong> - Our solutions adhere to global financial messaging standards</li>
          <li><strong>KYC/AML Integration</strong> - Built-in Know Your Customer and Anti-Money Laundering processes</li>
          <li><strong>Jurisdictional Configurations</strong> - Customizable settings to meet requirements in different regions</li>
          <li><strong>Audit Trails</strong> - Comprehensive logging of all transactions and administrative actions</li>
          <li><strong>Compliance Reporting</strong> - Automated report generation for regulatory submissions</li>
          <li><strong>Privacy Controls</strong> - Data protection measures compliant with GDPR and other privacy regulations</li>
        </ul>
        <p className="mb-3">Our compliance team monitors regulatory developments globally to ensure our platform evolves with changing requirements.</p>
        <p>For industries with specialized compliance needs, we offer tailored solutions that address sector-specific regulations such as HIPAA for healthcare or MiFID II for investment services.</p>
      </>
    )
  },
  {
    id: "defi-tokenization",
    question: "What is asset tokenization and how can it benefit businesses?",
    answer: (
      <>
        <p className="mb-3">Asset tokenization is the process of converting rights to an asset into a digital token on a blockchain. This creates a digital representation of a real-world asset that can be more easily transferred, divided, or traded.</p>
        <p className="mb-3">Businesses can tokenize various assets including:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Real estate properties</li>
          <li>Invoices and accounts receivable</li>
          <li>Equipment and machinery</li>
          <li>Inventory and commodities</li>
          <li>Intellectual property rights</li>
          <li>Revenue streams and cash flows</li>
        </ul>
        <p className="mb-3">Key benefits of tokenization for enterprises include:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li><strong>Enhanced Liquidity</strong> - Transform illiquid assets into more easily tradable tokens</li>
          <li><strong>Fractional Ownership</strong> - Enable smaller investment amounts by dividing assets into smaller units</li>
          <li><strong>Improved Price Discovery</strong> - Create more efficient markets for traditionally illiquid assets</li>
          <li><strong>Reduced Transaction Costs</strong> - Lower fees for transferring asset ownership</li>
          <li><strong>Automated Compliance</strong> - Embed regulatory requirements directly into tokens</li>
          <li><strong>Streamlined Administration</strong> - Automate dividend distributions, voting rights, and other administrative processes</li>
        </ul>
        <p>Seftec's tokenization platform provides the technology and legal frameworks needed to tokenize assets in a compliant, secure manner that meets enterprise requirements.</p>
      </>
    )
  }
];
