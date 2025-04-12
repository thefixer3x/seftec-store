
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Layers, RefreshCw, Network, ServerCrash } from 'lucide-react';

export const TechnicalSolutionSection = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">Technical Solution</h2>
        <p className="text-lg text-seftec-navy/70 dark:text-white/70 mb-8">
          Our secure enterprise DeFi access platform integrates cutting-edge blockchain technology with traditional financial systems to create a seamless, compliant solution for businesses.
        </p>
      </div>
      
      {/* Platform Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">Secure Enterprise DeFi Access Platform</h3>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                Our platform provides a secure gateway for enterprises to access decentralized finance services while maintaining compliance with regulatory requirements and industry standards.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-4 mt-1">
                    <Shield className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">Multi-Layered Security Architecture</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      End-to-end encryption, secure multi-signature wallets, and real-time transaction monitoring protect sensitive financial data and assets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-4 mt-1">
                    <Layers className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">Hybrid Blockchain Infrastructure</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Combines private permissioned blockchains for sensitive operations with public blockchain interoperability for maximum flexibility and security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-4 mt-1">
                    <RefreshCw className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">Seamless Legacy System Integration</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Custom APIs and middleware solutions enable frictionless connectivity with existing enterprise resource planning and financial systems.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">Key Technical Features</h3>
              
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Smart contract templates</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Asset tokenization engine</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Automated compliance checks</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Multi-currency support</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Real-time settlement</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Cross-chain interoperability</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-seftec-navy/70 dark:text-white/70">Advanced analytics dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* ISO 20022 Integration */}
      <div className="pt-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">ISO 20022 Standards Integration</h3>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                  Our platform is fully compliant with ISO 20022 messaging standards, enabling seamless interoperability between traditional banking systems and blockchain-based solutions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-4 mt-1">
                      <Network className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">Enhanced Interoperability</h4>
                      <p className="text-seftec-navy/70 dark:text-white/70">
                        Ensures smooth data exchange between DeFi applications and traditional financial institutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-4 mt-1">
                      <Lock className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">Regulatory Alignment</h4>
                      <p className="text-seftec-navy/70 dark:text-white/70">
                        Facilitates compliance with global financial regulations through standardized data formats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-seftec-navy dark:text-white mb-4">Key Benefits:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-seftec-navy/70 dark:text-white/70">Structured, rich data exchange between financial institutions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-seftec-navy/70 dark:text-white/70">Compatible with SWIFT, SEPA, and other global payment networks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-seftec-navy/70 dark:text-white/70">Reduced integration costs for financial institutions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-seftec-navy/70 dark:text-white/70">Future-proof implementation aligned with global financial modernization</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Measures */}
      <div className="pt-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Security Measures & Risk Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">Advanced Encryption</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Military-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit, with optional hardware security module integration.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <ServerCrash className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">Continuous Monitoring</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Real-time anomaly detection and threat intelligence with automated incident response protocols to mitigate potential security breaches.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">Multi-Signature Controls</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Configurable approval workflows for high-value transactions with role-based access controls and geographic restrictions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
