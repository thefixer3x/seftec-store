import React from 'react';
import { ArrowRight, Play, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';




const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-seftec-slate via-white to-blue-50 dark:from-seftec-darkNavy dark:via-seftec-darkNavy dark:to-blue-900 overflow-hidden">
      {/* Background Elements - Reduced blur and animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-seftec-gold/10 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-seftec-teal/10 rounded-full filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-seftec-gold/5 to-seftec-teal/5 rounded-full filter blur-xl"></div>
      </div>




      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Badge Indicators - Improved responsiveness */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 sm:mb-8">
            <Badge className="bg-white/90 text-seftec-navy border-seftec-navy/20 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm text-xs sm:text-sm">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              The Future of Secure B2B Trade
            </Badge>
            <Badge className="bg-seftec-gold/10 text-seftec-navy dark:text-seftec-gold border-seftec-gold/30 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              ISO 20022 Compliant DeFi
            </Badge>
          </div>




          {/* Handwritten Style Tagline - Fixed font size */}
          <div className="mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl md:text-5xl font-handwritten text-seftec-gold dark:text-seftec-teal font-bold">
              Grow Smarter, Together
            </span>
          </div>




          {/* Main Headline - Improved line breaks */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-seftec-navy dark:text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
            Revolutionizing Global Trade
            <span className="block bg-gradient-to-r from-seftec-gold to-orange-500 dark:from-seftec-teal dark:to-blue-400 bg-clip-text text-transparent">
              with a Trusted AI-Powered
            </span>
            <span className="block text-seftec-navy dark:text-white">
              Marketplace
            </span>
          </h1>




          {/* Subtitle - Improved spacing */}
          <p className="text-lg sm:text-xl text-seftec-navy/70 dark:text-white/70 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Trade with Trust, Pay with Confidence. Connect with verified 
            businesses worldwide, transact securely, and access 
            financing solutions all in one platform.
          </p>




          {/* Call to Action Buttons - Fixed button sizes */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
            <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 text-white dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 dark:text-seftec-darkNavy font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base shimmer">
              Get Started
            </Button>
            
            <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white dark:border-seftec-teal dark:text-seftec-teal dark:hover:bg-seftec-teal dark:hover:text-seftec-darkNavy px-6 sm:px-8 py-2 sm:py-3 text-base shimmer">
              Book a Demo
            </Button>
          </div>




          {/* Bottom Section - Improved spacing */}
          <div className="bg-white/80 dark:bg-seftec-darkNavy/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-seftec-gold/20 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-seftec-gold rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-seftec-navy dark:text-white text-sm sm:text-base">
                    Enterprise DeFi Leadership
                  </h3>
                  <p className="text-xs sm:text-sm text-seftec-navy/70 dark:text-white/70">
                    Pioneering decentralized finance solutions with ISO 20022 compliance
                  </p>
                </div>
              </div>
              <Link to="/defi-leadership">
                <Button variant="ghost" size="sm" className="text-seftec-navy dark:text-seftec-teal shimmer mt-2 sm:mt-0">
                  Explore Our Vision
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>




      {/* Scroll Indicator - Reduced animation intensity */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow hidden sm:block">
        <div className="w-6 h-10 border-2 border-seftec-navy/30 dark:border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-seftec-gold dark:bg-seftec-teal rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};




export default HeroSection;