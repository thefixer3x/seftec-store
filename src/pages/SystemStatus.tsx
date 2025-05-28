
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { SecurityPolicies } from '@/components/security/SecurityPolicies';
import { PerformanceMetrics } from '@/components/performance/PerformanceMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SystemStatus = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-seftec-navy dark:text-white mb-4">
            System Status & Security
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights into our platform's performance, security measures, 
            and operational excellence that powers enterprise DeFi.
          </p>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="security">Security Framework</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-8">
            <PerformanceMetrics />
          </TabsContent>
          
          <TabsContent value="security" className="mt-8">
            <SecurityPolicies />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SystemStatus;
