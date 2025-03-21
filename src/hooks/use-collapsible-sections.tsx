
import { useState } from "react";

export function useCollapsibleSections() {
  const [isProblemsOpen, setIsProblemsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  const [isAdvantagesOpen, setIsAdvantagesOpen] = useState(false);

  return {
    isProblemsOpen, setIsProblemsOpen,
    isFeaturesOpen, setIsFeaturesOpen,
    isAIAdvisorOpen, setIsAIAdvisorOpen,
    isBusinessOpen, setIsBusinessOpen,
    isPaymentOpen, setIsPaymentOpen,
    isTestimonialsOpen, setIsTestimonialsOpen,
    isRegionsOpen, setIsRegionsOpen,
    isAdvantagesOpen, setIsAdvantagesOpen
  };
}
