
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
import HomeFAQSection from "@/components/sections/HomeFAQSection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Card, 
  CardContent,
  CardTitle 
} from "@/components/ui/card";
import { Shield, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy overflow-hidden pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      {/* Hero section is always visible */}
      <HeroSection />
      
      {/* DeFi Leadership Banner */}
      <div className="bg-gradient-to-r from-seftec-navy/5 to-seftec-navy/0 dark:from-seftec-purple/10 dark:to-seftec-teal/0 py-4">
        <div className="container mx-auto px-6">
          <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-seftec-navy dark:text-white mb-1">
                      Leading Enterprise DeFi Solutions
                    </CardTitle>
                    <p className="text-seftec-navy/70 dark:text-white/70 text-sm">
                      Seftec is pioneering ISO 20022 compliant decentralized finance solutions for enterprises worldwide.
                      Explore our comprehensive roadmap and strategic vision.
                    </p>
                  </div>
                </div>
                <Link to="/defi-leadership">
                  <Button className="flex items-center gap-1 bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
                    <span>Learn More</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
      
      {/* FAQ Section */}
      <HomeFAQSection />
      
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
