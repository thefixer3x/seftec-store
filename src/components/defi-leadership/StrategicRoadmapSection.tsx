
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const StrategicRoadmapSection = () => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Strategic Roadmap</h2>
      
      <div className="relative border-l-2 border-blue-600 pl-6 md:pl-10 pb-8 mb-10">
        <h3 className="text-xl font-bold mb-4">Product Development Milestones</h3>
        
        <div className="mb-8">
          <div className="absolute -left-3 md:-left-5 mt-2">
            <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q2</span>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">Q2 2025: Enhanced Enterprise Controls</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">Advanced governance and policy management for complex organizational structures.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Multi-tiered approval workflows with delegated authorities</li>
            <li>Customizable policy engines with regulatory rule templates</li>
            <li>Enhanced audit capabilities with immutable transaction logs</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <div className="absolute -left-3 md:-left-5 mt-2">
            <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q3</span>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">Q3 2025: Global Payments Network</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">Expanded cross-border payment capabilities with enhanced settlement options.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Support for 50+ additional currency pairs</li>
            <li>Direct integration with 15 major banking networks</li>
            <li>Dynamic fee optimization with predictive routing</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <div className="absolute -left-3 md:-left-5 mt-2">
            <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q4</span>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">Q4 2025: Supply Chain Finance Suite</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">Comprehensive supply chain financing solutions leveraging tokenized assets.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Dynamic invoice financing with risk-based pricing</li>
            <li>Supplier onboarding API with automated KYC/KYB</li>
            <li>Real-time payment tracking and reconciliation</li>
          </ul>
        </div>
        
        <div>
          <div className="absolute -left-3 md:-left-5 mt-2">
            <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q1</span>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">Q1 2026: Enterprise Liquidity Management</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">Advanced treasury operations with automated yield optimization.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Automated liquidity pooling and allocation</li>
            <li>Risk-bounded yield generation strategies</li>
            <li>Real-time treasury analytics and forecasting</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Planned Partnerships & Expansion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-b pb-3">
                  <div className="font-semibold">Banking Network Expansion</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Finalizing integration agreements with 3 of the top 10 global banking networks to expand direct settlement capabilities.</p>
                </li>
                <li className="border-b pb-3">
                  <div className="font-semibold">Enterprise Software Integration</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Partnership with leading ERP providers to deliver seamless financial operations across procurement, treasury, and accounting functions.</p>
                </li>
                <li>
                  <div className="font-semibold">Regulatory Collaboration</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Working with financial authorities in major markets to develop compliant DeFi frameworks for institutional adoption.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regional Expansion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Southeast Asia</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Q2 2025</p>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Middle East & North Africa</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Q3 2025</p>
                  </div>
                  <Badge variant="outline">Planned</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Latin America</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Q1 2026</p>
                  </div>
                  <Badge variant="outline">Planned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">Upcoming DeFi Offerings</h3>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enterprise DeFi Capabilities Roadmap</CardTitle>
            <CardDescription>How these advances will benefit enterprise clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 22s8-4 8-10V7.5L12 2 4 7.5V12c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Tokenized Invoice Financing
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Transform accounts receivable into liquid digital assets with our tokenized invoice platform.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <div className="font-medium mb-2">Enterprise Benefits:</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Reduce DSO (Days Sales Outstanding) by up to 80%</li>
                    <li>Access competitive financing rates through transparent marketplace</li>
                    <li>Eliminate manual reconciliation with smart contract automation</li>
                    <li>Maintain full compliance with automated regulatory reporting</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                  Treasury Yield Optimization
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Intelligently allocate excess capital across risk-calibrated DeFi protocols to maximize returns while maintaining security.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <div className="font-medium mb-2">Enterprise Benefits:</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Earn 3-5x higher yields than traditional bank deposits</li>
                    <li>Maintain full liquidity with configurable withdrawal timeframes</li>
                    <li>Set risk parameters aligned with corporate treasury policies</li>
                    <li>Comprehensive reporting for finance and audit teams</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                  Decentralized Identity & Compliance
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Streamline business verification and compliance processes with our decentralized identity solution.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <div className="font-medium mb-2">Enterprise Benefits:</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Reduce KYB processing from weeks to minutes</li>
                    <li>Maintain sovereignty over business credentials and data</li>
                    <li>Streamline regulatory reporting with verifiable credentials</li>
                    <li>Single verification process accepted across partner network</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-300">Get Early Access to Our Roadmap Features</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Join our partner program for early access to upcoming features, dedicated implementation support, and influence on our product development priorities.</p>
          <Button asChild>
            <Link to="/contact">Apply for Partner Program</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmapSection;
