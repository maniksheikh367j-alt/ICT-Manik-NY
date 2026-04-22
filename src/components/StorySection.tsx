import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { cn } from '../lib/utils';

export default function StorySection() {
  const { story, config } = useSiteData();
  
  return (
    <section id="story" className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{config.storyTitle}</h2>
          <p className="text-zinc-500 italic font-serif">
            "{config.storyQuote}"
          </p>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Timeline center line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />

          {story.map((point, index) => (
            <div key={point.id} className={cn(
              "relative mb-24 flex flex-col md:flex-row items-center",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}>
              {/* Timeline marker */}
              <div className="absolute left-[-1px] md:left-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

              <div className="md:w-1/2 px-12 text-left md:text-right">
                {index % 2 !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2 md:items-end"
                  >
                    <span className="text-6xl font-bold text-zinc-900 font-mono leading-none">{point.year}</span>
                    <h3 className="text-2xl font-bold">{point.title}</h3>
                    <p className="text-zinc-500 leading-relaxed">{point.description}</p>
                  </motion.div>
                )}
              </div>

              <div className="md:w-1/2 px-12 text-left">
                {index % 2 === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-6xl font-bold text-zinc-900 font-mono leading-none">{point.year}</span>
                    <h3 className="text-2xl font-bold">{point.title}</h3>
                    <p className="text-zinc-500 leading-relaxed">{point.description}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
