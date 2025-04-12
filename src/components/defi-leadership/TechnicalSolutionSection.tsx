
import React from 'react';
import { Shield, Link, Layers, Lock, Server, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const TechnicalSolutionSection = () => {
  return (
    <section id="technical-solution" className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Technical Solution"
          subtitle="Secure, compliant, and enterprise-ready DeFi infrastructure"
          label="Enterprise Technology"
          align="center"
          className="mb-16"
          labelClassName="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-20">
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/80 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <Link className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">ISO 20022 Integration</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Seamless interoperability between traditional banking systems and blockchain networks through native 
                support for ISO 20022 message formats.
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Real-time message conversion between legacy systems and blockchain protocols</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Preservation of essential data elements and business content</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Regulatory-compliant reporting and audit capabilities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-100">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">Security Framework</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Institutional-grade security measures designed to protect digital assets and transactions 
                while maintaining regulatory compliance.
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Multi-layered encryption and key management system</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Real-time transaction monitoring with AI-powered risk detection</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Hardware security module (HSM) integration</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800/80 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-200">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                  <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300">Hybrid Architecture</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Flexible deployment options that bridge public and private blockchain networks with existing enterprise systems.
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Support for major public blockchains including Ethereum, Solana, and Polkadot</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Private permissioned network deployment options</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Integration with legacy ERP and banking systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-cyan-50 dark:from-gray-800 dark:to-gray-800/80 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-300">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mr-4">
                  <Lock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-cyan-900 dark:text-cyan-300">Compliance Solutions</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Built-in compliance controls and reporting capabilities to satisfy regulatory requirements across multiple jurisdictions.
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Automated KYC/AML verification for DeFi transactions</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Transaction monitoring and suspicious activity reporting</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Comprehensive audit trails and compliance documentation</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Integration Flow</h3>
          
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-2 shadow-lg">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden p-8">
                      <div className="flex flex-col items-center text-center">
                        <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Core Integration Architecture</h4>
                        <div className="w-full max-w-3xl aspect-video relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            <div className="grid grid-cols-3 gap-6 w-full">
                              <div className="flex flex-col items-center">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                                  <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Banking Systems</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Legacy Infrastructure</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-3">
                                  <Link className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Seftec Platform</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">ISO 20022 Bridge</p>
                                </div>
                                
                                <div className="mt-4 flex flex-col gap-2 items-center">
                                  <div className="h-1 w-16 bg-indigo-200 dark:bg-indigo-900"></div>
                                  <div className="flex items-center justify-center space-x-2">
                                    <Shield className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <Lock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <Database className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <div className="h-1 w-16 bg-indigo-200 dark:bg-indigo-900"></div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                                  <Layers className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">DeFi Protocols</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Blockchain Networks</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl">
                          The Seftec platform serves as the secure bridge between enterprise systems and DeFi protocols, 
                          with ISO 20022 message handling ensuring data integrity and compliance throughout the process.
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-4">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden p-8">
                      <div className="flex flex-col items-center text-center">
                        <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security & Compliance Framework</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <p className="text-sm font-medium text-center">Encryption</p>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                              <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <p className="text-sm font-medium text-center">KYC/AML</p>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                              <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <p className="text-sm font-medium text-center">Audit Trail</p>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                              <Server className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <p className="text-sm font-medium text-center">HSM Security</p>
                          </div>
                        </div>
                        
                        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl">
                          Our multi-layered security framework ensures enterprise-grade protection while maintaining 
                          full regulatory compliance across all supported jurisdictions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mr-2 translate-y-0" />
                <CarouselNext className="relative static ml-2 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSolutionSection;
