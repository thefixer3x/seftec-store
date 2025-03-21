
import React from 'react';

interface ChatResponseDisplayProps {
  response: string;
  isTyping: boolean;
}

const ChatResponseDisplay: React.FC<ChatResponseDisplayProps> = ({ response, isTyping }) => {
  return (
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
  );
};

export default ChatResponseDisplay;
