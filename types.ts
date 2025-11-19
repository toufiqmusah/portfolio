export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  images: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AnalysisResult {
  text: string;
}
