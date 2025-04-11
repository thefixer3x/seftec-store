
import React, { useEffect } from "react";
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Landmark, 
  CircleDollarSign, 
  Handshake, 
  Award, 
  CheckCircle2, 
  BarChart4, 
  Lock,
  ArrowRight,
  Globe,
  BriefcaseBusiness,
  Scale
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

const DefiLeadership = () => {
  // Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-seftec-navy/90 to-seftec-navy dark:from-seftec-darkNavy dark:to-seftec-purple/80 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 px-4 py-1.5 bg-white/10 text-white border-white/20 text-sm">
              Enterprise DeFi Innovation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Pioneering the Future of <span className="text-seftec-gold dark:text-seftec-teal">Decentralized Finance</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Seftec is redefining how enterprises access, implement, and benefit from DeFi solutions with our industry-leading platform and ISO 20022 compliance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-seftec-gold hover:bg-seftec-gold/90 text-white dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
                Book Enterprise Demo
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Stats */}
      <section className="py-16 bg-seftec-slate/30 dark:bg-seftec-darkNavy/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="bg-white dark:bg-seftec-darkNavy/60 p-6 rounded-lg shadow-md reveal">
              <TrendingUp className="h-12 w-12 mb-4 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-3xl font-bold mb-2 text-seftec-navy dark:text-white">$4.2B+</h3>
              <p className="text-seftec-navy/70 dark:text-white/70">Transaction Volume Processed</p>
            </div>
            
            <div className="bg-white dark:bg-seftec-darkNavy/60 p-6 rounded-lg shadow-md reveal">
              <BriefcaseBusiness className="h-12 w-12 mb-4 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-3xl font-bold mb-2 text-seftec-navy dark:text-white">340+</h3>
              <p className="text-seftec-navy/70 dark:text-white/70">Enterprise Clients Worldwide</p>
            </div>
            
            <div className="bg-white dark:bg-seftec-darkNavy/60 p-6 rounded-lg shadow-md reveal">
              <Shield className="h-12 w-12 mb-4 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-3xl font-bold mb-2 text-seftec-navy dark:text-white">99.99%</h3>
              <p className="text-seftec-navy/70 dark:text-white/70">Platform Security Uptime</p>
            </div>
            
            <div className="bg-white dark:bg-seftec-darkNavy/60 p-6 rounded-lg shadow-md reveal">
              <Award className="h-12 w-12 mb-4 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-3xl font-bold mb-2 text-seftec-navy dark:text-white">12</h3>
              <p className="text-seftec-navy/70 dark:text-white/70">Industry Awards (2023-2024)</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Market Leadership Position */}
      <section id="market-leadership" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-seftec-slate dark:bg-white/10 text-seftec-navy dark:text-white border-seftec-navy/10 dark:border-white/20 text-sm">
              Market Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-seftec-navy dark:text-white">
              Setting the Standard in Enterprise DeFi
            </h2>
            <p className="text-lg text-seftec-navy/70 dark:text-white/70">
              Seftec has established itself as the premier provider of enterprise-grade decentralized finance solutions, backed by industry recognition and proven results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8 reveal">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                Industry Metrics & Recognition
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-seftec-navy dark:text-white">Market Share</span>
                    <span className="text-seftec-gold dark:text-seftec-teal font-bold">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-seftec-navy dark:text-white">Client Retention</span>
                    <span className="text-seftec-gold dark:text-seftec-teal font-bold">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-seftec-navy dark:text-white">ISO 20022 Implementation Success</span>
                    <span className="text-seftec-gold dark:text-seftec-teal font-bold">99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-seftec-slate dark:bg-white/10 text-seftec-navy/80 dark:text-white/80 hover:text-seftec-navy dark:hover:text-white border-seftec-navy/10 dark:border-white/20 rounded-full px-4 py-2">
                  "DeFi Innovator of the Year 2024"
                </Badge>
                <Badge className="bg-seftec-slate dark:bg-white/10 text-seftec-navy/80 dark:text-white/80 hover:text-seftec-navy dark:hover:text-white border-seftec-navy/10 dark:border-white/20 rounded-full px-4 py-2">
                  "Best Enterprise Blockchain Solution"
                </Badge>
                <Badge className="bg-seftec-slate dark:bg-white/10 text-seftec-navy/80 dark:text-white/80 hover:text-seftec-navy dark:hover:text-white border-seftec-navy/10 dark:border-white/20 rounded-full px-4 py-2">
                  "Top 10 FinTech Disruptors"
                </Badge>
              </div>
            </div>
            
            <div className="space-y-8 reveal">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                Competitive Advantages
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Full ISO 20022 Compliance</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      One of only three platforms globally with complete ISO 20022 integration, enabling seamless interoperability between traditional banking and blockchain networks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Enterprise-Grade Security</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Military-grade encryption and multi-layered authentication protocols, with quarterly third-party security audits that exceed industry standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Regulatory-First Approach</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Built from the ground up to address compliance requirements across 37 jurisdictions, with proactive regulatory monitoring and adaptation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Case Studies */}
          <h3 className="text-2xl font-bold text-seftec-navy dark:text-white text-center mb-8 reveal">
            Enterprise Success Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="reveal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                  Global Financial Institution
                </CardTitle>
                <CardDescription>Cross-Border Payment Transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-seftec-navy/80 dark:text-white/80">
                  A top-tier global bank implemented Seftec's DeFi platform to revolutionize their cross-border payment infrastructure, achieving:
                </p>
                <ul className="space-y-2 text-seftec-navy/80 dark:text-white/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>94% reduction in settlement time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>78% decrease in transaction costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>100% compliance with global regulatory requirements</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Full Case Study
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="reveal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                  Multinational Supply Chain Corp
                </CardTitle>
                <CardDescription>Trade Finance Optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-seftec-navy/80 dark:text-white/80">
                  A Fortune 500 supply chain company integrated Seftec's DeFi solutions to streamline trade finance operations, resulting in:
                </p>
                <ul className="space-y-2 text-seftec-navy/80 dark:text-white/80">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>$47M annual working capital optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>60% faster supplier financing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                    <span>85% reduction in documentation processing time</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Full Case Study
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Technical Solution */}
      <section id="technical-solution" className="py-16 bg-seftec-navy dark:bg-seftec-darkNavy/80 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-white/10 text-white border-white/20 text-sm">
              Technical Excellence
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Enterprise-Grade DeFi Platform
            </h2>
            <p className="text-lg text-white/70">
              Our secure, scalable framework enables enterprises to harness the power of decentralized finance while maintaining compliance and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 reveal">
              <CircleDollarSign className="h-12 w-12 mb-6 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-xl font-bold mb-4">ISO 20022 Integration</h3>
              <p className="text-white/80 mb-4">
                Our platform is built on the foundation of ISO 20022 message standards, enabling seamless interoperability between traditional banking systems and blockchain networks.
              </p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Complete message format compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Automated translation between standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Enhanced data richness for compliance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 reveal">
              <Lock className="h-12 w-12 mb-6 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-xl font-bold mb-4">Security Framework</h3>
              <p className="text-white/80 mb-4">
                Our multi-layered security architecture protects enterprise assets through advanced protocols and continuous monitoring.
              </p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Military-grade encryption (AES-256)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Multi-signature authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Real-time threat detection and response</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Quarterly third-party security audits</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 reveal">
              <Scale className="h-12 w-12 mb-6 text-seftec-gold dark:text-seftec-teal" />
              <h3 className="text-xl font-bold mb-4">Risk Management</h3>
              <p className="text-white/80 mb-4">
                Advanced risk assessment and mitigation capabilities protect enterprises from market volatility and operational risks.
              </p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>AI-powered fraud detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Real-time compliance monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Customizable risk parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <span>Automated hedging mechanisms</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center reveal">
              Integration Examples
            </h3>
            
            <Accordion type="single" collapsible className="bg-white/5 rounded-lg border border-white/10 reveal">
              <AccordionItem value="core-banking">
                <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                  Core Banking System Integration
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  <p className="mb-4">
                    Seftec's API-driven architecture enables seamless integration with existing core banking systems, allowing financial institutions to extend their capabilities into DeFi markets without disrupting established operations.
                  </p>
                  <p>
                    Our platform supports standard protocols including REST, SOAP, and ISO 20022 XML messaging, with comprehensive documentation and sandbox environments for testing.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="multi-chain">
                <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                  Multi-Chain Support
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  <p className="mb-4">
                    Seftec supports all major blockchain networks including Ethereum, Solana, Avalanche, and enterprise solutions like Hyperledger Fabric and R3 Corda. This multi-chain approach ensures enterprises can operate across ecosystems based on business requirements.
                  </p>
                  <p>
                    Our unified dashboard provides consistent governance and visibility across all supported chains, with automatic optimization for transaction costs and settlement times.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="regulatory">
                <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                  Regulatory Reporting
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  <p className="mb-4">
                    Automated compliance with reporting requirements across major financial jurisdictions, including FATF Travel Rule, MiCA, and regional regulations like SEC requirements.
                  </p>
                  <p>
                    The platform maintains comprehensive audit trails and can generate regulator-ready reports in standardized formats, dramatically reducing the compliance burden for enterprises.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Strategic Roadmap */}
      <section id="strategic-roadmap" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-seftec-slate dark:bg-white/10 text-seftec-navy dark:text-white border-seftec-navy/10 dark:border-white/20 text-sm">
              Future Trajectory
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-seftec-navy dark:text-white">
              Strategic DeFi Roadmap
            </h2>
            <p className="text-lg text-seftec-navy/70 dark:text-white/70">
              Our detailed development and expansion plan outlines how Seftec will continue to lead enterprise DeFi innovation over the next 24 months.
            </p>
          </div>
          
          {/* Roadmap Timeline */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-seftec-slate dark:bg-white/10"></div>
            
            {/* Q2 2024 */}
            <div className="relative z-10 mb-12 reveal">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8 md:pr-12">
                  <div className="inline-block bg-seftec-gold dark:bg-seftec-teal text-white rounded-lg px-4 py-2 mb-2">
                    Q2 2024
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-seftec-navy dark:text-white">Enhanced ISO 20022 Capabilities</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 max-w-md ml-auto">
                    Expanding ISO 20022 message support to include all transaction types and introducing advanced mapping tools for legacy systems.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center border-4 border-white dark:border-seftec-darkNavy">
                  <span className="bg-white dark:bg-seftec-darkNavy h-2 w-2 rounded-full"></span>
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
            
            {/* Q3 2024 */}
            <div className="relative z-10 mb-12 reveal">
              <div className="flex items-center">
                <div className="flex-1"></div>
                <div className="h-8 w-8 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center border-4 border-white dark:border-seftec-darkNavy">
                  <span className="bg-white dark:bg-seftec-darkNavy h-2 w-2 rounded-full"></span>
                </div>
                <div className="flex-1 pl-8 md:pl-12">
                  <div className="inline-block bg-seftec-gold dark:bg-seftec-teal text-white rounded-lg px-4 py-2 mb-2">
                    Q3 2024
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-seftec-navy dark:text-white">Global Financial Partnership Network</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 max-w-md">
                    Launch of strategic partnerships with five major global financial institutions to create an interoperable DeFi liquidity network.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Q4 2024 */}
            <div className="relative z-10 mb-12 reveal">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8 md:pr-12">
                  <div className="inline-block bg-seftec-gold dark:bg-seftec-teal text-white rounded-lg px-4 py-2 mb-2">
                    Q4 2024
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-seftec-navy dark:text-white">Enterprise Tokenization Platform</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 max-w-md ml-auto">
                    Release of comprehensive asset tokenization capabilities for enterprises, enabling tokenization of traditional financial instruments with regulatory compliance.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center border-4 border-white dark:border-seftec-darkNavy">
                  <span className="bg-white dark:bg-seftec-darkNavy h-2 w-2 rounded-full"></span>
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
            
            {/* Q1 2025 */}
            <div className="relative z-10 mb-12 reveal">
              <div className="flex items-center">
                <div className="flex-1"></div>
                <div className="h-8 w-8 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center border-4 border-white dark:border-seftec-darkNavy">
                  <span className="bg-white dark:bg-seftec-darkNavy h-2 w-2 rounded-full"></span>
                </div>
                <div className="flex-1 pl-8 md:pl-12">
                  <div className="inline-block bg-seftec-gold dark:bg-seftec-teal text-white rounded-lg px-4 py-2 mb-2">
                    Q1 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-seftec-navy dark:text-white">Cross-Border Settlement Network</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 max-w-md">
                    Launch of next-generation cross-border payment and settlement network with near-instantaneous finality and complete regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Q2 2025 */}
            <div className="relative z-10 reveal">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8 md:pr-12">
                  <div className="inline-block bg-seftec-gold dark:bg-seftec-teal text-white rounded-lg px-4 py-2 mb-2">
                    Q2 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-seftec-navy dark:text-white">AI-Powered DeFi Analytics Suite</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70 max-w-md ml-auto">
                    Introduction of advanced predictive analytics for liquidity optimization, risk management, and strategic treasury operations.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-seftec-gold dark:bg-seftec-teal flex items-center justify-center border-4 border-white dark:border-seftec-darkNavy">
                  <span className="bg-white dark:bg-seftec-darkNavy h-2 w-2 rounded-full"></span>
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
          
          {/* Partnership & Expansion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6 reveal">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                Strategic Partnerships
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Handshake className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Global Banking Consortium</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Partnership with a consortium of 20+ global banks to establish DeFi interoperability standards and develop compliant cross-border solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Handshake className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Central Bank Digital Currency Initiatives</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Collaboration with three central banks to develop CBDC frameworks compatible with ISO 20022 standards for seamless integration with DeFi ecosystems.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Handshake className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Enterprise Blockchain Alliance</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Leading a consortium of enterprise technology providers to develop interoperable standards for private and public blockchain integration in financial services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 reveal">
              <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                Global Expansion Initiatives
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">APAC Expansion</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Opening regional headquarters in Singapore with satellite offices in Tokyo and Sydney to serve the rapidly growing Asian-Pacific enterprise market.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">Middle East Financial Hub</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Establishing a regional center in Dubai to facilitate DeFi adoption among sovereign wealth funds and major financial institutions in the Gulf region.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-seftec-navy dark:text-white">African Financial Markets Access</h4>
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      Dedicated initiative to expand DeFi infrastructure across key African markets, focusing on cross-border payments and trade finance solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming DeFi Offerings */}
          <div className="bg-seftec-slate/20 dark:bg-white/5 rounded-lg p-8 border border-seftec-navy/10 dark:border-white/10 reveal">
            <h3 className="text-2xl font-bold text-seftec-navy dark:text-white text-center mb-8">
              Upcoming Enterprise DeFi Capabilities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Institutional Yield Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    AI-driven treasury management tools that automatically optimize yields across DeFi protocols while maintaining strict risk parameters.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Compliant DeFi Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    Permissioned access to DeFi liquidity pools and protocols with built-in compliance controls and complete audit trails.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Tokenized Asset Framework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    End-to-end platform for creating, managing, and trading tokenized traditional assets with regulatory compliance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Advanced Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    Next-generation risk controls with real-time monitoring, automated hedging, and sophisticated market impact analysis.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Cross-Chain Settlement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    Unified settlement layer that enables instant, secure transactions across multiple blockchain networks with atomic execution.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 dark:bg-seftec-darkNavy/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                    Enterprise Smart Contracts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-seftec-navy/80 dark:text-white/80 text-sm">
                    Audited, customizable smart contract templates designed specifically for enterprise use cases with comprehensive legal frameworks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal/90 dark:to-seftec-purple/90 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Enterprise with DeFi?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the leading financial institutions already leveraging Seftec's enterprise DeFi platform to drive innovation and efficiency.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-seftec-navy hover:bg-white/90">
              Request Enterprise Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Download Technical Whitepaper
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DefiLeadership;
