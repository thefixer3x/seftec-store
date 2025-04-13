
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, TrendingUp, Trophy, ChevronsUp, Shield, Lock } from 'lucide-react';

export const MarketLeadershipSection = () => {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-4">Market Leadership Position</h2>
        <p className="text-lg text-seftec-navy/70 dark:text-white/70 mb-8">
          Seftec has established itself as a trusted leader in the decentralized finance space, providing secure enterprise-grade solutions for businesses worldwide.
        </p>
      </div>
      
      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full w-fit mb-2">
              <Users className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <CardTitle className="text-2xl font-bold text-seftec-navy dark:text-white">12,400+</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-seftec-navy/70 dark:text-white/70">Enterprise Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full w-fit mb-2">
              <BarChart className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <CardTitle className="text-2xl font-bold text-seftec-navy dark:text-white">$1.2B+</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-seftec-navy/70 dark:text-white/70">Monthly Transaction Volume</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full w-fit mb-2">
              <TrendingUp className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <CardTitle className="text-2xl font-bold text-seftec-navy dark:text-white">43%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-seftec-navy/70 dark:text-white/70">YoY Growth Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-2 rounded-full w-fit mb-2">
              <Trophy className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <CardTitle className="text-2xl font-bold text-seftec-navy dark:text-white">14</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-seftec-navy/70 dark:text-white/70">Industry Awards</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Case Studies */}
      <div className="pt-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Enterprise Case Studies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white">Global Finance Corp</h4>
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full">Banking</div>
              </div>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Implemented our DeFi solution to streamline cross-border payments, reducing transaction time by 94% and costs by 65% while maintaining full regulatory compliance.
              </p>
              <div className="flex items-center text-seftec-gold dark:text-seftec-teal">
                <ChevronsUp className="h-5 w-5 mr-2" />
                <span className="font-medium">68% improvement in settlement efficiency</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-seftec-navy dark:text-white">Meridian Supply Chain</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium px-3 py-1 rounded-full">Logistics</div>
              </div>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Leveraged our platform to create a transparent supply chain financing system, enabling just-in-time inventory management and reducing working capital requirements by 38%.
              </p>
              <div className="flex items-center text-seftec-gold dark:text-seftec-teal">
                <ChevronsUp className="h-5 w-5 mr-2" />
                <span className="font-medium">$4.2M in annual cost savings</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Competitive Advantages */}
      <div className="pt-8">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Competitive Advantages</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">ISO 20022 Compliance</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Native support for global financial messaging standards, enabling seamless integration with existing banking infrastructure.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">Enterprise-Grade Security</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Military-level encryption and multi-layered security protocols that exceed regulatory requirements for financial institutions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 rounded-full w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
              </div>
              <h4 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">Innovative Token Economics</h4>
              <p className="text-seftec-navy/70 dark:text-white/70">
                Proprietary tokenization framework that enables businesses to create custom financial instruments while maintaining regulatory compliance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
