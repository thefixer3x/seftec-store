
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
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import BusinessCounter from "@/components/ui/business-counter";
import PaymentButton from "@/components/ui/payment-button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

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
      <AIAdvisorSection />
      
      <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30">
              LIVE
            </Badge>
          </div>
          <BusinessCounter />
        </div>
      </section>
      
      <section className="py-12 bg-gray-50 dark:bg-seftec-navy/30">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white text-center">
            Integrated Payment Solutions
          </h2>
          <p className="mb-8 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto text-center">
            Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
            Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
          </p>
          <div className="text-center">
            <PaymentButton 
              label="Try Payment Integration" 
              className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
              apiMode={isMobile ? "sandbox" : "live"}
              onPaymentComplete={handlePaymentComplete}
            />
          </div>
        </div>
      </section>
      
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
