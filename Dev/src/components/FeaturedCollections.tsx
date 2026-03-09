import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

const defaultCollections = [
  {
    title: "Shadow Striders",
    category: "Basketball",
    image: "https://picsum.photos/seed/dark-shoe-1/800/1000",
    span: "md:col-span-2 md:row-span-2",
    description: "Command the court with vessels forged for high-altitude rituals."
  },
  {
    title: "Void Runners",
    category: "Running",
    image: "https://picsum.photos/seed/dark-shoe-2/800/600",
    span: "md:col-span-1 md:row-span-1",
    description: "Outrun the shadows with lightweight essence."
  },
  {
    title: "Nocturnal Soul",
    category: "Lifestyle",
    image: "https://picsum.photos/seed/dark-shoe-3/800/600",
    span: "md:col-span-1 md:row-span-1",
    description: "Elegant darkness for your daily haunt."
  },
  {
    title: "Cursed Strength",
    category: "Training",
    image: "https://picsum.photos/seed/dark-shoe-4/800/600",
    span: "md:col-span-2 md:row-span-1",
    description: "Unleash absolute power in the training sanctum."
  }
];

interface FeaturedCollectionsProps {
  categories?: Category[];
}

const FeaturedCollections = ({ categories = [] }: FeaturedCollectionsProps) => {
  // Map dynamic categories to the grid layout
  const displayCollections = categories.length > 0 
    ? categories.map((cat, index) => {
        // Determine span based on index to create an interesting grid
        let span = "md:col-span-1 md:row-span-1";
        if (index === 0) span = "md:col-span-2 md:row-span-2";
        else if (index === 3) span = "md:col-span-2 md:row-span-1";
        else if (index % 5 === 0) span = "md:col-span-2 md:row-span-2";

        return {
          title: cat.name,
          category: "Collection",
          image: cat.image || `https://picsum.photos/seed/${cat.name.replace(/\s+/g, '-').toLowerCase()}/800/800`,
          span,
          description: `Explore the essence of ${cat.name}.`
        };
      })
    : defaultCollections;

  return (
    <section className="py-32 px-6 sm:px-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <span className="text-stone-600 text-[10px] uppercase font-bold tracking-[0.5em] block">Curated Essence</span>
            <h2 className="text-5xl sm:text-7xl font-ravens text-stone-200">Featured <span className="text-stone-500 italic">Collections</span></h2>
          </div>
          <button className="group flex items-center gap-3 text-stone-400 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold border-b border-stone-800 pb-2">
            View All Rituals <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {displayCollections.slice(0, 6).map((col, i) => (
            <motion.div
              key={col.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative overflow-hidden border border-stone-900 bg-stone-950 ${col.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
              <img 
                src={col.image} 
                alt={col.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-serif italic mb-2 block">{col.category}</span>
                  <h3 className="text-3xl font-ravens text-stone-100 mb-2">{col.title}</h3>
                  <p className="text-xs text-stone-500 font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    {col.description}
                  </p>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <button className="text-[10px] uppercase font-bold tracking-widest text-white flex items-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    Explore <div className="w-8 h-px bg-white" />
                  </button>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-stone-800 group-hover:border-stone-500 transition-colors z-30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-stone-800 group-hover:border-stone-500 transition-colors z-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
