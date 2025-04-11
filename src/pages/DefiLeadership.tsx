
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Shield, TrendingUp, BarChart, Lock, Globe, Zap, Calendar, Users } from "lucide-react";

const DefiLeadership = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-seftec-navy to-seftec-navy/90 dark:from-seftec-teal dark:to-seftec-purple py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 border-none px-4 py-1">
            Enterprise DeFi Leadership
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Leading the Future of <span className="text-seftec-gold dark:text-white">Secure Enterprise DeFi</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Seftec is pioneering ISO 20022 compliant decentralized finance solutions, bridging the gap between enterprise requirements and blockchain innovations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-white dark:text-seftec-navy dark:hover:bg-white/90">
              Explore Our DeFi Solutions
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="leadership" className="space-y-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-seftec-slate/20 dark:bg-white/5 p-1">
            <TabsTrigger value="leadership" className="data-[state=active]:bg-seftec-navy data-[state=active]:text-white dark:data-[state=active]:bg-seftec-teal">
              Market Leadership
            </TabsTrigger>
            <TabsTrigger value="solutions" className="data-[state=active]:bg-seftec-navy data-[state=active]:text-white dark:data-[state=active]:bg-seftec-teal">
              Technical Solutions
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-seftec-navy data-[state=active]:text-white dark:data-[state=active]:bg-seftec-teal">
              Strategic Roadmap
            </TabsTrigger>
          </TabsList>
          
          {/* Market Leadership Position Tab */}
          <TabsContent value="leadership" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-6 flex items-center">
                <BarChart className="mr-3 h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
                Market Leadership Position
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="bg-white shadow-md dark:bg-seftec-darkNavy/50 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">15,000+</div>
                    <p className="text-seftec-navy/70 dark:text-white/70">Enterprise Users</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-md dark:bg-seftec-darkNavy/50 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">$3.8B</div>
                    <p className="text-seftec-navy/70 dark:text-white/70">Transaction Volume</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-md dark:bg-seftec-darkNavy/50 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-seftec-gold dark:text-seftec-teal mb-2">34</div>
                    <p className="text-seftec-navy/70 dark:text-white/70">Countries Covered</p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">Enterprise Success Stories</h3>
              
              <div className="space-y-6 mb-12">
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Global Financial Group
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                      Implemented Seftec's ISO 20022 compliant DeFi platform, resulting in 78% faster cross-border settlements and 42% reduction in transaction costs.
                    </p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                      $1.2B Annual Transaction Volume
                    </Badge>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Continental Supply Chain Network
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                      Leveraged Seftec's DeFi solutions to streamline trade financing, automating 95% of compliance checks and reducing financing wait times from weeks to hours.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                      5,000+ Suppliers Onboarded
                    </Badge>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">Our Competitive Advantages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-seftec-navy/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-3">
                        <Shield className="h-5 w-5 text-seftec-navy dark:text-seftec-teal" />
                      </div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white">ISO 20022 Compliance</h4>
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Full adherence to the global standard for electronic data interchange between financial institutions.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-seftec-navy/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-3">
                        <Lock className="h-5 w-5 text-seftec-navy dark:text-seftec-teal" />
                      </div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white">Enterprise-Grade Security</h4>
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Military-grade encryption with multi-layered authentication and regulatory compliance built-in.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-seftec-navy/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-3">
                        <Globe className="h-5 w-5 text-seftec-navy dark:text-seftec-teal" />
                      </div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white">Global Interoperability</h4>
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Seamless integration with existing banking systems, ERP solutions, and blockchain networks worldwide.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-seftec-navy/10 dark:bg-seftec-teal/10 p-2 rounded-full mr-3">
                        <Zap className="h-5 w-5 text-seftec-navy dark:text-seftec-teal" />
                      </div>
                      <h4 className="font-semibold text-seftec-navy dark:text-white">Real-Time Processing</h4>
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Instant settlement capabilities with 99.99% uptime and sub-second transaction finality.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
          
          {/* Technical Solution Tab */}
          <TabsContent value="solutions" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-6 flex items-center">
                <Shield className="mr-3 h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
                Secure Enterprise DeFi Access Platform
              </h2>
              
              <p className="text-lg text-seftec-navy/80 dark:text-white/80 mb-8 max-w-4xl">
                Our platform provides enterprises with a secure gateway to decentralized finance capabilities, enabling seamless access to blockchain-based financial services while maintaining compliance with institutional standards.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">ISO 20022 Integration</h3>
                  <div className="bg-white dark:bg-seftec-darkNavy/30 border border-seftec-navy/10 dark:border-white/10 rounded-lg p-6 mb-6">
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                      Seftec's platform is built on the ISO 20022 standard for electronic data interchange between financial institutions, providing:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-seftec-navy/70 dark:text-white/70">Enhanced interoperability between traditional banking systems and blockchain networks</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-seftec-navy/70 dark:text-white/70">Standardized message formats for financial data exchange across all systems</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-seftec-navy/70 dark:text-white/70">Compliant integration with global payment systems and financial networks</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-seftec-navy/70 dark:text-white/70">Future-proof architecture aligned with evolving global financial standards</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-seftec-navy/5 dark:bg-white/5 rounded-lg p-6">
                    <h4 className="font-semibold text-seftec-navy dark:text-white mb-3">Integration Examples</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">SWIFT gpi network integration</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Central Bank Digital Currency (CBDC) compatibility</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Enterprise blockchain networks (Hyperledger Fabric, R3 Corda)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span className="text-seftec-navy/70 dark:text-white/70">Common ERP systems (SAP, Oracle, Microsoft Dynamics)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">Security & Risk Management</h3>
                  <div className="bg-white dark:bg-seftec-darkNavy/30 border border-seftec-navy/10 dark:border-white/10 rounded-lg p-6 mb-6">
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                      Our comprehensive security framework provides enterprise-grade protection:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-seftec-navy/5 dark:bg-white/5 p-4 rounded-lg">
                        <h5 className="font-semibold text-seftec-navy dark:text-white mb-2">Multi-Layer Authentication</h5>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                          Hardware security keys, biometrics, and role-based access controls
                        </p>
                      </div>
                      <div className="bg-seftec-navy/5 dark:bg-white/5 p-4 rounded-lg">
                        <h5 className="font-semibold text-seftec-navy dark:text-white mb-2">AML & KYC Compliance</h5>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                          Automated compliance checks with real-time transaction monitoring
                        </p>
                      </div>
                      <div className="bg-seftec-navy/5 dark:bg-white/5 p-4 rounded-lg">
                        <h5 className="font-semibold text-seftec-navy dark:text-white mb-2">Smart Contract Auditing</h5>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                          Rigorous auditing process with formal verification methods
                        </p>
                      </div>
                      <div className="bg-seftec-navy/5 dark:bg-white/5 p-4 rounded-lg">
                        <h5 className="font-semibold text-seftec-navy dark:text-white mb-2">Data Encryption</h5>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                          End-to-end encryption for all transactions and sensitive data
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-seftec-darkNavy/30 border border-seftec-navy/10 dark:border-white/10 rounded-lg p-6">
                    <h4 className="font-semibold text-seftec-navy dark:text-white mb-4">Risk Management Protocols</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-seftec-gold/20 dark:bg-seftec-teal/20 p-1 rounded-full mr-3 mt-1">
                          <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h5 className="font-medium text-seftec-navy dark:text-white">Liquidity Risk Monitoring</h5>
                          <p className="text-sm text-seftec-navy/70 dark:text-white/70">Real-time monitoring of liquidity pools with automated risk alerts</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-seftec-gold/20 dark:bg-seftec-teal/20 p-1 rounded-full mr-3 mt-1">
                          <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h5 className="font-medium text-seftec-navy dark:text-white">Circuit Breakers & Fail-Safes</h5>
                          <p className="text-sm text-seftec-navy/70 dark:text-white/70">Automatic transaction halting during abnormal market conditions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-seftec-gold/20 dark:bg-seftec-teal/20 p-1 rounded-full mr-3 mt-1">
                          <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h5 className="font-medium text-seftec-navy dark:text-white">Regulatory Compliance Engine</h5>
                          <p className="text-sm text-seftec-navy/70 dark:text-white/70">Adaptive compliance controls for different jurisdictions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                  Request Technical Whitepaper
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </section>
          </TabsContent>
          
          {/* Strategic Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-6 flex items-center">
                <Calendar className="mr-3 h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
                Strategic Roadmap
              </h2>
              
              <p className="text-lg text-seftec-navy/80 dark:text-white/80 mb-8 max-w-4xl">
                Our comprehensive development plan outlines Seftec's vision for the next 24 months, focusing on expanding our DeFi capabilities for enterprise clients.
              </p>
              
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-6">Product Development Milestones</h3>
                
                <div className="relative border-l-2 border-seftec-navy/20 dark:border-white/20 pl-8 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-10 top-0 bg-seftec-gold dark:bg-seftec-teal rounded-full w-5 h-5 flex items-center justify-center">
                      <div className="bg-white dark:bg-seftec-darkNavy rounded-full w-2.5 h-2.5"></div>
                    </div>
                    <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                      Q2 2025 - Current Quarter
                    </Badge>
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Enhanced ISO 20022 Implementation
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                      Complete integration with all ISO 20022 message types and expand middleware connectivity options.
                    </p>
                    <ul className="space-y-1 text-sm text-seftec-navy/70 dark:text-white/70">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span>Full support for all ISO 20022 message types</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span>Cross-border payment optimization</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                        <span>SWIFT and SEPA network enhancements</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 top-0 bg-seftec-navy/30 dark:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center">
                      <div className="bg-white dark:bg-seftec-darkNavy rounded-full w-2.5 h-2.5"></div>
                    </div>
                    <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      Q3-Q4 2025
                    </Badge>
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Advanced Trade Finance Platform
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                      Launch our comprehensive trade finance solution with smart contract automation for Letters of Credit and supply chain financing.
                    </p>
                    <ul className="space-y-1 text-sm text-seftec-navy/70 dark:text-white/70">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Automated Letter of Credit processing</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Supply chain financing with real-time tracking</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Multi-party document verification platform</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 top-0 bg-seftec-navy/30 dark:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center">
                      <div className="bg-white dark:bg-seftec-darkNavy rounded-full w-2.5 h-2.5"></div>
                    </div>
                    <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                      Q1-Q2 2026
                    </Badge>
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Enterprise Stablecoin Settlement
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                      Deploy our institutional-grade stablecoin settlement layer with support for multiple fiat currencies.
                    </p>
                    <ul className="space-y-1 text-sm text-seftec-navy/70 dark:text-white/70">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Multi-currency stablecoin ecosystem</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Real-time settlement with traditional banking systems</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Regulatory-compliant tokenization framework</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 top-0 bg-seftec-navy/30 dark:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center">
                      <div className="bg-white dark:bg-seftec-darkNavy rounded-full w-2.5 h-2.5"></div>
                    </div>
                    <Badge className="mb-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
                      Q3-Q4 2026
                    </Badge>
                    <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                      Global DeFi Interoperability Network
                    </h4>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-3">
                      Launch our cross-chain interoperability protocol connecting major enterprise blockchain networks and public DeFi ecosystems.
                    </p>
                    <ul className="space-y-1 text-sm text-seftec-navy/70 dark:text-white/70">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Multi-chain liquidity network</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Enterprise-to-public blockchain bridge</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-seftec-navy/50 dark:bg-white/50 mr-2"></div>
                        <span>Central Bank Digital Currency (CBDC) integration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">
                    <Users className="inline-block mr-2 h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                    Strategic Partnerships
                  </h3>
                  <Card className="bg-white dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                    <CardContent className="p-6">
                      <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                        Seftec is actively expanding our alliance network with key industry players to accelerate adoption:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-seftec-navy dark:text-white">Banking Consortium Partnership</span>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Collaboration with a consortium of 12+ multinational banks to standardize DeFi protocols for institutional use.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-seftec-navy dark:text-white">Central Bank Pilot Programs</span>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Participation in CBDC sandbox environments with 3 central banks globally.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-seftec-navy dark:text-white">Enterprise Blockchain Alliances</span>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Integration partnerships with leading enterprise blockchain providers including R3, Hyperledger, and ConsenSys.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-seftec-navy dark:text-white">ERP System Integrations</span>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Strategic partnerships with major ERP providers to enable seamless DeFi access through existing enterprise systems.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">
                    <TrendingUp className="inline-block mr-2 h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                    Enterprise Benefits
                  </h3>
                  <Card className="bg-white dark:bg-seftec-darkNavy/30 border-seftec-navy/10 dark:border-white/10">
                    <CardContent className="p-6">
                      <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                        Our strategic roadmap delivers significant advantages for enterprise clients:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3 mt-1">
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h5 className="font-medium text-seftec-navy dark:text-white">Cost Reduction</h5>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Up to 65% reduction in settlement costs and 72% decrease in international transaction fees.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3 mt-1">
                            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h5 className="font-medium text-seftec-navy dark:text-white">Operational Efficiency</h5>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Automation reduces processing time by 85% and eliminates 95% of manual reconciliation tasks.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3 mt-1">
                            <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h5 className="font-medium text-seftec-navy dark:text-white">Global Market Access</h5>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Seamless access to global liquidity pools and cross-border payment networks in over 180 countries.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3 mt-1">
                            <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <h5 className="font-medium text-seftec-navy dark:text-white">Regulatory Compliance</h5>
                            <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                              Built-in compliance with global financial regulations, reducing compliance costs by up to 45%.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-seftec-navy to-seftec-navy/90 dark:from-seftec-teal dark:to-seftec-purple text-white">
                  Schedule Strategic Consultation
                </Button>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-br from-seftec-navy/10 to-seftec-navy/5 dark:from-seftec-teal/10 dark:to-seftec-purple/5 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-6">
            Ready to Transform Your Enterprise with DeFi?
          </h2>
          <p className="text-xl text-seftec-navy/80 dark:text-white/80 max-w-3xl mx-auto mb-8">
            Connect with our experts to discover how Seftec's ISO 20022 compliant DeFi solutions can revolutionize your financial operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white dark:text-white dark:hover:bg-white/10">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DefiLeadership;
