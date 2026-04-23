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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm card p-10 bg-linear-to-b from-brand-card to-black text-center"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-serif italic font-black mb-2 uppercase tracking-tighter">Admin_Access</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Secure Terminal 01</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                placeholder="ENTER_PASSCODE" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs font-mono tracking-widest text-center text-white outline-none focus:border-brand-accent/40 transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white/5 text-zinc-400 py-4 font-bold uppercase tracking-[.2em] text-[10px] hover:bg-brand-accent hover:text-brand-bg transition-all disabled:opacity-50"
            >
              SECRET_LOGIN
            </button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest leading-none">OR</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-brand-accent text-brand-bg py-5 rounded-none font-black uppercase tracking-[.2em] text-xs shadow-xl shadow-brand-accent/10 hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <LogIn size={18} />
            {loading ? 'AUTHENTICATING...' : 'SIGN_IN_WITH_GOOGLE'}
          </button>
          
          {(error || (user && !isAdmin)) && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {error || 'ACCESS_DENIED: UNAUTHORIZED_IDENTITY_DETECTED.'}<br/>
              {!error && 'YOUR EMAIL IS NOT ALLOWLISTED.'}
            </div>
          )}
          
          <p className="text-zinc-700 text-[10px] uppercase font-bold tracking-widest mt-8">
            Access strictly limited to: <span className="text-zinc-500 underline underline-offset-4 decoration-zinc-800">Manik NY</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
