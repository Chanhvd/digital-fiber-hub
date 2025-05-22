
// This is a simple in-memory product service for demo purposes
// In a real application, this would be replaced with API calls to a backend service

import { featuredProducts } from './utils';

// Define a more complete product interface
interface Product {
  id: string;
  title: string;
  code: string;
  description: string;
  imageUrl: string;
  category: string;
  published?: boolean;
  fullDescription?: string;
  specifications?: Array<{ name: string; value: string }>;
  features?: string[];
  documents?: Array<{ name: string; url: string }>;
}

// Initialize with featured products from utils.ts
let products: Product[] = featuredProducts.map(product => ({
  ...product,
  published: true, // Set all initial products as published
}));

// Check if we have stored products in localStorage
const initialize = () => {
  const storedProducts = localStorage.getItem('adminProducts');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  } else {
    // First time setup - save initial products
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }
};

// Initialize when this module is first imported
initialize();

// Helper to save products to localStorage
const saveProducts = () => {
  localStorage.setItem('adminProducts', JSON.stringify(products));
};

export const productService = {
  // Get all products
  getProducts: (): Product[] => {
    return [...products];
  },

  // Get published products only (for public site)
  getPublishedProducts: (): Product[] => {
    return products.filter(product => product.published);
  },

  // Get a specific product by ID
  getProductById: (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  },

  // Add a new product
  addProduct: (product: Product): Product => {
    const newProduct = {
      ...product,
      id: product.id || `product-${Date.now()}`, // Ensure we have an ID
      published: product.published ?? false, // Default to draft
    };
    products = [...products, newProduct];
    saveProducts();
    return newProduct;
  },

  // Update an existing product
  updateProduct: (product: Product): Product => {
    products = products.map(p => p.id === product.id ? product : p);
    saveProducts();
    return product;
  },

  // Toggle product published status
  toggleProductStatus: (id: string): Product[] => {
    products = products.map(p => {
      if (p.id === id) {
        return { ...p, published: !p.published };
      }
      return p;
    });
    saveProducts();
    return [...products];
  },

  // Delete a product
  deleteProduct: (id: string): Product[] => {
    products = products.filter(p => p.id !== id);
    saveProducts();
    return [...products];
  },
};
