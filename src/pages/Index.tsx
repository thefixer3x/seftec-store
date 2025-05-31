
import React from 'react';
import { HomeFAQSection } from '@/components/sections/HomeFAQSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import RegionsCoveredSection from '@/components/sections/RegionsCoveredSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import PaymentCounterSection from '@/components/sections/PaymentCounterSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import DefiHighlightSection from '@/components/sections/DefiHighlightSection';
import AIAdvisorSection from '@/components/sections/AIAdvisorSection';
import HeroSlider from '@/components/sections/HeroSlider';
import { ProductRecommendations } from '@/components/recommendations/ProductRecommendations';
import MainLayout from '@/components/layout/MainLayout';

const Home = () => {
  const homeSections = [
    { id: 'hero', Component: HeroSlider },
    { id: 'problems', Component: ProblemsSection },
    { id: 'solutions', Component: SolutionsSection },
    { id: 'advantages', Component: AdvantagesSection },
    { id: 'defi', Component: DefiHighlightSection },
    { id: 'paymentCounter', Component: PaymentCounterSection },
    { id: 'recommendations', Component: ProductRecommendations },
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
