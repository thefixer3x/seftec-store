
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Helmet } from "react-helmet";
import { 
  TrendingUp, 
  Shield, 
  Check, 
  LucideArrowRight, 
  BarChart4, 
  Globe, 
  Building, 
  Lightbulb,
  Calendar,
  Network
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const DefiLeadership = () => {
  return (
    <>
      <Helmet>
        <title>DeFi Leadership - SefTec</title>
        <meta name="description" content="Seftec's vision and leadership in enterprise decentralized finance (DeFi) solutions" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
        <MainNav items={siteConfig.mainNav} />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-seftec-navy/5 to-seftec-navy/0 dark:from-seftec-purple/10 dark:to-seftec-teal/0 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-4">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Enterprise DeFi Leadership
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-seftec-navy dark:text-white mb-4">
                  Leading the Future of <span className="text-seftec-gold dark:text-seftec-teal">Decentralized Finance</span>
                </h1>
                <p className="text-seftec-navy/70 dark:text-white/70 text-lg mb-6">
                  Seftec is pioneering ISO 20022 compliant decentralized finance solutions for enterprises worldwide, bridging traditional banking with blockchain technology.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button size="lg" className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                      Schedule a Demo
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button variant="outline" size="lg" className="border-seftec-navy/20 text-seftec-navy hover:bg-seftec-navy/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                      Explore Solutions
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-lg bg-white/80 dark:bg-white/5 border border-seftec-navy/10 dark:border-white/10">
                  <img 
                    src="/assets/images/defi-leadership.webp" 
                    alt="SefTec DeFi Leadership" 
                    className="w-full h-auto rounded-t-xl" 
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/800x400/seftec-navy/white?text=DeFi+Leadership";
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                        <span className="font-medium text-seftec-navy dark:text-white">ISO 20022 Compliant</span>
                      </div>
                      <div className="text-sm text-seftec-navy/60 dark:text-white/60">
                        Enterprise-grade Security
                      </div>
                    </div>
                    <p className="text-seftec-navy/70 dark:text-white/70 text-sm">
                      Our platform seamlessly integrates with traditional banking systems while leveraging the power, security, and transparency of blockchain technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Leadership Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-seftec-darkNavy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white mb-4">Market Leadership Position</h2>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Seftec has established itself as a trusted leader in the DeFi space through innovation, enterprise focus, and commitment to compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Building className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                    Enterprise Adoption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">250+</div>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70 mb-4">
                    Enterprise clients across 18 countries
                  </p>
                  <div className="text-3xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">$2.8B</div>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    Transaction volume processed monthly
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Globe className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                    Market Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">Named "Top DeFi Solution for Enterprise" by FinTech Global (2024)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">ISO 27001 Certified for Information Security</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">Featured in Forbes "Blockchain 50" list</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart4 className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
                    Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">First-to-market with ISO 20022 compliant blockchain solutions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">Proprietary secure enterprise access platform</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-seftec-navy/90 dark:text-white/90">99.99% uptime with enterprise-grade SLAs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-seftec-slate to-seftec-slate/0 dark:from-seftec-darkNavy/80 dark:to-seftec-darkNavy/0 rounded-lg overflow-hidden border border-seftec-navy/10 dark:border-white/10">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-4">Enterprise Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Global Manufacturing Conglomerate</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70 mb-3">
                      Reduced cross-border payment settlement time from 3 days to under 2 minutes, saving $4.2M annually in operational costs.
                    </p>
                    <div className="text-xs text-seftec-navy/50 dark:text-white/50">
                      Results verified by Deloitte, 2023
                    </div>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">International Banking Consortium</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70 mb-3">
                      Implemented seftec's DeFi solution across 12 countries, eliminating $18M in transaction fees and reducing fraud by 78%.
                    </p>
                    <div className="text-xs text-seftec-navy/50 dark:text-white/50">
                      Case study published in Banking Technology Journal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="bg-seftec-navy/10 dark:bg-white/10" />
        
        {/* Technical Solution Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-seftec-darkNavy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white mb-4">Technical Solution</h2>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Our secure enterprise DeFi access platform bridges traditional financial systems with blockchain technology, providing unparalleled security, efficiency, and interoperability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-4">ISO 20022 Integration</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                  Our platform is built from the ground up to support ISO 20022 standards, enabling seamless interoperability between traditional banking systems and blockchain-based solutions.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Enhanced Data Quality</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Rich, structured data format improves STP rates by up to 25% and reduces reconciliation errors by 90%.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Global Compatibility</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Compliant with SWIFT, SEPA, and major central bank payment systems across 120+ countries.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Future-Proof Architecture</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Designed to adapt to evolving ISO 20022 implementations across different jurisdictions and timelines.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-4">Security & Risk Management</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                  Enterprise-grade security protocols protect your assets and data at every layer of our solution.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Multi-Layer Security</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Hardware security modules, MPC cryptography, and enterprise-grade key management.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Compliance Framework</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Built-in AML/KYC tools, regulatory reporting, and audit trails for major global regulations.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                    <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Risk Controls</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                      Granular access controls, transaction limits, real-time monitoring, and fraud detection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-seftec-gold/10 to-seftec-gold/0 dark:from-seftec-teal/10 dark:to-seftec-teal/0 rounded-lg overflow-hidden border border-seftec-navy/10 dark:border-white/10 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-4">Integration Examples</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                    Our platform integrates seamlessly with your existing systems, providing a bridge between traditional finance and decentralized technologies.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-seftec-navy dark:text-white">Core Banking Systems</h4>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">Pre-built connectors for major systems like Temenos, FIS, Finastra, and Oracle FLEXCUBE</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-seftec-navy dark:text-white">Enterprise Resource Planning</h4>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">Seamless integration with SAP, Oracle ERP, Microsoft Dynamics, and other major ERP systems</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-seftec-navy dark:text-white">Blockchain Networks</h4>
                        <p className="text-sm text-seftec-navy/70 dark:text-white/70">Multi-chain support for Ethereum, Polygon, Avalanche, Binance Smart Chain, and private enterprise networks</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 bg-white/80 dark:bg-white/5 rounded-lg p-4 border border-seftec-navy/10 dark:border-white/10">
                  <h4 className="font-medium text-seftec-navy dark:text-white mb-2">Implementation Timeline</h4>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-seftec-navy/70 dark:text-white/70">Discovery & Assessment</span>
                      <span className="text-seftec-navy dark:text-white font-medium">2 weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-seftec-navy/70 dark:text-white/70">System Integration</span>
                      <span className="text-seftec-navy dark:text-white font-medium">4-6 weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-seftec-navy/70 dark:text-white/70">Testing & Compliance</span>
                      <span className="text-seftec-navy dark:text-white font-medium">2-3 weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-seftec-navy/70 dark:text-white/70">Deployment</span>
                      <span className="text-seftec-navy dark:text-white font-medium">1 week</span>
                    </div>
                    <Separator className="bg-seftec-navy/10 dark:bg-white/10" />
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="text-seftec-navy dark:text-white">Total Time to Value</span>
                      <span className="text-seftec-gold dark:text-seftec-teal">9-12 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="bg-seftec-navy/10 dark:bg-white/10" />
        
        {/* Strategic Roadmap Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-seftec-darkNavy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white mb-4">Strategic Roadmap</h2>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Our vision for the future of enterprise DeFi solutions is focused on innovation, expansion, and continuous improvement of our platform.
              </p>
            </div>
            
            <div className="space-y-8 mb-12">
              <div className="relative">
                <div className="hidden md:block absolute left-[calc(25%-1px)] top-0 bottom-0 w-0.5 bg-seftec-navy/10 dark:bg-white/10"></div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:pr-8">
                    <div className="flex items-center">
                      <div className="hidden md:flex items-center justify-center w-8 h-8 bg-seftec-gold dark:bg-seftec-teal rounded-full z-10 border-4 border-white dark:border-seftec-darkNavy">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-seftec-navy dark:text-white md:ml-4">Q3 2024</h3>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                      <CardHeader>
                        <CardTitle>Enhanced Interoperability Framework</CardTitle>
                        <CardDescription>
                          Expanding our ISO 20022 capabilities and protocol support
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Launch of multi-chain bridging solution with ISO 20022 message translation</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Addition of new financial messaging standards compatibility</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Integration with 3 new major central bank digital currency (CBDC) platforms</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="hidden md:block absolute left-[calc(25%-1px)] top-0 bottom-0 w-0.5 bg-seftec-navy/10 dark:bg-white/10"></div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:pr-8">
                    <div className="flex items-center">
                      <div className="hidden md:flex items-center justify-center w-8 h-8 bg-seftec-gold dark:bg-seftec-teal rounded-full z-10 border-4 border-white dark:border-seftec-darkNavy">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-seftec-navy dark:text-white md:ml-4">Q1 2025</h3>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                      <CardHeader>
                        <CardTitle>Global Expansion & Partnerships</CardTitle>
                        <CardDescription>
                          Extending our reach and ecosystem integration
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Strategic partnership with two Tier 1 global banking partners</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Expansion into APAC region with new offices in Singapore and Tokyo</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Compliance expansion to cover 8 new regulatory jurisdictions</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="hidden md:block absolute left-[calc(25%-1px)] top-0 bottom-0 w-0.5 bg-seftec-navy/10 dark:bg-white/10"></div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:pr-8">
                    <div className="flex items-center">
                      <div className="hidden md:flex items-center justify-center w-8 h-8 bg-seftec-gold dark:bg-seftec-teal rounded-full z-10 border-4 border-white dark:border-seftec-darkNavy">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-seftec-navy dark:text-white md:ml-4">Q3 2025</h3>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
                      <CardHeader>
                        <CardTitle>Advanced DeFi Capabilities</CardTitle>
                        <CardDescription>
                          New enterprise solutions powered by our core technology
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Launch of Enterprise Tokenization Platform for assets and securities</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Advanced treasury management solution with DeFi yield optimization</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-seftec-navy/90 dark:text-white/90">Real-time cross-border payment network with 15+ banking partners</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-seftec-navy/5 to-seftec-navy/0 dark:from-seftec-purple/10 dark:to-seftec-teal/0 rounded-lg overflow-hidden border border-seftec-navy/10 dark:border-white/10">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-seftec-navy dark:text-white mb-4">Benefits for Enterprise Clients</h3>
                    <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                      Our strategic roadmap is designed to deliver increasing value to enterprise clients with each new release.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 mr-3">
                          <Lightbulb className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-seftec-navy dark:text-white text-sm">Operational Efficiency</h4>
                          <p className="text-xs text-seftec-navy/70 dark:text-white/70">30-50% reduction in settlement costs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 mr-3">
                          <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-seftec-navy dark:text-white text-sm">Enhanced Security</h4>
                          <p className="text-xs text-seftec-navy/70 dark:text-white/70">90% reduction in payment fraud attempts</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 mr-3">
                          <Network className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-seftec-navy dark:text-white text-sm">Global Connectivity</h4>
                          <p className="text-xs text-seftec-navy/70 dark:text-white/70">Access to 120+ countries with local compliance</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 mr-3">
                          <BarChart4 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-seftec-navy dark:text-white text-sm">New Revenue Streams</h4>
                          <p className="text-xs text-seftec-navy/70 dark:text-white/70">Access to DeFi markets worth $80B+ globally</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <Link to="/contact">
                      <Button size="lg" className="w-full bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                        Schedule a Strategy Session
                        <LucideArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-seftec-navy/50 dark:text-white/50 mt-2">
                      For enterprise clients and financial institutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-seftec-navy to-seftec-purple dark:from-seftec-darkNavy dark:to-seftec-purple/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Lead Your Industry with Enterprise DeFi?</h2>
              <p className="text-white/80 mb-8">
                Join the growing network of forward-thinking enterprises leveraging ISO 20022 compliant DeFi solutions to transform their operations and unlock new opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/solutions">
                  <Button size="lg" className="bg-white text-seftec-navy hover:bg-white/90">
                    Explore Solutions
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default DefiLeadership;
