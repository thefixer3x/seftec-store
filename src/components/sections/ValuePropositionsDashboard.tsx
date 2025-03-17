
import React from 'react';
import { LayoutDashboard, LineChart, FileText, MousePointer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

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
  }
];

const ValuePropositionsDashboard = () => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-4">
            Powerful Tools for Modern Businesses
          </h2>
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-3xl mx-auto">
            Our platform provides you with cutting-edge tools to monitor, analyze, and grow your business effectively.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-12">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="interface">Interface</TabsTrigger>
            </TabsList>
            
            {dashboardFeatures.map((feature, index) => (
              <TabsContent key={index} value={feature.title.toLowerCase().split(' ')[0]}>
                <Card className="border-seftec-slate dark:border-white/10 animate-fade-up">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                          {feature.icon}
                          <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
                          {feature.description}
                        </p>
                        <p className="text-seftec-navy/80 dark:text-white/80 mb-8">
                          {feature.detail}
                        </p>
                        
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button className="bg-gradient-teal-purple text-white hover:opacity-90">
                              Learn More
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <div>
                                <h4 className="text-sm font-semibold">{feature.title}</h4>
                                <p className="text-sm">
                                  Hover to explore more about our {feature.title.toLowerCase()} features.
                                </p>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      
                      <div className="md:w-1/2 bg-seftec-slate/50 dark:bg-seftec-navy/50 rounded-lg p-6 h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="mb-4 flex justify-center">{feature.icon}</div>
                          <p className="text-seftec-navy/70 dark:text-white/70">
                            Interactive demonstration coming soon
                          </p>
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
