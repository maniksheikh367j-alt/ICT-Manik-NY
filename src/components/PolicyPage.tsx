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

  const getPolicyData = () => {
    switch (type) {
      case 'terms':
        return { title: 'Terms of Service', content: config.termsOfService, icon: ScrollText };
      case 'contact_policy':
        return { title: 'Contact Policy', content: config.contactPolicy, icon: ScrollText };
      case 'public':
        return { title: 'Public Policy', content: config.publicPolicy, icon: ShieldCheck };
      case 'return':
        return { title: 'Return Policy', content: config.returnPolicy, icon: ShieldCheck };
      case 'refund':
        return { title: 'Refund Policy', content: config.refundPolicy, icon: ShieldCheck };
      case 'contact_segment':
        return { title: 'Contact Us', content: config.contactSegment, icon: ShieldCheck };
      case 'privacy':
      default:
        return { title: 'Privacy Policy', content: config.privacyPolicy, icon: ShieldCheck };
    }
  };

  const { title, content, icon: Icon } = getPolicyData();

  if (!content && type !== 'privacy') return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/20 font-sans">
      <nav className="px-10 py-8 flex justify-between items-center border-b border-white/[0.03] bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors uppercase text-[10px] tracking-[0.3em] font-black group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back_To_System
        </Link>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent glow-green">{config.logoName} _ PROTOCOL</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-32 px-10"
      >
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="w-16 h-16 bg-brand-accent/5 border border-white/[0.05] flex items-center justify-center text-brand-accent mb-10 glow-green">
            <Icon size={24} strokeWidth={1} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-brand-accent/30" />
            <p className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold">Protocol Revision: {new Date().getFullYear()}.04.23</p>
            <div className="h-px w-8 bg-brand-accent/30" />
          </div>
        </div>

        <div className="border border-white/[0.03] bg-white/[0.01] p-12 md:p-20 shadow-2xl shadow-black/40">
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-500 leading-relaxed whitespace-pre-wrap font-sans text-base tracking-wide font-light">
              {content}
            </p>
          </div>
        </div>

        <div className="mt-24 text-center text-zinc-800 text-[9px] uppercase tracking-[0.8em] flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-zinc-900" />
            End_Of_Transmission
            <div className="h-px w-12 bg-zinc-900" />
        </div>
      </motion.div>
    </div>
  );
}
