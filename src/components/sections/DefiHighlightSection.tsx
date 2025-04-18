
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Zap } from 'lucide-react';

const DefiHighlightSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-seftec-darkNavy dark:to-seftec-navy/90">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 border border-seftec-gold/20 dark:border-seftec-teal/20 mb-6">
            <Shield className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
            <span className="text-sm font-medium text-seftec-navy dark:text-white">ISO 20022 Compliant</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-seftec-navy dark:text-white">
            Leading the Enterprise DeFi Revolution
          </h2>
          
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 mb-8">
            Bridging traditional finance and blockchain innovation with secure, compliant DeFi solutions for enterprise.
          </p>
          
          <Link to="/defi-leadership">
            <Button 
              variant="default" 
              className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-gradient-to-r dark:from-seftec-teal dark:to-seftec-purple text-white"
            >
              Explore Our DeFi Leadership <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-white/5 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="w-12 h-12 bg-seftec-gold/10 dark:bg-seftec-teal/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">Secure Infrastructure</h3>
            <p className="text-seftec-navy/70 dark:text-white/70">
              Enterprise-grade security with industry-leading protocols and compliance standards.
            </p>
          </div>
          
          <div className="bg-white dark:bg-white/5 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="w-12 h-12 bg-seftec-gold/10 dark:bg-seftec-teal/10 rounded-full flex items-center justify-center mb-6">
              <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">Regulatory Compliance</h3>
            <p className="text-seftec-navy/70 dark:text-white/70">
              ISO 20022 standards integration ensuring interoperability with traditional banking systems.
            </p>
          </div>
          
          <div className="bg-white dark:bg-white/5 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="w-12 h-12 bg-seftec-gold/10 dark:bg-seftec-teal/10 rounded-full flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">Future-Ready Solutions</h3>
            <p className="text-seftec-navy/70 dark:text-white/70">
              Advanced blockchain capabilities with strategic roadmap for enterprise DeFi innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
