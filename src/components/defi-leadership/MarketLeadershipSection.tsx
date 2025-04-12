
import React from 'react';
import { BarChart3, Award, TrendingUp, Building, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';

const MarketLeadershipSection = () => {
  return (
    <section id="market-leadership" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Market Leadership Position"
          subtitle="Setting the standard for enterprise DeFi adoption and innovation"
          label="Industry Recognition"
          align="center"
          className="mb-16"
          labelClassName="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up">
            <div className="h-2 bg-blue-600 dark:bg-blue-500"></div>
            <CardContent className="p-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-blue-900 dark:text-blue-300">$2.5B+</h3>
              <p className="text-gray-600 dark:text-gray-300">Monthly transaction volume processed through our secure enterprise platform</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-100">
            <div className="h-2 bg-indigo-600 dark:bg-indigo-500"></div>
            <CardContent className="p-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-indigo-300">150+</h3>
              <p className="text-gray-600 dark:text-gray-300">Enterprise clients across financial services, supply chain, and healthcare</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-200">
            <div className="h-2 bg-purple-600 dark:bg-purple-500"></div>
            <CardContent className="p-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-900 dark:text-purple-300">Industry Recognition</h3>
              <p className="text-gray-600 dark:text-gray-300">Named Leader in the Forrester Wave™: Enterprise Blockchain Solutions</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-300">
            <div className="h-2 bg-cyan-600 dark:bg-cyan-500"></div>
            <CardContent className="p-6">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-cyan-900 dark:text-cyan-300">94% YoY</h3>
              <p className="text-gray-600 dark:text-gray-300">Growth in enterprise DeFi adoption through our platform</p>
            </CardContent>
          </Card>
        </div>
        
        <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Success Stories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500"></div>
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-300">Global Bank Integration</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A top 10 global bank implemented Seftec's DeFi access platform to modernize their cross-border payment infrastructure.
              </p>
              
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
                <div className="grid grid-cols-2 divide-x divide-blue-200 dark:divide-blue-800">
                  <div className="p-4">
                    <p className="font-bold text-red-600 dark:text-red-400 mb-3">Before</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>T+2 settlement times</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>High operational costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>Limited visibility</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-green-600 dark:text-green-400 mb-3">After</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>15-minute settlements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>73% cost reduction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>Real-time compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl animate-fade-up animate-delay-100">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500"></div>
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-4 text-purple-900 dark:text-purple-300">Supply Chain Finance Revolution</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A Fortune 500 manufacturer established a blockchain-based supply chain finance program using Seftec's platform.
              </p>
              
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
                <div className="grid grid-cols-2 divide-x divide-purple-200 dark:divide-purple-800">
                  <div className="p-4">
                    <p className="font-bold text-red-600 dark:text-red-400 mb-3">Before</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>45-60 day payment terms</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>Limited financing options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">●</span>
                        <span>Complex onboarding</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-green-600 dark:text-green-400 mb-3">After</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>On-demand liquidity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>64% reduction in costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">●</span>
                        <span>Digital onboarding in 2 days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketLeadershipSection;
