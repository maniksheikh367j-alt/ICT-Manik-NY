import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';

export default function PostSection() {
  const { posts } = useSiteData();

  if (posts.length === 0) return null;

  return (
    <section id="posts" className="py-24 px-10 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Daily Updates</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter text-white">
            Market <span className="text-brand-accent">Insights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post, index) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={post.id}
              className="group bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden hover:border-brand-accent/30 transition-all duration-500"
            >
              {post.image && (
                <div className="h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              )}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-accent" />
                    {format(new Date(post.date), 'MMMM dd, yyyy')}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h3>
                
                <div className="text-zinc-400 leading-relaxed text-sm whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
