
import React from 'react';
import { CheckCircle, User, Building, Award, TrendingUp, Globe, Shield } from 'lucide-react';

export const MarketLeadershipSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Market Position Metrics */}
      <div>
        <h3 className="text-3xl font-bold mb-8 text-center text-seftec-navy dark:text-white">
          Market Leadership Position
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-seftec-gold/10 to-seftec-gold/5 dark:from-seftec-teal/10 dark:to-seftec-teal/5 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">250+</div>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Enterprise Clients</div>
            <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">Global Fortune 500</div>
          </div>
          <div className="bg-gradient-to-br from-seftec-navy/10 to-seftec-navy/5 dark:from-white/10 dark:to-white/5 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-seftec-navy dark:text-white mb-2">$4.2B</div>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Monthly Volume</div>
            <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">Cross-border payments</div>
          </div>
          <div className="bg-gradient-to-br from-seftec-gold/10 to-seftec-gold/5 dark:from-seftec-teal/10 dark:to-seftec-teal/5 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">45</div>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Countries</div>
            <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">Regulatory compliance</div>
          </div>
          <div className="bg-gradient-to-br from-seftec-navy/10 to-seftec-navy/5 dark:from-white/10 dark:to-white/5 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-seftec-navy dark:text-white mb-2">99.97%</div>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Platform Uptime</div>
            <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">Mission-critical availability</div>
          </div>
        </div>
      </div>

      {/* Industry Recognition */}
      <div className="bg-seftec-slate dark:bg-seftec-navy/20 rounded-lg p-8">
        <h4 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white flex items-center">
          <Award className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal" />
          Industry Recognition & Awards
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-seftec-navy/40 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Award className="h-8 w-8 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white">2024 FinTech Breakthrough Award</h5>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Best Enterprise DeFi Platform</p>
              </div>
            </div>
            <p className="text-sm text-seftec-navy/80 dark:text-white/80">
              Recognized for pioneering secure enterprise access to decentralized finance protocols
              with institutional-grade controls and ISO 20022 compliance.
            </p>
          </div>
          
          <div className="bg-white dark:bg-seftec-navy/40 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <TrendingUp className="h-8 w-8 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white">Gartner Magic Quadrant Leader</h5>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Enterprise Blockchain Platforms 2024</p>
              </div>
            </div>
            <p className="text-sm text-seftec-navy/80 dark:text-white/80">
              Positioned in the Leaders quadrant for completeness of vision and ability to execute
              in enterprise blockchain financial services.
            </p>
          </div>

          <div className="bg-white dark:bg-seftec-navy/40 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Globe className="h-8 w-8 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white">Global Finance Innovation Award</h5>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Best Cross-Border Payment Solution</p>
              </div>
            </div>
            <p className="text-sm text-seftec-navy/80 dark:text-white/80">
              Awarded for reducing cross-border settlement times by 95% while maintaining 
              full regulatory compliance across 45 jurisdictions.
            </p>
          </div>

          <div className="bg-white dark:bg-seftec-navy/40 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <Shield className="h-8 w-8 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white">ISO 27001 & SOC 2 Type II</h5>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Security & Compliance Certifications</p>
              </div>
            </div>
            <p className="text-sm text-seftec-navy/80 dark:text-white/80">
              Independently audited and certified for information security management
              and data protection controls.
            </p>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div>
        <h4 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white">Key Competitive Advantages</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  First-Mover ISO 20022 DeFi Integration
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  Only platform providing native ISO 20022 messaging between traditional banking 
                  systems and DeFi protocols, enabling seamless institutional adoption.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  Enterprise-Grade Multi-Party Security
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  Advanced MPC cryptography with hardware security modules and customizable 
                  governance controls for institutional risk management.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  Global Regulatory Compliance Engine
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  Real-time compliance monitoring across 45 jurisdictions with automated 
                  reporting and KYC/AML integration.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  Zero-Disruption Enterprise Integration
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  API-first architecture with pre-built connectors for major ERP systems 
                  (SAP, Oracle, Microsoft Dynamics) and core banking platforms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  Institutional Liquidity Network
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  Exclusive access to institutional-only liquidity pools with optimized 
                  pricing and reduced slippage for large-volume transactions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-3 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-seftec-navy dark:text-white mb-1">
                  24/7 Enterprise Support & SLA
                </h5>
                <p className="text-seftec-navy/80 dark:text-white/80">
                  Dedicated account management with 99.97% uptime SLA and enterprise-grade 
                  incident response for mission-critical operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Success Stories */}
      <div>
        <h4 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">Enterprise Success Stories</h4>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-8 shadow-sm">
            <div className="flex items-start mb-6">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-4 rounded-full mr-6">
                <Building className="h-8 w-8 text-seftec-navy dark:text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xl font-semibold text-seftec-navy dark:text-white">
                    Global Maritime Logistics Corporation
                  </h5>
                  <span className="text-sm text-seftec-navy/60 dark:text-white/60">Fortune 100</span>
                </div>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 mb-4">
                  Leading container shipping and port operations | 400+ locations worldwide
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">85%</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">3hrs → 12min</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Settlement Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">$1.8B</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Annual Volume</div>
              </div>
            </div>
            
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Challenge:</strong> Manual reconciliation of multi-currency payments across 45 countries 
              with 3-5 day settlement windows causing significant cash flow constraints and operational overhead.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Solution:</strong> Implemented seftec's ISO 20022 compliant DeFi payment infrastructure 
              with real-time settlement and automated compliance reporting across all operating jurisdictions.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80">
              <strong>Result:</strong> Reduced cross-border payment costs by 85% while improving settlement 
              times from hours to minutes, freeing up $240M in working capital annually.
            </p>
          </div>

          <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-8 shadow-sm">
            <div className="flex items-start mb-6">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-4 rounded-full mr-6">
                <Building className="h-8 w-8 text-seftec-navy dark:text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xl font-semibold text-seftec-navy dark:text-white">
                    European Central Banking Group
                  </h5>
                  <span className="text-sm text-seftec-navy/60 dark:text-white/60">Top 5 EU Bank</span>
                </div>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 mb-4">
                  Multinational banking and financial services | €2.1T assets under management
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">180+</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Corporate Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">45%</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Revenue Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">100%</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Compliance Score</div>
              </div>
            </div>
            
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Challenge:</strong> Corporate clients demanding access to DeFi yield opportunities 
              while maintaining full regulatory compliance and institutional-grade security controls.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Solution:</strong> Deployed seftec's enterprise DeFi platform as a white-label 
              solution, enabling secure access to vetted DeFi protocols with automated compliance monitoring.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80">
              <strong>Result:</strong> Launched innovative DeFi treasury services, attracting 180+ new 
              corporate clients and generating 45% increase in fee revenue within 18 months.
            </p>
          </div>

          <div className="bg-white dark:bg-seftec-navy/30 rounded-lg p-8 shadow-sm">
            <div className="flex items-start mb-6">
              <div className="bg-seftec-navy/10 dark:bg-white/10 p-4 rounded-full mr-6">
                <Building className="h-8 w-8 text-seftec-navy dark:text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xl font-semibold text-seftec-navy dark:text-white">
                    Asia-Pacific Manufacturing Conglomerate
                  </h5>
                  <span className="text-sm text-seftec-navy/60 dark:text-white/60">Fortune 200</span>
                </div>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 mb-4">
                  Electronics and automotive manufacturing | 12 countries, 400K+ employees
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">72%</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Processing Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">$890M</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">24/7</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Operations</div>
              </div>
            </div>
            
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Challenge:</strong> Complex supply chain payments across 12 countries with varying 
              regulatory requirements, causing delays and increased working capital requirements.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80 mb-4">
              <strong>Solution:</strong> Integrated seftec's multi-jurisdictional DeFi payment infrastructure 
              with smart contract automation for supplier payments and inventory financing.
            </p>
            <p className="text-seftec-navy/80 dark:text-white/80">
              <strong>Result:</strong> Achieved 72% faster payment processing, reduced working capital 
              requirements by $890M, and enabled 24/7 automated supplier payments across all regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
