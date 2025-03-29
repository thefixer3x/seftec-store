
import React, { useEffect } from "react";
import { MainNav } from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import Footer from "@/components/ui/footer";
import ProblemsSection from "@/components/sections/ProblemsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegionsCoveredSection from "@/components/sections/RegionsCoveredSection";
import PersonalizedAIAdvisorSection from "@/components/sections/PersonalizedAIAdvisorSection";
import BusinessCounterSection from "@/components/sections/BusinessCounterSection";
import PaymentSection from "@/components/sections/PaymentSection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Handle successful payment completion
  const handlePaymentComplete = (paymentData: any) => {
    toast({
      title: "Payment Processed",
      description: `${paymentData.amount} ${paymentData.currency} payment via ${paymentData.provider} completed`,
      duration: 5000,
    });
    console.log("Payment complete:", paymentData);
  };

  // Add scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  // Set light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy overflow-hidden pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      {/* Hero section is always visible */}
      <HeroSection />
      
      {/* Main content sections */}
      <ProblemsSection />
      <FeaturesSection />
      <PersonalizedAIAdvisorSection />
      
      {/* Side-by-side sections on desktop, stacked on mobile */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          {isMobile ? (
            /* Mobile: Stacked view */
            <>
              <BusinessCounterSection />
              <div className="mt-12">
                <PaymentSection 
                  apiMode="sandbox"
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
            </>
          ) : (
            /* Desktop: Side-by-side view */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BusinessCounterSection />
              <PaymentSection 
                apiMode="live"
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          )}
        </div>
      </div>
      
      <TestimonialsSection />
      <RegionsCoveredSection />
      <AdvantagesSection />
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
