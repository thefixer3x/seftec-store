
import React from 'react';
import { Card } from '@/components/ui/card';
import { useBizGenieChat } from '@/hooks/use-bizgenie-chat';
import { useAuth } from '@/context/AuthContext';

import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';

interface BizGenieChatInterfaceProps {
  systemPrompt?: string;
  placeholder?: string;
  isPremium?: boolean;
}

const BizGenieChatInterface: React.FC<BizGenieChatInterfaceProps> = ({
  systemPrompt,
  placeholder = 'Ask BizGenie about business strategies, financial advice, or market insights...',
  isPremium = false
}) => {
  const { user } = useAuth();
  
  const { 
    messages, 
    isLoading, 
    query, 
    setQuery, 
    sendMessage, 
    resetChat, 
    saveFeedback 
  } = useBizGenieChat({
    systemPrompt,
    isPremium
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      sendMessage(query);
      setQuery('');
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <ChatHeader 
        isPremium={isPremium} 
        onReset={resetChat} 
        disabled={isLoading || messages.length === 0} 
      />
      
      <ChatMessages 
        messages={messages} 
        isLoading={isLoading} 
        isPremium={isPremium} 
        onFeedback={saveFeedback} 
      />
      
      <ChatInput 
        query={query} 
        setQuery={setQuery} 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
        placeholder={placeholder} 
      />
    </Card>
  );
};

export default BizGenieChatInterface;
