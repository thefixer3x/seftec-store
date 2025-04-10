
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useFeatureFlag } from '@/components/ui/feature-flags/FeatureFlagProvider';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

interface UseAIChatOptions {
  endpoint?: string;
  onError?: (error: Error) => void;
  streamEnabled?: boolean;
  contextSize?: number;
  isPremium?: boolean;
}

/**
 * Custom hook for managing AI chat functionality
 * Supports both streaming and non-streaming responses
 */
export function useAIChat({
  endpoint = 'ai-chat',
  onError,
  streamEnabled = true,
  contextSize = 5,
  isPremium = false
}: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [streamingResponse, setStreamingResponse] = useState('');
  const { toast } = useToast();
  const { isEnabled } = useFeatureFlag();
  
  // Use enhanced AI responses if feature flag is enabled
  const useEnhancedAI = isEnabled('enhanced_ai_responses');

  // Reset chat history
  const resetChat = useCallback(() => {
    setMessages([]);
    setStreamingResponse('');
  }, []);

  // Save messages to local storage for persistence
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Load messages from local storage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (err) {
        console.error('Failed to parse saved chat history:', err);
      }
    }
  }, []);

  // Send message to AI and process response
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      createdAt: new Date()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingResponse('');
    
    try {
      // Get recent conversation history for context
      const recentMessages = messages
        .slice(-contextSize * 2) // Get the last N message pairs
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Determine whether to use streaming based on feature flag and option
      const useStreaming = streamEnabled && useEnhancedAI;
      
      if (useStreaming) {
        // Streaming implementation
        const { data: streamResponse, error: streamError } = await supabase.functions.invoke(endpoint, {
          body: { 
            query: message, 
            messages: recentMessages,
            isPremium, 
            streaming: true 
          }
        });
        
        if (streamError) throw new Error(streamError.message);
        if (!streamResponse || !streamResponse.streamUrl) {
          throw new Error('Invalid streaming response from AI service');
        }
        
        // Connect to streaming endpoint
        const eventSource = new EventSource(streamResponse.streamUrl);
        
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'chunk') {
            setStreamingResponse(prev => prev + data.content);
          } else if (data.type === 'end') {
            // Streaming completed
            const assistantMessage: ChatMessage = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: streamingResponse + data.content,
              createdAt: new Date()
            };
            
            setMessages(prev => [...prev, assistantMessage]);
            setStreamingResponse('');
            setIsLoading(false);
            eventSource.close();
          }
        };
        
        eventSource.onerror = (error) => {
          console.error('Streaming error:', error);
          eventSource.close();
          setIsLoading(false);
          if (onError) onError(new Error('Streaming connection error'));
          toast({
            title: 'Connection Error',
            description: 'Failed to connect to AI service. Please try again.',
            variant: 'destructive'
          });
        };
      } else {
        // Non-streaming implementation (fallback)
        const { data, error } = await supabase.functions.invoke(endpoint, {
          body: { 
            query: message, 
            messages: recentMessages,
            isPremium, 
            streaming: false 
          }
        });
        
        if (error) throw new Error(error.message);
        if (!data || !data.response) {
          throw new Error('Invalid response from AI service');
        }
        
        // Create assistant message
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          createdAt: new Date()
        };
        
        // Add assistant message to chat
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('AI chat error:', error);
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      
      toast({
        title: 'AI Assistant Error',
        description: error instanceof Error ? error.message : 'Failed to get AI response',
        variant: 'destructive'
      });
    } finally {
      if (!streamEnabled || !useEnhancedAI) {
        setIsLoading(false);
      }
    }
  }, [messages, contextSize, isPremium, streamEnabled, useEnhancedAI, endpoint, toast, onError, streamingResponse]);

  return {
    messages,
    isLoading,
    query,
    setQuery,
    sendMessage,
    resetChat,
    streamingResponse,
    isStreaming: !!streamingResponse
  };
}
