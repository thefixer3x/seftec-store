
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building, CheckCircle2, Globe, Shield } from "lucide-react";
import { Link } from 'react-router-dom';

const DefiHighlightSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-seftec-darkNavy dark:to-seftec-navy/90">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="bg-seftec-teal/10 text-seftec-teal border-seftec-teal/30">
                DeFi Leadership
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-400/30">
                ISO 20022 Compliant
              </Badge>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white">
              Enterprise DeFi Solutions <span className="text-seftec-teal">Reimagined</span>
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Seftec is leading the charge in enterprise-grade decentralized finance, providing secure, 
              compliant solutions that bridge traditional banking with blockchain technology for global 
              businesses.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white">ISO 20022 Framework</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Seamless integration with global financial systems</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white">Enterprise Security</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Multi-layer protection for institutional assets</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white">Global Settlements</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time cross-border payment solutions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-seftec-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-seftec-navy dark:text-white">Institutional Grade</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Built for enterprise compliance requirements</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button asChild className="bg-seftec-teal hover:bg-seftec-teal/90 text-white">
                <Link to="/defi-leadership">
                  Learn More About Our DeFi Leadership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <Card className="bg-white dark:bg-seftec-navy/50 backdrop-blur-sm border-gray-100 dark:border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-semibold text-seftec-navy dark:text-white">Monthly Transaction Volume</h3>
                      <p className="text-2xl font-bold text-seftec-teal mt-1">$2.8B+</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <TrendingUpIcon />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-semibold text-seftec-navy dark:text-white">Enterprise Clients</h3>
                      <p className="text-2xl font-bold text-seftec-teal mt-1">150+</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <BuildingIcon />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-seftec-navy dark:text-white">Countries Supported</h3>
                      <p className="text-2xl font-bold text-seftec-teal mt-1">35+</p>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <GlobeIcon />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom icons to ensure we don't have any issues with the Lucide imports
const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" x2="22" y1="12" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default DefiHighlightSection;
