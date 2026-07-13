export type GenerationType = 'commit' | 'pull-request' | 'review' | 'explanation';

export interface GenerationRequest {
  context: string;
  repository?: string;
  tone?: 'concise' | 'detailed' | 'professional';
}

export interface GenerationResult {
  id: string;
  type: GenerationType;
  title: string;
  content: string;
  createdAt: string;
}

export interface HistoryItem extends GenerationResult {
  repository?: string;
}
