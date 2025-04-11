
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TechnicalSolutionSection = () => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Technical Solution</h2>
      
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg mb-10">
        <h3 className="text-xl font-bold mb-4">Secure Enterprise DeFi Access Platform</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Seftec's platform provides enterprises with a secure, compliant gateway to decentralized finance protocols and services, enabling businesses to leverage the benefits of DeFi while maintaining regulatory compliance and operational security.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow">
            <h4 className="font-semibold mb-2">Simplified Access</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise-grade interfaces that abstract blockchain complexity while preserving full transparency and control</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow">
            <h4 className="font-semibold mb-2">Multi-Chain Support</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Unified access to major blockchain networks with standardized processes regardless of underlying technology</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow">
            <h4 className="font-semibold mb-2">Role-Based Access</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Granular control over user permissions matching enterprise organizational structures and compliance requirements</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">ISO 20022 Integration</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Seftec is pioneering the integration of ISO 20022 standards within decentralized finance, creating a seamless bridge between traditional financial systems and blockchain-based solutions.</p>
        
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Standardized message formatting enables direct integration with existing banking systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Rich, structured data transfers with preserved context between traditional and DeFi systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Automated compliance checks and enhanced regulatory reporting capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Future-proof architecture aligned with global financial messaging standards</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Integration Examples:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>SWIFT-compatible cross-border DeFi payments with full traceability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>Automated reconciliation between on-chain transactions and traditional accounting systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>Unified customer data view across traditional and DeFi product offerings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>Regulatory reporting automation with standardized data extraction</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">Security & Risk Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-300">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Hardware Security Modules (HSMs)</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">FIPS 140-2 Level 3 certified key management</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-300">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Multi-Signature Governance</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customizable approval workflows with role-based thresholds</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-300">
                      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m0 4v.01" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Real-time Monitoring</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">24/7 SOC with advanced threat detection and alerting</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Risk Management Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-300">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Smart Contract Auditing</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Triple-layered verification process with formal verification</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-300">
                      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Automated Risk Assessment</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered transaction monitoring with risk scoring</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-300">
                      <path d="M12 13V5" />
                      <path d="m9 8 3-3 3 3" />
                      <path d="M6 17a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Circuit Breakers</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Configurable limits and automatic transaction halting</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSolutionSection;
