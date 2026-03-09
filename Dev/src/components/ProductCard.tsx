import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const nameParts = product.name.split(' ');
  const firstPart = nameParts[0];
  const restPart = nameParts.slice(1).join(' ');

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-[#0a0a0a] border border-stone-800 rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full transition-all duration-500 hover:border-stone-500 cursor-pointer"
    >
      {/* Card Head */}
      <div className="relative h-[180px] sm:h-[320px] bg-[#050505] p-4 sm:p-8 overflow-hidden border-b border-stone-800">
        <img 
          src="https://s5.postimg.cc/wy79025cz/nike_Logo_White.png" 
          alt="logo" 
          className="w-8 sm:w-12 opacity-40 relative z-10 grayscale invert"
          referrerPolicy="no-referrer"
        />

        <img 
          src={product.image} 
          alt="Product" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] max-w-none transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_0_40px_rgba(0,0,0,0.9)] z-20 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-black/90 p-4 sm:p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md z-30 border-b border-stone-700">
          <h2 className="text-2xl sm:text-4xl font-ravens text-stone-200 mb-2 sm:mb-4">{product.name}</h2>
          <p className="text-[10px] sm:text-sm text-stone-400 leading-relaxed font-serif italic hidden sm:block">
            Forged in the shadows, these vessels of speed offer high-responsiveness for those who haunt the courts.
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-8 bg-[#0a0a0a] text-stone-300">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-8 gap-1 sm:gap-4">
          <div>
            <h3 className="text-lg sm:text-4xl font-ravens flex flex-wrap items-center gap-1 sm:gap-3 text-stone-100">
              {firstPart} <span className="text-stone-500">{restPart}</span>
              <span className="bg-stone-800 text-stone-400 text-[8px] sm:text-[10px] uppercase px-1 sm:px-2 py-0.5 sm:py-1 border border-stone-700 font-sans tracking-widest hidden sm:inline-block">Legacy</span>
            </h3>
            <span className="text-stone-600 text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.3em] font-serif italic mt-0.5 sm:mt-2 hidden sm:block">
              {product.category || 'Collection'}
            </span>
          </div>
          <div className="flex gap-1 hidden sm:flex">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-stone-700 text-stone-700" />)}
          </div>
        </div>

        <div className="space-y-3 sm:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 hidden sm:flex">
            {product.variants && product.variants.length > 0 && (
              <div className="w-full sm:flex-1">
                <h4 className="text-[10px] uppercase font-bold text-stone-600 mb-3 sm:mb-4 tracking-[0.2em]">{product.variants[0].name}</h4>
                <ul className="flex flex-wrap gap-2 sm:gap-3">
                  {product.variants[0].options.slice(0, 5).map((opt, idx) => (
                    <li key={idx}>
                      {opt.type === 'color' ? (
                        <button 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-stone-800 hover:scale-110 transition-transform relative overflow-hidden bg-stone-900 flex items-center justify-center"
                          title={opt.label}
                          style={{ backgroundColor: opt.colorValue }}
                        />
                      ) : opt.type === 'image' ? (
                        <button className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center text-[10px] font-serif transition-all bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-stone-300 relative overflow-hidden group/opt" title={opt.label}>
                          {opt.image ? (
                            <img src={opt.image} alt={opt.label} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/opt:opacity-100 transition-opacity" />
                          ) : (
                            <span className="relative z-10 drop-shadow-md">{opt.label}</span>
                          )}
                        </button>
                      ) : (
                        <button className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center text-[10px] font-serif transition-all bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-stone-300 relative overflow-hidden group/opt" title={opt.label}>
                          <span className="relative z-10 drop-shadow-md">{opt.label}</span>
                        </button>
                      )}
                    </li>
                  ))}
                  {product.variants[0].options.length > 5 && (
                    <li>
                      <button className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center text-[10px] font-serif transition-all bg-stone-900 text-stone-500 border-stone-800">
                        +{product.variants[0].options.length - 5}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {product.variants && product.variants.length > 1 && (
              <div className="w-full sm:w-auto">
                <h4 className="text-[10px] uppercase font-bold text-stone-600 mb-3 sm:mb-4 tracking-[0.2em]">{product.variants[1].name}</h4>
                <ul className="flex gap-3">
                  {product.variants[1].options.slice(0, 3).map((opt, index) => (
                    <li key={index}>
                      {opt.type === 'color' ? (
                        <button 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-stone-800 hover:scale-110 transition-transform relative overflow-hidden bg-stone-900 flex items-center justify-center"
                          title={opt.label}
                          style={{ backgroundColor: opt.colorValue }}
                        />
                      ) : opt.type === 'image' ? (
                        <button 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-stone-800 hover:scale-110 transition-transform relative overflow-hidden bg-stone-900 flex items-center justify-center"
                          title={opt.label}
                        >
                          {opt.image ? (
                            <img src={opt.image} alt={opt.label} className="absolute inset-0 w-full h-full object-cover" />
                          ) : (
                            <span className="text-[8px] text-stone-500">{opt.label.substring(0, 1)}</span>
                          )}
                        </button>
                      ) : (
                        <button 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-stone-800 hover:scale-110 transition-transform relative overflow-hidden bg-stone-900 flex items-center justify-center"
                          title={opt.label}
                        >
                          <span className="text-[8px] text-stone-500">{opt.label.substring(0, 1)}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-2 sm:pt-8 border-t border-stone-900 flex flex-row justify-between items-center gap-0">
            <span className="text-lg sm:text-3xl font-ravens text-stone-100">
              {product.price}
              <span className="text-[8px] sm:text-xs font-serif italic text-stone-600 ml-1 sm:ml-2 uppercase tracking-widest hidden sm:inline-block">DZD</span>
            </span>
            <button className="hidden sm:block w-auto bg-stone-100 text-black px-10 py-3 rounded-none text-xl font-ravens uppercase tracking-[0.1em] hover:bg-white transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95">
              Acquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
