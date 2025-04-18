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
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Card, 
  CardContent,
  CardTitle 
} from "@/components/ui/card";
import { Shield, ChevronRight, TrendingUp, Building, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handlePaymentComplete = (paymentData: any) => {
    toast({
      title: "Payment Processed",
      description: `${paymentData.amount} ${paymentData.currency} payment via ${paymentData.provider} completed`,
      duration: 5000,
    });
    console.log("Payment complete:", paymentData);
  };

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
      
      <HeroSection />
      
      <div className="bg-gradient-to-r from-seftec-navy/5 to-seftec-navy/0 dark:from-seftec-purple/10 dark:to-seftec-teal/0 py-4">
        <div className="container mx-auto px-4 sm:px-6">
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
      
      <ProblemsSection />
      <FeaturesSection />
      
      <section className="py-12 bg-gradient-to-r from-seftec-slate to-white dark:from-seftec-darkNavy dark:to-seftec-darkNavy/90">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 text-seftec-gold dark:text-seftec-teal text-sm font-medium mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise DeFi Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white">Secure Enterprise Access to Decentralized Finance</h2>
            <p className="mt-4 text-seftec-navy/70 dark:text-white/70 max-w-3xl mx-auto">
              Our ISO 20022 compliant platform bridges traditional banking systems with blockchain technology, 
              enabling secure, efficient access to DeFi markets for enterprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
              <CardContent className="p-6">
                <div className="rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h3 className="font-bold text-lg text-seftec-navy dark:text-white mb-2">Market Leadership</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 text-sm mb-3">
                  250+ enterprise clients across 18 countries, with $2.8B in monthly transaction volume.
                </p>
                <Link to="/defi-leadership" className="text-seftec-gold dark:text-seftec-teal text-sm font-medium inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
              <CardContent className="p-6">
                <div className="rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h3 className="font-bold text-lg text-seftec-navy dark:text-white mb-2">ISO 20022 Compliant</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 text-sm mb-3">
                  Seamless interoperability between traditional banking systems and blockchain-based solutions.
                </p>
                <Link to="/defi-leadership" className="text-seftec-gold dark:text-seftec-teal text-sm font-medium inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
              <CardContent className="p-6">
                <div className="rounded-full bg-seftec-gold/10 dark:bg-seftec-teal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                </div>
                <h3 className="font-bold text-lg text-seftec-navy dark:text-white mb-2">Enterprise Security</h3>
                <p className="text-seftec-navy/70 dark:text-white/70 text-sm mb-3">
                  Multi-layer security with hardware modules, MPC cryptography, and compliance frameworks.
                </p>
                <Link to="/defi-leadership" className="text-seftec-gold dark:text-seftec-teal text-sm font-medium inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link to="/defi-leadership">
              <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                View Our DeFi Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Separator className="bg-seftec-navy/10 dark:bg-white/10" />
      
      <PersonalizedAIAdvisorSection />
      
      <div className="py-12">
        <div className="container mx-auto px-6">
          {isMobile ? (
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
      
      <HomeFAQSection />
      
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
