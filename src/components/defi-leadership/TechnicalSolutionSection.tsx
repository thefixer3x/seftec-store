
import React from 'react';
import { Shield, Link as LinkIcon, LockKeyhole, Zap, FileCheck, Server, Database, Network } from 'lucide-react';

export const TechnicalSolutionSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Platform Overview */}
      <div>
        <h3 className="text-3xl font-bold mb-8 text-center text-seftec-navy dark:text-white">
          Enterprise DeFi Access Platform
        </h3>
        <p className="text-lg text-seftec-navy/80 dark:text-white/80 mb-12 max-w-4xl mx-auto text-center">
          The seftec Enterprise DeFi Access Platform provides secure, compliant, and scalable access 
          to decentralized finance opportunities while maintaining the robust controls, security, 
          and regulatory compliance required by large organizations and financial institutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-seftec-navy/30 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">
              Enterprise-Grade Security
            </h4>
            <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
              Multi-signature authorization, hardware security modules (HSMs), and multi-party 
              computation (MPC) cryptography ensure institutional-level protection of digital assets.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">FIPS 140-2 Level 3 HSM integration</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Threshold signature schemes (TSS)</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Customizable governance workflows</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/30 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <LinkIcon className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">
              Seamless Integration
            </h4>
            <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
              API-first architecture with pre-built connectors allows for easy integration with 
              existing enterprise systems and workflows without operational disruption.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">RESTful APIs with OpenAPI specification</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">ERP system connectors (SAP, Oracle, Dynamics)</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Core banking platform integration</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/30 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <FileCheck className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">
              Comprehensive Compliance
            </h4>
            <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
              Built-in regulatory compliance features for KYC, AML, and reporting requirements 
              across 45+ global jurisdictions with real-time monitoring.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Automated regulatory reporting</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Real-time transaction monitoring</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Configurable compliance rules engine</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* ISO 20022 Integration */}
      <div className="bg-seftec-slate dark:bg-seftec-navy/20 rounded-lg p-8">
        <h3 className="text-3xl font-bold mb-8 text-center text-seftec-navy dark:text-white">
          ISO 20022 Compliance & Integration
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-semibold mb-6 text-seftec-navy dark:text-white">
              Bridging Traditional & Blockchain Finance
            </h4>
            <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
              Our ISO 20022 compliant messaging framework ensures seamless interoperability between 
              traditional banking systems and blockchain networks, providing the standardized communication 
              layer required for institutional adoption of DeFi protocols.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium text-seftec-navy dark:text-white mb-1">
                    Rich Data Integration
                  </h5>
                  <p className="text-sm text-seftec-navy/80 dark:text-white/80">
                    End-to-end payment tracking with comprehensive remittance information, 
                    supporting structured and unstructured data formats for enhanced transparency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium text-seftec-navy dark:text-white mb-1">
                    Standardized Messaging
                  </h5>
                  <p className="text-sm text-seftec-navy/80 dark:text-white/80">
                    Universal financial messaging format enabling seamless communication between 
                    traditional payment rails and blockchain-based settlement networks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium text-seftec-navy dark:text-white mb-1">
                    Automated Compliance
                  </h5>
                  <p className="text-sm text-seftec-navy/80 dark:text-white/80">
                    Built-in compliance validation and automated regulatory reporting that adapts 
                    to local requirements across multiple jurisdictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-seftec-navy dark:text-white">
              Technical Implementation Architecture
            </h4>
            
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Server className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h5 className="font-semibold text-seftec-navy dark:text-white">Message Translation Layer</h5>
              </div>
              <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                Real-time bidirectional translation between ISO 20022 financial messages and 
                blockchain transaction formats, preserving data integrity and regulatory compliance.
              </p>
              <div className="text-xs text-seftec-navy/60 dark:text-white/60">
                Supports: pacs.008, pacs.002, camt.053, pain.001, pain.002
              </div>
            </div>
            
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h5 className="font-semibold text-seftec-navy dark:text-white">Data Enrichment Engine</h5>
              </div>
              <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                Advanced data validation and enrichment for cross-border payments, including 
                currency conversion, regulatory screening, and purpose code validation.
              </p>
              <div className="text-xs text-seftec-navy/60 dark:text-white/60">
                Features: Real-time FX rates, sanctions screening, purpose code mapping
              </div>
            </div>
            
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Network className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h5 className="font-semibold text-seftec-navy dark:text-white">Smart Contract Integration</h5>
              </div>
              <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                Custom smart contracts that enforce ISO 20022 standards on-chain, ensuring 
                compliance and data integrity throughout the transaction lifecycle.
              </p>
              <div className="text-xs text-seftec-navy/60 dark:text-white/60">
                Chains: Ethereum, Polygon, BSC, Avalanche, Arbitrum, Optimism
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Measures & Risk Management */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
          Advanced Security Measures & Risk Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <LockKeyhole className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h4 className="font-semibold text-seftec-navy dark:text-white">Multi-Party Computation (MPC)</h4>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Advanced cryptographic protocols that eliminate single points of failure by distributing 
                private key operations across multiple secure parties.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Threshold signature schemes (2-of-3, 3-of-5, custom)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Hardware-backed key shares with secure enclaves</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Proactive secret sharing with automated refresh</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h4 className="font-semibold text-seftec-navy dark:text-white">Real-Time Risk Monitoring</h4>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                AI-powered risk assessment engine that continuously monitors transactions, 
                counterparties, and market conditions to prevent fraud and minimize exposure.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Machine learning anomaly detection</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Dynamic transaction limits and approvals</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Integration with threat intelligence feeds</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FileCheck className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h4 className="font-semibold text-seftec-navy dark:text-white">Governance & Controls</h4>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Customizable governance frameworks that enforce enterprise policies and 
                regulatory requirements through automated workflows and approval processes.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Role-based access controls (RBAC)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Multi-level approval workflows</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">Audit trail with immutable logging</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-seftec-navy/30 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Server className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <h4 className="font-semibold text-seftec-navy dark:text-white">Infrastructure Security</h4>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Enterprise-grade infrastructure with multiple layers of security, redundancy, 
                and disaster recovery capabilities to ensure maximum uptime and data protection.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">SOC 2 Type II certified data centers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">End-to-end encryption (AES-256)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2 mt-2"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80">99.97% uptime SLA with global redundancy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Examples */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
          Enterprise Integration Examples
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-seftec-slate dark:bg-seftec-navy/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Treasury Management Integration
            </h4>
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              Seamless integration with enterprise treasury management systems for automated 
              cash flow optimization and yield generation strategies.
            </p>
            <div className="bg-white dark:bg-seftec-navy/40 rounded p-4 mb-4">
              <code className="text-xs text-seftec-navy dark:text-white/90">
                {`// Treasury Management API Integration
POST /api/v1/treasury/optimize
{
  "portfolio": {
    "cashBalance": 50000000,
    "currency": "USD",
    "riskProfile": "conservative"
  },
  "objectives": ["liquidity", "yield"],
  "constraints": {
    "maxRisk": 0.05,
    "minLiquidity": 0.3
  }
}`}
              </code>
            </div>
            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
              Response includes optimized DeFi strategy recommendations with risk-adjusted returns 
              and liquidity provisions.
            </p>
          </div>
          
          <div className="bg-seftec-slate dark:bg-seftec-navy/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Cross-Border Payment Integration
            </h4>
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              Direct integration with existing payment rails for instant cross-border settlements 
              with ISO 20022 message compliance.
            </p>
            <div className="bg-white dark:bg-seftec-navy/40 rounded p-4 mb-4">
              <code className="text-xs text-seftec-navy dark:text-white/90">
                {`// Cross-Border Payment API
POST /api/v1/payments/international
{
  "amount": 1000000,
  "currency": "EUR",
  "recipient": {
    "iban": "DE89370400440532013000",
    "swift": "COBADEFFXXX"
  },
  "purpose": "TRADE",
  "urgency": "express"
}`}
              </code>
            </div>
            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
              Automatic routing through optimal DeFi liquidity pools with real-time compliance validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
