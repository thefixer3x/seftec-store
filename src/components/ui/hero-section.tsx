import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  className
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isInteractionBlocked, setIsInteractionBlocked] = useState(false);
  const { toast } = useToast();
  
  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  useEffect(() => {
    const handleMouseMove = debounce((e: MouseEvent) => {
      if (!heroRef.current || isInteractionBlocked) return;
      
      const {
        clientX,
        clientY
      } = e;
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
    }, 10);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInteractionBlocked]);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPowerMode = 'connection' in navigator && (navigator as any).connection?.saveData;
    
    if (prefersReducedMotion || isLowPowerMode) {
      setIsInteractionBlocked(true);
    }
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const handleGetStarted = () => {
    toast({
      title: "Early Access",
      description: "Thanks for your interest! We'll notify you when the platform launches.",
      duration: 5000,
    });
  };
  
  const handleBookDemo = () => {
    toast({
      title: "Demo Request",
      description: "Thanks for your interest! Our team will contact you shortly to schedule a demo.",
      duration: 5000,
    });
  };

  return (
    <section 
      ref={heroRef} 
      className={cn(
        'relative min-h-screen flex items-center overflow-hidden', 
        'dark:bg-gradient-navy', 
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-seftec-gold/10 dark:bg-seftec-teal/10 rounded-full blur-3xl opacity-60 parallax"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-seftec-navy/10 dark:bg-seftec-purple/10 rounded-full blur-3xl opacity-60 parallax"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-seftec-navy/5 dark:bg-white/5 rounded-full blur-2xl opacity-70 parallax"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-flex gap-3 flex-wrap justify-center animate-fade-in">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90">
              <Shield size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
              The Future of Secure B2B Trade & Vendor Payments
            </span>
            
            <Link to="/defi-leadership">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-gold/10 border border-seftec-gold/20 text-seftec-navy/90 font-medium text-sm dark:bg-seftec-teal/10 dark:border-seftec-teal/20 dark:text-white/90 hover:bg-seftec-gold/20 dark:hover:bg-seftec-teal/20 transition-colors">
                <Shield size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
                ISO 20022 Compliant DeFi Leadership
              </span>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-up text-balance leading-tight text-seftec-navy dark:text-white">
            <span className="font-handwritten text-seftec-gold dark:text-seftec-teal">Grow Smarter, Together</span>
            <br />
            Revolutionizing Global Trade with a Trusted AI-Powered Marketplace
          </h1>
          
          <p className="text-seftec-navy/70 dark:text-white/70 mb-10 max-w-3xl mx-auto animate-fade-up animate-delay-200 text-xl md:text-2xl lg:text-3xl">
            Trade with Trust, Pay with Confidence. Connect with verified businesses worldwide, 
            transact securely, and access financing solutions all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
            <Button 
              size="lg" 
              className="bg-seftec-navy dark:bg-gradient-teal-purple text-white hover:bg-seftec-navy/90 dark:hover:opacity-90 transition-all duration-300 py-6 px-8 rounded-lg text-lg custom-btn cta-sparkle group"
              onClick={handleGetStarted}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:animate-shimmer bg-white"></span>
              </span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300 py-6 px-8 rounded-lg text-lg custom-btn"
              onClick={handleBookDemo}
            >
              Book a Demo
            </Button>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto bg-white/70 dark:bg-white/5 rounded-lg shadow-sm p-4 border border-seftec-navy/10 dark:border-white/10 animate-fade-up animate-delay-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-seftec-gold dark:bg-seftec-teal rounded-full p-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-seftec-navy dark:text-white">Enterprise DeFi Leadership</h3>
                <p className="text-sm text-seftec-navy/70 dark:text-white/70">Pioneering decentralized finance solutions with ISO 20022 compliance</p>
              </div>
            </div>
            <Link to="/defi-leadership">
              <Button size="sm" variant="ghost" className="text-seftec-navy hover:text-seftec-navy/80 dark:text-white dark:hover:text-white/80">
                Explore Our Vision
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToFeatures} 
            className="text-seftec-navy/60 dark:text-white/60 hover:text-seftec-navy dark:hover:text-white transition-colors duration-300 focus:outline-none" 
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
