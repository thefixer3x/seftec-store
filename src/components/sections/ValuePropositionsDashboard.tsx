
import React, { useState } from 'react';
import { LayoutDashboard, LineChart, FileText, MousePointer, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResponsiveContainer, ResponsiveGrid } from '@/components/ui/mobile-optimizations/ResponsiveGrid';
import { ResponsiveSpacing, ResponsiveShow } from '@/components/ui/mobile-optimizations/ResponsiveBreakpoints';

const dashboardFeatures = [
  {
    icon: <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-seftec-teal" />,
    title: 'Intuitive Dashboard',
    shortTitle: 'Dashboard',
    description: 'Get a 360-degree view of your business with our intuitive dashboard that presents all critical information at a glance.',
    detail: 'Our dashboard consolidates your key metrics, recent activities, and important notifications in a clean, organized interface designed for maximum productivity.'
  },
  {
    icon: <LineChart className="h-6 w-6 sm:h-8 sm:w-8 text-seftec-purple" />,
    title: 'Real-Time Analytics',
    shortTitle: 'Analytics',
    description: 'Monitor key performance indicators and track trends in real-time to make data-driven decisions.',
    detail: 'Access up-to-the-minute data on sales, inventory, customer behavior, and market trends through interactive charts and visualizations that help you spot opportunities and challenges instantly.'
  },
  {
    icon: <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-seftec-gold" />,
    title: 'Customizable Reports',
    shortTitle: 'Reports',
    description: 'Generate detailed reports tailored to your specific needs for deeper business insights.',
    detail: 'Create, schedule, and share reports with flexible parameters, custom metrics, and multiple export options to support your decision-making process and stakeholder communications.'
  },
  {
    icon: <MousePointer className="h-6 w-6 sm:h-8 sm:w-8 text-seftec-teal" />,
    title: 'User-Friendly Interface',
    shortTitle: 'Interface',
    description: 'Navigate with ease and access the information you need quickly with our intuitive design.',
    detail: 'Enjoy a clean, responsive interface with thoughtful touches like keyboard shortcuts, personalized workspaces, and accessible design that makes managing your business a pleasure rather than a chore.'
  },
  {
    icon: <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-seftec-purple" />,
    title: 'BizGenie AI Advisor',
    shortTitle: 'AI Advisor',
    description: 'Get strategic business and financial advisory powered by BizGenie, your personalised AI assistant.',
    detail: 'Our intelligent assistant analyzes your financial data, market trends, and business operations to offer insightful recommendations. It helps you anticipate market changes, manage risks, and enhance profitability through data-driven strategies tailored to your specific business needs.'
  }
];

const ValuePropositionsDashboard = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const currentFeature = dashboardFeatures.find(
    feature => feature.title.toLowerCase().split(' ')[0] === activeTab
  );
  
  return (
    <section className="bg-gradient-to-br from-white via-seftec-slate/10 to-white dark:from-seftec-darkNavy dark:via-seftec-navy/30 dark:to-seftec-darkNavy">
      <ResponsiveSpacing
        py={{ mobile: 12, tablet: 16, desktop: 20 }}
        px={{ mobile: 4, tablet: 6, desktop: 8 }}
      >
        <ResponsiveContainer>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-seftec-navy dark:text-white mb-4 sm:mb-6">
              Powerful Tools for Modern Businesses
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-seftec-navy/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Our platform provides you with cutting-edge tools to monitor, analyze, and grow your business effectively. 
              Experience the future of business management with our comprehensive suite of intelligent solutions.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <Tabs 
              defaultValue="dashboard" 
              className="w-full"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
              {/* Mobile-optimized Tab List */}
              <ResponsiveShow below="desktop">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8 rounded-xl p-2 bg-white/80 backdrop-blur-sm border border-seftec-slate/20 dark:bg-seftec-charcoal/80 dark:border-white/10 w-full shadow-lg">
                  {dashboardFeatures.map((feature, idx) => (
                    <TabsTrigger 
                      key={idx}
                      value={feature.title.toLowerCase().split(' ')[0]}
                      className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-3 relative overflow-hidden font-semibold touch-manipulation"
                    >
                      <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        {React.cloneElement(feature.icon, { className: 'h-4 w-4' })}
                        <span className="text-center sm:text-left">{feature.shortTitle}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ResponsiveShow>

              {/* Desktop Tab List */}
              <ResponsiveShow above="tablet">
                <TabsList className="flex mb-12 lg:mb-16 rounded-xl p-2 bg-white/80 backdrop-blur-sm border border-seftec-slate/20 dark:bg-seftec-charcoal/80 dark:border-white/10 w-full shadow-lg overflow-x-auto">
                  {dashboardFeatures.map((feature, idx) => (
                    <TabsTrigger 
                      key={idx}
                      value={feature.title.toLowerCase().split(' ')[0]}
                      className="flex-1 whitespace-nowrap px-4 lg:px-6 py-3 lg:py-4 relative overflow-hidden font-semibold"
                    >
                      <span className="flex items-center gap-2 lg:gap-3">
                        {React.cloneElement(feature.icon, { className: 'h-5 w-5 lg:h-6 lg:w-6' })}
                        <span>{feature.title}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ResponsiveShow>
              
              {dashboardFeatures.map((feature, index) => (
                <TabsContent key={index} value={feature.title.toLowerCase().split(' ')[0]}>
                  <Card className="border-seftec-slate/20 dark:border-white/10 animate-fade-up shadow-xl bg-white/90 backdrop-blur-sm dark:bg-seftec-darkNavy/90">
                    <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12">
                      <ResponsiveGrid
                        cols={{ mobile: 1, desktop: 2 }}
                        gap={{ mobile: 6, desktop: 8, large: 12 }}
                        className="items-center"
                      >
                        <div className="order-2 lg:order-1">
                          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-seftec-teal/10 to-seftec-purple/10 dark:from-seftec-teal/20 dark:to-seftec-purple/20">
                              {feature.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-seftec-navy dark:text-white">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-seftec-navy/80 dark:text-white/80 mb-4 sm:mb-6 text-base sm:text-lg lg:text-xl leading-relaxed">
                            {feature.description}
                          </p>
                          <p className="text-seftec-navy/70 dark:text-white/70 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                            {feature.detail}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button className="bg-gradient-teal-purple text-white hover:opacity-90 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation w-full sm:w-auto">
                                  Explore Features
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80 sm:w-96 p-4 sm:p-6 z-50">
                                <div className="space-y-3">
                                  <h4 className="text-base sm:text-lg font-semibold text-seftec-navy dark:text-white">{feature.title}</h4>
                                  <p className="text-sm sm:text-base text-seftec-navy/70 dark:text-white/70">
                                    Discover how our {feature.title.toLowerCase()} can revolutionize your business operations and drive unprecedented growth.
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-seftec-teal dark:text-seftec-gold">
                                    <div className="w-2 h-2 bg-seftec-teal dark:bg-seftec-gold rounded-full"></div>
                                    Premium SEFTEC Feature
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                            
                            <Button variant="outline" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-xl border-2 border-seftec-navy/20 dark:border-white/20 hover:border-seftec-teal dark:hover:border-seftec-gold transition-all duration-300 touch-manipulation w-full sm:w-auto">
                              Learn More
                            </Button>
                          </div>
                        </div>
                        
                        <div className="order-1 lg:order-2 bg-gradient-to-br from-seftec-slate/30 via-white/50 to-seftec-slate/30 dark:from-seftec-navy/50 dark:via-seftec-charcoal/50 dark:to-seftec-navy/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 h-64 sm:h-80 lg:h-96 flex items-center justify-center shadow-inner backdrop-blur-sm">
                          <div className="text-center space-y-4 sm:space-y-6">
                            <div className="mb-4 sm:mb-6 flex justify-center">
                              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-seftec-darkNavy/80 shadow-lg backdrop-blur-sm">
                                {React.cloneElement(feature.icon, { className: 'h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12' })}
                              </div>
                            </div>
                            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-seftec-navy dark:text-white mb-3 sm:mb-4">
                              Interactive Demo
                            </h4>
                            <p className="text-seftec-navy/70 dark:text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                              Experience our {feature.title.toLowerCase()} in action with live demonstrations and interactive previews coming soon.
                            </p>
                            <div className="flex justify-center">
                              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-seftec-teal/20 dark:bg-seftec-gold/20 rounded-full text-xs sm:text-sm font-medium text-seftec-teal dark:text-seftec-gold">
                                Coming Soon
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResponsiveGrid>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </ResponsiveContainer>
      </ResponsiveSpacing>
    </section>
  );
};

export default ValuePropositionsDashboard;
