import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ activeSection, onNavigate }: { activeSection: string, onNavigate: (s: string) => void }) {
  const { config } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'posts', label: 'আপডেট' },
    { id: 'journal', label: 'পারফরম্যান্স' },
    { id: 'story', label: 'বিবর্তন' },
    { id: 'store', label: 'রিসোর্স' }
  ];

  const handleMobileNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-10 py-6 flex justify-between items-center transition-all font-sans">
        <div className="flex items-center gap-6">
          <Link to="/" className="group flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center font-mono font-bold text-brand-accent group-hover:bg-white group-hover:text-black transition-all overflow-hidden">
              {config.logoImage ? (
                <img src={config.logoImage} alt={config.logoInitials} className="w-full h-full object-cover" />
              ) : (
                config.logoInitials
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold uppercase tracking-widest leading-none mb-1">{config.logoName}</h1>
              <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-medium leading-none">{config.tagline}</p>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "transition-all hover:text-white relative",
                activeSection === item.id ? "text-brand-accent after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-brand-accent after:rounded-full" : ""
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/login" className="hidden xs:block text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
            ADMIN
          </Link>
          <button 
            onClick={() => onNavigate('store')} 
            className="hidden sm:block px-6 py-2 bg-brand-accent text-brand-bg text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-brand-accent/5"
          >
            কোর্স দেখুন
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-28 px-10 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNav(item.id)}
                  className={cn(
                    "text-xl font-bold uppercase tracking-widest text-left transition-all",
                    activeSection === item.id ? "text-brand-accent" : "text-zinc-600"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-8 border-t border-white/5 space-y-6">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-bold uppercase tracking-widest text-zinc-600"
                >
                  Admin Terminal
                </Link>
                <button 
                  onClick={() => handleMobileNav('store')}
                  className="w-full bg-brand-accent text-brand-bg py-5 font-bold uppercase tracking-widest text-xs"
                >
                  কোর্স দেখুন
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
