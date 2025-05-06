import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkle, Send, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import MarketInsightAlert from '@/components/ai/MarketInsightAlert';
import ModeTabs from '@/components/ai/ModeTabs';
import BusinessPlanForm, { PlanFormData } from '@/components/ai/BusinessPlanForm';
import BusinessPlanDisplay from '@/components/ai/BusinessPlanDisplay';
import { supabase } from '@/integrations/supabase/client';

interface BizGenieDashboardProps {
  userId?: string; // Optional: Can be passed directly or obtained from auth context
}

const BizGenieDashboard: React.FC<BizGenieDashboardProps> = ({ userId }) => {
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
  
  // New state for business plan mode
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
          <>
            {response && (
              <div 
                ref={responseRef}
                className={cn(
                  "bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg text-seftec-navy dark:text-white/90 overflow-y-auto",
                  generateReport ? "min-h-[300px] max-h-[400px]" : "min-h-[100px] max-h-[250px]"
                )}
              >
                <div className="flex items-center gap-2 text-xs text-seftec-navy/60 dark:text-white/60 mb-2">
                  <span>BizGenie{generateReport ? " Report" : ""}:</span>
                  {generateReport && <FileText size={14} className="text-seftec-teal" />}
                </div>
                <div className={generateReport ? 'whitespace-pre-line report-content' : 'whitespace-pre-line'}>
                  {response}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={generateReport 
                    ? "Describe your business challenge for a comprehensive analysis..." 
                    : "Ask about business strategies, market trends, financial advice..."}
                  className="resize-none min-h-[100px] focus:border-seftec-gold dark:focus:border-seftec-teal"
                  disabled={isLoading}
                  aria-label="AI prompt input"
                />
              </div>
              
              {error && (
                <div className="flex items-start space-x-2 text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="learning-toggle"
                      checked={allowLearning}
                      onCheckedChange={setAllowLearning}
                      aria-label="Allow BizGenie to learn from my queries"
                    />
                    <Label htmlFor="learning-toggle" className="text-sm cursor-pointer">
                      Learn from queries
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="report-toggle"
                      checked={generateReport}
                      onCheckedChange={(checked) => setGenerateReport(checked as boolean)}
                      aria-label="Generate detailed business report"
                    />
                    <Label htmlFor="report-toggle" className="text-sm cursor-pointer">
                      Generate Report
                    </Label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={!prompt.trim() || isLoading}
                  className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white"
                  aria-label="Submit prompt"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Processing..." : generateReport ? "Generate Report" : "Ask BizGenie"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <BusinessPlanForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
            </div>
            <div>
              <BusinessPlanDisplay 
                planHtml={businessPlan}
                isLoading={isLoading}
                error={planError}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BizGenieDashboard;
