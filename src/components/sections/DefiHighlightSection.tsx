
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ExternalLink, Shield, Wallet, Building } from 'lucide-react';

const DefiHighlightSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-seftec-navy/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-seftec-teal/10 text-seftec-teal dark:bg-seftec-teal/20 border-0 rounded-full px-3 py-1">
            DeFi Leadership
          </Badge>
          <h2 className="text-3xl font-bold text-seftec-navy dark:text-white mb-3">
            Enterprise-Grade DeFi Solutions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Seftec is pioneering the integration of DeFi technologies with traditional enterprise systems through ISO 20022-compliant infrastructure.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="border-t-4 border-t-seftec-teal">
            <CardContent className="p-6">
              <div className="mb-4">
                <Shield className="h-10 w-10 text-seftec-teal" />
              </div>
              <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                ISO 20022 Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our platform fully implements ISO 20022 messaging standards, enabling seamless integration between traditional banking systems and decentralized finance protocols.
              </p>
              <Link to="/defi-leadership" className="inline-flex items-center text-seftec-teal hover:text-seftec-teal/80 font-medium">
                Learn more about compliance
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-seftec-purple">
            <CardContent className="p-6">
              <div className="mb-4">
                <Wallet className="h-10 w-10 text-seftec-purple" />
              </div>
              <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                Financial Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Complete financial infrastructure with marketplace payments, subscription billing, and virtual cards powered by Stripe for seamless transactions.
              </p>
              <Link to="/profile/finance" className="inline-flex items-center text-seftec-purple hover:text-seftec-purple/80 font-medium">
                Explore financial services
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-amber-500">
            <CardContent className="p-6">
              <div className="mb-4">
                <Building className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                Enterprise Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Purpose-built for institutions, our platform offers treasury management, cross-border settlement, and regulatory compliance with enterprise-grade security.
              </p>
              <Link to="/defi-leadership" className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium">
                View case studies
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-seftec-navy to-seftec-teal text-white hover:opacity-90"
          >
            <Link to="/defi-leadership">
              Explore Our DeFi Leadership
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
