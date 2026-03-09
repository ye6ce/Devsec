import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        onClose();
        setEmail('');
        setPassword('');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        setIsLogin(true);
        setError('Registration successful. Please login.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="p-6 border-b border-stone-900 flex justify-between items-center bg-stone-900/20">
              <h2 className="text-2xl font-ravens text-stone-100 tracking-widest uppercase">
                {isLogin ? 'Enter Sanctum' : 'Join Sanctum'}
              </h2>
              <button 
                onClick={onClose}
                className="text-stone-500 hover:text-stone-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className={`p-3 text-xs uppercase tracking-widest font-bold ${error.includes('successful') ? 'text-green-500 border border-green-900/50 bg-green-900/10' : 'text-red-500 border border-red-900/50 bg-red-900/10'}`}>
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">Password</label>
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-900">
                <button 
                  type="submit"
                  className="w-full bg-stone-100 text-black py-4 font-ravens uppercase tracking-[0.2em] text-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-4"
                >
                  {isLogin ? 'Login' : 'Register'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="w-full text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors"
                >
                  {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
