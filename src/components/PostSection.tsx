import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';

export default function PostSection() {
  const { posts } = useSiteData();

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (posts.length === 0) return null;

  return (
    <section id="posts" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl">
            <p className="text-[10px] text-brand-accent font-mono font-bold tracking-[0.4em] uppercase mb-4">Intel Stream</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter uppercase">
              Daily <span className="text-brand-accent">Intelligence.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest border border-white/5 px-6 py-3">
             <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" /> Live Updates
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {sortedPosts.map((post, i) => (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={post.id}
              className="flex flex-col group"
            >
              <div className="aspect-[16/10] bg-zinc-900 border border-white/5 overflow-hidden mb-10 relative">
                {post.image ? (
                  <img src={post.image} className="w-full h-full object-cover transition-all duration-700" alt={post.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-sm font-mono font-bold uppercase tracking-[0.5em]">No_Visual</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 bg-brand-bg px-4 py-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-t border-r border-white/5">
                  {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <h3 className="text-2xl font-black mb-6 tracking-tighter group-hover:text-brand-accent transition-colors leading-tight uppercase">
                {post.title}
              </h3>
              
              <div className="text-zinc-500 text-sm leading-relaxed font-light line-clamp-3 mb-8">
                {post.content}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-brand-accent transition-colors flex items-center gap-3">
                    DECRYPT_INFO <span className="w-8 h-px bg-zinc-900 group-hover:bg-brand-accent group-hover:w-12 transition-all" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
