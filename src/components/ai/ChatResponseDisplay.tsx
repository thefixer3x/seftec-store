
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ChatResponseDisplayProps {
  response: string;
  isTyping: boolean;
  error: string | null;
}

const ChatResponseDisplay: React.FC<ChatResponseDisplayProps> = ({ response, isTyping, error }) => {
  return (
    <div className="bg-seftec-slate/30 dark:bg-white/5 p-4 rounded-lg min-h-[100px] max-h-[250px] overflow-y-auto">
      {error ? (
        <div className="flex items-start space-x-2 text-red-500 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold mb-1">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      ) : response ? (
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
  );
};

export default ChatResponseDisplay;
