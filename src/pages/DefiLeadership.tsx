
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

const DefiLeadership = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>DeFi Leadership | SEFTEC</title>
        <meta name="description" content="Discover SEFTEC's leadership in decentralized finance (DeFi). Learn about our secure enterprise DeFi access platform, ISO 20022 compliance, and strategic roadmap." />
        <meta name="keywords" content="SEFTEC, DeFi, decentralized finance, ISO 20022, blockchain, enterprise DeFi, secure access" />
        <meta property="og:title" content="DeFi Leadership | SEFTEC" />
        <meta property="og:description" content="Discover SEFTEC's leadership in decentralized finance (DeFi). Learn about our secure enterprise DeFi access platform, ISO 20022 compliance, and strategic roadmap." />
        <meta property="og:image" content="/lovable-uploads/5ebd209e-ea30-4635-8e7c-3389b373f503.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-seftec-navy to-blue-900 text-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-700" variant="default">DeFi Leadership</Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">Pioneering Enterprise DeFi Solutions</h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">Seftec is revolutionizing how businesses access and utilize decentralized finance with our secure, compliant, and scalable platform.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">Request Demo</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                  <Link to="#roadmap">View Roadmap</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs defaultValue="leadership" className="container px-4 md:px-6 py-12">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="leadership" className="text-sm md:text-base">Market Leadership</TabsTrigger>
              <TabsTrigger value="solution" className="text-sm md:text-base">Technical Solution</TabsTrigger>
              <TabsTrigger value="roadmap" className="text-sm md:text-base" id="roadmap">Strategic Roadmap</TabsTrigger>
            </TabsList>

            {/* Market Leadership Tab */}
            <TabsContent value="leadership" className="space-y-12">
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Market Leadership Position</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <Card>
                    <CardHeader className="bg-slate-50 dark:bg-slate-900">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-blue-600" />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Active Enterprise Users</span>
                          <span className="font-semibold">5,000+</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Transaction Volume</span>
                          <span className="font-semibold">$2.3B Annually</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Compliance Rate</span>
                          <span className="font-semibold">99.7%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Platform Reliability</span>
                          <span className="font-semibold">99.99% Uptime</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-slate-50 dark:bg-slate-900">
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-blue-600" />
                        Industry Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Badge className="mt-0.5 shrink-0">2025</Badge>
                          <span>Most Innovative DeFi Solution - Global Finance Awards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge className="mt-0.5 shrink-0">2024</Badge>
                          <span>Top 10 Blockchain Companies to Watch - Forbes Business</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge className="mt-0.5 shrink-0">2024</Badge>
                          <span>Excellence in Financial Innovation - Enterprise Tech Summit</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-slate-50 dark:bg-slate-900">
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-blue-600" />
                        Competitive Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">01.</span>
                          <span>Only platform with full ISO 20022 compliance for DeFi transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">02.</span>
                          <span>Patented secure bridge technology between traditional banking and blockchain</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">03.</span>
                          <span>Advanced risk assessment AI for real-time transaction monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">04.</span>
                          <span>Enterprise-grade SLAs with 24/7 dedicated support</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Enterprise Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Global Supply Chain Finance Transformation</CardTitle>
                      <CardDescription>International Manufacturing Conglomerate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Implemented Seftec's DeFi platform to manage $350M+ in supply chain financing across 27 countries, reducing settlement times from 14 days to under 24 hours.</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        <li>47% reduction in financing costs</li>
                        <li>89% improvement in supplier satisfaction scores</li>
                        <li>Full regulatory compliance across all regions</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Full Case Study</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Cross-Border Payment Revolution</CardTitle>
                      <CardDescription>Leading African Financial Services Provider</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Leveraged Seftec's ISO 20022-compliant DeFi infrastructure to process over 1.2 million monthly cross-border transactions with 99.99% success rate.</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        <li>92% reduction in transaction fees</li>
                        <li>Instant settlements vs. previous 3-5 day delays</li>
                        <li>Enhanced fraud prevention with 99.7% detection rate</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Full Case Study</Button>
                    </CardFooter>
                  </Card>
                </div>
              </section>
            </TabsContent>

            {/* Technical Solution Tab */}
            <TabsContent value="solution" className="space-y-12">
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
            </TabsContent>

            {/* Strategic Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-12">
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
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DefiLeadership;
