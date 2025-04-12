
import React from 'react';
import { BarChart3, Award, Trending, Building } from 'lucide-react';

const MarketLeadershipSection = () => {
  return (
    <section id="market-leadership" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Market Leadership Position
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Setting the standard for enterprise DeFi adoption and innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">$2.5B+</h3>
            <p className="text-gray-600 dark:text-gray-300">Monthly transaction volume processed through our platform</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Building className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">150+</h3>
            <p className="text-gray-600 dark:text-gray-300">Enterprise clients across financial services, supply chain, and healthcare</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Award className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Industry Recognition</h3>
            <p className="text-gray-600 dark:text-gray-300">Named Leader in the Forrester Wave™: Enterprise Blockchain Solutions</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Trending className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">94% YoY</h3>
            <p className="text-gray-600 dark:text-gray-300">Growth in enterprise DeFi adoption through our platform</p>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Case Studies</h3>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h4 className="text-xl font-semibold mb-2">Global Bank Integration</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A top 10 global bank implemented Seftec's DeFi access platform to modernize their cross-border payment infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-green-600">Before</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>T+2 settlement times</li>
                    <li>High operational costs</li>
                    <li>Limited visibility</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-blue-600">After</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>15-minute settlements</li>
                    <li>73% cost reduction</li>
                    <li>Real-time tracking and compliance</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h4 className="text-xl font-semibold mb-2">Supply Chain Finance Revolution</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Fortune 500 manufacturer established a blockchain-based supply chain finance program using Seftec's platform.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-green-600">Before</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>45-60 day payment terms</li>
                    <li>Limited financing options</li>
                    <li>Complex onboarding</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-blue-600">After</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>On-demand liquidity</li>
                    <li>64% reduction in financing costs</li>
                    <li>Digital onboarding in <2 days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketLeadershipSection;
