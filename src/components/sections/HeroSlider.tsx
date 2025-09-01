import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useI18nContext } from "@/components/ui/language-toggle";

// Reusable slide "payload" so you can add more later
interface Slide {
  id: string;
  variant: "light" | "dark";
  headline: React.ReactNode;
  sub: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  badges?: Array<{
    icon: React.ReactNode;
    text: string;
    className?: string;
  }>;
  trustIndicators?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  illustration?: React.ReactNode;
  backgroundPattern?: React.ReactNode;
  tagline?: string;
}
const slides: Slide[] = [{
  id: "trade",
  variant: "light",
  tagline: "Grow Smarter, Together",
  headline: <>
        <span className="text-seftec-navy dark:text-white">Revolutionizing Global</span>{" "}
        <span className="bg-gradient-to-r from-seftec-gold to-orange-500 dark:from-seftec-teal dark:to-blue-400 bg-clip-text text-transparent">
          Trade with a Trusted AI-Powered Marketplace
        </span>
      </>,
  sub: "Trade with Trust, Pay with Confidence. Connect with verified businesses worldwide, transact securely, and access financing solutions all in one platform.",
  primaryCta: {
    label: "Get Started",
    href: "/register"
  },
  secondaryCta: {
    label: "Book a Demo",
    href: "/contact"
  },
  badges: [{
    icon: <Globe className="w-4 h-4" />,
    text: "The Future of Secure B2B Trade & Vendor Payments",
    className: "bg-white/90 text-seftec-navy border-seftec-navy/20"
  }, {
    icon: <Shield className="w-4 h-4" />,
    text: "ISO 20022 Compliant DeFi Leadership",
    className: "bg-seftec-gold/10 text-seftec-navy dark:text-seftec-gold border-seftec-gold/30"
  }],
  backgroundPattern: <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seftec-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-seftec-teal/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-seftec-gold/5 to-seftec-teal/5 rounded-full filter blur-3xl"></div>
      </div>
}, {
  id: "bizgenie",
  variant: "dark",
  headline: <>
        Transform Your{' '}
        <span className="bg-gradient-teal-purple bg-clip-text text-transparent">
          Business
        </span>
        <br className="hidden sm:block" />
        <span className="block sm:inline"> with AI</span>
      </>,
  sub: "Unlock enterprise-grade DeFi access, AI-powered marketplace solutions, and intelligent business automation in one comprehensive platform.",
  primaryCta: {
    label: "Get Started Free",
    href: "/register"
  },
  secondaryCta: {
    label: "Try BizGenie AI",
    href: "/bizgenie"
  },
  badges: [{
    icon: <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-sparkle" />,
    text: "AI-Powered Business Platform",
    className: "bg-white/80 dark:bg-seftec-charcoal/80 backdrop-blur-sm border border-seftec-navy/10 dark:border-white/10"
  }],
  trustIndicators: [{
    icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-teal" />,
    text: "Enterprise Security"
  }, {
    icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-purple" />,
    text: "Global Compliance"
  }, {
    icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-gold" />,
    text: "24/7 AI Support"
  }],
  illustration: <div className="relative bg-gradient-to-br from-white/50 to-seftec-slate/30 dark:from-seftec-charcoal/50 dark:to-seftec-navy/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="bg-white dark:bg-seftec-darkNavy rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-teal-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-seftec-navy dark:text-white">
                SEFTECHUB
              </span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-seftec-slate/50 dark:bg-seftec-charcoal/50 rounded-lg p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-seftec-navy/60 dark:text-white/60">Revenue</div>
              <div className="text-lg sm:text-xl font-bold text-seftec-navy dark:text-white">₦2.4M</div>
              <div className="text-xs text-green-500">+24%</div>
            </div>
            <div className="bg-seftec-slate/50 dark:bg-seftec-charcoal/50 rounded-lg p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-seftec-navy/60 dark:text-white/60">Growth</div>
              <div className="text-lg sm:text-xl font-bold text-seftec-navy dark:text-white">87%</div>
              <div className="text-xs text-seftec-teal">+12%</div>
            </div>
          </div>
          
          <div className="h-20 sm:h-24 bg-gradient-to-r from-seftec-teal/20 to-seftec-purple/20 rounded-lg flex items-end justify-between p-2 sm:p-3">
            {[40, 60, 35, 80, 45, 70, 90].map((height, i) => <div key={i} className="bg-gradient-teal-purple rounded-sm animate-pulse" style={{
          height: `${height}%`,
          width: `${100 / 7 - 2}%`,
          animationDelay: `${i * 100}ms`
        }} />)}
          </div>
        </div>
      </div>,
  backgroundPattern: <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-2 h-2 bg-seftec-gold rounded-full animate-pulse"></div>
        <div className="hidden lg:block absolute top-3/4 right-1/4 w-3 h-3 bg-seftec-teal rounded-full animate-bounce"></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/3 w-1 h-1 bg-seftec-purple rounded-full animate-pulse"></div>
      </div>
}];
export default function HeroSlider() {
  const { t } = useI18nContext();
  
  return <section className="relative min-h-screen">
      <Carousel opts={{
      loop: true,
      align: "center",
      duration: 25
    }} className="w-full overflow-hidden">
        <CarouselContent>
          {slides.map(slide => <CarouselItem key={slide.id} className="w-full">
              <div className={`
                  relative min-h-screen flex items-center justify-center overflow-hidden
                  ${slide.variant === "dark" ? "bg-gradient-to-br from-seftec-slate via-white to-seftec-slate/50 dark:from-seftec-darkNavy dark:via-seftec-navy/30 dark:to-seftec-darkNavy" : "bg-gradient-to-br from-seftec-slate via-white to-blue-50 dark:from-seftec-darkNavy dark:via-seftec-darkNavy dark:to-blue-900"}
                `}>
                {/* Background Pattern */}
                {slide.backgroundPattern}
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                      
                      {/* Content Section */}
                      <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-up">
                        
                        {/* Tagline */}
                        {slide.tagline && <div className="mb-4">
                            
                          </div>}
                        
                        {/* Badges */}
                        {slide.badges && <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-8">
                            {slide.badges.map((badge, index) => <div key={index} className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full shadow-lg ${badge.className}`}>
                                <span className="text-seftec-gold dark:text-seftec-teal mr-2">
                                  {badge.icon}
                                </span>
                                <span className="text-xs sm:text-sm font-medium">
                                  {badge.text}
                                </span>
                              </div>)}
                          </div>}
                        
                        {/* Main Heading */}
                        <div className="space-y-3 sm:space-y-4">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            {slide.headline}
                          </h1>
                          
                          <p className="text-base sm:text-lg lg:text-xl text-seftec-navy/70 dark:text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {slide.sub}
                          </p>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                          <Link to={slide.primaryCta.href} className="group w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-gradient-teal-purple text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl group-hover:scale-105">
                              {slide.primaryCta.label}
                              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          
                          {slide.secondaryCta && <Link to={slide.secondaryCta.href} className="w-full sm:w-auto">
                              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-seftec-navy/20 dark:border-white/20 hover:border-seftec-teal dark:hover:border-seftec-gold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-105">
                                {slide.secondaryCta.label}
                              </Button>
                            </Link>}
                        </div>
                        
                        {/* Trust Indicators */}
                        {slide.trustIndicators && <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4 sm:pt-8">
                            {slide.trustIndicators.map((indicator, index) => <div key={index} className="flex items-center gap-2">
                                {indicator.icon}
                                <span className="text-xs sm:text-sm text-seftec-navy/70 dark:text-white/70">
                                  {indicator.text}
                                </span>
                              </div>)}
                          </div>}
                      </div>
                      
                      {/* Visual Section */}
                      {slide.illustration && <div className="relative mt-8 lg:mt-0 animate-fade-up animate-delay-200">
                          {slide.illustration}
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>)}
        </CarouselContent>
        
        {/* Navigation Controls */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white" />
      </Carousel>
    </section>;
}