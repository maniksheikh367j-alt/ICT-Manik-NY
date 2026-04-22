import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center pt-32 px-10">
      <div className="grid grid-cols-12 gap-8 w-full max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 card bg-linear-to-br from-brand-accent/10 via-transparent to-transparent flex flex-col justify-between p-10 min-h-[400px]"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-brand-accent/20 text-brand-accent text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Latest Update
              </span>
              <span className="text-zinc-500 text-xs font-mono">Oct 23, 2024</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight max-w-4xl">
              Market Psychology and My First Major Break-Even
            </h1>
            
            <p className="text-zinc-400 leading-relaxed text-lg max-w-2xl">
              Trading isn't just about looking at charts; it's a story of a battle with yourself. In today's trade, I learned how patience can help you return safely even from a losing position.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <button 
              onClick={onStart}
              className="bg-brand-accent text-white px-8 py-4 rounded font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2"
            >
              Check My Performance
              <ArrowRight size={18} />
            </button>
            <span className="text-zinc-500 text-sm italic underline decoration-brand-accent/30 underline-offset-4">Verified Results</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
