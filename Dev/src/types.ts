export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface VariantOption {
  label: string;
  image?: string;
  type?: 'text' | 'color' | 'image';
  colorValue?: string;
}

export interface ProductVariant {
  name: string;
  options: VariantOption[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  images?: string[];
  category?: string;
  variants?: ProductVariant[];
}
