import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { ShoppingCart, Lock, X, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';

export default function StoreSection() {
  const { products, config } = useSiteData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const openWhatsApp = (product: Product, isPayment: boolean = false) => {
    if (!config.whatsapp) return;
    const phone = config.whatsapp.replace(/\D/g, '');
    const message = isPayment 
      ? `Hello, I've paid for "${product.name}". Here are my details...` 
      : `Hello, I am interested in buying "${product.name}". Can we talk?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };
  
  return (
    <section id="store" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-px bg-linear-to-r from-transparent to-white/5" />
      
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl bg-brand-bg border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
            >
              <div className="relative h-64 md:h-full bg-zinc-900 border-r border-white/5">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={selectedProduct.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-accent/20">
                    <ShoppingCart size={120} strokeWidth={0.5} />
                  </div>
                )}
                <div className="absolute top-8 left-8">
                  <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.5em] bg-brand-bg/80 backdrop-blur-md px-4 py-2">
                    {selectedProduct.type}
                  </span>
                </div>
              </div>

              <div className="p-10 md:p-16 flex flex-col justify-between">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div>
                  <h2 className="text-4xl font-sans font-black uppercase mb-8 leading-tight tracking-tighter">
                    {selectedProduct.name}
                  </h2>
                  <div className="space-y-8">
                    <p className="text-zinc-400 text-lg leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                    {selectedProduct.details && (
                      <div className="space-y-4 pt-8 border-t border-white/5">
                        <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Syllabus & Details</p>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedProduct.details.split('\n').map((line, i) => (
                            <div key={i} className="flex gap-4 items-start">
                              <CheckCircle2 size={16} className="text-brand-accent mt-1 shrink-0" />
                              <span className="text-zinc-500 text-sm font-medium">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-16">
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-brand-accent text-brand-bg py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-xl shadow-brand-accent/10 flex items-center justify-center gap-3"
                  >
                    অর্ডার করুন (Buy Now)
                  </button>
                  <button 
                    onClick={() => openWhatsApp(selectedProduct)}
                    className="w-full py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={18} /> সরাসরি কথা বলুন (WhatsApp)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedProduct && showCheckout && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/98 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md bg-brand-bg border border-brand-accent/20 p-12 text-center"
            >
              <div className="mb-10">
                <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest block mb-4">Secure Checkout</span>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">অর্ডার প্রটোকল</h2>
              </div>
              
              <div className="space-y-4 mb-12 text-left">
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">পেমেন্ট কমপ্লিট করে ট্রানজেকশন আইডি সহ নিচের বাটনে ক্লিক করে হোয়াটস্যাপে মেসেজ দিন।</p>
                
                <div className="p-6 bg-white/[0.02] border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Nagad Personal</span>
                  <span className="text-xl font-mono font-bold text-brand-accent tracking-tighter">{config.nagad || 'UNCONFIGURED'}</span>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Binance Pay ID</span>
                  <span className="text-xl font-mono font-bold text-brand-accent tracking-tighter">{config.binancePayId || 'UNCONFIGURED'}</span>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-2">WhatsApp Contact</span>
                  <span className="text-xl font-mono font-bold text-zinc-300 tracking-tighter">{config.whatsapp || 'UNCONFIGURED'}</span>
                </div>
              </div>

              <button 
                onClick={() => openWhatsApp(selectedProduct, true)}
                className="w-full py-5 bg-brand-accent text-brand-bg font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all mb-4"
              >
                পেমেন্ট কনফার্ম করুন (WhatsApp)
              </button>
              <button 
                onClick={() => setShowCheckout(false)}
                className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-zinc-400"
              >
                বাতিল করুন (Abort)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-20">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[10px] text-brand-accent font-mono font-bold tracking-[0.4em] uppercase mb-6">Marketplace</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-12 uppercase">
              Surgical <span className="text-brand-accent">Tools</span> & Mentorship.
            </h2>
            
            <div className="space-y-12 mb-12">
              <div className="group">
                <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 group-hover:text-brand-accent transition-colors flex items-center gap-3">
                  <span className="w-8 h-px bg-zinc-800 group-hover:bg-brand-accent transition-colors" /> Project Titan
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">Advanced SMC Mentorship program focusing on algorithmic trading logic.</p>
              </div>
              <div className="group">
                <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 group-hover:text-brand-accent transition-colors flex items-center gap-3">
                  <span className="w-8 h-px bg-zinc-800 group-hover:bg-brand-accent transition-colors" /> Algo Vision
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">Custom technical indicators designed for the MetaTrader 5 ecosystem.</p>
              </div>
            </div>

            <div className="p-10 border border-white/5 bg-white/[0.01] relative overflow-hidden group hover:border-brand-accent/20 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 blur-3xl rounded-full" />
              <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">Elite Access</p>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Request Consultancy</h4>
              <button 
                onClick={() => window.open(`https://wa.me/${config.whatsapp?.replace(/\D/g, '')}`, '_blank')}
                className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Connect Now <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative group/carousel">
              <button 
                onClick={() => document.getElementById('product-carousel')?.scrollBy({ left: -400, behavior: 'smooth' })}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brand-accent text-brand-bg flex items-center justify-center rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all shadow-xl hover:scale-110 active:scale-95"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              
              <button 
                onClick={() => document.getElementById('product-carousel')?.scrollBy({ left: 400, behavior: 'smooth' })}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brand-accent text-brand-bg flex items-center justify-center rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all shadow-xl hover:scale-110 active:scale-95"
              >
                <ArrowRight size={20} />
              </button>

              <div 
                id="product-carousel"
                className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="min-w-full sm:min-w-[45%] lg:min-w-[48%] snap-center flex flex-col group relative"
                  >
                    <div className="relative aspect-square bg-zinc-900 border border-white/5 overflow-hidden mb-8">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-800">
                          <ShoppingCart size={80} strokeWidth={0.5} />
                        </div>
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="bg-brand-bg/80 backdrop-blur-md border border-white/10 text-white text-[9px] px-3 py-1.5 font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                          {product.status === 'coming_soon' ? <Lock size={10} /> : null}
                          {product.status?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-brand-accent transition-colors">{product.name}</h3>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-8 border-t border-white/5">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 text-[10px] font-bold uppercase tracking-widest border border-brand-accent/30 text-brand-accent py-4 hover:bg-brand-accent hover:text-brand-bg transition-all"
                      >
                        বিস্তারিত (Details)
                      </button>
                      <button 
                        onClick={() => { setSelectedProduct(product); setShowCheckout(true); }}
                        className="flex-1 text-[10px] font-bold uppercase tracking-widest bg-brand-accent text-brand-bg py-4 hover:bg-white transition-all shadow-lg shadow-brand-accent/10"
                      >
                        কিনুন (Buy)
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Indicators */}
              <div className="flex justify-center gap-4 mt-8">
                {products.map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-brand-accent/30 transition-all" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
