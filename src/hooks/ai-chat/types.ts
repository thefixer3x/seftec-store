
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface UseAIChatOptions {
  endpoint?: string;
  onError?: (error: Error) => void;
  streamEnabled?: boolean;
  contextSize?: number;
  isPremium?: boolean;
}

export interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  query: string;
  setQuery: (query: string) => void;
  sendMessage: (message: string) => Promise<void>;
  resetChat: () => void;
  streamingResponse: string;
  isStreaming: boolean;
}
