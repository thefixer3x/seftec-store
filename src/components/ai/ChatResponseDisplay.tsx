
import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import { Markdown } from '@/components/ui/markdown';

interface ChatResponseDisplayProps {
  response: string;
  isTyping: boolean;
  error: string | null;
  isReport?: boolean;
}

const ChatResponseDisplay: React.FC<ChatResponseDisplayProps> = ({ 
  response, 
  isTyping, 
  error,
  isReport = false
}) => {
  return (
    <div className={`bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg overflow-y-auto ${isReport ? 'min-h-[300px] max-h-[500px]' : 'min-h-[100px] max-h-[250px]'}`}>
      {error ? (
        <div className="flex items-start space-x-2 text-red-500 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold mb-1">Error</p>
            <p className="text-sm">{error}</p>
            {error.includes('API key') && (
              <p className="text-xs mt-2 text-amber-600 dark:text-amber-400">
                The AI service is currently unavailable. Please try again later or contact the administrator.
              </p>
            )}
          </div>
        </div>
      ) : response ? (
        <>
          <div className="flex items-center gap-2 text-xs text-seftec-navy/60 dark:text-white/60 mb-2">
            <span>BizGenie{isReport ? " Report" : ""}:</span>
            {isReport && <FileText size={14} className="text-seftec-teal" />}
          </div>
          <div className={`text-seftec-navy dark:text-white/90 ${isReport ? 'report-content' : ''}`}>
            <Markdown content={response} />
            {isTyping && <span className="inline-block animate-pulse">▋</span>}
          </div>
        </>
      ) : (
        <p className="text-seftec-navy/50 dark:text-white/50 italic">
          {isReport 
            ? "Enter a prompt to generate a detailed business report with analysis and recommendations..." 
            : "Ask a question about your business finances, market trends, or strategic opportunities..."}
        </p>
      )}
    </div>
  );
};

export default ChatResponseDisplay;
