import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, ArrowLeft } from 'lucide-react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  onBack: () => void;
}

const ShopPage = ({ products, categories, onBack }: ShopPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterCategories = ['All', ...categories.map(c => c.name)];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-stone-300 pt-24 pb-20 px-6 sm:px-10"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div className="space-y-2">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-100 transition-colors uppercase tracking-[0.3em] text-[10px] font-bold mb-4"
            >
              <ArrowLeft size={14} /> Back to Sanctum
            </button>
            <h1 className="text-5xl sm:text-7xl font-ravens text-stone-100">The <span className="text-stone-500 italic">Inventory</span></h1>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-stone-100 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search the shadows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900/30 border border-stone-800 p-4 pl-12 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif italic"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-4 border transition-all ${isFilterOpen ? 'bg-stone-100 text-black border-white' : 'border-stone-800 text-stone-400 hover:border-stone-500'}`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-stone-900"
            >
              <div className="py-8 flex flex-wrap gap-4">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${selectedCategory === cat ? 'bg-stone-200 text-black border-white' : 'border-stone-800 text-stone-600 hover:border-stone-500 hover:text-stone-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-4">
            <div className="text-4xl font-ravens text-stone-800">No Essence Found</div>
            <p className="text-stone-600 font-serif italic">The shadows are empty for this search.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-stone-400 hover:text-white underline underline-offset-8 uppercase tracking-widest text-[10px]"
            >
              Clear All Rituals
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ShopPage;
