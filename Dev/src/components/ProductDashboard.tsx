import React, { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Type, Palette, Edit2 } from 'lucide-react';
import { Product, ProductVariant, VariantOption, Category } from '../types';

interface ProductDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  products: Product[];
  categories: Category[];
  onAddCategory: (name: string, image?: string) => void;
  onDeleteCategory: (id: number) => void;
}

const ProductDashboard = ({ isOpen, onClose, onAddProduct, onUpdateProduct, onDeleteProduct, products, categories, onAddCategory, onDeleteCategory }: ProductDashboardProps) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'> & { id?: number }>({
    name: '',
    price: '',
    image: '',
    images: [],
    category: '',
    variants: []
  });

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'categories'>('list');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  // Derive existing categories for suggestions
  const existingCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    if (newProduct.id) {
      onUpdateProduct(newProduct as Product);
    } else {
      onAddProduct(newProduct as Product);
    }

    setNewProduct({
      name: '',
      price: '',
      image: '',
      images: [],
      category: '',
      variants: []
    });
    setActiveTab('list');
  };

  const handleEditClick = (product: Product) => {
    setNewProduct(product);
    setActiveTab('add');
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtraImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, images: [...(newProduct.images || []), reader.result as string] });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeExtraImage = (index: number) => {
    const newImages = [...(newProduct.images || [])];
    newImages.splice(index, 1);
    setNewProduct({ ...newProduct, images: newImages });
  };

  const addExtraImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setNewProduct({ ...newProduct, images: [...(newProduct.images || []), url] });
    }
  };

  const addVariantGroup = () => {
    setNewProduct({
      ...newProduct,
      variants: [...(newProduct.variants || []), { name: 'New Variant', options: [] }]
    });
  };

  const updateVariantGroupName = (index: number, name: string) => {
    const newVariants = [...(newProduct.variants || [])];
    newVariants[index].name = name;
    setNewProduct({ ...newProduct, variants: newVariants });
  };

  const removeVariantGroup = (index: number) => {
    const newVariants = [...(newProduct.variants || [])];
    newVariants.splice(index, 1);
    setNewProduct({ ...newProduct, variants: newVariants });
  };

  const addVariantOption = (groupIndex: number) => {
    const newVariants = [...(newProduct.variants || [])];
    newVariants[groupIndex].options.push({ label: 'Option', type: 'text' });
    setNewProduct({ ...newProduct, variants: newVariants });
  };

  const updateVariantOption = (groupIndex: number, optionIndex: number, updates: Partial<VariantOption>) => {
    const newVariants = [...(newProduct.variants || [])];
    newVariants[groupIndex].options[optionIndex] = {
      ...newVariants[groupIndex].options[optionIndex],
      ...updates
    };
    setNewProduct({ ...newProduct, variants: newVariants });
  };

  const removeVariantOption = (groupIndex: number, optionIndex: number) => {
    const newVariants = [...(newProduct.variants || [])];
    newVariants[groupIndex].options.splice(optionIndex, 1);
    setNewProduct({ ...newProduct, variants: newVariants });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0a0a0a] border border-stone-800 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex justify-between items-center">
          <h2 className="text-3xl font-ravens text-stone-100 tracking-wider">Sanctum Dashboard</h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-800 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-6 sm:px-8 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === 'list' ? 'bg-stone-900 text-white border-b-2 border-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => {
              setActiveTab('add');
              if (newProduct.id) {
                setNewProduct({ name: '', price: '', image: '', images: [], category: '', variants: [] });
              }
            }}
            className={`px-6 sm:px-8 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === 'add' ? 'bg-stone-900 text-white border-b-2 border-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            {newProduct.id ? 'Edit Item' : 'Forge New Item'}
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-6 sm:px-8 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === 'categories' ? 'bg-stone-900 text-white border-b-2 border-white' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Categories
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'list' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-stone-900/50 border border-stone-800 p-4 flex items-center gap-4 group">
                  <div className="w-16 h-16 bg-black border border-stone-800 flex-shrink-0 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-ravens text-xl text-stone-200">{product.name}</h3>
                    <p className="text-xs text-stone-500 font-serif italic">{product.price} DZD</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditClick(product)}
                      className="p-2 text-stone-700 hover:text-stone-300 transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-2 text-stone-700 hover:text-red-500 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-20 text-center text-stone-600 font-serif italic">
                  The inventory is empty...
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Item Name</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif"
                    placeholder="e.g. Shadow Walker"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Price (DZD)</label>
                  <input 
                    type="text" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif"
                    placeholder="e.g. 15000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Main Image</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase text-stone-500 tracking-widest">Upload Image</label>
                    <div className="relative h-32 border-2 border-dashed border-stone-800 hover:border-stone-500 transition-colors group cursor-pointer">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-600 group-hover:text-stone-300">
                        <Plus size={24} className="mb-2" />
                        <span className="text-[10px] uppercase tracking-widest">Select Image</span>
                      </div>
                      {newProduct.image && (
                        <div className="absolute inset-0 bg-black z-20 p-2">
                          <img src={newProduct.image} alt="Preview" className="w-full h-full object-contain" />
                          <button 
                            type="button"
                            onClick={() => setNewProduct({ ...newProduct, image: '' })}
                            className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase text-stone-500 tracking-widest">Or Provide URL</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600">
                        <ImageIcon size={18} />
                      </div>
                      <input 
                        type="text" 
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full bg-black border border-stone-800 p-3 pl-10 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Extra Images</label>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={addExtraImageUrl}
                      className="text-[10px] uppercase font-bold text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Plus size={14} /> Add URL
                    </button>
                    <div className="relative overflow-hidden">
                      <button type="button" className="text-[10px] uppercase font-bold text-stone-400 hover:text-white flex items-center gap-1 transition-colors">
                        <Plus size={14} /> Upload
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleExtraImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                {newProduct.images && newProduct.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {newProduct.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square border border-stone-800 bg-stone-900/50 group">
                        <img src={img} alt={`Extra ${idx}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeExtraImage(idx)}
                          className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif"
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                  {existingCategories.filter(c => !categories.find(cat => cat.name === c)).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                  <label className="text-[10px] uppercase font-bold text-stone-600 tracking-[0.2em]">Variants (Sizes, Colors, etc.)</label>
                  <button 
                    type="button"
                    onClick={addVariantGroup}
                    className="text-[10px] uppercase font-bold text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} /> Add Variant Group
                  </button>
                </div>
                
                <div className="space-y-6">
                  {newProduct.variants?.map((variantGroup, groupIdx) => (
                    <div key={groupIdx} className="bg-stone-900/30 border border-stone-800 p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <input 
                          type="text"
                          value={variantGroup.name}
                          onChange={(e) => updateVariantGroupName(groupIdx, e.target.value)}
                          className="bg-transparent border-b border-stone-700 text-sm font-bold text-stone-200 uppercase tracking-widest focus:border-stone-400 outline-none w-1/2"
                          placeholder="Variant Name (e.g. Size)"
                        />
                        <button 
                          type="button"
                          onClick={() => removeVariantGroup(groupIdx)}
                          className="text-stone-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {variantGroup.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex flex-wrap items-center gap-3 bg-black border border-stone-800 p-3 rounded-sm">
                            <input
                              type="text"
                              value={opt.label}
                              onChange={(e) => updateVariantOption(groupIdx, optIdx, { label: e.target.value })}
                              placeholder="Label (e.g. XL)"
                              className="bg-transparent border-b border-stone-700 text-xs text-stone-200 focus:border-stone-400 outline-none w-24"
                            />
                            <select
                              value={opt.type || 'text'}
                              onChange={(e) => updateVariantOption(groupIdx, optIdx, { type: e.target.value as 'text' | 'color' })}
                              className="bg-stone-900 border border-stone-700 text-xs text-stone-300 p-1 outline-none"
                            >
                              <option value="text">Text</option>
                              <option value="color">Color</option>
                            </select>
                            {opt.type === 'color' && (
                              <input
                                type="color"
                                value={opt.colorValue || '#000000'}
                                onChange={(e) => updateVariantOption(groupIdx, optIdx, { colorValue: e.target.value })}
                                className="w-6 h-6 bg-transparent border-none cursor-pointer"
                              />
                            )}
                            <div className="flex-1 min-w-[150px] flex items-center gap-2">
                              <input
                                type="text"
                                value={opt.image || ''}
                                onChange={(e) => updateVariantOption(groupIdx, optIdx, { image: e.target.value })}
                                placeholder="Image URL (optional)"
                                className="bg-transparent border-b border-stone-700 text-xs text-stone-400 focus:border-stone-400 outline-none flex-1"
                              />
                              {opt.image && <img src={opt.image} alt="" className="w-6 h-6 object-cover rounded-sm" />}
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeVariantOption(groupIdx, optIdx)}
                              className="text-stone-600 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        
                        <button 
                          type="button"
                          onClick={() => addVariantOption(groupIdx)}
                          className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-300 border border-dashed border-stone-800 px-3 py-2 w-full justify-center"
                        >
                          <Plus size={12} /> Add Option
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {(!newProduct.variants || newProduct.variants.length === 0) && (
                    <p className="text-xs text-stone-600 italic">No variants added. Product will have no selectable options.</p>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-stone-100 text-black py-4 font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {newProduct.id ? 'Update Item' : 'Forge Item'}
              </button>
            </form>
          )}
          
          {activeTab === 'categories' && (
            <div className="max-w-2xl mx-auto space-y-8">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newCategoryName.trim()) {
                    onAddCategory(newCategoryName.trim(), newCategoryImage.trim() || undefined);
                    setNewCategoryName('');
                    setNewCategoryImage('');
                  }
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif"
                    placeholder="New Category Name..."
                  />
                  <button 
                    type="submit"
                    className="bg-stone-100 text-black px-6 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all"
                  >
                    Add
                  </button>
                </div>
                <input 
                  type="text" 
                  value={newCategoryImage}
                  onChange={(e) => setNewCategoryImage(e.target.value)}
                  className="w-full bg-black border border-stone-800 p-3 text-stone-200 focus:border-stone-500 outline-none transition-all font-serif text-sm"
                  placeholder="Category Background Image URL (optional)..."
                />
              </form>

              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="bg-stone-900/50 border border-stone-800 p-4 flex justify-between items-center group relative overflow-hidden">
                    {category.image && (
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <img src={category.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span className="font-serif text-stone-200 relative z-10">{category.name}</span>
                    <button 
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-2 text-stone-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 relative z-10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="py-10 text-center text-stone-600 font-serif italic">
                    No categories defined yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
