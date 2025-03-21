import React, { useEffect, useState } from "react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Collapsible states
  const [isProblemsOpen, setIsProblemsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  const [isAdvantagesOpen, setIsAdvantagesOpen] = useState(false);

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

  // Collapsible section wrapper component
  const CollapsibleSection = ({ 
    id, 
    title, 
    isOpen, 
    setIsOpen, 
    bgClass, 
    children 
  }: { 
    id: string; 
    title: string; 
    isOpen: boolean; 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    bgClass: string;
    children: React.ReactNode; 
  }) => (
    <section id={id} className={`py-4 ${bgClass}`}>
      <div className="container mx-auto px-6">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full mb-4"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-4 rounded-lg bg-white dark:bg-seftec-navy/30 shadow-sm">
            <h2 className="text-xl font-bold text-seftec-navy dark:text-white">
              {title}
            </h2>
            <ChevronDown className={`h-5 w-5 text-seftec-navy dark:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="bg-white/50 dark:bg-seftec-navy/10 rounded-lg p-4 shadow-sm">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy overflow-hidden pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      {/* Hero section is always visible */}
      <HeroSection />
      
      {isMobile ? (
        // Mobile view - collapsible sections
        <>
          {/* Problems Section - Mobile Collapsible */}
          <CollapsibleSection
            id="problems-section"
            title="Challenges in B2B Trade"
            isOpen={isProblemsOpen}
            setIsOpen={setIsProblemsOpen}
            bgClass="bg-seftec-slate dark:bg-seftec-darkNavy/50"
          >
            <ProblemsSection />
          </CollapsibleSection>
          
          {/* Features Section - Mobile Collapsible */}
          <CollapsibleSection
            id="features-section"
            title="AI-Driven B2B Marketplace"
            isOpen={isFeaturesOpen}
            setIsOpen={setIsFeaturesOpen}
            bgClass="dark:bg-seftec-darkNavy"
          >
            <FeaturesSection />
          </CollapsibleSection>
          
          {/* AI Advisor Section - Mobile Collapsible */}
          <CollapsibleSection
            id="ai-advisor-section"
            title="BizGenie AI: Your Personalised Business Advisor"
            isOpen={isAIAdvisorOpen}
            setIsOpen={setIsAIAdvisorOpen}
            bgClass="dark:bg-seftec-darkNavy"
          >
            <AIAdvisorSection />
          </CollapsibleSection>
          
          {/* Business Counter Section - Mobile Collapsible */}
          <CollapsibleSection
            id="business-counter-section"
            title="Growing Business Community"
            isOpen={isBusinessOpen}
            setIsOpen={setIsBusinessOpen}
            bgClass="bg-seftec-slate dark:bg-seftec-navy/20"
          >
            <BusinessCounter className="py-4" />
          </CollapsibleSection>
          
          {/* Payment Integration Demo Section - Mobile Collapsible */}
          <CollapsibleSection
            id="payment-section"
            title="Integrated Payment Solutions"
            isOpen={isPaymentOpen}
            setIsOpen={setIsPaymentOpen}
            bgClass="bg-gray-50 dark:bg-seftec-navy/30"
          >
            <div className="text-center">
              <p className="mb-6 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
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
          </CollapsibleSection>
          
          {/* Testimonials Section - Mobile Collapsible */}
          <CollapsibleSection
            id="testimonials-section"
            title="What Our Clients Say"
            isOpen={isTestimonialsOpen}
            setIsOpen={setIsTestimonialsOpen}
            bgClass="bg-white dark:bg-seftec-darkNavy"
          >
            <TestimonialsSection />
          </CollapsibleSection>
          
          {/* Regions Covered Section - Mobile Collapsible */}
          <CollapsibleSection
            id="regions-section"
            title="Regions We Cover"
            isOpen={isRegionsOpen}
            setIsOpen={setIsRegionsOpen}
            bgClass="bg-seftec-slate dark:bg-seftec-darkNavy/50"
          >
            <RegionsCoveredSection />
          </CollapsibleSection>
          
          {/* Advantages Section - Mobile Collapsible */}
          <CollapsibleSection
            id="advantages-section"
            title="Competitive Advantage"
            isOpen={isAdvantagesOpen}
            setIsOpen={setIsAdvantagesOpen}
            bgClass="dark:bg-seftec-darkNavy"
          >
            <AdvantagesSection />
          </CollapsibleSection>
        </>
      ) : (
        // Desktop view - side by side sections
        <>
          <ProblemsSection />
          <FeaturesSection />
          <AIAdvisorSection />
          
          <section className="py-12 bg-gray-50 dark:bg-seftec-navy/20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Business Counter Section - Desktop */}
                <div className="bg-seftec-slate dark:bg-seftec-navy/30 rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30">
                      LIVE
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
                    apiMode="live"
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
              </div>
            </div>
          </section>
          
          <TestimonialsSection />
          <RegionsCoveredSection />
          <AdvantagesSection />
        </>
      )}
      
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
