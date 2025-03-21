
import React from 'react';
import FeaturedHighlights from './FeaturedHighlights';
import QuickActions from './QuickActions';
import CallToAction from '@/components/ui/call-to-action';

const DashboardHighlights: React.FC = () => {
  return (
    <div className="space-y-6">
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
