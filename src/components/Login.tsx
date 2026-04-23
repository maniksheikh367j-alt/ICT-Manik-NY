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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent/30" />
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-brand-accent" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">ADMIN ACCESS</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Enter passcode to unlock mission control terminal.</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                placeholder="ENTER PASSCODE" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-sm font-mono tracking-widest text-center text-white outline-none focus:border-brand-accent/40 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent text-brand-bg py-5 font-bold uppercase tracking-[.2em] text-xs shadow-xl shadow-brand-accent/10 hover:bg-white transition-all disabled:opacity-50"
            >
              {loading ? 'UNLOCKING...' : 'LOGIN TO TERMINAL'}
            </button>
          </form>

          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest">Secondary Auth</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 text-zinc-400 py-3 font-bold uppercase tracking-[.1em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <LogIn size={16} /> Sign in with Google
          </button>
          
          {(error || (user && !isAdmin)) && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed text-center"
            >
              {error || 'ACCESS DENIED: IDENTITY NOT AUTHORIZED.'}
            </motion.div>
          )}

          <p className="text-zinc-700 text-[9px] uppercase font-bold tracking-widest mt-8 text-center leading-loose">
            Access strictly limited to: <br/>
            <span className="text-zinc-500 underline underline-offset-4 decoration-zinc-800">Manik NY Authority</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
