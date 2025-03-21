
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FileText } from 'lucide-react';

interface ChatInputFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleAskAI: () => void;
  isTyping: boolean;
  isPremium: boolean;
  userTrainingEnabled: boolean;
  setUserTrainingEnabled: (enabled: boolean) => void;
  generateReport: boolean;
  setGenerateReport: (enabled: boolean) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  query,
  setQuery,
  handleAskAI,
  isTyping,
  isPremium,
  userTrainingEnabled,
  setUserTrainingEnabled,
  generateReport,
  setGenerateReport
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <Switch 
            checked={userTrainingEnabled} 
            onCheckedChange={setUserTrainingEnabled} 
            className="data-[state=checked]:bg-seftec-navy dark:data-[state=checked]:bg-seftec-teal"
          />
          <span className="text-xs text-seftec-navy/70 dark:text-white/70">
            Allow BizGenie to learn from my queries
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            checked={generateReport} 
            onCheckedChange={setGenerateReport} 
            className="data-[state=checked]:bg-seftec-navy dark:data-[state=checked]:bg-seftec-teal"
          />
          <span className="flex items-center gap-1 text-xs text-seftec-navy/70 dark:text-white/70">
            <FileText size={14} />
            Generate Report
          </span>
        </div>
      </div>
    
      <Textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={generateReport 
          ? "e.g., Create a market analysis report for small retail businesses in 2024" 
          : "e.g., How can I improve my company's cash flow?"}
        className="resize-none h-[80px] border-seftec-slate/50 dark:border-white/20"
      />
      
      <Button 
        className={cn(
          "w-full text-white hover:bg-opacity-90 dark:hover:opacity-90",
          isPremium 
            ? "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-400 dark:to-amber-500" 
            : "bg-seftec-navy dark:bg-gradient-teal-purple",
          generateReport && "flex items-center gap-2"
        )}
        onClick={handleAskAI}
        disabled={isTyping || !query.trim()}
      >
        {isTyping ? "Processing..." : (
          <>
            {generateReport && <FileText size={16} />}
            {`${generateReport ? "Generate Report" : "Ask BizGenie"} ${isPremium ? "(Premium)" : ""}`}
          </>
        )}
      </Button>
      
      <p className="text-xs text-seftec-navy/60 dark:text-white/60 text-center">
        Your data is analyzed securely using enterprise-grade encryption
        {isPremium && " • Premium insights powered by advanced analytics"}
        {generateReport && " • Reports include detailed analysis and recommendations"}
      </p>
    </div>
  );
};

export default ChatInputForm;
