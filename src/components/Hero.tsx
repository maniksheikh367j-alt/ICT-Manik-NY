import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center pt-32 px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 w-full max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 card border-brand-accent/20 flex flex-col justify-between p-8 md:p-20 min-h-[500px] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.2em]">
                Verified Performance
              </span>
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">Precision Trading</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter max-w-4xl font-black">
              Trading is a <span className="text-brand-accent">Mind Game</span>, Not a Chart Game.
            </h1>
            
            <p className="text-zinc-400 leading-relaxed text-xl max-w-2xl font-light">
              Welcome to the official hub of <span className="text-white font-medium tracking-tight whitespace-nowrap">ICT MANIK NY</span>. Here I document my daily journey, surgical setups, and the psychological evolution of a retail trader becoming part of the smart money.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mt-16 relative z-10">
            <button 
              onClick={onStart}
              className="bg-brand-accent text-brand-bg px-10 py-5 rounded-none font-black uppercase tracking-[0.1em] text-sm hover:bg-white transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
            >
              Access Journal
            </button>
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Consistency</span>
                <span className="text-2xl font-mono font-bold">~84%</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Methodology</span>
                <span className="text-2xl font-mono font-bold">ICT/SMC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
