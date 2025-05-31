
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Slide } from '@/types/hero-slider';

interface HeroSlideContentProps {
  slide: Slide;
}

export function HeroSlideContent({ slide }: HeroSlideContentProps) {
  return (
    <div
      className={`
        relative min-h-screen flex items-center justify-center overflow-hidden
        ${slide.variant === "dark" 
          ? "bg-gradient-to-br from-seftec-slate via-white to-seftec-slate/50 dark:from-seftec-darkNavy dark:via-seftec-navy/30 dark:to-seftec-darkNavy" 
          : "bg-gradient-to-br from-seftec-slate via-white to-blue-50 dark:from-seftec-darkNavy dark:via-seftec-darkNavy dark:to-blue-900"
        }
      `}
    >
      {/* Background Pattern */}
      {slide.backgroundPattern}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Content Section */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-up">
              
              {/* Tagline */}
              {slide.tagline && (
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-seftec-gold/10 text-seftec-navy dark:text-seftec-gold border border-seftec-gold/30 rounded-full text-sm font-medium">
                    {slide.tagline}
                  </span>
                </div>
              )}
              
              {/* Badges */}
              {slide.badges && (
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-8">
                  {slide.badges.map((badge, index) => (
                    <div 
                      key={index}
                      className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full shadow-lg ${badge.className}`}
                    >
                      <span className="text-seftec-gold dark:text-seftec-teal mr-2">
                        {badge.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
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
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-teal-purple text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl group-hover:scale-105"
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                {slide.secondaryCta && (
                  <Link to={slide.secondaryCta.href} className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto border-2 border-seftec-navy/20 dark:border-white/20 hover:border-seftec-teal dark:hover:border-seftec-gold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      {slide.secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
              
              {/* Trust Indicators */}
              {slide.trustIndicators && (
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4 sm:pt-8">
                  {slide.trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {indicator.icon}
                      <span className="text-xs sm:text-sm text-seftec-navy/70 dark:text-white/70">
                        {indicator.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Visual Section */}
            {slide.illustration && (
              <div className="relative mt-8 lg:mt-0 animate-fade-up animate-delay-200">
                {slide.illustration}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
