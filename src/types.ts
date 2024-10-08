export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'error' | 'system';
  content: string;
  file?: File;
  tokens?: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export interface Model {
  id: string;
  name: string;
}

export interface Settings {
  apiKey: string;
  selectedModel: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}