import { TradingLog, StoryPoint, Product } from './types';

export const TRADING_LOGS: TradingLog[] = [
  {
    id: '1',
    date: '2026-04-20',
    pair: 'EUR/USD',
    status: 'profit',
    performance: '+1.5%',
    description: 'আজকের ট্রেডটি ছিল প্রাইস অ্যাকশন এবং সাপোর্ট জোনের রিজেকশনের ওপর ভিত্তি করে। মার্কেট খুব সুন্দরভাবে আমার টার্গেট হিট করেছে।',
    lesson: 'ধৈর্য ধরে সেটআপের জন্য অপেক্ষা করা সবচেয়ে গুরুত্বপূর্ণ।'
  },
  {
    id: '2',
    date: '2026-04-19',
    pair: 'BTC/USDT',
    status: 'loss',
    performance: '-0.8%',
    description: 'ব্রেকআউটে এন্ট্রি নিয়েছিলাম কিন্তু মার্কেট ফেকআউট দিয়েছে। ছোট লস নিয়ে ট্রেড থেকে বের হয়ে এসেছি।',
    lesson: 'স্টপ লস সবসময় ছোট রাখা ট্রেডারের আসল পরিচয়।'
  },
  {
    id: '3',
    date: '2026-04-18',
    pair: 'XAU/USD',
    status: 'profit',
    performance: '+2.1%',
    description: 'গোল্ডে নিউজ ইভেন্টের পর ট্র্যাকিং দেখে সেল এন্ট্রি দিয়েছিলাম। সঠিক টাইমিং ছিল আজকের প্রফিটের মূল কারণ।',
    lesson: 'নিউজ ট্রেডিংয়ের সময় রিস্ক ম্যানেজমেন্ট কঠোর হতে হবে।'
  }
];

export const STORY_POINTS: StoryPoint[] = [
  {
    id: '1',
    year: '২০২১',
    title: 'শুরুয়াত',
    description: 'খুব সাধারণ কৌতূহল থেকে ট্রেডিং দুনিয়ায় পা রাখা। শুরুতে অনেক ভুল এবং লস দিয়ে শিক্ষা নেওয়া।'
  },
  {
    id: '2',
    year: '২০২২',
    title: 'শেখার সংগ্রাম',
    description: 'বিভিন্ন স্ট্রেটেজি, ইন্ডিকেটর এবং প্রাইস অ্যাকশন নিয়ে গভীর জ্ঞান অর্জন। ডেমো অ্যাকাউন্ট থেকে রিয়াল অ্যাকাউন্টে যাত্রা।'
  },
  {
    id: '3',
    year: '২০২৪',
    title: 'কন্সিস্টেন্সি অর্জন',
    description: 'নিজের একটি সেটআপ তৈরি করা এবং ইমোশন কন্ট্রোল করে প্রফিটেবল হওয়া শিখলাম।'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'মাস্টার অফ প্রাইস অ্যাকশন',
    description: 'শূন্য থেকে শুরু করে অ্যাডভান্সড ক্যান্ডেলস্টিক সাইকোলজি শেখার কমপ্লিট কোর্স।',
    type: 'course',
    status: 'coming_soon',
    image: 'https://images.unsplash.com/photo-1611974714553-38827902096a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    name: 'স্মার্ট মানি ইন্ডিকেটর (Pro)',
    description: 'অটোমেটেড সাপোর্ট-রেজিস্ট্যান্স এবং ভলিউম অ্যানালাইসিস টুলস।',
    type: 'indicator',
    status: 'coming_soon',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800'
  }
];
