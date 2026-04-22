import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      window.location.href = '/admin';
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md card p-10 bg-linear-to-b from-brand-card to-black"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-zinc-500 text-sm mt-2">Enter credentials to gain access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Master Key</label>
            <div className="relative">
              <input 
                type={show ? "text" : "password"}
                autoFocus
                className={`w-full bg-white/5 border rounded-xl py-4 px-6 outline-none transition-all ${error ? 'border-rose-500 animate-shake' : 'border-white/10 focus:border-brand-accent'}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="text-rose-500 text-xs mt-2 ml-1">Access Denied. Check your key.</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Authenticate
          </button>
        </form>

      </motion.div>
    </div>
  );
}
