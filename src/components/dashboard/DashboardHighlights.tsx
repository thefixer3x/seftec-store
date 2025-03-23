
import React from 'react';
import FeaturedHighlights from './FeaturedHighlights';
import QuickActions from './QuickActions';
import CallToAction from '@/components/ui/call-to-action';
import PaymentAnalytics from '@/components/ui/payment-analytics';

const DashboardHighlights: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-seftec-navy dark:text-white">Analytics Overview</h2>
        <PaymentAnalytics />
      </div>
      <QuickActions />
      <FeaturedHighlights />
      
      <CallToAction 
        title="Try Our Enhanced AI Analysis"
        description="Unlock deeper insights with our premium AI business analysis tools."
        primaryButtonText="Upgrade Now"
        secondaryButtonText="Learn More"
      />
    </div>
  );
};

export default DashboardHighlights;
