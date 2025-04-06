
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface PersonalizedAIChatInterfaceProps {
  endpoint?: string;
  placeholder?: string;
  buttonText?: string;
}

const PersonalizedAIChatInterface: React.FC<PersonalizedAIChatInterfaceProps> = ({
  endpoint = 'ai-chat',
  placeholder = 'Ask about market trends, payment methods, or trade advice...',
  buttonText = 'Send'
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call Supabase Edge Function with user's message
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: {
          prompt: userMessage,
          generateReport: false
        }
      });
      
      if (error) throw error;
      
      // Log the response for debugging
      console.log('Edge function response:', data);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive'
      });
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] border rounded-lg overflow-hidden bg-white dark:bg-seftec-darkNavy/30">
      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 my-8">
            <p>Ask me anything about business trade, payments, or market insights.</p>
            <p className="text-sm mt-2">
              {user ? "Your responses will be personalized based on your preferences." : "Sign in for personalized responses."}
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user' 
                    ? 'bg-seftec-navy text-white dark:bg-seftec-teal' 
                    : 'bg-gray-100 dark:bg-seftec-darkNavy'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-seftec-darkNavy animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t p-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalizedAIChatInterface;
