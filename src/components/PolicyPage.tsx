import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import { ChevronLeft, ShieldCheck, ScrollText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PolicyPage() {
  const { config } = useSiteData();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get('type') || 'privacy';

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const content = type === 'privacy' ? config.privacyPolicy : config.termsOfService;
  const Icon = type === 'privacy' ? ShieldCheck : ScrollText;

  if (!content) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/20">
      <nav className="p-8 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold">
          <ChevronLeft size={16} /> Back to Terminal
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">{config.logoName} Legal</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-24 px-10"
      >
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Icon size={32} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-zinc-500 uppercase text-[10px] tracking-[0.2em]">Latest Update: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="card p-12 bg-white/5 border-white/5">
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-offset whitespace-pre-wrap font-sans text-lg">
              {content}
            </p>
          </div>
        </div>

        <div className="mt-20 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
            End of Official Document
        </div>
      </motion.div>
    </div>
  );
}
