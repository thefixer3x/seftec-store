
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe } from 'lucide-react';

const DefiHighlightSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-seftec-slate/30 to-white dark:from-seftec-darkNavy dark:via-seftec-navy/40 dark:to-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-seftec-gold/20 to-seftec-navy/20 border border-seftec-gold/30 dark:from-seftec-teal/20 dark:to-white/20 dark:border-seftec-teal/30">
              <Shield size={16} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
              <span className="text-seftec-navy/90 font-semibold text-sm dark:text-white/90">
                #1 Enterprise DeFi Platform
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-seftec-navy dark:text-white leading-tight">
              Leading the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-seftec-gold to-seftec-navy dark:from-seftec-teal dark:to-white">
                Enterprise DeFi
              </span>
            </h2>
            
            <p className="text-xl text-seftec-navy/80 dark:text-white/80 mb-8 leading-relaxed">
              seftec is revolutionizing how Fortune 500 companies access decentralized finance. 
              Our ISO 20022 compliant platform bridges traditional banking with blockchain innovation, 
              delivering enterprise-grade security and regulatory compliance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">250+ Global Enterprise Clients</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">$4.2B+ Monthly Transaction Volume</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">45+ Countries with Full Compliance</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">99.97% Platform Uptime SLA</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">ISO 27001 & SOC 2 Certified</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-seftec-gold dark:bg-seftec-teal mr-3"></div>
                  <span className="text-seftec-navy/80 dark:text-white/80 font-medium">Gartner Magic Quadrant Leader</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/defi-leadership">
                <Button className="group bg-gradient-to-r from-seftec-gold to-seftec-navy dark:from-seftec-teal dark:to-white text-white px-8 py-3 text-lg font-semibold">
                  Explore Our DeFi Leadership
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" className="border-seftec-navy dark:border-white text-seftec-navy dark:text-white px-8 py-3 text-lg font-semibold hover:bg-seftec-navy hover:text-white dark:hover:bg-white dark:hover:text-seftec-navy">
                Request Enterprise Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-seftec-slate to-white dark:from-seftec-navy/60 dark:to-seftec-navy/20 p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-seftec-navy/10 dark:border-white/10">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-seftec-navy/60 dark:text-white/60 font-semibold text-sm uppercase tracking-wide">Featured Innovation</span>
                  <div className="bg-seftec-gold/20 dark:bg-seftec-teal/20 px-3 py-1 rounded-full">
                    <span className="text-seftec-gold dark:text-seftec-teal font-semibold text-xs">INDUSTRY FIRST</span>
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-seftec-navy dark:text-white mb-2">ISO 20022 DeFi Bridge</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 text-sm">
                  The world's first ISO 20022 compliant bridge between traditional banking systems 
                  and DeFi protocols, enabling seamless institutional adoption.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-seftec-navy/60 p-6 rounded-xl shadow-sm border border-seftec-navy/5 dark:border-white/5">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
                    <span className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal">85%</span>
                  </div>
                  <div className="text-sm text-seftec-navy/70 dark:text-white/70">Cost Reduction</div>
                  <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">vs. traditional rails</div>
                </div>
                <div className="bg-white dark:bg-seftec-navy/60 p-6 rounded-xl shadow-sm border border-seftec-navy/5 dark:border-white/5">
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
                    <span className="text-2xl font-bold text-seftec-gold dark:text-seftec-teal">12min</span>
                  </div>
                  <div className="text-sm text-seftec-navy/70 dark:text-white/70">Settlement Time</div>
                  <div className="text-xs text-seftec-navy/50 dark:text-white/50 mt-1">from 3-5 days</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">Live in production: 15 major banks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">Regulatory approval: EU, US, APAC</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
                  <span className="text-sm text-seftec-navy/80 dark:text-white/80">Enterprise integrations: SAP, Oracle, Dynamics</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-seftec-navy/10 dark:border-white/10">
                <Link to="/defi-leadership">
                  <Button variant="outline" size="sm" className="w-full group">
                    <span>View Technical Architecture</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-seftec-gold/20 to-seftec-navy/20 dark:from-seftec-teal/20 dark:to-white/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-seftec-navy/10 to-seftec-gold/10 dark:from-white/10 dark:to-seftec-teal/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiHighlightSection;
