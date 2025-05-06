
import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { AlertCircle } from 'lucide-react';
import { sanitizeHTML } from '@/utils/sanitize';

interface BusinessPlanDisplayProps {
  planHtml: string;
  isLoading: boolean;
  error: string | null;
}

const BusinessPlanDisplay: React.FC<BusinessPlanDisplayProps> = ({ planHtml, isLoading, error }) => {
  const planRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top when new plan is loaded
  useEffect(() => {
    if (planHtml && planRef.current) {
      planRef.current.scrollTop = 0;
    }
  }, [planHtml]);

  if (isLoading) {
    return (
      <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <svg className="animate-spin h-10 w-10 text-seftec-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-seftec-navy/60 dark:text-white/60">
            Crafting your business plan...
          </p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400 mx-auto" />
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <p className="text-sm text-red-400 dark:text-red-300">
            Please try again or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }
  
  if (!planHtml) {
    return (
      <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-seftec-navy/60 dark:text-white/60">
            Your business plan will appear here.
          </p>
          <p className="text-xs mt-2 text-seftec-navy/40 dark:text-white/40">
            Fill out the form on the left and click "Generate Business Plan"
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={planRef}
      className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg text-seftec-navy dark:text-white/90 
                overflow-y-auto min-h-[300px] max-h-[600px] business-plan-content"
    >
      <div className="flex items-center gap-2 text-xs text-seftec-navy/60 dark:text-white/60 mb-2">
        <span>BizGenie Business Plan:</span>
      </div>
      <div 
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={sanitizeHTML(planHtml)} 
      />
    </div>
  );
};

export default BusinessPlanDisplay;
