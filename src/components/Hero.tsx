import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center pt-32 px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 w-full max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 bg-zinc-900/40 border border-white/5 flex flex-col justify-between p-8 md:p-20 min-h-[500px] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-brand-accent text-[10px] font-mono tracking-[0.4em] uppercase font-bold">Official Hub</span>
              <div className="h-[1px] w-12 bg-brand-accent/30" />
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-10 leading-[0.85] tracking-tighter max-w-5xl font-black uppercase">
              Trading is <br/><span className="text-brand-accent">Logic</span> Beyond Belief.
            </h1>
            
            <p className="text-zinc-500 leading-relaxed text-xl max-w-2xl font-light">
              Master the algorithmic flow of the markets with <span className="text-white font-medium">ICT MANIK NY</span>. We provide surgical precision tools and mentorship for the modern technical trader.
            </p>
          </div>
          
          <div className="mt-16 relative z-10">
            <button 
              onClick={onStart}
              className="bg-brand-accent text-brand-bg px-12 py-6 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all glow-green-hover"
            >
              Explore Course
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
