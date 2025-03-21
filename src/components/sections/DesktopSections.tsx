
import React from "react";
import ProblemsSection from "@/components/sections/ProblemsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegionsCoveredSection from "@/components/sections/RegionsCoveredSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import PaymentBusinessSection from "@/components/sections/PaymentBusinessSection";

interface DesktopSectionsProps {
  onPaymentComplete: (paymentData: any) => void;
}

const DesktopSections: React.FC<DesktopSectionsProps> = ({ onPaymentComplete }) => {
  return (
    <>
      <ProblemsSection />
      <FeaturesSection />
      <AIAdvisorSection />
      <PaymentBusinessSection onPaymentComplete={onPaymentComplete} />
      <TestimonialsSection />
      <RegionsCoveredSection />
      <AdvantagesSection />
    </>
  );
};

export default DesktopSections;
