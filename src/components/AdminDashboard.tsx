import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteContext';
import { LogOut, Plus, Trash2, Save, BookOpen, User, ShoppingBag, Settings, FileText, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { logs, story, products, posts, config, updateLogs, updateStory, updateProducts, updatePosts, updateConfig, saveAll, loading } = useSiteData();
  const [activeTab, setActiveTab] = useState<'journal' | 'story' | 'products' | 'posts' | 'settings' | 'policies'>('journal');
  const [isSaving, setIsSaving] = useState(false);

  const handleManualSync = async () => {
    setIsSaving(true);
    await saveAll();
    setIsSaving(false);
  };

  const handleAddPost = async () => {
    const newPost = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: 'New Market Analysis',
      content: 'Write your content here...',
      image: ''
    };
    setIsSaving(true);
    await updatePosts([newPost, ...posts]);
    setIsSaving(false);
  };

  const handleAddLog = async () => {
    const newLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      pair: 'NEW/PAIR',
      status: 'profit' as any,
      performance: '0%',
      description: 'New entry...',
      lesson: 'Keep learning.',
      amount: 0
    };
    setIsSaving(true);
    await updateLogs([newLog, ...logs]);
    setIsSaving(false);
  };

  const handleDeleteLog = async (id: string) => {
    setIsSaving(true);
    await updateLogs(logs.filter(l => l.id !== id));
    setIsSaving(false);
  };

  const handleAddStoryPoint = async () => {
    setIsSaving(true);
    await updateStory([{ id: Date.now().toString(), year: '2025', title: 'New Event', description: 'Description...' }, ...story]);
    setIsSaving(false);
  };

  const handleAddProduct = async () => {
    setIsSaving(true);
    await updateProducts([{ id: Date.now().toString(), name: 'New Course', description: 'Course info...', type: 'course', status: 'coming_soon' }, ...products]);
    setIsSaving(false);
  };

  const handleUpdateConfig = async (newConfig: any) => {
    setIsSaving(true);
    await updateConfig(newConfig);
    setIsSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-brand-bg flex items-center justify-center font-mono text-brand-accent">INITIALIZING_TERMINAL...</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-8 border-b border-white/5 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">Dashboard</h1>
            </div>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Admin: ICT MANIK NY</p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-white/5 pt-6 sm:pt-0">
            <button 
              onClick={handleManualSync}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-brand-accent text-brand-bg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50"
            >
              <Save size={14} /> {isSaving ? 'SYNCING...' : 'SYNC TO CLOUD'}
            </button>
            <button 
              onClick={() => { logout(); window.location.href = '/'; }}
              className="px-4 py-2 bg-white/5 text-zinc-400 border border-white/10 hover:bg-rose-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-12 lg:col-span-3">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
              <NavButton active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} label="PNL RECORDS" />
              <NavButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} label="DAILY ANALYSIS" />
              <NavButton active={activeTab === 'story'} onClick={() => setActiveTab('story')} label="JOURNEY TIMELINE" />
              <NavButton active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="STORE PRODUCTS" />
              <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="SITE SETTINGS" />
              <NavButton active={activeTab === 'policies'} onClick={() => setActiveTab('policies')} label="LEGAL POLICIES" />
            </div>
          </aside>

          <main className="col-span-12 lg:col-span-9">
            <div className="card min-h-[600px] border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-sm font-mono font-bold text-brand-accent mb-8 border-b border-brand-accent/20 pb-4 uppercase tracking-widest">System Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <SectionHeader title="Branding" />
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Logo Name</label>
                          <input className="input-field" value={config.logoName} onChange={(e) => updateConfig({...config, logoName: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Logo Image URL</label>
                          <div className="flex gap-2">
                            <input className="input-field flex-1" value={config.logoImage || ''} onChange={(e) => updateConfig({...config, logoImage: e.target.value}, false)} />
                            <input type="file" accept="image/*" className="hidden" id="logo-upload" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => updateConfig({...config, logoImage: reader.result as string}, false);
                                reader.readAsDataURL(file);
                              }
                            }} />
                            <label htmlFor="logo-upload" className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase font-bold flex items-center cursor-pointer">Upload</label>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TikTok Profile Link</label>
                          <input className="input-field" placeholder="https://tiktok.com/@yourprofile" value={config.tiktok || ''} onChange={(e) => updateConfig({...config, tiktok: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Initials</label>
                          <input className="input-field w-24" maxLength={3} value={config.logoInitials} onChange={(e) => updateConfig({...config, logoInitials: e.target.value.toUpperCase()}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Tagline</label>
                          <input className="input-field" value={config.tagline} onChange={(e) => updateConfig({...config, tagline: e.target.value}, false)} />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <SectionHeader title="Links & Contacts" />
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Telegram ID</label>
                          <input className="input-field" value={config.telegram} onChange={(e) => updateConfig({...config, telegram: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">WhatsApp Link</label>
                          <input className="input-field" value={config.whatsapp} onChange={(e) => updateConfig({...config, whatsapp: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Official Email</label>
                          <input className="input-field" value={config.email} onChange={(e) => updateConfig({...config, email: e.target.value}, false)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journal' && (
                  <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-sm font-mono font-bold text-brand-accent uppercase tracking-widest">Performance Logs</h2>
                      <button onClick={handleAddLog} className="px-6 py-2 bg-brand-accent text-brand-bg font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        NEW ENTRY
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-12 gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                          <div className="col-span-3">
                            <input type="date" className="bg-transparent border-none text-xs font-mono text-zinc-400 outline-none w-full" value={log.date} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, date: e.target.value} : l), false)} />
                          </div>
                          <div className="col-span-3">
                            <input className="bg-transparent border-none text-xs font-mono text-white outline-none w-full" value={log.pair} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, pair: e.target.value} : l), false)} />
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-zinc-600 font-mono italic">$</span>
                              <input type="number" className="bg-transparent border-none text-xs font-mono text-white outline-none w-full" value={log.amount || 0} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, amount: parseFloat(e.target.value)} : l), false)} />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <select className="bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none w-full cursor-pointer" value={log.status} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, status: e.target.value as any} : l), false)}>
                              <option value="profit" className="text-emerald-500">PROFIT</option>
                              <option value="loss" className="text-rose-500">LOSS</option>
                              <option value="breakeven">BREAKEVEN</option>
                            </select>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <button onClick={() => handleDeleteLog(log.id)} className="text-zinc-700 hover:text-rose-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'story' && (
                  <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-sm font-mono font-bold text-brand-accent uppercase tracking-widest">Story Timeline</h2>
                      <button onClick={handleAddStoryPoint} className="px-6 py-2 bg-brand-accent text-brand-bg font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        ADD POINT
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {story.map((point) => (
                        <div key={point.id} className="p-6 border border-white/5 bg-white/[0.02] space-y-4">
                          <div className="flex gap-4">
                            <input className="bg-transparent border-zinc-800 border px-3 py-2 text-xs font-mono text-brand-accent w-24 outline-none" value={point.year} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, year: e.target.value} : s), false)} />
                            <input className="bg-transparent border-zinc-800 border px-3 py-2 text-sm font-bold text-white flex-1 outline-none" value={point.title} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, title: e.target.value} : s), false)} />
                            <button onClick={() => updateStory(story.filter(s => s.id !== point.id), false)} className="text-rose-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea className="w-full bg-transparent border-zinc-800 border p-3 text-xs text-zinc-400 outline-none h-24" value={point.description} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, description: e.target.value} : s), false)} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'products' && (
                  <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                      <div>
                        <h2 className="text-xl font-bold text-brand-accent uppercase tracking-widest mb-1">Product Catalog</h2>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Manage your digital assets and courses</p>
                      </div>
                      <button 
                        onClick={handleAddProduct} 
                        className="w-full sm:w-auto px-8 py-3 bg-brand-accent text-brand-bg font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> ADD NEW PRODUCT
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {products.map((product) => (
                        <div key={product.id} className="p-8 border border-white/5 bg-white/[0.02] flex flex-col group relative">
                          <div className="relative aspect-video bg-zinc-900 border border-white/5 mb-6 overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-800 text-[10px] uppercase font-bold tracking-[0.5em]">No_Visual</div>
                            )}
                            <input type="file" accept="image/*" className="hidden" id={`prod-img-${product.id}`} onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => updateProducts(products.map(p => p.id === product.id ? {...p, image: reader.result as string} : p));
                                reader.readAsDataURL(file);
                              }
                            }} />
                            <label htmlFor={`prod-img-${product.id}`} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-opacity backdrop-blur-sm">
                              <Plus size={24} className="mb-2" />
                              Update Media
                            </label>
                          </div>

                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="flex-1 space-y-2">
                                <label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Product Name</label>
                                <input 
                                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-bold text-white outline-none focus:border-brand-accent/30 transition-all" 
                                  value={product.name} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, name: e.target.value} : p), false)} 
                                />
                              </div>
                              <div className="w-28 space-y-2">
                                <label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Type</label>
                                <input 
                                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[10px] font-mono text-brand-accent outline-none uppercase tracking-widest" 
                                  placeholder="COURSE" 
                                  value={product.type} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, type: e.target.value} : p), false)} 
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Description</label>
                              <textarea 
                                className="w-full bg-white/5 border border-white/10 p-4 text-xs text-zinc-400 outline-none h-24 resize-none" 
                                placeholder="Core value proposition..." 
                                value={product.description} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, description: e.target.value} : p), false)} 
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Specifications (List)</label>
                              <textarea 
                                className="w-full bg-white/5 border border-white/10 p-4 text-xs text-zinc-500 outline-none h-24 font-mono resize-none" 
                                placeholder="Feature 1&#10;Feature 2..." 
                                value={product.details || ''} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, details: e.target.value} : p), false)} 
                              />
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                              <select 
                                className="flex-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest p-3 outline-none cursor-pointer" 
                                value={product.status} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, status: e.target.value as any} : p), false)}
                              >
                                <option value="available">🛒 AVAILABLE</option>
                                <option value="coming_soon">⏳ COMING SOON</option>
                                <option value="sold_out">🚫 SOLD OUT</option>
                              </select>
                              <button 
                                onClick={() => {
                                  if(confirm('Are you sure you want to delete this product?')) {
                                    updateProducts(products.filter(p => p.id !== product.id), false)
                                  }
                                }} 
                                className="px-5 py-3 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                              >
                                DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'posts' && (
                  <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-sm font-mono font-bold text-brand-accent uppercase tracking-widest">Market Broadcasts</h2>
                      <button onClick={handleAddPost} className="px-6 py-2 bg-brand-accent text-brand-bg font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        NEW POST
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      {posts.map((post) => (
                        <div key={post.id} className="p-8 border border-white/10 bg-white/[0.01] space-y-6">
                          <div className="flex justify-between gap-8 items-start">
                            <input className="bg-transparent border-none p-0 text-xl font-bold text-white outline-none flex-1 placeholder:text-zinc-800" placeholder="Post Title..." value={post.title} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value} : p), false)} />
                            <input type="date" className="bg-white/5 border border-white/10 rounded-none px-4 py-2 text-[10px] font-mono text-zinc-400 outline-none" value={post.date} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, date: e.target.value} : p), false)} />
                          </div>
                          
                          <textarea className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-zinc-400 outline-none h-64 focus:border-brand-accent/20 transition-all font-light leading-relaxed" placeholder="Write Market Insights Here..." value={post.content} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, content: e.target.value} : p), false)} />
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <input type="file" accept="image/*" className="hidden" id={`img-${post.id}`} onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => updatePosts(posts.map(p => p.id === post.id ? {...p, image: reader.result as string} : p), false);
                                  reader.readAsDataURL(file);
                                }
                              }} />
                              <label htmlFor={`img-${post.id}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent cursor-pointer hover:text-white transition-colors">
                                {post.image ? 'CHANGE VISUAL' : 'UPLOAD VISUAL'}
                              </label>
                              {post.image && <button onClick={() => updatePosts(posts.map(p => p.id === post.id ? {...p, image: ''} : p), false)} className="text-rose-500 text-[10px] uppercase font-bold tracking-widest">REMOVE</button>}
                            </div>
                            <button onClick={() => updatePosts(posts.filter(p => p.id !== post.id), false)} className="text-zinc-600 hover:text-rose-500 transition-colors text-[10px] uppercase font-bold tracking-widest">DELETE POST</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'policies' && (
                  <motion.div key="policies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-sm font-mono font-bold text-brand-accent mb-8 border-b border-brand-accent/20 pb-4 uppercase tracking-widest">Legal & Policies</h2>
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <SectionHeader title="Privacy Policy" />
                        <textarea 
                          className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-zinc-400 outline-none h-96 focus:border-brand-accent/20 transition-all font-mono" 
                          value={config.privacyPolicy || ''} 
                          onChange={(e) => updateConfig({...config, privacyPolicy: e.target.value}, false)} 
                          placeholder="Enter privacy policy text..."
                        />
                      </div>
                      <div className="space-y-4">
                        <SectionHeader title="Terms of Service" />
                        <textarea 
                          className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-zinc-400 outline-none h-96 focus:border-brand-accent/20 transition-all font-mono" 
                          value={config.termsOfService || ''} 
                          onChange={(e) => updateConfig({...config, termsOfService: e.target.value}, false)} 
                          placeholder="Enter terms of service text..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`lg:w-full text-left px-6 py-4 font-mono text-[10px] uppercase tracking-widest transition-all border whitespace-nowrap min-w-max lg:min-w-0 ${active ? 'bg-brand-accent border-brand-accent text-brand-bg font-black' : 'bg-transparent border-white/5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
    >
      {active ? `> ${label}` : label}
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h3 className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">{title}</h3>;
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
