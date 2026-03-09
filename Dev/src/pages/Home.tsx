import { useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'motion/react';
import ScrollFloat from '../components/ScrollFloat';
import ProductCard from '../components/ProductCard';
import BrandStory from '../components/BrandStory';
import FeaturedCollections from '../components/FeaturedCollections';
import RitualFeatures from '../components/RitualFeatures';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ShopPage from '../components/ShopPage';
import ProductShowcase from '../components/ProductShowcase';
import { Product, Category } from '../types';

interface HomeProps {
  products: Product[];
  categories: Category[];
  isDashboardOpen: boolean;
  setIsDashboardOpen: (isOpen: boolean) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const Home = ({ products, categories, isDashboardOpen, setIsDashboardOpen, addProduct, deleteProduct }: HomeProps) => {
  const containerRef = useRef(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const handleShopClick = () => {
    setIsEntering(true);
    // Wait for zoom animation to complete before showing shop
    setTimeout(() => {
      setShowShop(true);
      setIsEntering(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1800);
  };

  const handleBackFromShop = () => {
    setShowShop(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!showShop ? (
          <motion.div 
            key="hero"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-screen w-full overflow-hidden">
              <motion.div
                animate={isEntering ? { 
                  scale: 0.2, 
                  opacity: 0,
                  rotateX: -110,
                  y: 1000,
                  z: -2000
                } : { 
                  scale: 1, 
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  z: 0
                }}
                transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1] }}
                className="absolute inset-0"
                style={{ perspective: 2000, transformStyle: 'preserve-3d' }}
              >
                <Tilt
                  className="h-full w-full bg-black"
                  tiltMaxAngleX={isEntering ? 0 : 2}
                  tiltMaxAngleY={isEntering ? 0 : 2}
                  perspective={1000}
                  scale={1.01}
                  transitionSpeed={2000}
                >
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/d/100pgkrGBmYw2Cj-TTN6XQGxIGeQChJyi')`,
                    }}
                  />
                </Tilt>
              </motion.div>

              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={isEntering ? { 
                    y: 500, 
                    opacity: 0, 
                    rotateX: -45, 
                    scale: 0.5,
                    z: -500 
                  } : { 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0, 
                    scale: 1,
                    z: 0 
                  }}
                  transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute top-2 left-0 right-0 flex justify-center"
                  style={{ perspective: 1000 }}
                >
                  <h1 className="text-6xl font-bold tracking-tight text-stone-300 sm:text-9xl pointer-events-auto flex font-ravens" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5), 8px 8px 0px rgba(0,0,0,0.3)' }}>
                    {"Ravens".split("").map((char, i) => (
                      <span key={i} style={{ transformOrigin: 'bottom center', transform: `rotate(${(i - 2.5) * 15}deg)` }}>{char}</span>
                    ))}
                  </h1>
                </motion.div>

                <motion.div 
                  animate={isEntering ? { 
                    y: 300, 
                    opacity: 0, 
                    scale: 0.2,
                    z: -1000 
                  } : { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    z: 0 
                  }}
                  transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute bottom-16 left-0 right-0 flex justify-center"
                  style={{ perspective: 1000 }}
                >
                  <button 
                    onClick={handleShopClick}
                    className="group relative px-16 py-5 bg-transparent border border-stone-500 text-stone-100 font-ravens text-4xl tracking-[0.1em] uppercase transition-all duration-700 hover:border-stone-100 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] pointer-events-auto overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-700">Shop</span>
                    
                    {/* Animated background fill */}
                    <div className="absolute inset-0 bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    
                    {/* Text color change on hover (inverted) */}
                    <span className="absolute inset-0 flex items-center justify-center text-black font-ravens text-4xl tracking-[0.1em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                      Shop
                    </span>

                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              </div>
            </div>

            <BrandStory />

            <FeaturedCollections categories={categories} />

            <ProductShowcase />

            <section ref={productsRef} className="min-h-screen px-4 sm:px-10 flex flex-col items-center justify-center bg-black relative py-20">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 via-transparent to-transparent" />
              
              <div className="mb-20 sm:mb-32">
                <ScrollFloat 
                  containerClassName="text-center" 
                  textClassName="text-6xl sm:text-[12rem] font-ravens text-stone-300 leading-none tracking-tighter"
                >
                  Our Products
                </ScrollFloat>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-12 w-full max-w-7xl relative z-10">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <RitualFeatures />
            
            <Newsletter />

            <Footer />
          </motion.div>
        ) : (
          <motion.div 
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ShopPage 
              products={products} 
              categories={categories}
              onBack={handleBackFromShop} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
