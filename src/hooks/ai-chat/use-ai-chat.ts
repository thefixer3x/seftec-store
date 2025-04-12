
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useFeatureFlag } from '@/components/ui/feature-flags/FeatureFlagProvider';
import { 
  ChatMessage, 
  UseAIChatOptions, 
  UseAIChatReturn 
} from './types';
import { 
  saveChatMessages, 
  loadChatMessages, 
  createChatMessage, 
  getRecentMessagesForContext 
} from './utils';
import { 
  handleStreamingResponse, 
  handleNonStreamingResponse 
} from './stream-handler';

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
}: UseAIChatOptions = {}): UseAIChatReturn {
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
    localStorage.removeItem('ai_chat_history');
  }, []);

  // Load messages from local storage on initial load
  useEffect(() => {
    const savedMessages = loadChatMessages();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  // Save messages to local storage for persistence
  useEffect(() => {
    saveChatMessages(messages);
  }, [messages]);

  // Send message to AI and process response
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new user message
    const userMessage = createChatMessage('user', message);
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingResponse('');
    
    try {
      // Get recent conversation history for context
      const recentMessages = getRecentMessagesForContext(messages, contextSize);
      
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
        
        await handleStreamingResponse(
          streamResponse,
          streamError,
          {
            onStreamingUpdate: (text) => setStreamingResponse(text),
            onStreamingComplete: (fullResponse) => {
              const assistantMessage = createChatMessage('assistant', fullResponse);
              setMessages(prev => [...prev, assistantMessage]);
              setStreamingResponse('');
              setIsLoading(false);
            },
            onStreamingError: (error) => {
              setIsLoading(false);
              if (onError) onError(error);
              toast({
                title: 'Connection Error',
                description: 'Failed to connect to AI service. Please try again.',
                variant: 'destructive'
              });
            }
          }
        );
      } else {
        // Non-streaming implementation (fallback)
        const assistantMessage = await handleNonStreamingResponse(
          message,
          recentMessages,
          endpoint,
          isPremium
        );
        
        // Add assistant message to chat
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('AI chat error:', error);
      setIsLoading(false);
      
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      
      toast({
        title: 'AI Assistant Error',
        description: error instanceof Error ? error.message : 'Failed to get AI response',
        variant: 'destructive'
      });
    }
  }, [messages, contextSize, isPremium, streamEnabled, useEnhancedAI, endpoint, toast, onError]);

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
