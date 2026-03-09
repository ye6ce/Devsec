/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import ProductDashboard from './components/ProductDashboard';
import { Settings } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Product, Category } from './types';
import { supabase } from './lib/supabase';

export default function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        // If table doesn't exist yet, just ignore
        if (error.code !== '42P01') throw error;
      } else if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async (name: string, image?: string) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name, image }])
        .select();
        
      if (error) throw error;
      if (data) {
        setCategories(prev => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      // Parse variants and images if they come back as strings (depending on how they are stored in Supabase)
      const formattedProducts = data?.map(p => ({
        ...p,
        variants: typeof p.variants === 'string' ? JSON.parse(p.variants) : (p.variants || []),
        images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || [])
      })) || [];
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
        
      if (error) throw error;
      if (data) {
        setProducts(prev => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: product.name,
          price: product.price,
          image: product.image,
          images: product.images,
          category: product.category,
          variants: product.variants
        })
        .eq('id', product.id)
        .select();
        
      if (error) throw error;
      if (data) {
        setProducts(prev => prev.map(p => p.id === product.id ? data[0] : p));
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-ravens text-4xl">
        Summoning Inventory...
      </div>
    );
  }

  return (
    <>
      <Header />
      
      {/* Global Dashboard Trigger */}
      {user?.role === 'admin' && (
        <button 
          onClick={() => setIsDashboardOpen(true)}
          className="fixed bottom-6 right-6 z-[60] bg-stone-900/80 backdrop-blur-md border border-stone-800 p-3 hover:bg-white hover:text-black transition-all group shadow-xl"
          title="Open Dashboard"
        >
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      )}

      <ProductDashboard 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)}
        onAddProduct={addProduct as any}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        products={products}
        categories={categories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              products={products} 
              categories={categories}
              isDashboardOpen={isDashboardOpen} 
              setIsDashboardOpen={setIsDashboardOpen}
              addProduct={addProduct as any}
              deleteProduct={deleteProduct}
            />
          } 
        />
      <Route 
        path="/product/:id" 
        element={<ProductPage products={products} />} 
      />
    </Routes>
    </>
  );
}
