
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUserId } from '@/integrations/supabase/client';

export interface BizGenieChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  complexity?: string;
  createdAt: Date;
}

export interface UseBizGenieChatOptions {
  systemPrompt?: string;
  onError?: (error: Error) => void;
  isPremium?: boolean;
}

/**
 * Custom hook for the BizGenie chat functionality
 * Supports both free and premium tiers with intelligent model routing
 */
export function useBizGenieChat({
  systemPrompt,
  onError,
  isPremium = false
}: UseBizGenieChatOptions = {}) {
  const [messages, setMessages] = useState<BizGenieChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const { toast } = useToast();
  
  // Reset chat history
  const resetChat = useCallback(() => {
    setMessages([]);
  }, []);

  // Save chat feedback
  const saveFeedback = useCallback(async (messageId: string, rating: number, feedbackText?: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.role !== 'assistant') return;
    
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;
      
      await supabase
        .from('ai_usage_logs')
        .update({
          user_feedback: rating,
          feedback_text: feedbackText
        })
        .eq('user_id', userId)
        .eq('prompt', messages[messages.indexOf(message) - 1]?.content || '');
      
      toast({
        title: 'Feedback submitted',
        description: 'Thank you for your feedback!'
      });
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  }, [messages, toast]);

  // Send message to BizGenie
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new user message
    const userMessage: BizGenieChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      createdAt: new Date()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get user ID for tracking
      const userId = await getCurrentUserId();
      
      // Call the BizGenie router edge function
      const { data, error } = await supabase.functions.invoke('bizgenie-router', {
        body: { 
          prompt: message,
          userId,
          systemPrompt,
          isPremium
        }
      });
      
      if (error) throw new Error(error.message);
      if (!data || !data.text) {
        throw new Error('Invalid response from BizGenie service');
      }
      
      // Create assistant message
      const assistantMessage: BizGenieChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.text,
        model: data.model,
        complexity: data.complexity,
        createdAt: new Date()
      };
      
      // Add assistant message to chat
      setMessages(prev => [...prev, assistantMessage]);
      
      // If response was from cache, show a subtle toast notification
      if (data.fromCache) {
        toast({
          title: 'Fast response',
          description: 'This answer was retrieved from our knowledge base.',
          variant: 'default'
        });
      }
    } catch (error) {
      console.error('BizGenie chat error:', error);
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      
      toast({
        title: 'BizGenie Error',
        description: error instanceof Error ? error.message : 'Failed to get BizGenie response',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [systemPrompt, isPremium, onError, toast]);

  return {
    messages,
    isLoading,
    query,
    setQuery,
    sendMessage,
    resetChat,
    saveFeedback
  };
}
