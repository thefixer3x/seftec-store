
import React from 'react';
import { ArrowRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DefiHighlightSection = () => {
  const highlights = [
    {
      icon: TrendingUp,
      metric: "$2.3B",
      label: "Transaction Volume",
      description: "Processed through our DeFi infrastructure"
    },
    {
      icon: Globe,
      metric: "45",
      label: "Countries Served",
      description: "Global enterprise DeFi reach"
    },
    {
      icon: Shield,
      metric: "500+",
      label: "Enterprise Clients",
      description: "Fortune 500 companies trust our platform"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-seftec-navy via-blue-800 to-seftec-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-seftec-gold rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-seftec-teal rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-seftec-gold/20 text-seftec-gold border-seftec-gold/30">
            DeFi Innovation Leader
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Leading Enterprise DeFi Revolution
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            ISO 20022 compliant platform bridging traditional banking with blockchain innovation. 
            Trusted by Fortune 500 companies worldwide.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <highlight.icon className="h-8 w-8 text-seftec-gold mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">
                  {highlight.metric}
                </h3>
                <p className="text-sm font-medium text-blue-100 mb-2">
                  {highlight.label}
                </p>
                <p className="text-xs text-blue-200">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/defi-leadership">
              <Button 
                size="lg" 
                className="bg-seftec-gold hover:bg-seftec-gold/90 text-seftec-navy font-semibold"
              >
                Explore Our DeFi Leadership
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Enterprise Solutions
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-blue-200 mt-4">
            Join 500+ enterprises already using our DeFi infrastructure
          </p>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
