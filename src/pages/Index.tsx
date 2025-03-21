
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
      
      <HeroSection />
      <ProblemsSection />
      <FeaturesSection />
      <AIAdvisorSection />
      
      {isMobile ? (
        // Mobile view - stacked sections
        <>
          {/* Business Counter Section - Mobile */}
          <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
            <div className="container mx-auto px-6">
              <BusinessCounter />
            </div>
          </section>
          
          {/* Payment Integration Demo Section - Mobile */}
          <section className="py-12 bg-gray-50 dark:bg-seftec-navy/30">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
                Integrated Payment Solutions
              </h2>
              <p className="mb-8 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
                Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
                Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
              </p>
              <PaymentButton 
                label="Try Payment Integration" 
                className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
                apiMode="sandbox"
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          </section>
        </>
      ) : (
        // Desktop view - side by side sections
        <section className="py-12 bg-gray-50 dark:bg-seftec-navy/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Business Counter Section - Desktop */}
              <div className="bg-seftec-slate dark:bg-seftec-navy/30 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-400/30">
                    SANDBOX MODE
                  </Badge>
                </div>
                <BusinessCounter className="py-0" />
              </div>
              
              {/* Payment Integration Demo Section - Desktop */}
              <div className="bg-white dark:bg-seftec-navy/30 rounded-xl p-8 text-center flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
                    Integrated Payment Solutions
                  </h2>
                  <p className="mb-8 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
                    Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
                    Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
                  </p>
                </div>
                <PaymentButton 
                  label="Try Payment Integration" 
                  className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
                  apiMode="sandbox"
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      
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
