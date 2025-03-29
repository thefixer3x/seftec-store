
import React from 'react';
import { Lightbulb, BrainCircuit, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PersonalizedAIChatInterface from '@/components/ai/PersonalizedAIChatInterface';

const PersonalizedAIAdvisorSection: React.FC = () => {
  return (
    <section id="ai-advisor" className="py-20 bg-white dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-seftec-navy dark:text-white">
            <span className="flex items-center justify-center gap-2">
              <BrainCircuit className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
              <span>AI-Powered Business Advisor</span>
            </span>
          </h2>
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-3xl mx-auto">
            Our AI assistant provides personalized insights and recommendations tailored to your business needs, trade patterns, and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6 h-full">
                <PersonalizedAIChatInterface />
              </CardContent>
            </Card>
          </div>
          
          {/* AI Features */}
          <div className="space-y-4">
            <Feature 
              icon={<Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />}
              title="Global Market Insights"
              description="Get real-time insights on markets worldwide with localized trade regulations and opportunities."
            />
            
            <Feature 
              icon={<TrendingUp className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />}
              title="Personalized Recommendations"
              description="Receive tailored suggestions based on your business profile, past transactions, and preferences."
            />
            
            <Feature 
              icon={<Lightbulb className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />}
              title="Smart Risk Assessment"
              description="AI analyzes potential risks in transactions and suggests safer alternatives based on your risk tolerance."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-seftec-slate dark:bg-seftec-darkNavy border border-seftec-navy/10 dark:border-white/10 rounded-lg p-6 transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-seftec-navy dark:text-white">{title}</h3>
          <p className="text-seftec-navy/70 dark:text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedAIAdvisorSection;
