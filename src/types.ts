export interface BlogPost {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string;
}

export interface TradingLog {
  id: string;
  date: string;
  pair: string;
  status: 'profit' | 'loss' | 'neutral';
  performance: string; // Keep string for UI but use amount for logic
  amount?: number; // New field for dollar value
  description: string;
  lesson: string;
}

export interface StoryPoint {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details?: string;
  type: 'course' | 'indicator';
  status: 'coming_soon' | 'available';
  price?: string;
  image?: string;
}
