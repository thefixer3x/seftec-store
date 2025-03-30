
import React from 'react';
import { Lightbulb, BrainCircuit, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
          {/* AI Chat Demo Interface - using the design from the provided image */}
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden border-0 shadow-lg">
              <CardContent className="p-0 h-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5" />
                    <h3 className="font-medium">BizGenie AI Assistant</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Notifications</span>
                      <div className="h-5 w-10 rounded-full bg-teal-400/30 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Premium</span>
                      <div className="h-5 w-10 rounded-full bg-gray-700 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white ml-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Market Insight */}
                <div className="p-4 bg-seftec-darkNavy text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <h4 className="font-medium">Live Market Insight</h4>
                  </div>
                  <p className="text-sm text-white/80">
                    Commodity prices for aluminum decreased 3.2%. Potential savings opportunity for manufacturers.
                  </p>
                </div>
                
                {/* Chat Area */}
                <div className="bg-seftec-darkNavy/90 p-6 text-white min-h-[120px] flex items-center justify-center">
                  <p className="text-white/70 italic">
                    Ask a question about your business finances, market trends, or strategic opportunities...
                  </p>
                </div>
                
                {/* Controls */}
                <div className="p-4 bg-seftec-darkNavy/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-10 rounded-full bg-teal-400/30 p-0.5">
                        <div className="h-4 w-4 rounded-full bg-white ml-5"></div>
                      </div>
                      <span className="text-xs text-white/70">Allow BizGenie to learn from my queries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-gray-700/50">
                        <TrendingUp className="h-4 w-4 text-white/70 m-0.5" />
                      </div>
                      <span className="text-xs text-white/70">Generate Report</span>
                    </div>
                  </div>
                  
                  {/* Input */}
                  <div className="bg-seftec-darkNavy/90 rounded px-4 py-3 text-white/50">
                    e.g., How can I improve my company's cash flow?
                  </div>
                  
                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 rounded">
                    Ask BizGenie
                  </button>
                  
                  <p className="text-xs text-center text-white/50">
                    Your data is analyzed securely using enterprise-grade encryption
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Alert className="mt-4 bg-white/5 backdrop-blur-sm border-seftec-teal/30">
              <AlertCircle className="h-4 w-4 text-seftec-teal" />
              <AlertDescription className="flex justify-between items-center">
                <span>Sign in to unlock premium features, personalized insights, and save your conversation history.</span>
                <Link to="/login">
                  <Button size="sm" className="ml-4 bg-seftec-teal hover:bg-seftec-teal/90">
                    Sign In
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
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

export default PersonalizedAIAdvisorSection;
