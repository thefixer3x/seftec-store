
import React, { useState } from 'react';
import { LayoutDashboard, LineChart, FileText, MousePointer, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const dashboardFeatures = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-seftec-teal" />,
    title: 'Intuitive Dashboard',
    description: 'Get a 360-degree view of your business with our intuitive dashboard that presents all critical information at a glance.',
    detail: 'Our dashboard consolidates your key metrics, recent activities, and important notifications in a clean, organized interface designed for maximum productivity.'
  },
  {
    icon: <LineChart className="h-8 w-8 text-seftec-purple" />,
    title: 'Real-Time Analytics',
    description: 'Monitor key performance indicators and track trends in real-time to make data-driven decisions.',
    detail: 'Access up-to-the-minute data on sales, inventory, customer behavior, and market trends through interactive charts and visualizations that help you spot opportunities and challenges instantly.'
  },
  {
    icon: <FileText className="h-8 w-8 text-seftec-gold" />,
    title: 'Customizable Reports',
    description: 'Generate detailed reports tailored to your specific needs for deeper business insights.',
    detail: 'Create, schedule, and share reports with flexible parameters, custom metrics, and multiple export options to support your decision-making process and stakeholder communications.'
  },
  {
    icon: <MousePointer className="h-8 w-8 text-seftec-teal" />,
    title: 'User-Friendly Interface',
    description: 'Navigate with ease and access the information you need quickly with our intuitive design.',
    detail: 'Enjoy a clean, responsive interface with thoughtful touches like keyboard shortcuts, personalized workspaces, and accessible design that makes managing your business a pleasure rather than a chore.'
  },
  {
    icon: <Bot className="h-8 w-8 text-seftec-purple" />,
    title: 'BizGenie AI Advisor',
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
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-seftec-slate/10 to-white dark:from-seftec-darkNavy dark:via-seftec-navy/30 dark:to-seftec-darkNavy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-seftec-navy dark:text-white mb-6">
            Powerful Tools for Modern Businesses
          </h2>
          <p className="text-lg md:text-xl text-seftec-navy/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed">
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
            <TabsList className={`flex mb-12 md:mb-16 rounded-xl p-2 bg-white/80 backdrop-blur-sm border border-seftec-slate/20 dark:bg-seftec-charcoal/80 dark:border-white/10 w-full shadow-lg ${isMobile ? 'flex-wrap gap-2 justify-center' : 'overflow-x-auto'}`}>
              {dashboardFeatures.map((feature, idx) => (
                <TabsTrigger 
                  key={idx}
                  value={feature.title.toLowerCase().split(' ')[0]}
                  className={`${isMobile ? 'text-xs px-3 py-2 flex-grow-0' : 'flex-1 whitespace-nowrap px-6 py-3'} relative overflow-hidden font-semibold`}
                >
                  <span className="flex items-center gap-2">
                    {React.cloneElement(feature.icon, { className: 'h-4 w-4' })}
                    {isMobile ? feature.title.split(' ')[0] : feature.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {dashboardFeatures.map((feature, index) => (
              <TabsContent key={index} value={feature.title.toLowerCase().split(' ')[0]}>
                <Card className="border-seftec-slate/20 dark:border-white/10 animate-fade-up shadow-xl bg-white/90 backdrop-blur-sm dark:bg-seftec-darkNavy/90">
                  <CardContent className="p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                      <div className="lg:w-3/5">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-seftec-teal/10 to-seftec-purple/10 dark:from-seftec-teal/20 dark:to-seftec-purple/20">
                            {feature.icon}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-seftec-navy/80 dark:text-white/80 mb-6 text-lg sm:text-xl leading-relaxed">
                          {feature.description}
                        </p>
                        <p className="text-seftec-navy/70 dark:text-white/70 mb-8 text-base sm:text-lg leading-relaxed">
                          {feature.detail}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Button className="bg-gradient-teal-purple text-white hover:opacity-90 text-base sm:text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                Explore Features
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 sm:w-96 p-6">
                              <div className="space-y-3">
                                <h4 className="text-lg font-semibold text-seftec-navy dark:text-white">{feature.title}</h4>
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
                          
                          <Button variant="outline" className="text-base sm:text-lg px-8 py-3 rounded-xl border-2 border-seftec-navy/20 dark:border-white/20 hover:border-seftec-teal dark:hover:border-seftec-gold transition-all duration-300">
                            Learn More
                          </Button>
                        </div>
                      </div>
                      
                      <div className="lg:w-2/5 bg-gradient-to-br from-seftec-slate/30 via-white/50 to-seftec-slate/30 dark:from-seftec-navy/50 dark:via-seftec-charcoal/50 dark:to-seftec-navy/50 rounded-2xl p-8 sm:p-10 h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center mt-6 lg:mt-0 shadow-inner backdrop-blur-sm">
                        <div className="text-center space-y-6">
                          <div className="mb-6 flex justify-center">
                            <div className="p-6 rounded-2xl bg-white/80 dark:bg-seftec-darkNavy/80 shadow-lg backdrop-blur-sm">
                              {React.cloneElement(feature.icon, { className: 'h-12 w-12' })}
                            </div>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-bold text-seftec-navy dark:text-white mb-4">
                            Interactive Demo
                          </h4>
                          <p className="text-seftec-navy/70 dark:text-white/70 text-base sm:text-lg leading-relaxed">
                            Experience our {feature.title.toLowerCase()} in action with live demonstrations and interactive previews coming soon.
                          </p>
                          <div className="flex justify-center">
                            <div className="px-4 py-2 bg-seftec-teal/20 dark:bg-seftec-gold/20 rounded-full text-sm font-medium text-seftec-teal dark:text-seftec-gold">
                              Coming Soon
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsDashboard;
