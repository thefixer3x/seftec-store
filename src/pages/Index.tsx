
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
import PersonalizedAIAdvisorSection from '@/components/sections/PersonalizedAIAdvisorSection';
import AIAdvisorSection from '@/components/sections/AIAdvisorSection';

const Home = () => {
  // Add the handlePaymentComplete function to pass to PaymentCounterSection
  const handlePaymentComplete = (paymentData: any) => {
    console.log('Payment completed:', paymentData);
    // Here you could add additional logic like showing a notification
  };

  const homeSections = [
    { id: 'problems', Component: ProblemsSection },
    { id: 'solutions', Component: SolutionsSection },
    { id: 'advantages', Component: AdvantagesSection },
    { id: 'bizCounter', Component: BusinessCounterSection },
    { 
      id: 'paymentCounter', 
      Component: PaymentCounterSection,
      props: { onPaymentComplete: handlePaymentComplete }
    },
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
    <div className="min-h-screen">
      <main className="flex-1">
        {homeSections.map(({ id, Component, props }) => (
          <Component key={id} {...(props || {})} />
        ))}
      </main>
    </div>
  );
};

export default Home;
