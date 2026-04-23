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
  updateLogs: (logs: TradingLog[], sync?: boolean) => Promise<void>;
  updateStory: (story: StoryPoint[], sync?: boolean) => Promise<void>;
  updateProducts: (products: Product[], sync?: boolean) => Promise<void>;
  updatePosts: (posts: BlogPost[], sync?: boolean) => Promise<void>;
  updateConfig: (config: SiteConfig, sync?: boolean) => Promise<void>;
  saveAll: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<TradingLog[]>(TRADING_LOGS);
  const [story, setStory] = useState<StoryPoint[]>(STORY_POINTS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState<SiteConfig>({
    logoName: 'ICT MANIK NY',
    logoInitials: 'MN',
    logoImage: '',
    tagline: 'Precision Trading & Mentorship',
    storyTitle: 'The Dynamic Evolution.',
    storyQuote: 'Trading is logic beyond belief.',
    telegram: 'https://t.me/maniksheikh',
    whatsapp: '+880XXXXXXXXX',
    tiktok: '',
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

  const handleFirestoreError = (error: any, operation: string) => {
    console.error(`Firestore Error [${operation}]:`, error);
    if (error.code === 'resource-exhausted') {
      alert('QUOTA_EXCEEDED: Your Firebase free tier limit has been reached for today. Changes will be saved locally but might not sync to the cloud until tomorrow.');
    } else if (error.code === 'permission-denied') {
      alert('PERMISSION_DENIED: You do not have authority to write to this database. Please check your login status.');
    } else {
      alert(`SYNC_ERROR: ${error.message || 'Unknown error during synchronization'}`);
    }
  };

  const updateLogs = async (newLogs: TradingLog[], sync = false) => {
    setLogs(newLogs);
    if (sync) {
      try {
        for (const log of newLogs) {
          const { id, ...data } = log;
          await setDoc(doc(db, 'logs', id), data);
        }
      } catch (e) { handleFirestoreError(e, 'updateLogs'); }
    }
  };

  const updateStory = async (newStory: StoryPoint[], sync = false) => {
    setStory(newStory);
    if (sync) {
      try {
        for (const s of newStory) {
          const { id, ...data } = s;
          await setDoc(doc(db, 'stories', id), data);
        }
      } catch (e) { handleFirestoreError(e, 'updateStory'); }
    }
  };

  const updateProducts = async (newProducts: Product[], sync = false) => {
    setProducts(newProducts);
    if (sync) {
      try {
        for (const p of newProducts) {
          const { id, ...data } = p;
          await setDoc(doc(db, 'products', id), data);
        }
      } catch (e) { handleFirestoreError(e, 'updateProducts'); }
    }
  };

  const updatePosts = async (newPosts: BlogPost[], sync = false) => {
    setPosts(newPosts);
    if (sync) {
      try {
        for (const p of newPosts) {
          const { id, ...data } = p;
          await setDoc(doc(db, 'posts', id), data);
        }
      } catch (e) { handleFirestoreError(e, 'updatePosts'); }
    }
  };

  const updateConfig = async (newConfig: SiteConfig, sync = false) => {
    setConfig(newConfig);
    if (sync) {
      try {
        await setDoc(doc(db, 'config', 'settings'), newConfig);
      } catch (e) { handleFirestoreError(e, 'updateConfig'); }
    }
  };

  const saveAll = async () => {
    try {
      // Sync all current states to Firestore
      for (const log of logs) { await setDoc(doc(db, 'logs', log.id), log); }
      for (const s of story) { await setDoc(doc(db, 'stories', s.id), s); }
      for (const p of products) { await setDoc(doc(db, 'products', p.id), p); }
      for (const p of posts) { await setDoc(doc(db, 'posts', p.id), p); }
      await setDoc(doc(db, 'config', 'settings'), config);
      alert('ALL_STREAMS_SYNCED_SUCCESSFULLY');
    } catch (e) {
      handleFirestoreError(e, 'saveAll');
    }
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
      updateConfig,
      saveAll
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
