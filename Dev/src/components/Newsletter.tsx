import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="relative py-40 px-6 sm:px-10 bg-black overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl relative z-10 space-y-12"
      >
        <div className="space-y-6">
          <span className="text-stone-600 text-[10px] uppercase font-bold tracking-[0.5em] block">The Coven Awaits</span>
          <h2 className="text-5xl sm:text-8xl font-ravens text-stone-100 leading-none">Join the <span className="text-stone-500 italic">Shadows</span></h2>
          <p className="text-lg sm:text-xl text-stone-400 font-serif italic max-w-xl mx-auto">
            Receive whispers of new rituals, exclusive drops, and the secrets of the sanctum directly to your spirit.
          </p>
        </div>

        <form className="relative max-w-md mx-auto group">
          <input 
            type="email" 
            placeholder="Enter your spirit address..."
            className="w-full bg-transparent border-b border-stone-800 p-4 text-stone-200 focus:border-stone-100 outline-none transition-all font-serif italic text-lg placeholder:text-stone-700"
          />
          <button className="absolute right-0 bottom-4 text-stone-600 hover:text-white transition-all group-hover:translate-x-2">
            <Send size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 h-px w-0 bg-stone-100 group-focus-within:w-full transition-all duration-700" />
        </form>

        <div className="flex justify-center gap-12 pt-8">
          {['Instagram', 'Twitter', 'Discord'].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
              className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-600 hover:text-stone-100 transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-stone-900/30 -z-10" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-stone-900/30 -z-10" />
    </section>
  );
};

export default Newsletter;
