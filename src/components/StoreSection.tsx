import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { ShoppingCart, Lock, X, CheckCircle2, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
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
    <section id="store" className="py-24 px-10">
      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white z-10"
              >
                <X size={20} />
              </button>

              <div className="h-48 md:h-64 w-full relative">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-brand-accent">
                    <ShoppingCart size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-2 block">{selectedProduct.type}</span>
                  <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                </div>
              </div>

              <div className="p-8 md:p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Description</h4>
                    <p className="text-zinc-300 leading-relaxed text-lg">{selectedProduct.description}</p>
                  </div>

                  {selectedProduct.details && (
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Detailed Information</h4>
                      <div className="text-zinc-400 leading-relaxed whitespace-pre-wrap space-y-4">
                        {selectedProduct.details.split('\n').map((line, i) => (
                          <p key={i} className="flex gap-3">
                            <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-1" />
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-10 flex gap-4">
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="flex-1 bg-brand-accent text-brand-bg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                      Instant Buy
                    </button>
                    <button 
                      onClick={() => openWhatsApp(selectedProduct)}
                      className="px-6 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <MessageCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Checkout Modal */}
        {selectedProduct && showCheckout && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-brand-accent/20 rounded-[3rem] p-10 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
            >
              <h2 className="text-2xl font-bold mb-2">Checkout</h2>
              <p className="text-zinc-500 text-sm mb-8 px-4">Follow the steps below to complete your order for <span className="text-white font-bold">{selectedProduct.name}</span></p>

              <div className="space-y-4 mb-10 text-left">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Nagad (Personal)</p>
                  <p className="font-mono text-orange-400 font-bold text-lg">{config.nagad || 'Update in Admin'}</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Binance ID</p>
                  <p className="font-mono text-yellow-400 font-bold text-lg">{config.binancePayId || 'Update in Admin'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => openWhatsApp(selectedProduct, true)}
                  className="w-full py-5 bg-brand-accent text-brand-bg rounded-[1.5rem] font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10"
                >
                  <MessageCircle size={20} /> I have Paid (WhatsApp)
                </button>
                <div className="h-px bg-white/5 mx-10 mt-4" />
                <button 
                  onClick={() => openWhatsApp(selectedProduct)}
                  className="w-full py-3 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Contact on WhatsApp First
                </button>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-zinc-600 text-[10px] uppercase font-bold hover:text-zinc-400"
                >
                  Back to Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Future Roadmaps</h2>
            <ul className="space-y-6 text-zinc-400">
              <li className="flex gap-4 items-start">
                <span className="text-brand-accent mt-1">●</span>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">Advanced Scalping Course</h4>
                  <p className="text-xs">Coming this November.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-brand-accent mt-1">●</span>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">Custom RSI Indicator</h4>
                  <p className="text-xs">Proprietary algorithm-based tools.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-brand-accent mt-1">●</span>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">One-to-One Mentorship</h4>
                  <p className="text-xs">Personal guidance to master the markets.</p>
                </div>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-brand-accent/5 rounded border border-brand-accent/20 text-center">
              <p className="text-[10px] mb-2 uppercase tracking-[0.2em] font-bold text-zinc-500">Stay Tuned</p>
              <p className="text-brand-accent font-bold uppercase tracking-[0.2em]">Premium Tools Loading</p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                key={product.id}
                className="card flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-full h-48 bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-accent">
                          <ShoppingCart size={40} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-zinc-800 text-zinc-500 text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2">
                      <Lock size={8} /> Coming Soon
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                    {product.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setSelectedProduct(product); setShowCheckout(true); }}
                    className="btn-outline flex-1 bg-brand-accent/10 border-brand-accent/20 text-brand-accent text-center py-2 rounded-lg text-sm font-bold block"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => { setSelectedProduct(product); setShowCheckout(false); }}
                    className="btn-outline flex-1 bg-transparent py-2 rounded-lg text-sm text-zinc-500 border-white/5"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
