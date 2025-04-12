
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Code, Route } from 'lucide-react';

interface DefiTabsProps {
  children: ReactNode;
}

export const DefiTabs = ({ children }: DefiTabsProps) => {
  const tabItems = [
    { id: 'market-leadership', label: 'Market Leadership', icon: TrendingUp },
    { id: 'technical-solution', label: 'Technical Solution', icon: Code },
    { id: 'strategic-roadmap', label: 'Strategic Roadmap', icon: Route },
  ];

  return (
    <Tabs defaultValue="market-leadership" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
        {tabItems.map((item) => (
          <TabsTrigger 
            key={item.id} 
            value={item.id}
            className="flex items-center justify-center py-3"
          >
            <item.icon className="w-4 h-4 mr-2" />
            <span>{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="market-leadership">
        <div className="animate-fade-in">{React.Children.toArray(children)[0]}</div>
      </TabsContent>
      
      <TabsContent value="technical-solution">
        <div className="animate-fade-in">{React.Children.toArray(children)[1]}</div>
      </TabsContent>
      
      <TabsContent value="strategic-roadmap">
        <div className="animate-fade-in">{React.Children.toArray(children)[2]}</div>
      </TabsContent>
    </Tabs>
  );
};
