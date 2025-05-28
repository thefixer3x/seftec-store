
import React from 'react';
import { Calendar, Milestone, Target, Users, Rocket, Building, Globe, Zap } from 'lucide-react';

export const StrategicRoadmapSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Strategic Vision */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-seftec-navy dark:text-white">
          Strategic Roadmap 2025-2026
        </h3>
        <p className="text-lg text-seftec-navy/80 dark:text-white/80 max-w-3xl mx-auto">
          Our strategic roadmap focuses on expanding DeFi accessibility for enterprises while maintaining 
          the highest standards of security, compliance, and operational excellence.
        </p>
      </div>

      {/* Product Development Timeline */}
      <div>
        <h4 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white flex items-center">
          <Rocket className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
          Product Development Milestones
        </h4>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-seftec-gold to-seftec-navy dark:from-seftec-teal dark:to-white/20"></div>
          
          <div className="space-y-12">
            {/* Q2 2025 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-seftec-gold to-seftec-navy dark:from-seftec-teal dark:to-white/80 flex items-center justify-center shadow-lg">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-seftec-gold dark:text-seftec-teal bg-seftec-gold/10 dark:bg-seftec-teal/10 px-3 py-1 rounded-full">
                    Q2 2025 • CURRENT
                  </div>
                  <div className="text-sm text-seftec-navy/60 dark:text-white/60">In Development</div>
                </div>
                <h5 className="text-xl font-semibold mb-3 text-seftec-navy dark:text-white">
                  Enhanced Enterprise DeFi Dashboard 2.0
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                  Next-generation treasury management platform with advanced analytics, risk modeling, 
                  and automated compliance reporting across multiple jurisdictions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Core Features:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Real-time portfolio optimization</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Multi-chain yield aggregation</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Advanced risk analytics engine</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Enterprise Integration:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">SAP S/4HANA direct integration</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Oracle NetSuite connector</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Microsoft Dynamics 365 plugin</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-seftec-gold/10 dark:bg-seftec-teal/10 rounded">
                  <p className="text-sm font-medium text-seftec-navy dark:text-white">
                    Expected Impact: 40% improvement in treasury efficiency, $2.1B additional liquidity access
                  </p>
                </div>
              </div>
            </div>
            
            {/* Q4 2025 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-seftec-navy to-seftec-navy/80 dark:from-white/90 dark:to-white/70 flex items-center justify-center shadow-lg">
                <Zap className="h-7 w-7 text-white dark:text-seftec-navy" />
              </div>
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-seftec-navy dark:text-white bg-seftec-navy/10 dark:bg-white/10 px-3 py-1 rounded-full">
                    Q4 2025 • PLANNED
                  </div>
                  <div className="text-sm text-seftec-navy/60 dark:text-white/60">Architecture Phase</div>
                </div>
                <h5 className="text-xl font-semibold mb-3 text-seftec-navy dark:text-white">
                  Cross-Chain Institutional Liquidity Protocol
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                  Launch of proprietary cross-chain liquidity aggregation protocol designed specifically 
                  for institutional-grade transactions with enterprise access controls and governance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Protocol Features:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Institutional liquidity pools ($10B+ TVL)</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Cross-chain atomic swaps</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Dynamic yield optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Risk Management:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Smart contract insurance coverage</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Real-time risk monitoring</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-navy dark:text-white" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Automated position sizing</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-seftec-navy/10 dark:bg-white/10 rounded">
                  <p className="text-sm font-medium text-seftec-navy dark:text-white">
                    Target Metrics: $10B+ total value locked, 85% reduced slippage for institutional trades
                  </p>
                </div>
              </div>
            </div>
            
            {/* Q2 2026 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-lg">
                <Building className="h-7 w-7 text-white" />
              </div>
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Q2 2026 • ROADMAP
                  </div>
                  <div className="text-sm text-seftec-navy/60 dark:text-white/60">Concept Phase</div>
                </div>
                <h5 className="text-xl font-semibold mb-3 text-seftec-navy dark:text-white">
                  Enterprise DeFi Marketplace & Asset Tokenization
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                  Comprehensive marketplace for tokenized real-world assets with institutional-grade 
                  security, regulatory compliance, and enterprise liquidity provision.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Marketplace Features:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Tokenized securities trading</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Real estate investment tokens</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Supply chain finance instruments</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-seftec-navy dark:text-white mb-2">Compliance Framework:</h6>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">SEC/MiFID II compliant offerings</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Automated accreditation verification</span>
                      </li>
                      <li className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-gray-500" />
                        <span className="text-seftec-navy/80 dark:text-white/80">Cross-border regulatory framework</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="text-sm font-medium text-seftec-navy dark:text-white">
                    Vision: $50B+ tokenized assets marketplace, regulatory approval in 15+ jurisdictions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Strategic Partnerships */}
      <div className="bg-seftec-slate dark:bg-seftec-navy/20 rounded-lg p-8">
        <h4 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white flex items-center">
          <Users className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
          Strategic Partnerships & Expansion
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Global Banking Alliance Initiative
            </h5>
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <span className="font-medium text-seftec-navy dark:text-white">Partnership Status: Active Development</span>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Strategic consortium with 15 major global banks to develop standardized ISO 20022 
                compliant DeFi solutions for institutional clients across three continents.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Lead Partners:</strong> Deutsche Bank, HSBC, Mizuho Financial, Standard Chartered
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Scope:</strong> Cross-border payments, trade finance, treasury management
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Timeline:</strong> Pilot Q3 2025, full deployment Q1 2026
                  </span>
                </div>
              </div>
            </div>
            
            <h5 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Enterprise Blockchain Consortium
            </h5>
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <span className="font-medium text-seftec-navy dark:text-white">Role: Founding Member & Technical Lead</span>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Industry-wide initiative to establish technical standards and best practices for 
                enterprise blockchain adoption in financial services and supply chain management.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Members:</strong> 45+ Fortune 500 companies across 12 industries
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Focus Areas:</strong> Interoperability standards, security frameworks, compliance automation
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Deliverables:</strong> Open-source reference implementations, certification programs
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Regulatory Technology Integration
            </h5>
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Milestone className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <span className="font-medium text-seftec-navy dark:text-white">Status: Implementation Phase</span>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Strategic partnerships with leading RegTech providers to enhance compliance 
                capabilities and enable real-time regulatory reporting across multiple jurisdictions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Key Partners:</strong> Chainalysis, Elliptic, ComplyAdvantage, Thomson Reuters
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Capabilities:</strong> AML screening, sanctions monitoring, transaction analysis
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Coverage:</strong> 65+ jurisdictions, real-time compliance validation
                  </span>
                </div>
              </div>
            </div>
            
            <h5 className="text-lg font-semibold mb-4 text-seftec-navy dark:text-white">
              Academic Research Collaborations
            </h5>
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
                <span className="font-medium text-seftec-navy dark:text-white">Research & Development Focus</span>
              </div>
              <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
                Collaborative research programs with leading academic institutions to advance 
                blockchain technology, cryptographic protocols, and financial innovation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Institutions:</strong> MIT, Stanford, Oxford, Singapore NTU, ETH Zurich
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Research Areas:</strong> Zero-knowledge proofs, quantum-resistant cryptography
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">
                    <strong>Investment:</strong> $50M research fund over 5 years
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming DeFi Capabilities */}
      <div>
        <h4 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
          Next-Generation DeFi Capabilities
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h5 className="text-xl font-semibold mb-6 text-seftec-navy dark:text-white">
              Enterprise Treasury Management Suite
            </h5>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <Target className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h6 className="font-semibold text-seftec-navy dark:text-white mb-2">
                      Institutional Digital Asset Custody
                    </h6>
                    <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                      Next-generation custody solution with institutional-grade security, governance controls, 
                      and regulatory compliance for managing enterprise digital asset portfolios.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Multi-party approval workflows with role-based access</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Integration with existing treasury management systems</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Real-time portfolio valuation and risk assessment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <Target className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h6 className="font-semibold text-seftec-navy dark:text-white mb-2">
                      Automated Yield Generation Strategies
                    </h6>
                    <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                      AI-powered yield optimization engine that automatically allocates enterprise funds 
                      across vetted DeFi protocols based on risk tolerance and liquidity requirements.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Risk-adjusted return optimization algorithms</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Dynamic rebalancing based on market conditions</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Compliance-first protocol selection and monitoring</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-xl font-semibold mb-6 text-seftec-navy dark:text-white">
              Cross-Border Payment Optimization
            </h5>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <Target className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h6 className="font-semibold text-seftec-navy dark:text-white mb-2">
                      24/7 Real-Time Settlement Network
                    </h6>
                    <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                      Always-on settlement infrastructure with ISO 20022 compliant messaging that enables 
                      instant cross-border payments with full regulatory compliance and audit trails.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Sub-second settlement across 65+ currencies</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Automated compliance validation and reporting</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Integration with central bank digital currencies (CBDCs)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <Target className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h6 className="font-semibold text-seftec-navy dark:text-white mb-2">
                      Multi-Currency Institutional Liquidity Pools
                    </h6>
                    <p className="text-sm text-seftec-navy/80 dark:text-white/80 mb-3">
                      Deep liquidity pools optimized for large-value transactions with institutional-grade 
                      access controls and preferential pricing for enterprise clients.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">$25B+ aggregate liquidity across major currency pairs</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Reduced counterparty risk through automated market making</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-1 h-1 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Optimized FX rates with minimal slippage for large orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Impact Projections */}
      <div className="bg-gradient-to-br from-seftec-gold/10 to-seftec-navy/10 dark:from-seftec-teal/10 dark:to-white/5 rounded-lg p-8">
        <h4 className="text-2xl font-bold mb-6 text-center text-seftec-navy dark:text-white">
          Projected Business Impact (2025-2026)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">500+</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70 mb-1">Enterprise Clients</div>
              <div className="text-xs text-seftec-navy/50 dark:text-white/50">100% growth target</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">$25B</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70 mb-1">Monthly Volume</div>
              <div className="text-xs text-seftec-navy/50 dark:text-white/50">6x volume increase</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">75</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70 mb-1">Global Markets</div>
              <div className="text-xs text-seftec-navy/50 dark:text-white/50">67% expansion</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white dark:bg-seftec-navy/40 rounded-lg p-6">
              <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">$2.8B</div>
              <div className="text-sm text-seftec-navy/70 dark:text-white/70 mb-1">Cost Savings</div>
              <div className="text-xs text-seftec-navy/50 dark:text-white/50">Client savings delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
