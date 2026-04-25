import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid login details');
      }
    } catch (error: any) {
      setError('AUTHENTICATION_FAILED');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 234, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 234, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} 
      />
      
      {/* Decorative Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-neon/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 animate-float"
      >
        <div className="neon-border-card shadow-[0_0_50px_rgba(0,234,255,0.2)]">
          <div className="neon-border-card-content">
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-brand-neon/10 border border-brand-neon/30 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,234,255,0.3)]">
                <Lock size={28} className="text-brand-neon" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-[0.2em] uppercase text-center">Terminal Access</h1>
              <div className="w-12 h-1 bg-brand-neon rounded-full mt-4 shadow-[0_0_10px_rgba(0,234,255,0.5)]" />
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute inset-0 bg-brand-neon/5 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="text" 
                    placeholder="OPERATOR_ID" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-6 py-5 text-sm font-mono text-white tracking-[0.2em] text-center outline-none focus:border-brand-neon/50 focus:bg-[#080808] transition-all relative z-10"
                    disabled={loading}
                    required
                  />
                </div>
                <div className="group relative">
                  <div className="absolute inset-0 bg-brand-neon/5 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="password" 
                    placeholder="ENTER_PASSCODE" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-6 py-5 text-sm font-mono text-white tracking-[0.5em] text-center outline-none focus:border-brand-neon/50 focus:bg-[#080808] transition-all relative z-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 234, 255, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-brand-neon text-black py-6 rounded-xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_0_20px_rgba(0,234,255,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>AUTHENTICATE <LogIn size={14} /></>
                )}
              </motion.button>
            </form>

              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-[#0a0a0a] px-4 text-zinc-600">secure node</span>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 text-zinc-500 p-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[8px] flex items-center justify-center gap-4 opacity-50">
                <Lock size={12} className="text-zinc-600" />
                ENCRYPTION_LEVEL_AES_256
              </div>

              {error !== '' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              <div className="mt-10 flex flex-col items-center gap-2 opacity-30">
                 <p className="text-[8px] text-zinc-500 font-mono tracking-[0.4em] uppercase">Status: ENCRYPTED_LIVE</p>
                 <p className="text-[8px] text-zinc-500 font-mono tracking-[0.4em] uppercase">Node: NY_TERMINAL_01</p>
              </div>
            </div>
          </div>
        </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
        <p className="text-[9px] text-zinc-800 uppercase font-bold tracking-[0.6em]">
          ICT MANIK NY <span className="text-zinc-900 mx-4">|</span> SECURITY ENFORCED
        </p>
      </div>
    </div>
  );
}
