
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Milestone, RoadmapEvent } from '@/types';
import { CalendarClock, Cpu, Network, Handshake } from 'lucide-react';

interface StrategicRoadmapSectionProps {
  isActive: boolean;
}

export const StrategicRoadmapSection: React.FC<StrategicRoadmapSectionProps> = ({ isActive }) => {
  const milestones: Milestone[] = [
    {
      quarter: "Q2 2024",
      title: "ISO 20022 Full Compliance",
      description: "Complete implementation of all ISO 20022 messaging standards for cross-border transactions",
      status: "current"
    },
    {
      quarter: "Q3 2024",
      title: "Enterprise DeFi Dashboard 2.0",
      description: "Enhanced analytics and reporting with AI-powered insights for treasury management",
      status: "upcoming"
    },
    {
      quarter: "Q4 2024",
      title: "Multi-Chain Settlement Layer",
      description: "Support for 5+ major blockchain networks with atomic swap capabilities",
      status: "planned"
    },
    {
      quarter: "Q1 2025",
      title: "Global Banking Network Expansion",
      description: "Direct integration with 100+ banking partners across 40 countries",
      status: "planned"
    },
    {
      quarter: "Q2 2025",
      title: "Tokenized Asset Framework",
      description: "Platform for enterprise-grade tokenization of traditional financial assets",
      status: "planned"
    }
  ];

  const partnerships: RoadmapEvent[] = [
    {
      title: "Central Bank Digital Currency Pilot",
      description: "Participating in CBDC trials with two G20 central banks",
      timeline: "Starting Q3 2024"
    },
    {
      title: "Global Banking Consortium",
      description: "Strategic partnership with international banking alliance for cross-border settlements",
      timeline: "Q4 2024"
    },
    {
      title: "Enterprise Blockchain Coalition",
      description: "Founding member of industry standards group for enterprise DeFi protocols",
      timeline: "Ongoing"
    }
  ];

  const upcomingOfferings: RoadmapEvent[] = [
    {
      title: "Tokenized Trade Finance",
      description: "Blockchain-based letters of credit and supply chain financing with instant verification",
      timeline: "Q3 2024"
    },
    {
      title: "Cross-Border Treasury Suite",
      description: "Integrated solution for managing international cash positions with real-time FX optimization",
      timeline: "Q4 2024"
    },
    {
      title: "Compliance-as-a-Service API",
      description: "Embeddable compliance checks for KYC/AML with global regulatory coverage",
      timeline: "Q1 2025"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'current': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700';
      case 'planned': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-10 animate-fade-in" style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* Product Roadmap */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Product Development Roadmap</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`border-l-4 pl-4 py-3 ${milestone.status === 'current' ? 'border-green-500' : milestone.status === 'upcoming' ? 'border-blue-500' : 'border-purple-500'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="text-lg font-semibold text-seftec-navy dark:text-white">{milestone.title}</h4>
                <div className="flex items-center mt-1 sm:mt-0">
                  <span className="text-gray-600 dark:text-gray-400 mr-3">{milestone.quarter}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(milestone.status)}`}>
                    {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Strategic Partnerships</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerships.map((partnership, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Handshake className="h-5 w-5 text-seftec-teal mt-1" />
                  <CardTitle className="text-lg">{partnership.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{partnership.description}</p>
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{partnership.timeline}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Upcoming Offerings */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Upcoming DeFi Offerings</h3>
        <div className="space-y-6">
          {upcomingOfferings.map((offering, index) => (
            <div key={index} className="flex gap-4">
              <div className="bg-gradient-to-br from-seftec-teal to-seftec-purple p-3 rounded-lg text-white flex-shrink-0 self-start">
                {index === 0 ? (
                  <Network className="h-6 w-6" />
                ) : index === 1 ? (
                  <Cpu className="h-6 w-6" />
                ) : (
                  <Shield className="h-6 w-6" />
                )}
              </div>
              <div>
                <h4 className="text-lg font-medium text-seftec-navy dark:text-white mb-2">{offering.title}</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{offering.description}</p>
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{offering.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Benefits for Enterprise Clients */}
      <section>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6">Benefits for Enterprise Clients</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">1</span>
                  Operational Efficiency
                </h4>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  Reduce settlement times from days to minutes and eliminate manual reconciliation 
                  processes through smart contract automation.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">2</span>
                  Cost Reduction
                </h4>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  Lower transaction fees by up to 90% compared to traditional correspondent banking 
                  networks, with optimized FX rates for cross-border transactions.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400">3</span>
                  Regulatory Compliance
                </h4>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  Automated compliance checks and reporting reduce regulatory risks while maintaining 
                  full audit trails for all transactions.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400">4</span>
                  Business Agility
                </h4>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  Launch new financial products and enter new markets faster with modular, API-first 
                  architecture that supports rapid innovation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
