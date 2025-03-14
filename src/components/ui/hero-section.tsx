
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = ((clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el, index) => {
        const depth = index * 0.2 + 0.5;
        const translateX = x * depth;
        const translateY = y * depth;
        
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative min-h-screen flex items-center pt-20 overflow-hidden',
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-seftec-gold/10 rounded-full blur-3xl opacity-60 parallax"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-seftec-navy/10 rounded-full blur-3xl opacity-60 parallax"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-seftec-navy/5 rounded-full blur-2xl opacity-70 parallax"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm">
              The Future of Secure B2B Trade & Vendor Payments
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-seftec-navy animate-fade-up text-balance leading-tight">
            Revolutionizing Global Trade with a Trusted AI-Powered Marketplace
          </h1>
          
          <p className="text-xl text-seftec-navy/70 mb-10 max-w-3xl mx-auto animate-fade-up animate-delay-200">
            Trade with Trust, Pay with Confidence. Connect with verified businesses worldwide, 
            transact securely, and access financing solutions all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
            <Button 
              size="lg" 
              className="bg-seftec-navy text-white hover:bg-seftec-navy/90 transition-all duration-300 py-6 px-8 rounded-lg text-lg custom-btn"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 transition-all duration-300 py-6 px-8 rounded-lg text-lg custom-btn"
            >
              Book a Demo
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToFeatures}
            className="text-seftec-navy/60 hover:text-seftec-navy transition-colors duration-300 focus:outline-none"
            aria-label="Scroll to features"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
