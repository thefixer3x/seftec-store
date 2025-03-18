
import React, { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Bot, Brain, TrendingUp, DollarSign, BarChart, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const AIAdvisorSection: React.FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  // Mock AI response generation
  const handleAskAI = () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    setResponse("");
    
    // Simulate AI thinking and typing
    const fullResponse = getAIResponse(query);
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < fullResponse.length) {
        setResponse(prev => prev + fullResponse.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 15);
  };

  // Mock AI responses
  const getAIResponse = (query: string) => {
    const responses = [
      "Based on your current cash flow patterns, I recommend allocating 15% more resources to digital marketing channels which are showing a 2.3x ROI compared to traditional methods.",
      "Analysis of your inventory turnover indicates potential for a 12% reduction in carrying costs. Consider implementing a just-in-time system with your top 3 suppliers.",
      "Market trend analysis suggests an emerging opportunity in sustainable products. Companies in your sector that pivoted early saw an average 18% revenue growth over 24 months.",
      "Your current debt-to-equity ratio of 1.5 is slightly higher than industry average (1.2). Restructuring your short-term debt could save approximately $25,000 in interest annually.",
      "Based on seasonal patterns in your industry, I recommend increasing inventory by 22% in Q3 to prepare for the projected demand spike in Q4."
    ];
    
    // Return a response that somewhat relates to the query
    if (query.toLowerCase().includes("cash") || query.toLowerCase().includes("money"))
      return responses[0];
    else if (query.toLowerCase().includes("inventory") || query.toLowerCase().includes("stock"))
      return responses[1];
    else if (query.toLowerCase().includes("market") || query.toLowerCase().includes("trend"))
      return responses[2];
    else if (query.toLowerCase().includes("debt") || query.toLowerCase().includes("loan"))
      return responses[3];
    else
      return responses[4];
  };

  return (
    <section id="ai-advisor" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="AI-Powered Insights"
          title="Your Strategic Business Advisor"
          subtitle="Our AI assistant analyzes your financial data and business operations to deliver actionable insights and strategic recommendations."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 reveal">
          {/* AI Features */}
          <div className="lg:col-span-5 space-y-6 animate-fade-up">
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
              />
              
              <FeatureCard 
                icon={<Shield className="h-6 w-6" />} 
                title="Risk Management" 
                description="Identify potential business risks and get strategic advice to mitigate them effectively."
              />
            </div>
          </div>
          
          {/* AI Chat Demo */}
          <div className="lg:col-span-7 animate-fade-up animate-delay-300">
            <Card className="bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-medium">AI Business Advisor</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[100px] max-h-[250px] overflow-y-auto">
                    {response ? (
                      <>
                        <p className="text-xs text-seftec-navy/60 dark:text-white/60 mb-2">AI Advisor:</p>
                        <p className="text-seftec-navy dark:text-white/90">{response}</p>
                        {isTyping && <span className="inline-block animate-pulse">▋</span>}
                      </>
                    ) : (
                      <p className="text-seftec-navy/50 dark:text-white/50 italic">
                        Ask a question about your business finances, market trends, or strategic opportunities...
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g., How can I improve my company's cash flow?"
                      className="resize-none h-[80px] border-seftec-slate/50 dark:border-white/20"
                    />
                    
                    <Button 
                      className="w-full bg-seftec-navy dark:bg-gradient-teal-purple text-white hover:bg-seftec-navy/90 dark:hover:opacity-90"
                      onClick={handleAskAI}
                      disabled={isTyping || !query.trim()}
                    >
                      {isTyping ? "Processing..." : "Ask AI Advisor"}
                    </Button>
                    
                    <p className="text-xs text-seftec-navy/60 dark:text-white/60 text-center">
                      Your data is analyzed securely using enterprise-grade encryption
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-md transition-all duration-300">
      <div className={cn(
        "flex-shrink-0 p-2 rounded-md",
        "bg-gradient-to-br from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple",
        "text-white"
      )}>
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-seftec-navy dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-seftec-navy/70 dark:text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default AIAdvisorSection;
