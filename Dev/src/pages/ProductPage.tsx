import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import Footer from '../components/Footer';
import CheckoutModal from '../components/CheckoutModal';
import { Product } from '../types';

interface ProductPageProps {
  products: Product[];
}

const ProductPage = ({ products }: ProductPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-ravens text-stone-500 mb-8">Item Lost in Shadows</h1>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={20} /> Return to Sanctum
        </button>
      </div>
    );
  }

  const nameParts = product.name.split(' ');
  const firstPart = nameParts[0];
  const restPart = nameParts.slice(1).join(' ');

  const allImages = [product.image, ...(product.images || [])];

  const handleVariantSelect = (groupName: string, optionLabel: string, optionImage?: string) => {
    setSelectedVariants(prev => ({ ...prev, [groupName]: optionLabel }));
    if (optionImage) {
      // Find index of this image in allImages, or add it if it's not there
      const imgIndex = allImages.findIndex(img => img === optionImage);
      if (imgIndex !== -1) {
        setSelectedImage(imgIndex);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-stone-300 font-sans selection:bg-stone-100 selection:text-black pt-20">
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-start">
        {/* Image Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900/50 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-square flex items-center justify-center"
          >
            <img 
              src={allImages[selectedImage]} 
              alt={product.name} 
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {allImages.length > 1 && (
            <div className="mt-12 grid grid-cols-4 gap-4">
              {allImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-stone-900/30 border ${selectedImage === i ? 'border-stone-300' : 'border-stone-800'} p-4 cursor-pointer hover:border-stone-500 transition-colors`}
                >
                  <img src={img} alt={`thumbnail ${i}`} className={`w-full h-full object-contain transition-opacity ${selectedImage === i ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-serif italic">
                {product.category || 'Collection'}
              </span>
              <div className="h-px w-12 bg-stone-800" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-stone-600 text-stone-600" />)}
              </div>
            </div>

            <h1 className="text-6xl sm:text-8xl font-ravens text-stone-100 leading-none mb-4">
              {firstPart} <span className="text-stone-600">{restPart}</span>
            </h1>
            
            <p className="text-stone-400 font-serif italic text-lg leading-relaxed max-w-xl">
              Forged in the deepest shadows of the sanctum, this vessel offers unparalleled responsiveness for those who dare to haunt the courts. A legacy of speed and darkness.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-ravens text-stone-100">{product.price} DZD</span>
            </div>

            {/* Variants */}
            {product.variants?.map((variantGroup, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-bold text-stone-500 tracking-[0.2em]">Select {variantGroup.name}</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {variantGroup.options.map((opt, optIdx) => {
                    const isSelected = selectedVariants[variantGroup.name] === opt.label;
                    
                    if (opt.type === 'color') {
                      return (
                        <button 
                          key={optIdx}
                          onClick={() => handleVariantSelect(variantGroup.name, opt.label, opt.image)}
                          className={`w-10 h-10 rounded-full border border-stone-800 hover:scale-110 transition-transform relative overflow-hidden group ${isSelected ? 'ring-2 ring-offset-4 ring-offset-[#050505] ring-stone-300' : ''}`}
                          title={opt.label}
                          style={{ backgroundColor: opt.colorValue }}
                        />
                      );
                    }

                    if (opt.type === 'image') {
                      return (
                        <button 
                          key={optIdx}
                          onClick={() => handleVariantSelect(variantGroup.name, opt.label, opt.image)}
                          className={`min-w-14 h-14 px-4 border flex items-center justify-center text-xs font-serif transition-all relative overflow-hidden group ${isSelected ? 'bg-stone-100 text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-500 hover:text-stone-200'}`}
                          title={opt.label}
                        >
                          {opt.image ? (
                            <img src={opt.image} alt={opt.label} className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-80' : 'opacity-40 group-hover:opacity-60'}`} />
                          ) : (
                            <span className="relative z-10 drop-shadow-md">{opt.label}</span>
                          )}
                        </button>
                      );
                    }

                    return (
                      <button 
                        key={optIdx}
                        onClick={() => handleVariantSelect(variantGroup.name, opt.label, opt.image)}
                        className={`min-w-14 h-14 px-4 border flex items-center justify-center text-xs font-serif transition-all relative overflow-hidden group ${isSelected ? 'bg-stone-100 text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-500 hover:text-stone-200'}`}
                        title={opt.label}
                      >
                        <span className="relative z-10 drop-shadow-md">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="flex-1 bg-stone-100 text-black py-5 font-ravens uppercase tracking-[0.1em] text-2xl hover:bg-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} /> Acquire Vessel
              </button>
              <button className="px-10 py-5 border border-stone-800 text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px] hover:border-stone-500 hover:text-stone-100 transition-all">
                Wishlist
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-stone-900">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 group-hover:text-stone-300 transition-colors">
                  <Truck size={18} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-200">Shadow Delivery</h5>
                  <p className="text-[10px] text-stone-600 font-serif italic">Free for members</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 group-hover:text-stone-300 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-200">Secure Sanctum</h5>
                  <p className="text-[10px] text-stone-600 font-serif italic">Encrypted rituals</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 group-hover:text-stone-300 transition-colors">
                  <RefreshCw size={18} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-200">Eternal Return</h5>
                  <p className="text-[10px] text-stone-600 font-serif italic">30-day ritual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        product={product} 
      />

      <Footer />
    </div>
  );
};

export default ProductPage;
