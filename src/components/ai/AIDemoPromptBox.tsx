
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkle, Send, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PROMPT_LIMIT = 5;
const PROMPT_STORAGE_KEY = 'bizgenie-demo-prompts';

const AIDemoPromptBox: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [promptCount, setPromptCount] = useState<number>(0);
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);

  // Load prompt count from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem(PROMPT_STORAGE_KEY);
    if (savedPrompts) {
      const count = JSON.parse(savedPrompts).length;
      setPromptCount(count);
      setLimitReached(count >= PROMPT_LIMIT);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || limitReached) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Call anonymous OpenAI proxy
      const response = await fetch('/api/openai-anon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response. Please try again.');
      }
      
      const data = await response.json();
      setResponse(data.text);
      
      // Save prompt to localStorage
      const savedPrompts = localStorage.getItem(PROMPT_STORAGE_KEY);
      const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];
      prompts.push({ prompt, timestamp: new Date().toISOString() });
      localStorage.setItem(PROMPT_STORAGE_KEY, JSON.stringify(prompts));
      
      // Update prompt count
      const newCount = prompts.length;
      setPromptCount(newCount);
      setLimitReached(newCount >= PROMPT_LIMIT);
      
      // Clear input
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
      
      // Scroll to response
      if (responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Card className="shadow-md bg-white dark:bg-seftec-darkNavy/30 border-seftec-slate dark:border-seftec-charcoal overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-seftec-gold dark:text-white animate-sparkle" />
            <CardTitle className="text-lg font-medium">BizGenie AI Demo</CardTitle>
          </div>
          <div className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full">
            {promptCount}/{PROMPT_LIMIT} Prompts
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        {response && (
          <div 
            ref={responseRef}
            className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg mb-4 text-seftec-navy dark:text-white/90 max-h-[200px] overflow-y-auto"
          >
            <div className="flex items-center gap-2 text-xs text-seftec-navy/60 dark:text-white/60 mb-2">
              <span>BizGenie:</span>
            </div>
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={limitReached ? "Prompt limit reached. Sign up for more." : "Ask BizGenie about business strategies, market trends..."}
              className={cn(
                "resize-none min-h-[80px] focus:border-seftec-gold dark:focus:border-seftec-teal",
                limitReached && "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
              )}
              disabled={limitReached || isLoading}
              aria-label="AI prompt input"
            />
          </div>
          
          {error && (
            <div className="flex items-start space-x-2 text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {limitReached ? (
              <div className="w-full bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-3 rounded-lg text-center">
                <span className="text-amber-800 dark:text-amber-300 font-medium">🚫 Limit Reached. Sign up to unlock personalized advice.</span>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="mt-2 bg-seftec-navy text-white hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:text-white dark:hover:bg-seftec-teal/90"
                  onClick={() => window.location.href = "/register"}
                >
                  Sign Up Now
                </Button>
              </div>
            ) : (
              <>
                <div className="text-xs text-seftec-navy/50 dark:text-white/50">
                  Demo Mode: {PROMPT_LIMIT - promptCount} prompts remaining
                </div>
                <Button 
                  type="submit" 
                  disabled={!prompt.trim() || isLoading}
                  className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white"
                  aria-label="Submit prompt"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Processing..." : "Ask BizGenie"}
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIDemoPromptBox;
