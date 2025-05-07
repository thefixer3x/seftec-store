
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, GitMerge, HexagonIcon, Star, UserPlus } from 'lucide-react';

const StrategicRoadmapSection = () => {
  const milestones = [
    {
      quarter: 'Q3 2023',
      title: 'ISO 20022 Compliance Framework',
      description: 'Completed full implementation of ISO 20022 message standards across all platform components',
      status: 'completed'
    },
    {
      quarter: 'Q4 2023',
      title: 'Enterprise Connect Gateway',
      description: 'Launched secure API gateway for enterprise systems to interact with DeFi protocols',
      status: 'completed'
    },
    {
      quarter: 'Q1 2024',
      title: 'Multi-Chain Support Expansion',
      description: 'Added support for Polkadot, Algorand and Layer 2 networks',
      status: 'in-progress'
    },
    {
      quarter: 'Q2 2024',
      title: 'Automated Compliance Suite',
      description: 'Advanced compliance tools with real-time monitoring and reporting capabilities',
      status: 'upcoming'
    },
    {
      quarter: 'Q3 2024',
      title: 'Treasury Optimization Tools',
      description: 'Intelligent yield strategy tools for enterprise treasury management',
      status: 'upcoming'
    },
    {
      quarter: 'Q4 2024',
      title: 'Global Financial Institution Integration',
      description: 'Direct integration with major global banks and financial networks',
      status: 'planned'
    }
  ];

  const partnerships = [
    {
      name: 'MakerDAO',
      type: 'Protocol Integration',
      description: 'Integration with DAI stablecoin for enterprise treasury operations',
      timeline: 'Q2 2024'
    },
    {
      name: 'Polygon',
      type: 'Technology Partner',
      description: 'Enhanced scalability and reduced transaction costs for enterprise users',
      timeline: 'Q3 2024'
    },
    {
      name: 'Global Banking Consortium',
      type: 'Industry Partner',
      description: 'Joint development of DeFi integration standards for banks',
      timeline: 'Q3-Q4 2024'
    }
  ];

  const capabilities = [
    {
      title: 'Advanced Tokenization Framework',
      description: 'Enables enterprises to tokenize real-world assets and financial instruments',
      timeline: 'Q2 2024'
    },
    {
      title: 'Enterprise Liquidity Pools',
      description: 'Private liquidity solutions for institutions with enhanced security and transparency',
      timeline: 'Q3 2024'
    },
    {
      title: 'Cross-Chain Settlement Layer',
      description: 'Seamless asset transfers between different blockchain networks with atomic guarantees',
      timeline: 'Q4 2024'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30';
      case 'upcoming':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30';
      case 'planned':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Product Roadmap */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Product Development Roadmap</h2>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[15px] md:left-[19px] w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-10 md:pl-12">
                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-500' : 
                  milestone.status === 'in-progress' ? 'bg-blue-500' :
                  'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {milestone.status === 'completed' ? (
                    <HexagonIcon className="h-4 w-4 text-white" />
                  ) : milestone.status === 'in-progress' ? (
                    <Clock className="h-4 w-4 text-white" />
                  ) : (
                    <HexagonIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <Badge variant="outline" className={`mr-2 ${getStatusColor(milestone.status)}`}>
                      {milestone.quarter}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(milestone.status)}>
                      {milestone.status === 'completed' ? 'Completed' : 
                       milestone.status === 'in-progress' ? 'In Progress' : 
                       milestone.status === 'upcoming' ? 'Upcoming' : 'Planned'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-seftec-navy dark:text-white mb-1">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Strategic Partnerships</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {partnerships.map((partner, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <UserPlus className="h-5 w-5 text-seftec-teal mr-2" />
                  <Badge variant="secondary">{partner.type}</Badge>
                </div>
                <h3 className="text-lg font-medium text-seftec-navy dark:text-white mb-2">{partner.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{partner.description}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  <span>Target: {partner.timeline}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Future Capabilities */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Upcoming DeFi Capabilities</h2>
        <div className="space-y-6">
          {capabilities.map((capability, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md">
              <div className="h-1 bg-gradient-to-r from-seftec-teal to-seftec-purple"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-seftec-navy dark:text-white">{capability.title}</h3>
                  <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-400">
                    {capability.timeline}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits for Enterprise */}
      <section>
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Enterprise Benefits</h2>
        <div className="bg-gradient-to-br from-seftec-navy/10 to-seftec-teal/5 dark:from-seftec-navy/30 dark:to-seftec-teal/20 rounded-lg p-6">
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {[
              'Reduced settlement times from days to minutes',
              'Up to 90% reduction in cross-border transaction costs',
              'Enhanced capital efficiency through DeFi yield strategies',
              'Full regulatory compliance with automated reporting',
              'Integration with existing banking and ERP systems',
              'Enterprise-grade security and risk management',
              'Access to global liquidity pools and markets',
              'Simplified treasury operations with enhanced visibility'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center">
                <Star className="h-4 w-4 text-seftec-gold mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <Button className="bg-seftec-navy hover:bg-seftec-navy/90 text-white dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
          <GitMerge className="h-4 w-4 mr-2" />
          Request Integration Roadmap
        </Button>
      </div>
    </div>
  );
};

export default StrategicRoadmapSection;
