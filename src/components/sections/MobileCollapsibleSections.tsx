
import React from "react";
import CollapsibleSection from "@/components/ui/collapsible-section";
import ProblemsSection from "@/components/sections/ProblemsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import BusinessCounter from "@/components/ui/business-counter";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RegionsCoveredSection from "@/components/sections/RegionsCoveredSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import MobilePaymentSection from "@/components/sections/MobilePaymentSection";

interface MobileCollapsibleSectionsProps {
  collapsibleStates: {
    isProblemsOpen: boolean;
    setIsProblemsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isFeaturesOpen: boolean;
    setIsFeaturesOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAIAdvisorOpen: boolean;
    setIsAIAdvisorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isBusinessOpen: boolean;
    setIsBusinessOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPaymentOpen: boolean;
    setIsPaymentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isTestimonialsOpen: boolean;
    setIsTestimonialsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isRegionsOpen: boolean;
    setIsRegionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAdvantagesOpen: boolean;
    setIsAdvantagesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  onPaymentComplete: (paymentData: any) => void;
}

const MobileCollapsibleSections: React.FC<MobileCollapsibleSectionsProps> = ({
  collapsibleStates,
  onPaymentComplete
}) => {
  const {
    isProblemsOpen, setIsProblemsOpen,
    isFeaturesOpen, setIsFeaturesOpen,
    isAIAdvisorOpen, setIsAIAdvisorOpen,
    isBusinessOpen, setIsBusinessOpen,
    isPaymentOpen, setIsPaymentOpen,
    isTestimonialsOpen, setIsTestimonialsOpen,
    isRegionsOpen, setIsRegionsOpen,
    isAdvantagesOpen, setIsAdvantagesOpen
  } = collapsibleStates;

  return (
    <>
      {/* Problems Section - Mobile Collapsible */}
      <CollapsibleSection
        id="problems-section"
        title="Challenges in B2B Trade"
        isOpen={isProblemsOpen}
        setIsOpen={setIsProblemsOpen}
        bgClass="bg-seftec-slate dark:bg-seftec-darkNavy/50"
      >
        <ProblemsSection />
      </CollapsibleSection>
      
      {/* Features Section - Mobile Collapsible */}
      <CollapsibleSection
        id="features-section"
        title="AI-Driven B2B Marketplace"
        isOpen={isFeaturesOpen}
        setIsOpen={setIsFeaturesOpen}
        bgClass="dark:bg-seftec-darkNavy"
      >
        <FeaturesSection />
      </CollapsibleSection>
      
      {/* AI Advisor Section - Mobile Collapsible */}
      <CollapsibleSection
        id="ai-advisor-section"
        title="BizGenie AI: Your Personalised Business Advisor"
        isOpen={isAIAdvisorOpen}
        setIsOpen={setIsAIAdvisorOpen}
        bgClass="dark:bg-seftec-darkNavy"
      >
        <AIAdvisorSection />
      </CollapsibleSection>
      
      {/* Business Counter Section - Mobile Collapsible */}
      <CollapsibleSection
        id="business-counter-section"
        title="Growing Business Community"
        isOpen={isBusinessOpen}
        setIsOpen={setIsBusinessOpen}
        bgClass="bg-seftec-slate dark:bg-seftec-navy/20"
      >
        <BusinessCounter className="py-4" />
      </CollapsibleSection>
      
      {/* Payment Integration Demo Section - Mobile Collapsible */}
      <CollapsibleSection
        id="payment-section"
        title="Integrated Payment Solutions"
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        bgClass="bg-gray-50 dark:bg-seftec-navy/30"
      >
        <MobilePaymentSection onPaymentComplete={onPaymentComplete} />
      </CollapsibleSection>
      
      {/* Testimonials Section - Mobile Collapsible */}
      <CollapsibleSection
        id="testimonials-section"
        title="What Our Clients Say"
        isOpen={isTestimonialsOpen}
        setIsOpen={setIsTestimonialsOpen}
        bgClass="bg-white dark:bg-seftec-darkNavy"
      >
        <TestimonialsSection />
      </CollapsibleSection>
      
      {/* Regions Covered Section - Mobile Collapsible */}
      <CollapsibleSection
        id="regions-section"
        title="Regions We Cover"
        isOpen={isRegionsOpen}
        setIsOpen={setIsRegionsOpen}
        bgClass="bg-seftec-slate dark:bg-seftec-darkNavy/50"
      >
        <RegionsCoveredSection />
      </CollapsibleSection>
      
      {/* Advantages Section - Mobile Collapsible */}
      <CollapsibleSection
        id="advantages-section"
        title="Competitive Advantage"
        isOpen={isAdvantagesOpen}
        setIsOpen={setIsAdvantagesOpen}
        bgClass="dark:bg-seftec-darkNavy"
      >
        <AdvantagesSection />
      </CollapsibleSection>
    </>
  );
};

export default MobileCollapsibleSections;
