import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loginWithPassword, isAdmin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await loginWithPassword(password);
    if (!success) {
      setError('INVALID_PASSCODE_ACCESS_DENIED');
    }
    setLoading(false);
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
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-black/40 border border-brand-neon/20 backdrop-blur-2xl rounded-[20px] shadow-[0_0_50px_rgba(0,234,255,0.15)] overflow-hidden flex flex-col md:flex-row relative z-10 animate-float"
      >
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse shadow-[0_0_10px_rgba(0,234,255,1)]" />
            <h2 className="text-[10px] font-mono font-black text-brand-neon tracking-[0.5em] uppercase">Security_Protocol_v2.0</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Terminal Access</h1>
              <p className="text-xs text-zinc-500 font-medium">Please authenticate your operator credentials.</p>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute inset-0 bg-brand-neon/5 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="text" 
                    placeholder="OPERATOR_ID" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm font-mono text-white outline-none focus:border-brand-neon/50 focus:bg-white/[0.05] transition-all relative z-10"
                    disabled={loading}
                  />
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-brand-neon/5 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="password" 
                    placeholder="ACCESS_PASSCODE" 
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm font-mono text-white outline-none focus:border-brand-neon/50 focus:bg-white/[0.05] transition-all relative z-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-brand-neon text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(0,234,255,0.3)] hover:shadow-[0_0_30px_rgba(0,234,255,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>AUTHORIZE_ENTRY <LogIn size={14} /></>
                )}
              </motion.button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-[#020202] px-4 text-zinc-600">or sync with</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white/[0.03] border border-white/10 text-white p-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              <div className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-brand-neon/20 transition-colors">
                <Lock size={12} className="text-zinc-400 group-hover:text-brand-neon transition-colors" />
              </div>
              Authority_Network_Sync
            </button>

            {(error || (user && !isAdmin)) && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center rounded-xl"
              >
                {error || 'LOG_ERROR: IDENTITY NOT AUTHORIZED'}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Welcome Message */}
        <div className="w-full md:w-1/2 bg-brand-neon/5 relative flex flex-col justify-center p-12 overflow-hidden group">
          {/* Animated Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
          
          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-brand-neon font-mono text-[10px] tracking-[0.5em] uppercase mb-4">_Authentication_System</h3>
              <h2 className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-6">
                Welcome <br/>
                <span className="text-brand-neon text-glow-cyan">Back !</span>
              </h2>
              <div className="w-12 h-1 bg-brand-neon rounded-full mb-8 shadow-[0_0_10px_rgba(0,234,255,1)]" />
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-light">
                Monitor market nodes, execute protocols, and manage institutional assets with complete terminal encryption.
              </p>
            </motion.div>

            <div className="pt-12 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">Status</p>
                <p className="text-xs text-brand-neon font-mono">ENCRYPTED_LIVE</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">Node</p>
                <p className="text-xs text-brand-neon font-mono">NY_TERMINAL_01</p>
              </div>
            </div>
          </div>

          {/* Decorative code lines */}
          <div className="absolute bottom-8 left-12 right-12 opacity-10 font-mono text-[8px] text-brand-neon space-y-1 pointer-events-none">
            <p className="">{`> UNLINKING_PRIOR_SESSIONS... DONE`}</p>
            <p className="">{`> LOADING_CRYPTO_HANDSHAKE... DONE`}</p>
            <p className="">{`> READY_FOR_OPERATOR_COMMAND...`}</p>
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
