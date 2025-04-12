
import { ChatMessage } from './types';

/**
 * Saves chat messages to localStorage for persistence
 */
export const saveChatMessages = (messages: ChatMessage[]): void => {
  if (messages.length > 0) {
    localStorage.setItem('ai_chat_history', JSON.stringify(messages));
  }
};

/**
 * Loads chat messages from localStorage
 */
export const loadChatMessages = (): ChatMessage[] => {
  try {
    const savedMessages = localStorage.getItem('ai_chat_history');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
  } catch (err) {
    console.error('Failed to parse saved chat history:', err);
  }
  return [];
};

/**
 * Creates a new chat message object
 */
export const createChatMessage = (
  role: 'user' | 'assistant',
  content: string
): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: new Date()
});

/**
 * Gets recent messages for context
 */
export const getRecentMessagesForContext = (
  messages: ChatMessage[],
  contextSize: number
) => {
  return messages
    .slice(-contextSize * 2) // Get the last N message pairs
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));
};
