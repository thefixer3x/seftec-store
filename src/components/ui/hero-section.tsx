import React from 'react';
import { ArrowRight, Play, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center bg-gradient-to-br from-seftec-slate via-white to-blue-50 dark:from-seftec-darkNavy dark:via-seftec-darkNavy dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seftec-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-seftec-teal/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-seftec-gold/5 to-seftec-teal/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Badge Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Badge className="bg-white/90 text-seftec-navy border-seftec-navy/20 px-4 py-2 backdrop-blur-sm">
              <Globe className="w-4 h-4 mr-2" />
              The Future of Secure B2B Trade & Vendor Payments
            </Badge>
            <Badge className="bg-seftec-gold/10 text-seftec-navy dark:text-seftec-gold border-seftec-gold/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              ISO 20022 Compliant DeFi Leadership
            </Badge>
          </div>

          {/* Handwritten Style Tagline */}
          <div className="mb-6">
            <span className="text-2xl font-handwritten text-seftec-gold dark:text-seftec-teal font-bold md:text-6xl">
              Grow Smarter, Together
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-seftec-navy dark:text-white mb-6 leading-tight">
            Revolutionizing Global
            <span className="block bg-gradient-to-r from-seftec-gold to-orange-500 dark:from-seftec-teal dark:to-blue-400 bg-clip-text text-transparent">
              Trade with a Trusted AI-
            </span>
            <span className="block text-seftec-navy dark:text-white">
              Powered Marketplace
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-seftec-navy/70 dark:text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trade with Trust, Pay with Confidence. Connect with verified 
            businesses worldwide, transact securely, and access 
            financing solutions all in one platform.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 text-white dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 dark:text-seftec-darkNavy font-semibold px-8 py-3 text-lg">
              Get Started
            </Button>
            
            <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white dark:border-seftec-teal dark:text-seftec-teal dark:hover:bg-seftec-teal dark:hover:text-seftec-darkNavy px-8 py-3 text-lg">
              Book a Demo
            </Button>
          </div>

          {/* Bottom Section with Enterprise DeFi Leadership */}
          <div className="bg-white/80 dark:bg-seftec-darkNavy/80 backdrop-blur-sm rounded-xl p-6 border border-seftec-gold/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-seftec-gold rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-seftec-navy dark:text-white">
                    Enterprise DeFi Leadership
                  </h3>
                  <p className="text-sm text-seftec-navy/70 dark:text-white/70">
                    Pioneering decentralized finance solutions with ISO 20022 compliance
                  </p>
                </div>
              </div>
              <Link to="/defi-leadership">
                <Button variant="ghost" size="sm" className="text-seftec-navy dark:text-seftec-teal">
                  Explore Our Vision
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
    </section>;
};
export default HeroSection;