
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';

const DefiHighlightSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-seftec-gold/10 border border-seftec-gold/20 text-seftec-navy/90 font-medium text-sm dark:bg-seftec-teal/10 dark:border-seftec-teal/20 dark:text-white/90">
              <Shield size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
              Enterprise DeFi Leadership
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-seftec-navy dark:text-white">
              Pioneering Secure DeFi Access for Enterprises
            </h2>
            
            <p className="text-lg text-seftec-navy/80 dark:text-white/80 mb-6">
              seftec is at the forefront of decentralized finance innovation for enterprises, with ISO 20022 
              compliant solutions that bridge traditional banking with blockchain technology.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Institutional-grade security and compliance frameworks</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Seamless integration with existing enterprise systems</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-2"></div>
                <span className="text-seftec-navy/80 dark:text-white/80">Global regulatory compliance across multiple jurisdictions</span>
              </li>
            </ul>
            
            <Link to="/defi-leadership">
              <Button className="group">
                Explore Our DeFi Leadership
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-seftec-slate dark:bg-seftec-navy/40 p-6 md:p-8 lg:p-10 rounded-lg shadow-sm">
            <div className="mb-6">
              <span className="text-seftec-navy/60 dark:text-white/60 font-medium text-sm">FEATURED</span>
              <h3 className="font-bold text-xl text-seftec-navy dark:text-white">ISO 20022 Compliance</h3>
            </div>
            
            <p className="text-seftec-navy/80 dark:text-white/80 mb-6">
              Our platform is fully compliant with ISO 20022 standards, providing a secure bridge between 
              traditional banking systems and DeFi protocols. This ensures seamless interoperability and 
              regulatory compliance for financial institutions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-seftec-navy/60 p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">30+</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Banking Partners</div>
              </div>
              <div className="bg-white dark:bg-seftec-navy/60 p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-seftec-gold dark:text-seftec-teal mb-1">$4.2B+</div>
                <div className="text-sm text-seftec-navy/70 dark:text-white/70">Transaction Volume</div>
              </div>
            </div>
            
            <Link to="/defi-leadership">
              <Button variant="outline" size="sm">
                View Technical Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
