import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteContext';
import { LogOut, Plus, Trash2, Save, BookOpen, User, ShoppingBag, Settings, FileText, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { logs, story, products, posts, config, updateLogs, updateStory, updateProducts, updatePosts, updateConfig } = useSiteData();
  const [activeTab, setActiveTab] = useState<'journal' | 'story' | 'products' | 'posts' | 'settings' | 'policies'>('journal');

  const addPost = () => {
    const newPost = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: 'New Market Analysis',
      content: 'Write your content here...',
      image: ''
    };
    updatePosts([newPost, ...posts]);
  };

  const addLog = () => {
    const newLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      pair: 'NEW/PAIR',
      status: 'neutral' as any,
      performance: '0%',
      description: 'New entry...',
      lesson: 'Keep learning.'
    };
    updateLogs([newLog, ...logs]);
  };

  const deleteLog = (id: string) => updateLogs(logs.filter(l => l.id !== id));

  const addStoryPoint = () => {
    updateStory([{ id: Date.now().toString(), year: '2025', title: 'New Event', description: 'Description...' }, ...story]);
  };

  const addProduct = () => {
    updateProducts([{ id: Date.now().toString(), name: 'New Course', description: 'Course info...', type: 'course', status: 'coming_soon' }, ...products]);
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Panel</h1>
            <p className="text-zinc-500">Manage your website content and track your journey.</p>
          </div>
          <button 
            onClick={() => { logout(); window.location.href = '/'; }}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)]"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <TabButton active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} icon={<BookOpen size={18} />} label="PNL Records" />
          <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} icon={<FileText size={18} />} label="Daily Posts" />
          <TabButton active={activeTab === 'story'} onClick={() => setActiveTab('story')} icon={<User size={18} />} label="My Story" />
          <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<ShoppingBag size={18} />} label="Products" />
          <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18} />} label="Site Settings" />
          <TabButton active={activeTab === 'policies'} onClick={() => setActiveTab('policies')} icon={<FileText size={18} />} label="Policies" />
        </div>

        <div className="card min-h-[600px] border-brand-accent/10">
          <AnimatePresence mode="wait">
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold mb-8">System Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-2">Branding</h3>
                    
                    <div className="space-y-2">
                       <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Logo Graphic (Circular View)</label>
                       <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                          <div className="relative group">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-brand-accent bg-black/40 flex items-center justify-center">
                              {config.logoImage ? (
                                <img src={config.logoImage} className="w-full h-full object-cover" alt="Logo preview" />
                              ) : (
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter text-center px-1">Img<br/>Upload</div>
                              )}
                            </div>
                            <div className="absolute inset-0 rounded-full border-4 border-black/50 pointer-events-none opacity-50 group-hover:opacity-20 transition-opacity" />
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <p className="text-[10px] text-zinc-500 italic">Recommendation: Use a square image for best circular fit.</p>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-brand-accent/10 file:text-brand-accent hover:file:bg-brand-accent/20 cursor-pointer w-full"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    updateConfig({...config, logoImage: reader.result as string});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            {config.logoImage && (
                              <button onClick={() => updateConfig({...config, logoImage: ''})} className="text-[10px] text-rose-500 hover:underline flex items-center gap-1">
                                <Trash2 size={10} /> Reset to Text Logo
                              </button>
                            )}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Logo Name</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" value={config.logoName} onChange={(e) => updateConfig({...config, logoName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Logo Initials (SJ)</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" maxLength={3} value={config.logoInitials} onChange={(e) => updateConfig({...config, logoInitials: e.target.value.toUpperCase()})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Tagline</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" value={config.tagline} onChange={(e) => updateConfig({...config, tagline: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Telegram Username</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="@username" value={config.telegram} onChange={(e) => updateConfig({...config, telegram: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">WhatsApp Number</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="+8801..." value={config.whatsapp} onChange={(e) => updateConfig({...config, whatsapp: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Public Email</label>
                       <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="email@example.com" value={config.email} onChange={(e) => updateConfig({...config, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">TikTok Username</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="@username" value={config.tiktok} onChange={(e) => updateConfig({...config, tiktok: e.target.value})} />
                    </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Nagad Number (Personal)</label>
                          <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="018..." value={config.nagad} onChange={(e) => updateConfig({...config, nagad: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Binance ID</label>
                          <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" placeholder="Binance ID" value={config.binancePayId} onChange={(e) => updateConfig({...config, binancePayId: e.target.value})} />
                        </div>
                      </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/5 max-w-md">
                    <h3 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest">Story Section Overrides</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Story Section Title</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent" value={config.storyTitle} onChange={(e) => updateConfig({...config, storyTitle: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Psychology Quote</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-brand-accent h-20" value={config.storyQuote} onChange={(e) => updateConfig({...config, storyQuote: e.target.value})} />
                      </div>
                    </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'policies' && (
              <motion.div key="policies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold mb-8">Management of Policies</h2>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Privacy Policy</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-6 outline-none h-[250px] focus:border-brand-accent font-sans text-sm leading-relaxed" 
                      value={config.privacyPolicy} 
                      placeholder="Write your Privacy Policy here..."
                      onChange={(e) => updateConfig({...config, privacyPolicy: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Terms of Service</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-6 outline-none h-[250px] focus:border-brand-accent font-sans text-sm leading-relaxed" 
                      value={config.termsOfService} 
                      placeholder="Write your Terms of Service here..."
                      onChange={(e) => updateConfig({...config, termsOfService: e.target.value})} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'journal' && (
              <motion.div key="journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold">Manage PNL Records</h2>
                    <p className="text-xs text-zinc-500 mt-1">Add or edit your trading performance records here.</p>
                  </div>
                  <button onClick={addLog} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-brand-bg rounded-lg font-bold shadow-lg shadow-brand-accent/20">
                    <Plus size={18} /> Add Record
                  </button>
                </div>
                
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-wrap gap-4 items-center">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Date</label>
                        <input 
                          type="date"
                          className="bg-zinc-800 border-none rounded-lg p-2 text-xs outline-none text-white w-40"
                          value={log.date}
                          onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, date: e.target.value} : l))}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Pair/Asset</label>
                        <input 
                          className="bg-zinc-800 border-none rounded-lg p-2 text-xs outline-none w-32 font-mono text-brand-accent"
                          placeholder="EUR/USD"
                          value={log.pair}
                          onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, pair: e.target.value} : l))}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Profit or Loss ($)</label>
                        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-1.5 border border-white/5">
                          <span className="text-zinc-500 font-mono italic text-xs">$</span>
                          <input 
                            type="number"
                            placeholder="0.00"
                            className="bg-transparent border-none p-1 text-sm font-mono outline-none w-24 text-white"
                            value={log.amount || ''}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateLogs(logs.map(l => l.id === log.id ? {
                                ...l, 
                                amount: val
                              } : l));
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Status</label>
                        <select 
                          className="bg-zinc-800 border-none rounded-lg p-2 text-xs outline-none"
                          value={log.status}
                          onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, status: e.target.value as any} : l))}
                        >
                          <option value="profit" className="text-emerald-500">Profit (+)</option>
                          <option value="loss" className="text-rose-500">Loss (-)</option>
                          <option value="neutral">Neutral</option>
                        </select>
                      </div>

                      <div className="ml-auto">
                        <button 
                          onClick={() => deleteLog(log.id)}
                          className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'posts' && (
              <motion.div key="posts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold">Manage Daily Posts</h2>
                    <p className="text-xs text-zinc-500 mt-1">Post your daily analysis and market thoughts.</p>
                  </div>
                  <button onClick={addPost} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-brand-bg rounded-lg font-bold shadow-lg">
                    <Plus size={18} /> New Post
                  </button>
                </div>
                
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex justify-between gap-4">
                        <input 
                          type="text"
                          className="bg-transparent border-b border-white/10 p-2 text-lg font-bold outline-none flex-1"
                          placeholder="Post Title"
                          value={post.title}
                          onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value} : p))}
                        />
                        <input 
                          type="date"
                          className="bg-zinc-800 border-none rounded-lg p-2 text-xs outline-none text-white h-fit"
                          value={post.date}
                          onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, date: e.target.value} : p))}
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Upload Image (Optional)</label>
                        <div className="flex items-center gap-4">
                          {post.image && <img src={post.image} className="w-16 h-16 rounded-xl object-cover" alt="preview" />}
                          <input 
                            type="file" 
                            accept="image/*"
                            className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-accent/10 file:text-brand-accent cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updatePosts(posts.map(p => p.id === post.id ? {...p, image: reader.result as string} : p));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          {post.image && <button onClick={() => updatePosts(posts.map(p => p.id === post.id ? {...p, image: ''} : p))} className="text-rose-500 text-[10px] uppercase font-bold">Remove</button>}
                        </div>
                      </div>

                      <textarea 
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl p-4 text-sm outline-none h-48 focus:border-brand-accent/30 transition-colors"
                        placeholder="Write your update here..."
                        value={post.content}
                        onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, content: e.target.value} : p))}
                      />
                      
                      <div className="flex justify-end pt-2">
                        <button 
                          onClick={() => updatePosts(posts.filter(p => p.id !== post.id))}
                          className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors text-xs font-bold"
                        >
                          <Trash2 size={16} /> Delete Post
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'story' && (
              <motion.div key="story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Edit Story Timeline</h2>
                  <button onClick={addStoryPoint} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg font-bold">
                    <Plus size={18} /> Add Point
                  </button>
                </div>
                <div className="grid gap-4">
                  {story.map((point) => (
                    <div key={point.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex gap-4">
                        <input className="w-24 bg-transparent border-b border-white/10 p-1 text-sm outline-none" value={point.year} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, year: e.target.value} : s))} />
                        <input className="flex-1 bg-transparent border-b border-white/10 p-1 text-sm outline-none" value={point.title} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, title: e.target.value} : s))} />
                      </div>
                      <textarea className="w-full bg-transparent border border-white/10 rounded-lg p-2 text-sm outline-none h-20" value={point.description} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, description: e.target.value} : s))} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Manage Products</h2>
                  <button onClick={addProduct} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg font-bold">
                    <Plus size={18} /> Add Product
                  </button>
                </div>
                <div className="grid gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex gap-4">
                      <div className="flex-1 space-y-2">
                        <input className="w-full bg-transparent border-b border-white/10 p-1 text-sm font-bold outline-none" placeholder="Product Name" value={p.name} onChange={(e) => updateProducts(products.map(pr => pr.id === p.id ? {...pr, name: e.target.value} : pr))} />
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Product Image</label>
                          <div className="flex items-center gap-4">
                            {p.image && (
                              <img src={p.image} className="w-12 h-12 rounded bg-zinc-800 object-cover border border-white/10" alt="Preview" />
                            )}
                            <input 
                              type="file" 
                              accept="image/*"
                              className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-accent/10 file:text-brand-accent hover:file:bg-brand-accent/20 cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    updateProducts(products.map(pr => pr.id === p.id ? {...pr, image: reader.result as string} : pr));
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            {p.image && (
                              <button 
                                onClick={() => updateProducts(products.map(pr => pr.id === p.id ? {...pr, image: ''} : pr))}
                                className="text-[10px] text-rose-500 hover:underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <textarea className="w-full bg-transparent border border-white/10 rounded-lg p-2 text-sm outline-none h-16" placeholder="Short Description (shown on card)" value={p.description} onChange={(e) => updateProducts(products.map(pr => pr.id === p.id ? {...pr, description: e.target.value} : pr))} />
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold px-1">Detailed Description (Full content)</label>
                          <textarea className="w-full bg-transparent border border-white/10 rounded-lg p-2 text-sm outline-none h-32" placeholder="Write full details about this product, syllabus, features, etc." value={p.details || ''} onChange={(e) => updateProducts(products.map(pr => pr.id === p.id ? {...pr, details: e.target.value} : pr))} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <select className="bg-zinc-800 p-2 rounded h-fit text-xs border border-white/5 outline-none" value={p.status} onChange={(e) => updateProducts(products.map(pr => pr.id === p.id ? {...pr, status: e.target.value as any} : pr))}>
                          <option value="coming_soon">Coming Soon</option>
                          <option value="available">Available</option>
                        </select>
                        <button 
                          onClick={() => {
                            const updated = products.filter(pr => pr.id !== p.id);
                            updateProducts(updated);
                          }}
                          className="flex items-center justify-center gap-2 p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                          <Trash2 size={14} /> Delete Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${active ? 'bg-brand-accent border-brand-accent text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'}`}
    >
      {icon} {label}
    </button>
  );
}
