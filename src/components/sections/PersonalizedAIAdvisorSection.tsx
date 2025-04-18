
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import AIFeaturesList from '@/components/ai/AIFeaturesList';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AIDemoPromptBox from '@/components/ai/AIDemoPromptBox';

const PersonalizedAIAdvisorSection = () => {
  const { user } = useAuth();
  
  return (
    <section id="ai-advisor" className="py-16 md:py-24 bg-gradient-to-b from-white to-seftec-slate/30 dark:from-seftec-darkNavy dark:to-seftec-darkNavy/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90 mb-4">
            <Shield className="mr-2 text-seftec-gold dark:text-seftec-teal" />
            AI-Powered Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-4">Meet Your Personal AI Business Advisor</h2>
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
            Get personalized recommendations, market insights, and business analysis from our advanced AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <AIFeaturesList />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {user ? (
                <Link to="/profile/dashboard">
                  <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                    Access Your AI Advisor
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
                    Sign In To Access AI
                  </Button>
                </Link>
              )}
              <Link to="/value-propositions/bizgenie">
                <Button variant="outline" size="lg" className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
            <AIDemoPromptBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedAIAdvisorSection;
