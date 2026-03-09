import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const CheckoutModal = ({ isOpen, onClose, product }: CheckoutModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', phone: '', address: '', city: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-900 flex justify-between items-center bg-stone-900/20">
              <h2 className="text-2xl font-ravens text-stone-100 tracking-widest uppercase">
                {step === 'form' ? 'Summon Vessel' : 'Ritual Complete'}
              </h2>
              <button 
                onClick={handleClose}
                className="text-stone-500 hover:text-stone-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-stone-900/30 border border-stone-800">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="text-stone-200 font-ravens tracking-wider">{product.name}</h3>
                    <p className="text-stone-500 font-serif italic">Gold {product.price}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">Mortal Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">Communion Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">Sanctum Address</label>
                    <input 
                      required
                      type="text" 
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">City of Shadows</label>
                    <input 
                      required
                      type="text" 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-colors font-serif italic"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-900">
                  <div className="flex items-center gap-3 mb-6 text-stone-400 bg-stone-900/20 p-4 border border-stone-800/50">
                    <Truck size={20} className="text-stone-500" />
                    <div className="text-sm font-serif italic">
                      <span className="text-stone-200 not-italic font-sans text-xs uppercase tracking-widest block mb-1">Cash on Delivery</span>
                      Pay with gold upon arrival
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-stone-100 text-black py-4 font-ravens uppercase tracking-[0.2em] text-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    Confirm Summoning
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-stone-900 rounded-full flex items-center justify-center border border-stone-800">
                  <CheckCircle2 size={40} className="text-stone-300" />
                </div>
                <div>
                  <h3 className="text-3xl font-ravens text-stone-100 mb-2">Pact Sealed</h3>
                  <p className="text-stone-500 font-serif italic">
                    Your vessel will arrive through the shadows shortly. Prepare your gold.
                  </p>
                </div>
                <button 
                  onClick={handleClose}
                  className="mt-8 px-8 py-3 border border-stone-800 text-stone-400 font-bold uppercase tracking-[0.2em] text-xs hover:border-stone-500 hover:text-stone-100 transition-all"
                >
                  Return to Sanctum
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
