
import React, { useEffect } from "react";
import ProblemsSection from "@/components/sections/ProblemsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ValuePropositionsSection from "@/components/sections/ValuePropositionsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegionsCoveredSection from "@/components/sections/RegionsCoveredSection";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import MainLayout from "@/components/layout/MainLayout";

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

  const homeSections = [
    { id: 'hero', Component: HomeHeroSection },
    { id: 'problems', Component: ProblemsSection },
    { id: 'features', Component: FeaturesSection },
    { id: 'valueProps', Component: ValuePropositionsSection },
    { id: 'aiAdvisor', Component: AIAdvisorSection },
    { id: 'testimonials', Component: TestimonialsSection },
    { id: 'regions', Component: RegionsCoveredSection },
    { id: 'advantages', Component: AdvantagesSection },
    { id: 'cta', Component: CTASection },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen overflow-hidden">
        <main className="flex-1">
          {homeSections.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
      </div>
    </MainLayout>
  );
};

export default Index;
