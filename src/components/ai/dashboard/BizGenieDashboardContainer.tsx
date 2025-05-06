
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MarketInsightAlert from '@/components/ai/MarketInsightAlert';
import ModeTabs from '@/components/ai/ModeTabs';
import { PlanFormData } from '@/components/ai/BusinessPlanForm';
import ChatSection from './ChatSection';
import PlanSection from './PlanSection';

interface BizGenieDashboardProps {
  userId?: string;
}

const BizGenieDashboardContainer: React.FC<BizGenieDashboardProps> = ({ userId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allowLearning, setAllowLearning] = useState<boolean>(true);
  const [generateReport, setGenerateReport] = useState<boolean>(false);
  const [marketInsight, setMarketInsight] = useState<string>('');
  const responseRef = useRef<HTMLDivElement>(null);
  
  // State for business plan mode
  const [activeMode, setActiveMode] = useState<'chat' | 'plan'>('chat');
  const [businessPlan, setBusinessPlan] = useState<string>('');
  const [planError, setPlanError] = useState<string | null>(null);
  
  // Use userId from props or from auth context
  const actualUserId = userId || user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || isLoading) return;
    
    if (!actualUserId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Call personalized OpenAI proxy
      const response = await fetch('/api/openai-personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          userId: actualUserId,
          allowLearning,
          generateReport
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response. Please try again.');
      }
      
      const data = await response.json();
      setResponse(data.text);
      
      // Set market insight if available
      if (data.marketInsight) {
        setMarketInsight(data.marketInsight);
      }
      
      // Clear input
      setPrompt('');
      
      // Show success toast
      toast({
        title: generateReport ? "Business report generated" : "BizGenie responded",
        description: generateReport 
          ? "Your personalized business report is ready to view" 
          : "Check out the personalized insights from BizGenie",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      
      // Scroll to response
      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle business plan form submission
  const handlePlanSubmit = async (planData: PlanFormData) => {
    if (!actualUserId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setPlanError(null);
      
      // Call the Supabase edge function for business plan generation
      const { data, error } = await supabase.functions.invoke('bizgenie-router', {
        body: { 
          mode: 'business-plan',
          planData,
          userId: actualUserId
        }
      });
      
      if (error) throw new Error(error.message);
      if (!data || !data.planHtml) {
        throw new Error('Failed to generate business plan. Please try again.');
      }
      
      // Set the generated business plan
      setBusinessPlan(data.planHtml);
      
      // Show success toast
      toast({
        title: "Business Plan Generated",
        description: "Your personalized business plan is ready to view",
      });
      
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md bg-white dark:bg-seftec-darkNavy/30 border-seftec-slate dark:border-seftec-charcoal overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-seftec-gold dark:text-white animate-sparkle" />
            <CardTitle className="text-lg font-medium">BizGenie AI Assistant</CardTitle>
          </div>
          <div className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full">
            Personalized
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        {marketInsight && <MarketInsightAlert marketInsight={marketInsight} />}
        
        <ModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
        
        {activeMode === 'chat' ? (
          <ChatSection 
            prompt={prompt}
            setPrompt={setPrompt}
            response={response}
            allowLearning={allowLearning}
            setAllowLearning={setAllowLearning}
            generateReport={generateReport}
            setGenerateReport={setGenerateReport}
            error={error}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            responseRef={responseRef}
          />
        ) : (
          <PlanSection 
            businessPlan={businessPlan}
            isLoading={isLoading}
            planError={planError}
            handlePlanSubmit={handlePlanSubmit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BizGenieDashboardContainer;
