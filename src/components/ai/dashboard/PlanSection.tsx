
import React from 'react';
import BusinessPlanForm, { PlanFormData } from '@/components/ai/BusinessPlanForm';
import BusinessPlanDisplay from '@/components/ai/BusinessPlanDisplay';

interface PlanSectionProps {
  businessPlan: string;
  isLoading: boolean;
  planError: string | null;
  handlePlanSubmit: (planData: PlanFormData) => Promise<void>;
}

const PlanSection: React.FC<PlanSectionProps> = ({
  businessPlan,
  isLoading,
  planError,
  handlePlanSubmit
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <BusinessPlanForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
      </div>
      <div>
        <BusinessPlanDisplay 
          planHtml={businessPlan}
          isLoading={isLoading}
          error={planError}
        />
      </div>
    </div>
  );
};

export default PlanSection;
