
import React from 'react';
import { ArrowRight, Calendar, Target, Globe, Zap, Gift, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import CallToAction from '@/components/ui/call-to-action';

const StrategicRoadmapSection = () => {
  return (
    <section id="strategic-roadmap" className="py-24 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Strategic Roadmap"
          subtitle="Our vision for the future of enterprise DeFi"
          label="Future Vision"
          align="center"
          className="mb-16"
          labelClassName="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
        />
        
        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 rounded-full"></div>
            
            {/* Q3 2025 */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="flex items-center md:w-1/2 mb-8 md:mb-0 md:pr-12">
                  <div className="relative z-10 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-white dark:bg-gray-900 shadow-md border-4 border-blue-600 dark:border-blue-500 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                    <div className="absolute -bottom-1 left-0 w-full text-[10px] font-bold text-blue-600 dark:text-blue-500 text-center">Q3</div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-300">2025</h3>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:translate-y-10">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 animate-fade-up">
                    <div className="h-2 bg-blue-600 dark:bg-blue-500"></div>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">Cross-Chain Settlement Protocol</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Launch of our proprietary cross-chain settlement protocol enabling instant finality 
                        across multiple blockchain networks while maintaining full regulatory compliance.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Atomic cross-chain settlement with regulatory compliance</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Support for 12+ major blockchain networks</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Institutional-grade security and auditability</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Q4 2025 */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:order-2 flex items-center md:w-1/2 mb-8 md:mb-0 md:pl-12">
                  <div className="relative z-10 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-white dark:bg-gray-900 shadow-md border-4 border-indigo-600 dark:border-indigo-500 flex items-center justify-center">
                    <Target className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />
                    <div className="absolute -bottom-1 left-0 w-full text-[10px] font-bold text-indigo-600 dark:text-indigo-500 text-center">Q4</div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">2025</h3>
                  </div>
                </div>
                <div className="md:order-1 md:w-1/2 md:pr-12 md:text-right md:translate-y-10">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 animate-fade-up">
                    <div className="h-2 bg-indigo-600 dark:bg-indigo-500"></div>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4 md:justify-end">
                        <Gift className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3 md:order-2 md:ml-3 md:mr-0" />
                        <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">Enterprise DeFi Marketplace</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Introduction of the first regulated enterprise DeFi marketplace, allowing institutional 
                        participants to access yield-generating opportunities with built-in risk assessment.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start md:justify-end">
                          <span className="text-gray-600 dark:text-gray-300 md:order-1">Curated DeFi protocols with institutional-grade risk ratings</span>
                          <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 md:ml-3 md:mr-0 shrink-0 mt-0.5 md:order-2" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span className="text-gray-600 dark:text-gray-300 md:order-1">Automated compliance monitoring and reporting</span>
                          <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 md:ml-3 md:mr-0 shrink-0 mt-0.5 md:order-2" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span className="text-gray-600 dark:text-gray-300 md:order-1">Treasury management optimization tools</span>
                          <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 md:ml-3 md:mr-0 shrink-0 mt-0.5 md:order-2" />
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Q1 2026 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start">
                <div className="flex items-center md:w-1/2 mb-8 md:mb-0 md:pr-12">
                  <div className="relative z-10 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-white dark:bg-gray-900 shadow-md border-4 border-purple-600 dark:border-purple-500 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-purple-600 dark:text-purple-500" />
                    <div className="absolute -bottom-1 left-0 w-full text-[10px] font-bold text-purple-600 dark:text-purple-500 text-center">Q1</div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-3xl font-bold text-purple-900 dark:text-purple-300">2026</h3>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:translate-y-10">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 animate-fade-up">
                    <div className="h-2 bg-purple-600 dark:bg-purple-500"></div>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                        <h4 className="text-xl font-bold text-purple-900 dark:text-purple-300">Global Expansion</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Expansion of regulatory coverage to include APAC markets with local presence in 
                        Singapore, Tokyo, and Sydney, complementing our existing operations.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Compliance with MAS, JFSA, and ASIC regulatory frameworks</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Regional infrastructure for enhanced performance</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">Strategic partnerships with regional financial institutions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24">
            <h3 className="text-2xl font-bold mb-10 text-center text-gray-900 dark:text-white">Future Benefits for Enterprise Clients</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up">
                <div className="h-2 bg-blue-600 dark:bg-blue-500"></div>
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-300">Enhanced Liquidity Access</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Unlock access to global liquidity pools with institutional safeguards and compliance controls
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up animate-delay-100">
                <div className="h-2 bg-indigo-600 dark:bg-indigo-500"></div>
                <CardContent className="p-6">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-indigo-900 dark:text-indigo-300">Operational Efficiency</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reduce settlement times and operational costs while maintaining enterprise-grade security
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800/80 overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up animate-delay-200">
                <div className="h-2 bg-purple-600 dark:bg-purple-500"></div>
                <CardContent className="p-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-900 dark:text-purple-300">Competitive Advantage</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Stay ahead of the digital finance transformation with cutting-edge DeFi capabilities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-24 max-w-6xl mx-auto">
          <CallToAction
            title="Ready to Transform Your Enterprise Finance?"
            description="Schedule a demo to see how our DeFi solutions can revolutionize your financial operations while maintaining compliance and security."
            primaryButtonText="Request a Demo"
            secondaryButtonText="Contact Sales"
            primaryButtonAction={() => window.location.href = '/contact'}
            secondaryButtonAction={() => window.location.href = '/contact'}
          />
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmapSection;
