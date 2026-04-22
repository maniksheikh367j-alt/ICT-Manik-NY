import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';

export default function StorySection() {
  const { story, config } = useSiteData();
  
  return (
    <section id="story" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl">
            <p className="text-[10px] text-brand-accent font-mono font-bold tracking-[0.4em] uppercase mb-4">The Evolution</p>
            <h2 className="text-5xl md:text-7xl font-serif italic font-black leading-tight tracking-tighter">
              {config.storyTitle}
            </h2>
          </div>
          <div className="max-w-xs">
             <p className="text-zinc-500 text-sm font-light leading-relaxed border-l border-brand-accent/30 pl-6 italic">
              "{config.storyQuote}"
            </p>
          </div>
        </div>

        <div className="space-y-40">
          {story.map((point, index) => (
            <motion.div 
              key={point.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start group"
            >
              <div className="md:col-span-3">
                <span className="text-7xl md:text-9xl font-mono font-bold text-white/5 group-hover:text-brand-accent/10 transition-colors leading-none tracking-tighter">
                  {point.year}
                </span>
              </div>
              
              <div className="md:col-span-1 hidden md:flex justify-center pt-8">
                <div className="w-px h-full bg-white/5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-accent" />
                </div>
              </div>

              <div className="md:col-span-8 pt-4 md:pt-8 opacity-60 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight font-sans uppercase">{point.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-light">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
