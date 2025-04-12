
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from './types';
import { createChatMessage } from './utils';

export interface StreamHandlerOptions {
  onStreamingUpdate: (text: string) => void;
  onStreamingComplete: (fullResponse: string) => void;
  onStreamingError: (error: Error) => void;
}

/**
 * Handles streaming response from Supabase Edge Function
 */
export const handleStreamingResponse = async (
  streamResponse: any,
  streamError: any,
  options: StreamHandlerOptions
) => {
  const { onStreamingUpdate, onStreamingComplete, onStreamingError } = options;
  
  if (streamError) throw new Error(streamError.message);
  
  if (!streamResponse || !streamResponse.streamUrl) {
    throw new Error('Invalid streaming response from AI service');
  }
  
  // Connect to streaming endpoint
  const eventSource = new EventSource(streamResponse.streamUrl);
  
  let fullResponse = '';
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'chunk') {
      fullResponse += data.content;
      onStreamingUpdate(fullResponse);
    } else if (data.type === 'end') {
      // Streaming completed
      const completedResponse = fullResponse + (data.content || '');
      onStreamingComplete(completedResponse);
      eventSource.close();
    }
  };
  
  eventSource.onerror = (error) => {
    console.error('Streaming error:', error);
    eventSource.close();
    onStreamingError(new Error('Streaming connection error'));
  };
};

/**
 * Process a non-streaming response
 */
export const handleNonStreamingResponse = async (
  message: string,
  recentMessages: any[],
  endpoint: string,
  isPremium: boolean
) => {
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
  
  return createChatMessage('assistant', data.response);
};
