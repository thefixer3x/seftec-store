
import React from 'react';
import { Calendar, Target, Rocket, Globe, Brain, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const StrategicRoadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "in-progress",
      progress: 75,
      title: "AI-Powered Risk Assessment",
      description: "Advanced machine learning models for real-time transaction risk analysis",
      deliverables: [
        "ML-based fraud detection system",
        "Predictive analytics for market volatility",
        "Automated compliance scoring"
      ],
      icon: Brain
    },
    {
      quarter: "Q2 2025",
      status: "planned",
      progress: 25,
      title: "Multi-Chain Interoperability",
      description: "Seamless cross-chain transactions and liquidity management",
      deliverables: [
        "Ethereum, Polygon, and Arbitrum support",
        "Cross-chain bridge integration",
        "Unified liquidity pools"
      ],
      icon: Globe
    },
    {
      quarter: "Q3 2025",
      status: "planned",
      progress: 10,
      title: "Central Bank Digital Currency (CBDC) Integration",
      description: "First-to-market enterprise CBDC trading and settlement platform",
      deliverables: [
        "Digital Euro pilot program",
        "Digital Yuan integration",
        "CBDC-to-crypto swap mechanisms"
      ],
      icon: Shield
    },
    {
      quarter: "Q4 2025",
      status: "planned",
      progress: 0,
      title: "Global Expansion Initiative",
      description: "Scale operations to 20 new markets with regulatory partnerships",
      deliverables: [
        "APAC market entry (Singapore, Japan)",
        "LATAM partnerships (Brazil, Mexico)",
        "Regulatory sandbox participation"
      ],
      icon: Rocket
    }
  ];

  const partnerships = [
    {
      type: "Technology Partners",
      organizations: ["Microsoft Azure", "AWS", "Chainlink", "Consensys"],
      focus: "Infrastructure and oracle services"
    },
    {
      type: "Financial Institutions",
      organizations: ["JPMorgan Chase", "HSBC", "Deutsche Bank", "Standard Chartered"],
      focus: "Traditional banking integration"
    },
    {
      type: "Regulatory Bodies",
      organizations: ["Bank of England", "ECB", "MAS Singapore", "JFSA"],
      focus: "Compliance and regulatory frameworks"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'planned': return 'bg-gray-400';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress': return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'planned': return <Badge variant="secondary">Planned</Badge>;
      default: return <Badge variant="outline">Future</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Roadmap Timeline */}
      <div>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6 text-center">
          Product Development Roadmap
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(item.status)} flex items-center justify-center`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">{item.quarter}</span>
                      </div>
                      <CardTitle className="text-lg mt-1">{item.title}</CardTitle>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-seftec-navy dark:text-white">
                    Key Deliverables:
                  </h4>
                  <ul className="space-y-1">
                    {item.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <Target className="h-3 w-3 mr-2 text-seftec-gold dark:text-seftec-teal" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategic Partnerships */}
      <div>
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-6 text-center">
          Strategic Partnerships & Expansion
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerships.map((partnership, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{partnership.type}</CardTitle>
                <CardDescription>{partnership.focus}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {partnership.organizations.map((org, idx) => (
                    <div key={idx} className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {org}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Future Vision */}
      <Card className="bg-gradient-to-r from-seftec-navy to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-center">2025-2026 Vision</CardTitle>
          <CardDescription className="text-center text-blue-100">
            Positioning SEFTEC as the global leader in enterprise DeFi infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-bold text-2xl text-seftec-gold">$50B+</h4>
              <p className="text-sm text-blue-100">Annual Transaction Volume Target</p>
            </div>
            <div>
              <h4 className="font-bold text-2xl text-seftec-gold">100+</h4>
              <p className="text-sm text-blue-100">Enterprise Clients Globally</p>
            </div>
            <div>
              <h4 className="font-bold text-2xl text-seftec-gold">25</h4>
              <p className="text-sm text-blue-100">Supported Countries & Currencies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
