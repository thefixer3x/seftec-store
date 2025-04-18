
import React from "react";
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
import PaymentCounterSection from "@/components/sections/PaymentCounterSection";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import DefiHighlightSection from "@/components/sections/DefiHighlightSection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";

const Index = () => {
  const { toast } = useToast();
  
  const handlePaymentComplete = (paymentData: any) => {
    toast({
      title: "Payment Processed",
      description: `${paymentData.amount} ${paymentData.currency} payment via ${paymentData.provider} completed`,
      duration: 5000,
    });
    console.log("Payment complete:", paymentData);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy overflow-hidden pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      <HeroSection />
      <DefiHighlightSection />
      <ProblemsSection />
      <FeaturesSection />
      <PersonalizedAIAdvisorSection />
      <PaymentCounterSection onPaymentComplete={handlePaymentComplete} />
      <TestimonialsSection />
      <RegionsCoveredSection />
      <AdvantagesSection />
      <HomeFAQSection />
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
