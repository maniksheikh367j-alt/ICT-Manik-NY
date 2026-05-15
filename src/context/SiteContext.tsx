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
import { compressImage } from '../lib/imageUtils';

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
  contactPolicy?: string;
  publicPolicy?: string;
  returnPolicy?: string;
  refundPolicy?: string;
  contactSegment?: string;
  heroVideo?: string;
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
  saveAll: (silent?: boolean) => Promise<void>;
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
    privacyPolicy: `At ICT Manik NY, we respect your privacy and are committed to protecting your personal information.

Information We Collect:
We may collect your name, email address, WhatsApp number, and any information you provide when contacting us or purchasing a product.

How We Use Your Information:
- To communicate with you بشأن your purchase
- To provide access to products or services
- To improve our services and user experience

Data Protection:
We do not sell, trade, or share your personal information with third parties. Your data is محفوظ and used only for service-related purposes.

Third-Party Services:
We may use third-party platforms like WhatsApp or email to communicate with you.

Security:
We take reasonable measures to protect your data, but we cannot guarantee 100% security over the internet.

Changes:
We may update this policy anytime. Continued use of the website means you accept the changes.

Contact:
If you have any questions, contact us at: ictmanikny@gmail.com`,
    termsOfService: `By using this website, you agree to the following terms:

Usage:
All content provided on this website is for educational purposes only. You agree not to misuse any information.

No Financial Advice:
We do not provide financial advice. Trading involves risk, and you are responsible for your own decisions.

Products & Access:
After purchase, you will receive access to the product as described. Access may be revoked if misuse is detected.

Payments:
All payments are final unless stated otherwise. No refunds unless clearly mentioned.

User Responsibility:
You agree to provide accurate information and use the service respectfully.

Modification:
We reserve the right to change or update these terms at any time.

Contact:
ictmanikny@gmail.com`,
    refundPolicy: `All sales are final.

Due to the nature of digital products, we do not offer refunds after purchase.

Please make sure to review all product details before buying.

If you face any issue, contact us via WhatsApp or email.`,
    contactSegment: `Email: ictmanikny@gmail.com  
WhatsApp: +8801804130897  
Telegram: https://t.me/ICTManikNY1`,
    contactPolicy: '',
    publicPolicy: '',
    returnPolicy: '',
    heroVideo: ''
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
    } else if (error.message && error.message.includes('exceeds the maximum allowed size')) {
      alert('SIZE_LIMIT_EXCEEDED: The document you are trying to save (likely due to a large image) exceeds the 1MB Firestore limit. The system is attempting to auto-compress images, but please try using a smaller or shorter content if this persists.');
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

  const saveAll = async (silent = false) => {
    try {
      if (!silent) console.log('Initiating global sync...');

      // Auto-compress large images before saving to stay under 1MB Firestore limit
      const processedPosts = await Promise.all(posts.map(async p => {
        if (p.image && p.image.startsWith('data:image')) {
          const compressed = await compressImage(p.image);
          return { ...p, image: compressed };
        }
        return p;
      }));

      const processedProducts = await Promise.all(products.map(async p => {
        if (p.image && p.image.startsWith('data:image')) {
          const compressed = await compressImage(p.image);
          return { ...p, image: compressed };
        }
        return p;
      }));

      let processedConfig = { ...config };
      if (config.logoImage && config.logoImage.startsWith('data:image')) {
        processedConfig.logoImage = await compressImage(config.logoImage);
      }

      // Sync all current states to Firestore
      const promises = [
        ...logs.map(log => setDoc(doc(db, 'logs', log.id), log)),
        ...story.map(s => setDoc(doc(db, 'stories', s.id), s)),
        ...processedProducts.map(p => setDoc(doc(db, 'products', p.id), p)),
        ...processedPosts.map(p => setDoc(doc(db, 'posts', p.id), p)),
        setDoc(doc(db, 'config', 'settings'), processedConfig)
      ];
      
      await Promise.all(promises);
      if (!silent) {
        console.log('Global sync completed successfully.');
        alert('SYSTEM_DATA_SYNC_COMPLETE: All records securely preserved in Cloud.');
      }
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
