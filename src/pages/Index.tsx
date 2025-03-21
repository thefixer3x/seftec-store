
import React, { useEffect } from "react";
import { MainNav } from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/sections/CTASection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCollapsibleSections from "@/components/sections/MobileCollapsibleSections";
import DesktopSections from "@/components/sections/DesktopSections";
import { useCollapsibleSections } from "@/hooks/use-collapsible-sections";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Use the scroll reveal hook
  useScrollReveal();
  
  // Use the collapsible sections hook
  const collapsibleStates = useCollapsibleSections();

  // Handle successful payment completion
  const handlePaymentComplete = (paymentData: any) => {
    toast({
      title: "Payment Processed",
      description: `${paymentData.amount} ${paymentData.currency} payment via ${paymentData.provider} completed`,
      duration: 5000,
    });
    console.log("Payment complete:", paymentData);
  };

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
      
      {isMobile ? (
        // Mobile view - collapsible sections
        <MobileCollapsibleSections 
          collapsibleStates={collapsibleStates} 
          onPaymentComplete={handlePaymentComplete} 
        />
      ) : (
        // Desktop view - side by side sections
        <DesktopSections onPaymentComplete={handlePaymentComplete} />
      )}
      
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
