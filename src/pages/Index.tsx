
import React, { useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import Footer from "@/components/ui/footer";
import ProblemsSection from "@/components/sections/ProblemsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ValuePropositionsSection from "@/components/sections/ValuePropositionsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
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
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy overflow-hidden">
      <Navbar />
      <HeroSection />
      <ProblemsSection />
      <FeaturesSection />
      <div id="value-props">
        <ValuePropositionsSection />
      </div>
      <AdvantagesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
