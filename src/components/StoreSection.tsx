import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowRight, Lock, MessageCircle, X, CheckCircle2 } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { Product } from '../types';

export default function StoreSection() {
  const { products, config } = useSiteData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openWhatsApp = (product: Product) => {
    if (!config.whatsapp) return;
    const phone = config.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `হ্যালো, আমি "${product.name}" এই প্রোডাক্টটি কিনতে চাই।\n` +
      `এই প্রোডাক্টটি কি এখন অ্যাক্টিভ বা এভেইলেবল আছে?\n\n` +
      `দয়া করে আমাকে জানাবেন:\n` +
      `- পেমেন্ট মেথড কী\n` +
      `- কীভাবে প্রোডাক্ট ডেলিভারি পাবো\n` +
      `- কত সময়ের মধ্যে এক্সেস পাবো\n\n` +
      `ধন্যবাদ।`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="store" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.03]" />
      
      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-[#0f0f0f] border border-white/[0.05] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none relative custom-scrollbar flex flex-col md:flex-row shadow-2xl shadow-brand-accent/5"
            >
              <div className="md:w-1/2 aspect-square md:aspect-auto bg-zinc-950 border-r border-white/[0.03]">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover grayscale" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-900">
                    <ShoppingCart size={80} strokeWidth={0.5} />
                  </div>
                )}
              </div>

              <div className="md:w-1/2 p-10 flex flex-col justify-between">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>

                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.4em] mb-4 block">
                    {selectedProduct.type}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-white leading-none">{selectedProduct.name}</h3>
                  
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-start gap-1">
                        <div className="relative group/price flex items-baseline gap-1">
                          <span className="text-brand-accent/50 text-xl font-mono font-bold">$</span>
                          <span className={`font-black tracking-tighter text-brand-accent text-glow-green leading-none ${
                            selectedProduct.priceSize === 'sm' ? 'text-base' : 
                            selectedProduct.priceSize === 'lg' ? 'text-3xl' : 
                            selectedProduct.priceSize === 'xl' ? 'text-4xl' : 'text-xl md:text-3xl'
                          }`}>
                            {selectedProduct.price?.toString().replace('$', '') || '0'}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-bold tracking-[0.2em] uppercase">buy now</span>
                      </div>
                      
                      {selectedProduct.originalPrice && (
                        <div className="flex flex-col">
                          <span className="text-zinc-600 line-through text-lg md:text-xl font-medium tracking-tighter opacity-50 uppercase mb-1">
                            {selectedProduct.priceFormat === 'short' && selectedProduct.originalPrice.includes('.') ? selectedProduct.originalPrice.split('.')[0] : selectedProduct.originalPrice}
                          </span>
                          <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[8px] font-black px-2 py-0.5 tracking-widest uppercase">
                            Best Offer
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">{selectedProduct.description}</p>
                  
                  <div className="space-y-4 mb-8 pt-8 border-t border-white/[0.03]">
                    {selectedProduct.details?.split('\n').map((detail, idx) => (
                      <div key={idx} className="flex gap-4 text-[10px] uppercase tracking-wider text-zinc-500 font-bold items-center">
                        <div className="w-1 h-1 bg-brand-accent" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <button 
                    onClick={() => openWhatsApp(selectedProduct)}
                    className="w-full py-5 bg-brand-accent text-brand-bg font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all glow-green-hover flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={14} /> BUY NOW VIA WHATSAPP
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <p className="text-[10px] text-brand-accent font-mono font-bold tracking-[0.4em] uppercase mb-6">Marketplace</p>
            <h2 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-8 uppercase">
              Trading <br/><span className="text-brand-accent">Precision</span> Hub.
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-sm uppercase tracking-widest text-[10px]">
              Acquire elite institutional tools and mentorship programs processed through algorithmic logic.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleScroll('left')}
              className="w-14 h-14 bg-white/[0.02] border border-white/[0.05] flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="w-14 h-14 bg-white/[0.02] border border-white/[0.05] flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar pb-12"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[85vw] sm:min-w-[420px] snap-start flex flex-col group relative bg-black/40 border border-white/[0.03] p-8 sm:p-10"
            >
              <div className="relative aspect-video bg-zinc-950 border border-white/[0.03] overflow-hidden mb-10">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-900 opacity-20">
                    <ShoppingCart size={48} strokeWidth={0.5} />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-bg/90 backdrop-blur-xl border border-white/[0.05] text-brand-accent text-[9px] px-4 py-2 font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                    {product.status === 'coming_soon' ? <Lock size={10} strokeWidth={3} /> : null}
                    {product.status?.toUpperCase().replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-[9px] text-brand-accent font-mono font-bold tracking-[0.4em] mb-2 block uppercase">{product.type}</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-brand-accent transition-colors leading-none">{product.name}</h2>
                
                <div className="flex flex-col gap-1 mb-6">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-brand-accent/40 text-base font-mono font-bold">$</span>
                        <span className={`font-black tracking-tighter text-brand-accent text-glow-green leading-none ${
                          product.priceSize === 'sm' ? 'text-xs' : 
                          product.priceSize === 'lg' ? 'text-lg' : 
                          product.priceSize === 'xl' ? 'text-xl' : 'text-base'
                        }`}>
                          {product.price?.toString().replace('$', '') || '0'}
                        </span>
                      </div>
                      
                      {product.originalPrice && (
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-700 line-through text-[9px] font-medium tracking-tighter opacity-40">
                            {product.priceFormat === 'short' && product.originalPrice.includes('.') ? product.originalPrice.split('.')[0] : product.originalPrice}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-zinc-600 font-bold tracking-[0.2em] uppercase mt-1">buy now</span>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm font-light leading-relaxed mb-12 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/[0.03]">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full text-[9px] font-bold uppercase tracking-[0.3em] border border-white/[0.05] text-zinc-600 py-5 hover:bg-white/5 transition-all text-center"
                >
                  INFO
                </button>
                <button 
                  onClick={() => openWhatsApp(product)}
                  className="w-full text-[9px] font-black uppercase tracking-[0.3em] bg-brand-accent text-brand-bg py-5 hover:bg-white transition-all glow-green-hover text-center"
                >
                  ACQUIRE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
