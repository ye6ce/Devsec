import React from 'react';
import { motion } from 'motion/react';

const BrandStory = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      </div>

      <div className="max-w-4xl relative z-10 perspective-[2000px]">
        <motion.div
          initial={{ opacity: 0, rotateX: 45, y: 100, z: -200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
          whileHover={{ rotateY: 5, rotateX: -5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-12 cursor-default"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-stone-600 text-[10px] uppercase font-bold tracking-[0.5em] block"
            >
              The Legacy of Shadows
            </motion.span>
            <h2 className="text-5xl sm:text-7xl font-ravens text-stone-200 leading-tight">
              Forged in the <span className="text-stone-500 italic">Sanctum</span>
            </h2>
          </div>

          <div className="relative">
            <motion.div 
              className="absolute -inset-4 bg-stone-900/20 blur-3xl rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <p className="text-xl sm:text-2xl font-serif italic text-stone-400 leading-relaxed relative z-10 max-w-2xl mx-auto">
              "Ravens is not merely a brand; it is a ritual of speed. We craft vessels for those who haunt the courts and command the shadows. Each piece is a testament to the dark elegance of performance, where every stitch is a sigil of power."
            </p>
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="h-px w-32 bg-stone-800 mx-auto"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
            {[
              { label: "Craftsmanship", value: "Eternal" },
              { label: "Performance", value: "Absolute" },
              { label: "Aesthetic", value: "Gothic" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + (i * 0.2) }}
                className="space-y-1"
              >
                <div className="text-[10px] uppercase text-stone-600 font-bold tracking-widest">{stat.label}</div>
                <div className="text-2xl font-ravens text-stone-300">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating 3D Elements (Decorative) */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-64 h-64 border border-stone-900/30 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 border border-stone-900/20 rounded-full pointer-events-none"
      />
    </section>
  );
};

export default BrandStory;
