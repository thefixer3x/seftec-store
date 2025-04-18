
import React from 'react';
import FAQSearch from './FAQSearch';
import FAQCategory from './FAQCategory';
import FAQCTA from './FAQCTA';
import { 
  platformOverviewFAQs, 
  accountManagementFAQs,
  transactionsPaymentsFAQs,
  securityComplianceFAQs,
  supportIntegrationFAQs,
} from './data';

interface FAQSectionProps {
  compact?: boolean;
}

const FAQSection = ({ compact = false }: FAQSectionProps) => {
  return (
    <div className={compact ? "py-6" : "py-12"}>
      <div className="container mx-auto px-4">
        {!compact && (
          <FAQSearch />
        )}
        
        {compact ? (
          // Compact mode for homepage - show a subset of FAQs
          <>
            <FAQCategory 
              title="Platform Overview" 
              items={platformOverviewFAQs.slice(0, 2)} 
            />
            <FAQCategory 
              title="Security & Compliance" 
              items={securityComplianceFAQs.slice(0, 2)} 
            />
          </>
        ) : (
          // Full FAQ page display
          <>
            <FAQCategory title="Platform Overview" items={platformOverviewFAQs} />
            <FAQCategory title="Account Management" items={accountManagementFAQs} />
            <FAQCategory title="Transactions & Payments" items={transactionsPaymentsFAQs} />
            <FAQCategory title="Security & Compliance" items={securityComplianceFAQs} />
            <FAQCategory title="Support & Integration" items={supportIntegrationFAQs} />
            <FAQCTA />
          </>
        )}
      </div>
    </div>
  );
};

export default FAQSection;
