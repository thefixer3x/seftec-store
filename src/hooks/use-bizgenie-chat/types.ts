
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

export interface BizGenieChatState {
  messages: BizGenieChatMessage[];
  isLoading: boolean;
  query: string;
}

export interface BizGenieChatActions {
  setQuery: (query: string) => void;
  sendMessage: (message: string) => Promise<void>;
  resetChat: () => void;
  saveFeedback: (messageId: string, rating: number, feedbackText?: string) => Promise<void>;
}

export interface UseBizGenieChatReturn extends BizGenieChatState, BizGenieChatActions {}
