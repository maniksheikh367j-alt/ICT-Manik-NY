import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRADING_LOGS, STORY_POINTS, PRODUCTS } from '../data';
import { TradingLog, StoryPoint, Product, BlogPost } from '../types';

interface SiteConfig {
  logoName: string;
  logoInitials: string;
  logoImage?: string;
  tagline: string;
  storyTitle: string;
  storyQuote: string;
  telegram: string;
  whatsapp: string;
  tiktok: string;
  nagad: string;
  binancePayId: string;
  email: string;
  privacyPolicy: string;
  termsOfService: string;
}

interface SiteDataContextType {
  logs: TradingLog[];
  story: StoryPoint[];
  products: Product[];
  posts: BlogPost[];
  config: SiteConfig;
  updateLogs: (logs: TradingLog[]) => void;
  updateStory: (story: StoryPoint[]) => void;
  updateProducts: (products: Product[]) => void;
  updatePosts: (posts: BlogPost[]) => void;
  updateConfig: (config: SiteConfig) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<TradingLog[]>(() => {
    const saved = localStorage.getItem('trading_logs');
    return saved ? JSON.parse(saved) : TRADING_LOGS;
  });

  const [story, setStory] = useState<StoryPoint[]>(() => {
    const saved = localStorage.getItem('story_points_v2'); 
    return saved ? JSON.parse(saved) : STORY_POINTS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('site_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('site_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_config_v6');
    const defaultConfig = {
      logoName: 'Trader Journey',
      logoInitials: 'SJ',
      logoImage: '',
      tagline: 'Professional Trader & Mentor',
      storyTitle: 'আমার ট্রেডিং জার্নি',
      storyQuote: 'ট্রেডিং শুধু সংখ্যা নয়, এটি আত্মবিশ্বাসের লড়াই।',
      telegram: '@TradingWithSohan',
      whatsapp: '+8801XXXXXXXXX',
      tiktok: '',
      nagad: '',
      binancePayId: '',
      email: 'contact@sohan.pro',
      privacyPolicy: 'এখানে আপনার গোপনীয়তা নীতি লিখুন...',
      termsOfService: 'এখানে আপনার শর্তাবলী লিখুন...'
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultConfig, ...parsed };
      } catch (e) {
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('trading_logs', JSON.stringify(logs));
    localStorage.setItem('story_points_v2', JSON.stringify(story));
    localStorage.setItem('site_products', JSON.stringify(products));
    localStorage.setItem('site_posts', JSON.stringify(posts));
    localStorage.setItem('site_config_v6', JSON.stringify(config));
  }, [logs, story, products, posts, config]);

  return (
    <SiteDataContext.Provider value={{ 
      logs, 
      story, 
      products, 
      posts,
      config,
      updateLogs: setLogs, 
      updateStory: setStory, 
      updateProducts: setProducts,
      updatePosts: setPosts,
      updateConfig: setConfig
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error('useSiteData must be used within a SiteDataProvider');
  return context;
};
