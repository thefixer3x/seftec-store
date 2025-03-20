
import React from 'react';
import { Brain, TrendingUp, DollarSign, BarChart, Shield, Bell } from 'lucide-react';
import FeatureCard from './FeatureCard';
import RecommendationsSection from './RecommendationsSection';

const AIFeaturesList: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col space-y-4">
        <FeatureCard 
          icon={<Brain className="h-6 w-6" />} 
          title="Advanced Data Analysis" 
          description="Our AI engine processes your business data to identify patterns, trends, and opportunities."
        />
        
        <FeatureCard 
          icon={<TrendingUp className="h-6 w-6" />} 
          title="Predictive Forecasting" 
          description="Anticipate market changes and business performance with AI-powered predictive models."
          premium
        />
        
        <FeatureCard 
          icon={<DollarSign className="h-6 w-6" />} 
          title="Financial Optimization" 
          description="Receive tailored recommendations to improve cash flow, reduce costs, and maximize profitability."
        />
        
        <FeatureCard 
          icon={<BarChart className="h-6 w-6" />} 
          title="Performance Benchmarking" 
          description="Compare your metrics against industry standards to identify strengths and improvement areas."
          premium
        />
        
        <FeatureCard 
          icon={<Shield className="h-6 w-6" />} 
          title="Risk Management" 
          description="Identify potential business risks and get strategic advice to mitigate them effectively."
        />
        
        <FeatureCard 
          icon={<Bell className="h-6 w-6" />} 
          title="Smart Notifications & Alerts" 
          description="Receive timely alerts about payment deadlines, market changes, and business opportunities."
          secure
        />
      </div>
      
      {/* Product Recommendations */}
      <RecommendationsSection />
    </div>
  );
};

export default AIFeaturesList;
