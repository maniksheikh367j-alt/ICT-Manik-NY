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
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Auto-save effect
  React.useEffect(() => {
    if (!autoSaveEnabled) return;
    
    const timer = setTimeout(async () => {
      // Check if there are changes worth saving? 
      // For simplicity, we just save whenever state changes if autosave is on
      // We use a longer debounce to avoid hitting quotas too fast
      if (!loading && !isSaving) {
        setIsSaving(true);
        try {
          await saveAll(true);
        } catch (e) {
          console.error('Auto-save failed:', e);
        } finally {
          setIsSaving(false);
        }
      }
    }, 5000); // 5 second debounce for auto-save

    return () => clearTimeout(timer);
  }, [logs, story, products, posts, config, autoSaveEnabled]);

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
    await updateProducts([{ 
      id: Date.now().toString(), 
      name: 'New Product', 
      description: 'Product info...', 
      type: 'COURSE', 
      status: 'coming_soon',
      price: '0',
      originalPrice: '',
      priceSize: 'md',
      priceFormat: 'long'
    }, ...products]);
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
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-8 border-b border-white/[0.03] gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 bg-brand-accent glow-green" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">Terminal</h1>
            </div>
            <p className="text-zinc-400 text-[9px] tracking-[0.4em] uppercase font-bold">Operator: ICT MANIK NY Authority</p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-t-0 border-white/[0.03] pt-6 sm:pt-0">
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] px-4 py-2.5 rounded-lg group">
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${autoSaveEnabled ? 'text-brand-accent' : 'text-zinc-600'}`}>
                {autoSaveEnabled ? 'Auto_Sync_Active' : 'Auto_Sync_Paused'}
              </span>
              <button 
                onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                className={`w-8 h-4 rounded-full relative transition-colors ${autoSaveEnabled ? 'bg-brand-accent/20' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${autoSaveEnabled ? 'left-4.5 bg-brand-accent shadow-[0_0_8px_rgba(0,234,255,0.5)]' : 'left-0.5 bg-zinc-600'}`} />
              </button>
            </div>
            <button 
              onClick={handleManualSync}
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-accent text-brand-bg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all glow-green-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={14} className={isSaving ? 'animate-spin' : ''} /> {isSaving ? 'UPLOADING...' : 'SAVE & SYNC CLOUD'}
            </button>
            <button 
              onClick={async () => { 
                await logout(); 
                window.location.href = '/'; 
              }}
              className="px-6 py-3 bg-white/[0.02] text-zinc-500 border border-white/[0.05] hover:bg-rose-600/10 hover:text-rose-500 hover:border-rose-600/30 transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              Exit Terminal
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          <aside className="col-span-12 lg:col-span-3">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
              <NavButton active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} label="PNL RECORDS" />
              <NavButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} label="INTEL STREAM" />
              <NavButton active={activeTab === 'story'} onClick={() => setActiveTab('story')} label="EVOLUTION" />
              <NavButton active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="MARKETPLACE" />
              <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="CORE CONFIG" />
              <NavButton active={activeTab === 'policies'} onClick={() => setActiveTab('policies')} label="PROTOCOLS" />
            </div>
          </aside>

          <main className="col-span-12 lg:col-span-9">
            <div className="min-h-[600px] border border-white/[0.03] bg-black/40 p-10 shadow-2xl shadow-brand-accent/[0.02]">
              <AnimatePresence mode="wait">
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-[10px] font-mono font-bold text-brand-accent mb-12 border-b border-brand-accent/10 pb-6 uppercase tracking-[0.4em]">_Core_System_Variables</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <SectionHeader title="Branding_Identity" />
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Entity Name</label>
                          <input className="input-field" value={config.logoName || ''} onChange={(e) => updateConfig({...config, logoName: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Visual Asset_URI</label>
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
                            <label htmlFor="logo-upload" className="px-6 py-2 bg-white/[0.05] border border-white/[0.1] text-[9px] text-white uppercase font-bold flex items-center cursor-pointer hover:bg-white/10 transition-colors">Select_File</label>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">TikTok Connection</label>
                          <input className="input-field" placeholder="https://tiktok.com/@yourprofile" value={config.tiktok || ''} onChange={(e) => updateConfig({...config, tiktok: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Identity Initials</label>
                          <input className="input-field w-24" maxLength={3} value={config.logoInitials || ''} onChange={(e) => updateConfig({...config, logoInitials: e.target.value.toUpperCase()}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Market Tagline</label>
                          <input className="input-field" value={config.tagline || ''} onChange={(e) => updateConfig({...config, tagline: e.target.value}, false)} />
                        </div>
                      </div>

                      <div className="space-y-10">
                        <SectionHeader title="Encryption_Contact_Vectors" />
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Telegram_Secure</label>
                          <input className="input-field" value={config.telegram || ''} onChange={(e) => updateConfig({...config, telegram: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">WhatsApp_Node</label>
                          <input className="input-field" value={config.whatsapp || ''} onChange={(e) => updateConfig({...config, whatsapp: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">SMTP_Authority</label>
                          <input className="input-field" value={config.email || ''} onChange={(e) => updateConfig({...config, email: e.target.value}, false)} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Hero Video URL</label>
                          <input className="input-field" value={config.heroVideo || ''} onChange={(e) => updateConfig({...config, heroVideo: e.target.value}, false)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journal' && (
                  <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                      <h2 className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.4em]">_Performance_Logs</h2>
                      <button onClick={handleAddLog} className="w-full sm:w-auto px-8 py-3 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all glow-green-hover">
                        EXECUTE_NEW_ENTRY
                      </button>
                    </div>
                    
                    <div className="space-y-1 border-t border-white/[0.03]">
                      {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all group items-center">
                          <div className="col-span-3">
                            <input type="date" className="bg-transparent border-none text-[11px] font-mono text-zinc-400 outline-none w-full" value={log.date || ''} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, date: e.target.value} : l), false)} />
                          </div>
                          <div className="col-span-3">
                            <input className="bg-transparent border-none text-[11px] font-mono text-white outline-none w-full font-bold tracking-wider" placeholder="INSTRUMENT" value={log.pair || ''} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, pair: e.target.value.toUpperCase()} : l), false)} />
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] text-zinc-400 font-mono italic">$</span>
                              <input type="number" className="bg-transparent border-none text-[11px] font-mono text-white outline-none w-full" value={log.amount || 0} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, amount: parseFloat(e.target.value)} : l), false)} />
                            </div>
                          </div>
                          <div className="col-span-3 px-4">
                            <select className="bg-transparent border-none text-[9px] font-mono uppercase tracking-[0.2em] outline-none w-full cursor-pointer font-bold text-white" value={log.status || ''} onChange={(e) => updateLogs(logs.map(l => l.id === log.id ? {...l, status: e.target.value as any} : l), false)}>
                              <option value="profit" className="text-brand-accent bg-zinc-950">PROFIT</option>
                              <option value="loss" className="text-rose-600 bg-zinc-950">LOSS</option>
                              <option value="breakeven" className="text-zinc-400 bg-zinc-950">BREAKEVEN</option>
                            </select>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <button onClick={() => handleDeleteLog(log.id)} className="text-zinc-400 hover:text-rose-600 transition-colors p-2">
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
                      <h2 className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.4em]">_Evolution_Timeline</h2>
                      <button onClick={handleAddStoryPoint} className="px-8 py-3 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all glow-green-hover">
                        ADD_PROTOCOL_POINT
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {story.map((point) => (
                        <div key={point.id} className="p-8 border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all space-y-6">
                          <div className="flex gap-6">
                            <div className="space-y-2">
                              <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Epoch</label>
                              <input className="bg-transparent border-white/[0.1] border px-4 py-3 text-[11px] font-mono text-brand-accent w-24 outline-none focus:border-brand-accent/20" value={point.year || ''} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, year: e.target.value} : s), false)} />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">System Event Title</label>
                              <input className="bg-transparent border-white/[0.1] border px-6 py-3 text-sm font-black text-white w-full outline-none focus:border-brand-accent/20" value={point.title || ''} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, title: e.target.value} : s), false)} />
                            </div>
                            <div className="pt-8">
                              <button onClick={() => updateStory(story.filter(s => s.id !== point.id), false)} className="text-zinc-400 hover:text-rose-600 transition-colors p-2">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Detailed Log Entry</label>
                            <textarea className="w-full bg-transparent border-white/[0.1] border p-6 text-[11px] text-zinc-300 outline-none h-32 resize-none focus:border-brand-accent/20 transition-all font-light leading-relaxed" value={point.description || ''} onChange={(e) => updateStory(story.map(s => s.id === point.id ? {...s, description: e.target.value} : s), false)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'products' && (
                  <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                      <div>
                        <h2 className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.4em] mb-2">_Marketplace_Catalog</h2>
                        <p className="text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-bold">Manage digital assets and institutional protocols</p>
                      </div>
                      <button 
                        onClick={handleAddProduct} 
                        className="w-full sm:w-auto px-10 py-3.5 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all glow-green-hover flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> ADD_NEW_PRODUCT
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {products.map((product) => (
                        <div key={product.id} className="p-8 border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all flex flex-col group relative">
                          <div className="relative aspect-video bg-zinc-950 border border-white/[0.03] mb-8 overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-900 text-[10px] uppercase font-black tracking-[0.5em]">No_Visual_Data</div>
                            )}
                            <input type="file" accept="image/*" className="hidden" id={`prod-img-${product.id}`} onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => updateProducts(products.map(p => p.id === product.id ? {...p, image: reader.result as string} : p));
                                reader.readAsDataURL(file);
                              }
                            }} />
                            <label htmlFor={`prod-img-${product.id}`} className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[9px] font-black uppercase tracking-[0.4em] cursor-pointer transition-opacity backdrop-blur-md text-brand-accent">
                              <Plus size={24} className="mb-3" />
                              Update_Asset_Media
                            </label>
                          </div>

                          <div className="space-y-8">
                            <div className="flex gap-6">
                              <div className="flex-1 space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Asset Designation</label>
                                <input 
                                  className="w-full bg-black/40 border border-white/[0.1] px-5 py-3 text-sm font-black text-white outline-none focus:border-brand-accent/20 transition-all" 
                                  value={product.name || ''} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, name: e.target.value} : p), false)} 
                                />
                              </div>
                              <div className="w-32 space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Tag</label>
                                <input 
                                  className="w-full bg-black/40 border border-white/[0.1] px-4 py-3 text-[10px] font-mono text-brand-accent outline-none uppercase tracking-[0.2em] font-bold" 
                                  placeholder="COURSE" 
                                  value={product.type || ''} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, type: e.target.value} : p), false)} 
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Market Value</label>
                                <input 
                                  className="w-full bg-black/40 border border-white/[0.1] px-5 py-3 text-sm font-black text-brand-accent outline-none focus:border-brand-accent/20 transition-all font-mono" 
                                  placeholder="$99"
                                  value={product.price || ''} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, price: e.target.value} : p), false)} 
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Strikeout Price</label>
                                <input 
                                  className="w-full bg-black/40 border border-white/[0.1] px-5 py-3 text-sm font-black text-white outline-none focus:border-brand-accent/20 transition-all font-mono opacity-60" 
                                  placeholder="$149"
                                  value={product.originalPrice || ''} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, originalPrice: e.target.value} : p), false)} 
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Visual Scaling</label>
                                <select 
                                  className="w-full bg-black/40 border border-white/[0.1] px-5 py-3 text-[10px] font-black text-white outline-none cursor-pointer uppercase tracking-[0.2em]" 
                                  value={product.priceSize || 'md'} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, priceSize: e.target.value as any} : p), false)}
                                >
                                  <option value="sm">Small</option>
                                  <option value="md">Medium</option>
                                  <option value="lg">Large</option>
                                  <option value="xl">X-Large</option>
                                </select>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Precision Mode</label>
                                <select 
                                  className="w-full bg-black/40 border border-white/[0.1] px-5 py-3 text-[10px] font-black text-white outline-none cursor-pointer uppercase tracking-[0.2em]" 
                                  value={product.priceFormat || 'long'} 
                                  onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, priceFormat: e.target.value as any} : p), false)}
                                >
                                  <option value="long">Long_Dec ($120.00)</option>
                                  <option value="short">Short_Int ($120)</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Value Proposition</label>
                              <textarea 
                                className="w-full bg-black/40 border border-white/[0.1] p-6 text-[11px] text-zinc-300 outline-none h-24 resize-none font-light leading-relaxed focus:border-brand-accent/20 transition-all" 
                                placeholder="Core institutional value..." 
                                value={product.description || ''} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, description: e.target.value} : p), false)} 
                              />
                            </div>

                            <div className="space-y-3">
                              <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em]">Protocol Specifications</label>
                              <textarea 
                                className="w-full bg-black/40 border border-white/[0.1] p-6 text-[10px] text-zinc-200 outline-none h-28 font-mono resize-none focus:border-brand-accent/20 transition-all" 
                                placeholder="Feature_01&#10;Feature_02..." 
                                value={product.details || ''} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, details: e.target.value} : p), false)} 
                              />
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                              <select 
                                className="flex-1 bg-zinc-950 border border-white/[0.05] text-[9px] font-black uppercase tracking-[0.3em] p-4 outline-none cursor-pointer text-zinc-400 group-hover:text-brand-accent transition-colors" 
                                value={product.status || ''} 
                                onChange={(e) => updateProducts(products.map(p => p.id === product.id ? {...p, status: e.target.value as any} : p), false)}
                              >
                                <option value="available">🛒 OPERATIONAL_ACTIVE</option>
                                <option value="coming_soon">⏳ PENDING_RELEASE</option>
                                <option value="sold_out">🚫 QUOTA_EXCEEDED</option>
                              </select>
                              <button 
                                onClick={() => {
                                  if(confirm('Are you sure you want to delete this product?')) {
                                    updateProducts(products.filter(p => p.id !== product.id), false)
                                  }
                                }} 
                                className="px-6 py-4 bg-rose-600/5 text-rose-600/60 text-[9px] font-black uppercase tracking-[0.3em] border border-rose-600/10 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-none"
                              >
                                PURGE
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                      <h2 className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.4em]">_Intel_Stream_Broadcasts</h2>
                      <button onClick={handleAddPost} className="w-full sm:w-auto px-10 py-3.5 bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all glow-green-hover">
                        NEW_INTEL_POST
                      </button>
                    </div>
                    
                    <div className="space-y-12">
                      {posts.map((post) => (
                        <div key={post.id} className="p-10 border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all space-y-8">
                          <div className="flex flex-col md:flex-row justify-between gap-10 items-start">
                            <input className="bg-transparent border-none p-0 text-2xl font-black text-white outline-none flex-1 placeholder:text-zinc-900 tracking-tighter uppercase" placeholder="Post Title..." value={post.title || ''} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value.toUpperCase()} : p), false)} />
                            <div className="space-y-2 w-full md:w-auto">
                              <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em] block">Stardate</label>
                              <input type="date" className="bg-black/40 border border-white/[0.1] px-4 py-2.5 text-[10px] font-mono text-zinc-200 outline-none w-full md:w-40 focus:border-brand-accent/20" value={post.date || ''} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, date: e.target.value} : p), false)} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.4em] block">Payload_Data</label>
                             <textarea className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-zinc-300 outline-none h-80 focus:border-brand-accent/20 transition-all font-light leading-relaxed resize-none" placeholder="Write Market Insights Here..." value={post.content || ''} onChange={(e) => updatePosts(posts.map(p => p.id === post.id ? {...p, content: e.target.value} : p), false)} />
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t border-white/[0.03]">
                            <div className="flex items-center gap-8">
                              <input type="file" accept="image/*" className="hidden" id={`img-${post.id}`} onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => updatePosts(posts.map(p => p.id === post.id ? {...p, image: reader.result as string} : p), false);
                                  reader.readAsDataURL(file);
                                }
                              }} />
                              <label htmlFor={`img-${post.id}`} className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-accent cursor-pointer hover:text-white transition-colors border border-brand-accent/10 px-4 py-2 hover:bg-brand-accent/5">
                                {post.image ? 'CHANGE_VISUAL_ASSET' : 'UPLOAD_VISUAL_ASSET'}
                              </label>
                              {post.image && <button onClick={() => updatePosts(posts.map(p => p.id === post.id ? {...p, image: ''} : p), false)} className="text-rose-600 text-[9px] uppercase font-black tracking-[0.3em] hover:text-rose-400 transition-colors">PURGE_MEDIA</button>}
                            </div>
                            <button onClick={() => updatePosts(posts.filter(p => p.id !== post.id), false)} className="text-zinc-800 hover:text-rose-600 transition-colors text-[9px] uppercase font-black tracking-[0.3em] p-2">DELETE_INTEL_BROADCAST</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'policies' && (
                  <motion.div key="policies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-[10px] font-mono font-bold text-brand-accent mb-12 border-b border-brand-accent/10 pb-6 uppercase tracking-[0.4em]">_Legal_Compliance_Protocols</h2>
                    <div className="space-y-16">
                      <div className="space-y-4">
                        <SectionHeader title="Contact_Segment_Data" />
                        <textarea 
                          className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-48 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                          value={config.contactSegment || ''} 
                          onChange={(e) => updateConfig({...config, contactSegment: e.target.value}, false)} 
                          placeholder="INPUT_CONTACT_SEGMENT..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <SectionHeader title="Privacy_Protocol" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.privacyPolicy || ''} 
                            onChange={(e) => updateConfig({...config, privacyPolicy: e.target.value}, false)} 
                            placeholder="INPUT_PRIVACY_DATA..."
                          />
                        </div>
                        <div className="space-y-4">
                          <SectionHeader title="Terms_of_Engagement" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.termsOfService || ''} 
                            onChange={(e) => updateConfig({...config, termsOfService: e.target.value}, false)} 
                            placeholder="INPUT_TERMS_DATA..."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <SectionHeader title="Refund_Protocol" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.refundPolicy || ''} 
                            onChange={(e) => updateConfig({...config, refundPolicy: e.target.value}, false)} 
                            placeholder="INPUT_REFUND_DATA..."
                          />
                        </div>
                        <div className="space-y-4">
                          <SectionHeader title="Return_Protocol" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.returnPolicy || ''} 
                            onChange={(e) => updateConfig({...config, returnPolicy: e.target.value}, false)} 
                            placeholder="INPUT_RETURN_DATA..."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <SectionHeader title="Public_Protocol" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.publicPolicy || ''} 
                            onChange={(e) => updateConfig({...config, publicPolicy: e.target.value}, false)} 
                            placeholder="INPUT_PUBLIC_DATA..."
                          />
                        </div>
                        <div className="space-y-4">
                          <SectionHeader title="Contact_Protocol" />
                          <textarea 
                            className="w-full bg-black/40 border border-white/[0.1] p-8 text-[11px] text-white outline-none h-64 focus:border-brand-accent/20 transition-all font-mono leading-relaxed resize-none" 
                            value={config.contactPolicy || ''} 
                            onChange={(e) => updateConfig({...config, contactPolicy: e.target.value}, false)} 
                            placeholder="INPUT_CONTACT_DATA..."
                          />
                        </div>
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
      className={`lg:w-full text-left px-8 py-5 font-mono text-[9px] uppercase tracking-[0.3em] transition-all border whitespace-nowrap min-w-max lg:min-w-0 ${active ? 'bg-brand-accent border-brand-accent text-brand-bg font-black glow-green' : 'bg-transparent border-white/[0.05] text-white hover:bg-white/[0.05] hover:text-brand-accent hover:border-brand-accent/20'}`}
    >
      {active ? `_ ${label}` : label}
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h3 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
    <div className="h-px bg-zinc-800 flex-1 opacity-30" />
    {title}
    <div className="h-px bg-zinc-800 flex-1 opacity-30" />
  </h3>;
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
