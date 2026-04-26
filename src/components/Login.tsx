import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, User, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (!success) {
        setError('LOG_ERROR: CREDENTIALS_INVALID');
      }
    } catch (error) {
      setError('SYSTEM_FAILURE: AUTH_LINK_BROKEN');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4 font-sans selection:bg-brand-neon/30 overflow-hidden relative">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <AnimatePresence>
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md relative z-10"
          >
            {/* 3D Neumorphic Card */}
            <div className="bg-[#e0e5ec] p-10 rounded-[40px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-white/50">
              
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-[#e0e5ec] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
                >
                  <ShieldCheck className="text-[#4a4a4a]" size={36} />
                </motion.div>
                <h1 className="text-3xl font-black text-[#4a4a4a] uppercase tracking-tighter mix-blend-multiply">
                  Authority Login
                </h1>
                <p className="text-[10px] text-[#7a7a7a] font-mono tracking-[0.4em] uppercase mt-2">
                  System Identification Required
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7a7a7a] transition-colors group-focus-within:text-brand-neon">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#e0e5ec] rounded-2xl py-5 pl-16 pr-6 text-sm font-medium text-[#4a4a4a] outline-none shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] transition-all placeholder:text-[#a0a0a0]"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7a7a7a] transition-colors group-focus-within:text-brand-neon">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#e0e5ec] rounded-2xl py-5 pl-16 pr-6 text-sm font-medium text-[#4a4a4a] outline-none shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] transition-all placeholder:text-[#a0a0a0]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Error Pulse */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 text-center"
                    >
                      <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest leading-none">
                        {error}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-[#e0e5ec] rounded-2xl font-black text-[#4a4a4a] uppercase tracking-[0.3em] text-xs shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-[#4a4a4a]/20 border-t-[#4a4a4a] rounded-full animate-spin" />
                  ) : (
                    <>Authenticate <LogIn size={14} /></>
                  )}
                </motion.button>

                <div className="flex justify-center items-center gap-4 text-[9px] text-[#7a7a7a] font-bold uppercase tracking-[0.3em] pt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  Encryption Active AES-256
                </div>
              </form>
            </div>

            {/* Subtle Footer Info */}
            <div className="mt-8 text-center text-[9px] text-[#7a7a7a] uppercase tracking-[0.5em] font-medium opacity-50">
              © 2024 ICT MANIK NY Authority • All Rights Reserved
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
