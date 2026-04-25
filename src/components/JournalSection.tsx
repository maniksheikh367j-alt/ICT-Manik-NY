import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { cn } from '../lib/utils';
import { subDays, isAfter, startOfDay } from 'date-fns';

export default function JournalSection() {
  const { logs } = useSiteData();

  const calculatePNL = (days: number) => {
    const cutoffDate = subDays(startOfDay(new Date()), days);
    return logs.reduce((acc, log) => {
      const logDate = new Date(log.date);
      if (isAfter(logDate, cutoffDate)) {
        if (log.status === 'profit') return acc + (log.amount || 0);
        if (log.status === 'loss') return acc - (log.amount || 0);
      }
      return acc;
    }, 0);
  };

  const stats = [
    { label: 'QUARTER_PNL', value: calculatePNL(90) },
    { label: 'MONTH_PNL', value: calculatePNL(30) },
    { label: 'WEEK_PNL', value: calculatePNL(7) },
    { label: 'AVG_DRAWDOWN', value: -1.2, isRaw: true }, // Placeholder
  ];

  return (
    <section id="journal" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,159,0.03),transparent_50%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <p className="text-[10px] text-brand-accent font-mono font-bold tracking-[0.4em] uppercase mb-4">Operations Log</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter uppercase">
              Performance <span className="text-brand-accent">Verification.</span>
            </h2>
          </div>
          <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase pb-4">Stream: 256-bit Encrypted</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-black/40 border border-white/[0.03] p-12 group hover:border-brand-accent/30 transition-all cursor-default"
            >
              <p className="text-[10px] text-zinc-700 font-mono font-bold tracking-[0.2em] mb-8 uppercase group-hover:text-zinc-500 transition-colors">{stat.label}</p>
              <h4 className={cn(
                "text-4xl font-mono font-black tracking-tighter transition-all",
                stat.value >= 0 ? "text-brand-accent group-hover:drop-shadow-[0_0_10px_rgba(0,255,159,0.3)]" : "text-rose-600"
              )}>
                {stat.isRaw ? `${stat.value}%` : `${stat.value >= 0 ? '+' : '-'}$${Math.abs(stat.value).toLocaleString()}`}
              </h4>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 border-t border-white/5 pt-8 flex justify-between items-center">
            <p className="text-zinc-600 text-[9px] font-mono uppercase tracking-widest">Protocol: Verified_Results_v2.0</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-brand-accent/20" />
              <div className="w-2 h-2 rounded-full bg-brand-accent/20" />
            </div>
        </div>
      </div>
    </section>
  );
}
