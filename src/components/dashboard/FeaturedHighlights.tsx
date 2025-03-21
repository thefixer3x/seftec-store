
import React from 'react';
import FeatureHighlight from './FeatureHighlight';

const FeaturedHighlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 animate-fade-in">
      <FeatureHighlight 
        title="Business Analytics" 
        description="Get insights into your business performance and growth trends"
        icon="zap"
        variant="purple"
      />
      
      <FeatureHighlight 
        title="AI-Powered Recommendations" 
        description="Receive personalized suggestions to optimize your business"
        icon="sparkle"
        variant="blue"
      />
      
      <FeatureHighlight 
        title="Payment Analytics" 
        description="Track and analyze all your payment transactions in one place"
        icon="star"
        variant="orange"
      />
    </div>
  );
};

export default FeaturedHighlights;
