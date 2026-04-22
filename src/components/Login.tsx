import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isAdmin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      // AuthContext will handle state, we navigate if authorized
    } catch (error) {
      console.error(error);
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
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-brand-accent text-brand-bg py-5 rounded-none font-black uppercase tracking-[.2em] text-xs shadow-xl shadow-brand-accent/10 hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <LogIn size={18} />
            {loading ? 'AUTHENTICATING...' : 'SIGN_IN_WITH_GOOGLE'}
          </button>
          
          {user && !isAdmin && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              ACCESS_DENIED: UNAUTHORIZED_IDENTITY_DETECTED.<br/>
              YOUR EMAIL IS NOT ALLOWLISTED.
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
