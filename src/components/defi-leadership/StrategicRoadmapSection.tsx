
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Globe, Rocket, Lightbulb, ArrowRight } from 'lucide-react';

export const StrategicRoadmapSection = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">Strategic Roadmap</h2>
        <p className="text-lg text-seftec-navy/70 dark:text-white/70 mb-8">
          Our comprehensive product development timeline outlines Seftec's vision for the future of enterprise DeFi solutions over the next 24 months.
        </p>
      </div>
      
      {/* Product Development Timeline */}
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {/* Q2 2023 */}
          <div className="relative">
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-seftec-darkNavy bg-seftec-gold dark:bg-seftec-teal z-10">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="mb-6 md:mb-0 md:text-right">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 inline-block px-3 py-1 rounded-full text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-2">
                  Q2 2023 (Completed)
                </div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Foundation Phase</h3>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Core infrastructure development and initial enterprise partnerships established.
                </p>
              </div>
              
              <Card className="md:ml-8">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">ISO 20022 compliant messaging framework</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Core security infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Strategic banking partnerships</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Q4 2023 */}
          <div className="relative">
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-seftec-darkNavy bg-seftec-gold dark:bg-seftec-teal z-10">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <Card className="mb-6 md:mb-0 md:mr-8">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Beta launch of enterprise DeFi platform</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Initial cross-border payment solution</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Regulatory compliance framework</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="md:text-left">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 inline-block px-3 py-1 rounded-full text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-2">
                  Q4 2023 (Completed)
                </div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Beta Release</h3>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Initial platform launch with core features and select enterprise partners.
                </p>
              </div>
            </div>
          </div>
          
          {/* Q2 2024 */}
          <div className="relative">
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-seftec-darkNavy bg-seftec-gold dark:bg-seftec-teal z-10">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="mb-6 md:mb-0 md:text-right">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 inline-block px-3 py-1 rounded-full text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-2">
                  Q2 2024 (Current)
                </div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Market Expansion</h3>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Global rollout and enhanced feature set with expanded partnerships.
                </p>
              </div>
              
              <Card className="md:ml-8">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Full-scale platform launch in major markets</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Advanced tokenization capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Supply chain financing solution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Q4 2024 */}
          <div className="relative">
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-seftec-darkNavy bg-seftec-gold dark:bg-seftec-teal z-10">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <Card className="mb-6 md:mb-0 md:mr-8">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Enterprise liquidity pools</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Advanced trade finance solutions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Inter-bank settlement platform</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="md:text-left">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 inline-block px-3 py-1 rounded-full text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-2">
                  Q4 2024 (Planned)
                </div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Advanced Features Release</h3>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Launch of sophisticated DeFi products for enterprise finance transformation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Q2 2025 */}
          <div className="relative">
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-seftec-darkNavy bg-seftec-gold dark:bg-seftec-teal z-10">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div className="mb-6 md:mb-0 md:text-right">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 inline-block px-3 py-1 rounded-full text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-2">
                  Q2 2025 (Planned)
                </div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-2">Ecosystem Integration</h3>
                <p className="text-seftec-navy/70 dark:text-white/70">
                  Full ecosystem development with third-party integration capabilities.
                </p>
              </div>
              
              <Card className="md:ml-8">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Developer API ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">Cross-chain interoperability framework</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded-full mr-3 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-seftec-navy/70 dark:text-white/70">AI-powered financial insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Partnerships & Expansion */}
      <div className="pt-10">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Strategic Partnerships & Expansion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white">Strategic Alliances</h4>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Banking Consortium:</span> Expanding our network of banking partners across EMEA, APAC, and Americas regions.
                  </p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Technology Integration:</span> Partnerships with major ERP providers to streamline enterprise adoption.
                  </p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Regulatory Collaboration:</span> Working with financial regulators to develop compliant DeFi frameworks.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full mr-4">
                  <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white">Market Expansion</h4>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Regional Hubs:</span> Establishing operational centers in London, Singapore, and Dubai to support global clients.
                  </p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Industry Verticals:</span> Targeted solutions for manufacturing, healthcare, and commodities sectors.
                  </p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-seftec-navy/70 dark:text-white/70">
                    <span className="font-medium text-seftec-navy dark:text-white">Emerging Markets:</span> Special focus on developing DeFi solutions for underserved markets in Africa and Southeast Asia.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Upcoming DeFi Offerings */}
      <div className="pt-10">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Upcoming DeFi Offerings</h3>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                  <Rocket className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">Enterprise Liquidity Pools</h4>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                  Custom-designed liquidity solutions for enterprises to optimize treasury operations and enhance working capital efficiency.
                </p>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 italic">
                  Expected launch: Q4 2024
                </p>
              </div>
              
              <div>
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                  <Rocket className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">Real-World Asset Tokenization</h4>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                  Platform for businesses to tokenize physical assets, enabling fractional ownership and enhanced liquidity for traditionally illiquid assets.
                </p>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 italic">
                  Expected launch: Q1 2025
                </p>
              </div>
              
              <div>
                <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                  <Rocket className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-3">Cross-Border Settlement Network</h4>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                  Blockchain-based settlement system enabling near-instant cross-border transactions with minimal fees and complete regulatory compliance.
                </p>
                <p className="text-sm text-seftec-navy/60 dark:text-white/60 italic">
                  Expected launch: Q2 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
