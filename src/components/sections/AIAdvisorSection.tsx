
import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { 
  Bot, Brain, TrendingUp, DollarSign, BarChart, 
  Shield, Bell, Lock, AlertTriangle 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RecommendationsSection from "@/components/ai/RecommendationsSection";

const AIAdvisorSection: React.FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hasNotification, setHasNotification] = useState(false);
  const [marketInsight, setMarketInsight] = useState("");
  const [userTrainingEnabled, setUserTrainingEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Check for current user
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Simulate market data fetching
  useEffect(() => {
    const insights = [
      "USD/EUR exchange rate changed by +0.7% in the last hour. Consider adjusting your pricing strategy.",
      "Semiconductor industry showing 12% growth this quarter. Opportunity for technology sector suppliers.",
      "New tariff agreement between US-China affects import duties. Check your supply chain exposure.",
      "Commodity prices for aluminum decreased 3.2%. Potential savings opportunity for manufacturers."
    ];
    
    // Set initial market insight
    setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    
    // Update market insights periodically
    const marketInterval = setInterval(() => {
      setMarketInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(marketInterval);
  }, []);

  // Simulate notification system
  useEffect(() => {
    if (!notificationsEnabled) return;
    
    const notifications = [
      "Payment due for Invoice #INV-2023-089 in 3 days",
      "Quarterly tax filing deadline approaching in 15 days",
      "Inventory level for SKU-78923 below minimum threshold",
      "New compliance regulation affecting your industry effective next month"
    ];
    
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        setHasNotification(true);
        
        toast({
          title: "Business Alert",
          description: notification,
          duration: 5000,
        });
      }
    }, 45000); // Every 45 seconds
    
    return () => clearInterval(notificationInterval);
  }, [notificationsEnabled, toast]);

  // Mock AI response generation with learning simulation
  const handleAskAI = () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    setResponse("");
    
    // Simulate AI thinking and typing
    const fullResponse = getAIResponse(query, isPremium);
    let i = 0;
    
    if (userTrainingEnabled) {
      // Simulate storing the query for improving future responses
      console.log("Learning from user query:", query);
    }
    
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

  // Mock AI responses with premium tier differentiation
  const getAIResponse = (query: string, isPremium: boolean) => {
    const standardResponses = [
      "Based on your current cash flow patterns, I recommend allocating 15% more resources to digital marketing channels which are showing a 2.3x ROI compared to traditional methods.",
      "Analysis of your inventory turnover indicates potential for a 12% reduction in carrying costs. Consider implementing a just-in-time system with your top 3 suppliers.",
      "Market trend analysis suggests an emerging opportunity in sustainable products. Companies in your sector that pivoted early saw an average 18% revenue growth over 24 months.",
      "Your current debt-to-equity ratio of 1.5 is slightly higher than industry average (1.2). Restructuring your short-term debt could save approximately $25,000 in interest annually.",
      "Based on seasonal patterns in your industry, I recommend increasing inventory by 22% in Q3 to prepare for the projected demand spike in Q4."
    ];
    
    const premiumResponses = [
      "PREMIUM INSIGHT: Our AI has analyzed your cash flow patterns against 1,247 similar businesses and identified 3 strategic opportunities: 1) Reallocate 15.7% of marketing budget to digital channels (2.7x ROI potential), 2) Consolidate vendor payments to qualify for a 3.2% early payment discount, 3) Implement tiered pricing strategy with potential 8.3% revenue increase.",
      "PREMIUM INSIGHT: Comprehensive inventory analysis shows you can reduce carrying costs by 17.3% by implementing dynamic reorder points for your top 8 SKUs. Additionally, supplier diversification for raw materials could reduce risk exposure by 24% while maintaining just-in-time efficiency.",
      "PREMIUM INSIGHT: Deep market analysis shows your sector is experiencing a paradigm shift toward sustainable offerings, with early adopters gaining 22.6% market share growth. We've identified 5 specific product categories where sustainability credentials would generate premium pricing potential of 12-18%.",
      "PREMIUM INSIGHT: Financial restructuring simulation indicates you could save $42,750 annually by refinancing current debt. Additionally, our algorithm has identified $127,000 in trapped working capital that could be released through optimized payment terms and collections processes.",
      "PREMIUM INSIGHT: Predictive demand modeling based on 5-year historical data and 12 market variables suggests increasing inventory selectively - 32% for product lines A and C, while reducing line B by 15%. This optimization would improve cash flow by $36,000 per quarter while maintaining 99.2% fill rates."
    ];
    
    // Determine if the response should be premium
    const responses = isPremium ? premiumResponses : standardResponses;
    
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

  // Toggle premium mode
  const handlePremiumToggle = () => {
    if (!isPremium) {
      toast({
        title: "Premium Features Activated",
        description: "You now have access to advanced business insights and recommendations.",
        duration: 3000,
      });
    }
    setIsPremium(!isPremium);
  };

  // Clear notification indicator
  const handleClearNotification = () => {
    setHasNotification(false);
  };

  return (
    <section id="ai-advisor" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="AI-Powered Insights"
          title="BizGenie AI: Your Personalised Business Advisor"
          subtitle="Our AI assistant analyzes your financial data and business operations to deliver actionable insights, alerts, and strategic recommendations."
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
          
          {/* AI Chat Demo */}
          <div className="lg:col-span-7 animate-fade-up animate-delay-300">
            <Card className="bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <h3 className="font-medium">BizGenie AI Assistant</h3>
                    {hasNotification && (
                      <span 
                        className="relative flex h-3 w-3 cursor-pointer" 
                        onClick={handleClearNotification}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Notifications</span>
                      <Switch 
                        checked={notificationsEnabled} 
                        onCheckedChange={setNotificationsEnabled} 
                        className="data-[state=checked]:bg-seftec-teal"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span className="text-xs">Premium</span>
                      <Switch 
                        checked={isPremium} 
                        onCheckedChange={handlePremiumToggle} 
                        className="data-[state=checked]:bg-amber-400"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Live Market Insight Alert */}
                  <Alert className="bg-seftec-navy/5 dark:bg-white/5 border-seftec-teal/30">
                    <TrendingUp className="h-4 w-4 text-seftec-teal" />
                    <AlertTitle className="text-seftec-navy dark:text-white">Live Market Insight</AlertTitle>
                    <AlertDescription className="text-seftec-navy/70 dark:text-white/70">
                      {marketInsight}
                    </AlertDescription>
                  </Alert>
                
                  <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[100px] max-h-[250px] overflow-y-auto">
                    {response ? (
                      <>
                        <p className="text-xs text-seftec-navy/60 dark:text-white/60 mb-2">BizGenie:</p>
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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={userTrainingEnabled} 
                          onCheckedChange={setUserTrainingEnabled} 
                          className="data-[state=checked]:bg-seftec-navy dark:data-[state=checked]:bg-seftec-teal"
                        />
                        <span className="text-xs text-seftec-navy/70 dark:text-white/70">
                          Allow BizGenie to learn from my queries to improve future responses
                        </span>
                      </div>
                    </div>
                  
                    <Textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g., How can I improve my company's cash flow?"
                      className="resize-none h-[80px] border-seftec-slate/50 dark:border-white/20"
                    />
                    
                    <Button 
                      className={cn(
                        "w-full text-white hover:bg-opacity-90 dark:hover:opacity-90",
                        isPremium 
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-400 dark:to-amber-500" 
                          : "bg-seftec-navy dark:bg-gradient-teal-purple"
                      )}
                      onClick={handleAskAI}
                      disabled={isTyping || !query.trim()}
                    >
                      {isTyping ? "Processing..." : `Ask BizGenie ${isPremium ? "(Premium)" : ""}`}
                    </Button>
                    
                    <p className="text-xs text-seftec-navy/60 dark:text-white/60 text-center">
                      Your data is analyzed securely using enterprise-grade encryption
                      {isPremium && " • Premium insights powered by advanced analytics"}
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
  premium?: boolean;
  secure?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, premium, secure }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-md transition-all duration-300">
      <div className={cn(
        "flex-shrink-0 p-2 rounded-md",
        "bg-gradient-to-br from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple",
        "text-white"
      )}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-seftec-navy dark:text-white">{title}</h4>
          {premium && (
            <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full">Premium</span>
          )}
          {secure && (
            <Shield size={14} className="text-seftec-teal" />
          )}
        </div>
        <p className="text-sm text-seftec-navy/70 dark:text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default AIAdvisorSection;
