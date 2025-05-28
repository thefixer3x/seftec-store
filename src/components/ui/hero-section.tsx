
import React from 'react';
import { ArrowRight, Play, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-seftec-slate via-white to-blue-50 dark:from-seftec-darkNavy dark:via-seftec-darkNavy dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seftec-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-seftec-teal/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-seftec-gold/5 to-seftec-teal/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-seftec-navy dark:text-white mb-6 leading-tight">
            Transform Your Business
            <span className="block bg-gradient-to-r from-seftec-gold to-orange-500 dark:from-seftec-teal dark:to-blue-400 bg-clip-text text-transparent">
              with SEFTEC
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-seftec-navy/70 dark:text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering businesses with innovative marketplace solutions, secure payments, 
            and cutting-edge technology for sustainable growth and success.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-seftec-gold dark:text-seftec-teal" />
              <span className="text-sm font-medium text-seftec-navy dark:text-white">
                Business Growth Solutions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-seftec-gold dark:text-seftec-teal" />
              <span className="text-sm font-medium text-seftec-navy dark:text-white">
                Global Marketplace
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-seftec-gold dark:text-seftec-teal" />
              <span className="text-sm font-medium text-seftec-navy dark:text-white">
                Secure Platform
              </span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/solutions">
              <Button 
                size="lg" 
                className="bg-seftec-navy hover:bg-seftec-navy/90 text-white dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 dark:text-seftec-darkNavy font-semibold px-8 py-3 text-lg"
              >
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white dark:border-seftec-teal dark:text-seftec-teal dark:hover:bg-seftec-teal dark:hover:text-seftec-darkNavy px-8 py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-seftec-navy/60 dark:text-white/60 mb-4">
              Trusted by businesses worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-seftec-navy/20 dark:bg-white/20 rounded"></div>
              <div className="h-8 w-20 bg-seftec-navy/20 dark:bg-white/20 rounded"></div>
              <div className="h-8 w-28 bg-seftec-navy/20 dark:bg-white/20 rounded"></div>
              <div className="h-8 w-22 bg-seftec-navy/20 dark:bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-seftec-navy/30 dark:border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-seftec-gold dark:bg-seftec-teal rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
