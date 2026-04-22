import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteContext';
import { LogOut, Plus, Trash2, Save, BookOpen, User, ShoppingBag, Settings, FileText, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { logs, story, products, posts, config, updateLogs, updateStory, updateProducts, updatePosts, updateConfig, loading } = useSiteData();
  const [activeTab, setActiveTab] = useState<'journal' | 'story' | 'products' | 'posts' | 'settings' | 'policies'>('journal');
  const [isSaving, setIsSaving] = useState(false);

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
        <header className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              <h1 className="text-3xl font-mono font-bold tracking-tighter uppercase">Mission_Control</h1>
            </div>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Admin Authority: ICT_MANIK_NY</p>
          </div>
          <div className="flex items-center gap-6">
            {isSaving && <span className="text-[10px] font-mono text-brand-accent animate-pulse">SYNCING_DATA...</span>}
            <button 
              onClick={() => { logout(); window.location.href = '/'; }}
              className="px-4 py-2 bg-white/5 text-zinc-400 border border-white/10 hover:bg-rose-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              Sign_Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-12 lg:col-span-3 space-y-2">
            <NavButton active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} label="PNL_RECORDS" />
            <NavButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} label="DAILY_ANALYSIS" />
            <NavButton active={activeTab === 'story'} onClick={() => setActiveTab('story')} label="JOURNEY_TIMELINE" />
            <NavButton active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="PRODUCT_MGMT" />
            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="SYSTEM_CONFIG" />
            <NavButton active={activeTab === 'policies'} onClick={() => setActiveTab('policies')} label="LEGAL_DOCS" />
          </aside>

          <main className="col-span-12 lg:col-span-9">
            <div className="card min-h-[600px] border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-sm font-mono font-bold text-brand-accent mb-8 border-b border-brand-accent/20 pb-4 uppercase tracking-widest">System_Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <SectionHeader title="Branding" />
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Logo_Name</label>
                          <input className="input-field" value={config.logoName} onChange={(e) => handleUpdateConfig({...config, logoName: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Initials</label>
                          <input className="input-field w-24" maxLength={3} value={config.logoInitials} onChange={(e) => handleUpdateConfig({...config, logoInitials: e.target.value.toUpperCase()})} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Tagline</label>
                          <input className="input-field" value={config.tagline} onChange={(e) => handleUpdateConfig({...config, tagline: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <SectionHeader title="Comms_Link" />
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Telegram_ID</label>
                          <input className="input-field" value={config.telegram} onChange={(e) => handleUpdateConfig({...config, telegram: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">WhatsApp_Link</label>
                          <input className="input-field" value={config.whatsapp} onChange={(e) => handleUpdateConfig({...config, whatsapp: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Official_Email</label>
                          <input className="input-field" value={config.email} onChange={(e) => handleUpdateConfig({...config, email: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journal' && (
                  <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-sm font-mono font-bold text-brand-accent uppercase tracking-widest">Performance_Logs</h2>
                      <button onClick={handleAddLog} className="px-6 py-2 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        NEW_ENTRY
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-12 gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                          <div className="col-span-3">
                            <input type="date" className="bg-transparent border-none text-xs font-mono text-zinc-400 outline-none w-full" value={log.date} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, date: e.target.value} : l))} />
                          </div>
                          <div className="col-span-3">
                            <input className="bg-transparent border-none text-xs font-mono text-white outline-none w-full" value={log.pair} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, pair: e.target.value} : l))} />
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-zinc-600 font-mono italic">$</span>
                              <input type="number" className="bg-transparent border-none text-xs font-mono text-white outline-none w-full" value={log.amount || 0} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, amount: parseFloat(e.target.value)} : l))} />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <select className="bg-transparent border-none text-[10px] font-mono uppercase tracking-widest outline-none w-full cursor-pointer" value={log.status} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, status: e.target.value as any} : l))}>
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

                {activeTab === 'posts' && (
                  <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-sm font-mono font-bold text-brand-accent uppercase tracking-widest">Market_Broadcasts</h2>
                      <button onClick={handleAddPost} className="px-6 py-2 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        NEW_POST
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      {posts.map((post) => (
                        <div key={post.id} className="p-8 border border-white/10 bg-white/[0.01] space-y-6">
                          <div className="flex justify-between gap-8 items-start">
                            <input className="bg-transparent border-none p-0 text-xl font-serif italic text-white outline-none flex-1 placeholder:text-zinc-800" placeholder="Post_Title..." value={post.title} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value} : p))} />
                            <input type="date" className="bg-white/5 border border-white/10 rounded-none px-4 py-2 text-[10px] font-mono text-zinc-400 outline-none" value={post.date} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, date: e.target.value} : p))} />
                          </div>
                          
                          <textarea className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-zinc-400 outline-none h-64 focus:border-brand-accent/20 transition-all font-light leading-relaxed" placeholder="Write_Market_Insights_Here..." value={post.content} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, content: e.target.value} : p))} />
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <input type="file" accept="image/*" className="hidden" id={`img-${post.id}`} onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => updatePosts(posts.map(p => p.id === post.id ? {...p, image: reader.result as string} : p));
                                  reader.readAsDataURL(file);
                                }
                              }} />
                              <label htmlFor={`img-${post.id}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent cursor-pointer hover:text-white transition-colors">
                                {post.image ? 'CHANGE_VISUAL' : 'UPLOAD_VISUAL'}
                              </label>
                              {post.image && <button onClick={() => updatePosts(posts.map(p => p.id === post.id ? {...p, image: ''} : p))} className="text-rose-500 text-[10px] uppercase font-bold tracking-widest">REMOVE</button>}
                            </div>
                            <button onClick={() => updatePosts(posts.filter(p => p.id !== post.id))} className="text-zinc-600 hover:text-rose-500 transition-colors text-[10px] uppercase font-bold tracking-widest">DELETE_POST</button>
                          </div>
                        </div>
                      ))}
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
      className={`w-full text-left px-6 py-4 font-mono text-[10px] uppercase tracking-widest transition-all border ${active ? 'bg-brand-accent border-brand-accent text-brand-bg font-black' : 'bg-transparent border-white/5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
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
