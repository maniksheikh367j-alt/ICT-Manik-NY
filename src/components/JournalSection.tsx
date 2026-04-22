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
    { label: '3 Days PNL', value: calculatePNL(3) },
    { label: '7 Days PNL', value: calculatePNL(7) },
    { label: '1 Month PNL', value: calculatePNL(30) },
    { label: '1 Year PNL', value: calculatePNL(365) },
  ];

  return (
    <section id="journal" className="py-24 px-10 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 italic">Trading <span className="text-brand-accent">Performance</span></h2>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">Real-time PNL Tracker</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-brand-accent/30 transition-all group"
            >
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">{stat.label}</p>
              <h4 className={cn(
                "text-3xl font-mono font-bold tracking-tighter",
                stat.value >= 0 ? "text-emerald-500" : "text-rose-500"
              )}>
                {stat.value >= 0 ? '+' : '-'}${Math.abs(stat.value).toLocaleString()}
              </h4>
              <div className={cn(
                "w-12 h-1 mt-6 mx-auto rounded-full blur-sm opacity-20",
                stat.value >= 0 ? "bg-emerald-500" : "bg-rose-500"
              )} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-zinc-600 text-xs italic">Values are updated based on recent market closures and verified trades.</p>
        </div>
      </div>
    </section>
  );
}
