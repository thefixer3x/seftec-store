
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, FileText, AlertCircle } from 'lucide-react';

interface ChatSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
  response: string;
  allowLearning: boolean;
  setAllowLearning: (value: boolean) => void;
  generateReport: boolean;
  setGenerateReport: (value: boolean) => void;
  error: string | null;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  responseRef: React.RefObject<HTMLDivElement>;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  prompt,
  setPrompt,
  response,
  allowLearning,
  setAllowLearning,
  generateReport,
  setGenerateReport,
  error,
  isLoading,
  handleSubmit,
  responseRef
}) => {
  return (
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
  );
};

import { cn } from '@/lib/utils';
export default ChatSection;
