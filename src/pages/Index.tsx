
import React from 'react';
import { HomeFAQSection } from '@/components/sections/HomeFAQSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import RegionsCoveredSection from '@/components/sections/RegionsCoveredSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import PaymentSection from '@/components/sections/PaymentSection';
import PaymentCounterSection from '@/components/sections/PaymentCounterSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import BusinessCounterSection from '@/components/sections/BusinessCounterSection';
import DefiHighlightSection from '@/components/sections/DefiHighlightSection';
import PersonalizedAIAdvisorSection from '@/components/sections/PersonalizedAIAdvisorSection';
import AIAdvisorSection from '@/components/sections/AIAdvisorSection';
import HomeHeroSection from '@/components/sections/HomeHeroSection';
import MainLayout from '@/components/layout/MainLayout';

const Home = () => {
  const homeSections = [
    { id: 'hero', Component: HomeHeroSection },
    { id: 'problems', Component: ProblemsSection },
    { id: 'solutions', Component: SolutionsSection },
    { id: 'advantages', Component: AdvantagesSection },
    { id: 'bizCounter', Component: BusinessCounterSection },
    { id: 'defi', Component: DefiHighlightSection },
    { id: 'paymentCounter', Component: PaymentCounterSection },
    { id: 'payment', Component: PaymentSection },
    { id: 'aiAdvisor', Component: AIAdvisorSection },
    { id: 'regions', Component: RegionsCoveredSection },
    { id: 'features', Component: FeaturesSection },
    { id: 'values', Component: ValuePropositionsSection },
    { id: 'testimonials', Component: TestimonialsSection },
    { id: 'faq', Component: HomeFAQSection },
    { id: 'cta', Component: CTASection },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        <main className="flex-1">
          {homeSections.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
      </div>
    </MainLayout>
  );
};

export default Home;
