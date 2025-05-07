
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Shield, CircleDollarSign, Banknote } from 'lucide-react';
import DefiHero from '@/components/defi-leadership/DefiHero';
import DefiTabs from '@/components/defi-leadership/DefiTabs';
import DefiLeadershipContent from '@/components/defi-leadership/DefiLeadershipContent';

// This page will showcase Seftec's DeFi Leadership position
const DefiLeadership = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy">
      {/* Hero Section */}
      <DefiHero />
      
      {/* Main Content Area with Tabs */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <DefiTabs />
        <DefiLeadershipContent />
      </section>
      
      {/* Financial Solutions Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-seftec-navy/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-seftec-teal/10 text-seftec-teal dark:bg-seftec-teal/20 border-0 rounded-full px-3 py-1">
              Financial Integration
            </Badge>
            <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-3">
              Complete Financial Solution
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Seftec provides a comprehensive financial infrastructure powered by Stripe, offering marketplace payments, subscription billing, and virtual card solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <Card className="border-t-4 border-t-amber-500">
              <CardHeader>
                <div className="mb-2">
                  <CircleDollarSign className="h-10 w-10 text-amber-500" />
                </div>
                <CardTitle>Marketplace Payments</CardTitle>
                <CardDescription>
                  Secure platform for buyers and sellers with automatic fee processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-amber-500 mr-2" />
                    Stripe Connect integration
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-amber-500 mr-2" />
                    Express onboarding
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-amber-500 mr-2" />
                    Automated split payments
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="mb-2">
                  <Banknote className="h-10 w-10 text-blue-500" />
                </div>
                <CardTitle>Subscription Billing</CardTitle>
                <CardDescription>
                  Flexible subscription plans with trial and premium options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
                    Free 15-day trial
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
                    Multiple tier options
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
                    Plan management portal
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <div className="mb-2">
                  <Shield className="h-10 w-10 text-green-500" />
                </div>
                <CardTitle>Virtual Cards</CardTitle>
                <CardDescription>
                  Secure payment cards for premium subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                    Instant issuance
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                    Lock/unlock functionality
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                    Transaction monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-gradient-to-r from-seftec-teal to-seftec-purple text-white hover:opacity-90">
              Explore Financial Solutions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefiLeadership;
