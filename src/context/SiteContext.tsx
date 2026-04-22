import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  doc,
  setDoc,
  deleteDoc,
  updateDoc as firestoreUpdateDoc,
  addDoc
} from 'firebase/firestore';
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
  loading: boolean;
  updateLogs: (logs: TradingLog[]) => Promise<void>;
  updateStory: (story: StoryPoint[]) => Promise<void>;
  updateProducts: (products: Product[]) => Promise<void>;
  updatePosts: (posts: BlogPost[]) => Promise<void>;
  updateConfig: (config: SiteConfig) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<TradingLog[]>(TRADING_LOGS);
  const [story, setStory] = useState<StoryPoint[]>(STORY_POINTS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState<SiteConfig>({
    logoName: '𝙄𝘾𝙏 𝙈𝘼𝙉𝙄𝙆 𝙉𝙔',
    logoInitials: 'MN',
    logoImage: '',
    tagline: 'Precision Trading & Mentorship',
    storyTitle: 'আমার ট্রেডিং জার্নি',
    storyQuote: 'ট্রেডিং শুধু সংখ্যা নয়, এটি আত্মবিশ্বাসের লড়াই।',
    telegram: 'https://t.me/maniksheikh',
    whatsapp: '+880XXXXXXXXX',
    tiktok: '',
    nagad: '',
    binancePayId: '',
    email: 'maniksheikh2006@gmail.com',
    privacyPolicy: '',
    termsOfService: ''
  });

  useEffect(() => {
    // Real-time listeners
    const unsubLogs = onSnapshot(query(collection(db, 'logs'), orderBy('date', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TradingLog));
      if (data.length > 0) setLogs(data);
    });

    const unsubStories = onSnapshot(query(collection(db, 'stories'), orderBy('year', 'asc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StoryPoint));
      if (data.length > 0) setStory(data);
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      if (data.length > 0) setProducts(data);
    });

    const unsubPosts = onSnapshot(query(collection(db, 'posts'), orderBy('date', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(data);
    });

    const unsubConfig = onSnapshot(doc(db, 'config', 'settings'), (snapshot) => {
      if (snapshot.exists()) {
        setConfig(prev => ({ ...prev, ...snapshot.data() }));
      }
    });

    setLoading(false);
    return () => {
      unsubLogs();
      unsubStories();
      unsubProducts();
      unsubPosts();
      unsubConfig();
    };
  }, []);

  const syncCollection = async (collectionName: string, newData: any[]) => {
    // For simplicity in this dashboard, we'll sync the whole collection or handle specific updates
    // In a real app, individual add/update/delete functions are better.
    // Given the dashboard passes the whole array, we'll find differences.
    
    // For now, let's implement simple setters that write to Firestore
    // Note: The dashboard UI passes the entire array to these update functions.
  };

  const updateLogs = async (newLogs: TradingLog[]) => {
    // Basic sync logic: if it has an ID and changed, update. If new, add.
    // To keep it simple for the AI Studio preview and match the existing Dashboard logic:
    for (const log of newLogs) {
      const { id, ...data } = log;
      await setDoc(doc(db, 'logs', id), data);
    }
    // Delete logic (if any log was removed from the array)
    const newIds = new Set(newLogs.map(l => l.id));
    logs.forEach(async l => {
      if (!newIds.has(l.id)) await deleteDoc(doc(db, 'logs', l.id));
    });
  };

  const updateStory = async (newStory: StoryPoint[]) => {
    for (const s of newStory) {
      const { id, ...data } = s;
      await setDoc(doc(db, 'stories', id), data);
    }
    const newIds = new Set(newStory.map(s => s.id));
    story.forEach(async s => {
      if (!newIds.has(s.id)) await deleteDoc(doc(db, 'stories', s.id));
    });
  };

  const updateProducts = async (newProducts: Product[]) => {
    for (const p of newProducts) {
      const { id, ...data } = p;
      await setDoc(doc(db, 'products', id), data);
    }
    const newIds = new Set(newProducts.map(p => p.id));
    products.forEach(async p => {
      if (!newIds.has(p.id)) await deleteDoc(doc(db, 'products', p.id));
    });
  };

  const updatePosts = async (newPosts: BlogPost[]) => {
    for (const p of newPosts) {
      const { id, ...data } = p;
      await setDoc(doc(db, 'posts', id), data);
    }
    const newIds = new Set(newPosts.map(p => p.id));
    posts.forEach(async p => {
      if (!newIds.has(p.id)) await deleteDoc(doc(db, 'posts', p.id));
    });
  };

  const updateConfig = async (newConfig: SiteConfig) => {
    await setDoc(doc(db, 'config', 'settings'), newConfig);
  };

  return (
    <SiteDataContext.Provider value={{ 
      logs, 
      story, 
      products, 
      posts,
      config,
      loading,
      updateLogs, 
      updateStory, 
      updateProducts,
      updatePosts,
      updateConfig
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
