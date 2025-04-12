
import { supabase } from '@/integrations/supabase/client';
import { BizGenieChatMessage } from './types';

export const getCurrentUserId = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id || null;
};

export const logFeedback = async (
  messageId: string,
  associatedPrompt: string,
  rating: number,
  feedbackText?: string
) => {
  const userId = await getCurrentUserId();
  if (!userId) return false;
  
  const { error } = await supabase
    .from('ai_usage_logs')
    .update({
      user_feedback: rating,
      feedback_text: feedbackText
    })
    .eq('user_id', userId)
    .eq('prompt', associatedPrompt);
    
  return !error;
};

export const createAssistantMessage = (
  text: string,
  model?: string,
  complexity?: string
): BizGenieChatMessage => {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: text,
    model,
    complexity,
    createdAt: new Date()
  };
};

export const createUserMessage = (text: string): BizGenieChatMessage => {
  return {
    id: crypto.randomUUID(),
    role: 'user',
    content: text,
    createdAt: new Date()
  };
};
