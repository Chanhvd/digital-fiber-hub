
// This is a simple product service that supports CSV export
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

// Convert products array to CSV string
const productsToCSV = (productsToExport: Product[]): string => {
  // Define CSV headers
  const headers = [
    'id', 'title', 'code', 'description', 
    'imageUrl', 'category', 'published', 
    'fullDescription'
  ];

  // Convert products to CSV rows
  const rows = productsToExport.map(product => {
    return [
      product.id,
      `"${product.title.replace(/"/g, '""')}"`, // Escape quotes in CSV
      product.code,
      `"${product.description.replace(/"/g, '""')}"`,
      product.imageUrl,
      product.category,
      product.published ? 'true' : 'false',
      product.fullDescription ? `"${product.fullDescription.replace(/"/g, '""')}"` : ''
    ].join(',');
  });

  // Combine headers and rows
  return [headers.join(','), ...rows].join('\n');
};

// Parse CSV content to products array
const parseCSVToProducts = (csvContent: string): Product[] => {
  const lines = csvContent.split('\n');
  
  // Extract headers (first line)
  const headers = lines[0].split(',');
  
  // Process data rows (skip header)
  const parsedProducts: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines
    
    const values = parseCSVRow(lines[i]);
    if (values.length < headers.length) continue; // Skip malformed rows
    
    // Create product object from CSV row
    const product: Partial<Product> = {};
    
    headers.forEach((header, index) => {
      let value = values[index];
      
      // Remove surrounding quotes if present
      if (value && value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1).replace(/""/g, '"');
      }
      
      switch (header.trim()) {
        case 'id':
          product.id = value || `product-${Date.now()}-${i}`;
          break;
        case 'title':
          product.title = value;
          break;
        case 'code':
          product.code = value;
          break;
        case 'description':
          product.description = value;
          break;
        case 'imageUrl':
          product.imageUrl = value;
          break;
        case 'category':
          product.category = value;
          break;
        case 'published':
          product.published = value.toLowerCase() === 'true';
          break;
        case 'fullDescription':
          if (value) product.fullDescription = value;
          break;
      }
    });
    
    // Add only if we have required fields
    if (product.title && product.description) {
      parsedProducts.push(product as Product);
    }
  }
  
  return parsedProducts;
};

// Helper function to parse CSV row correctly (handling quoted fields with commas)
const parseCSVRow = (row: string): string[] => {
  const result = [];
  let insideQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      // Handle quote - if previous char is also quote, it's an escaped quote
      if (i + 1 < row.length && row[i + 1] === '"') {
        currentValue += '"';
        i++; // Skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      result.push(currentValue);
      currentValue = '';
    } else {
      // Regular character
      currentValue += char;
    }
  }
  
  // Add the last field
  result.push(currentValue);
  return result;
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

  // Toggle product status
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

  // Export all products to CSV
  exportToCSV: (): string => {
    return productsToCSV(products);
  },

  // Export specific products to CSV
  exportSelectedToCSV: (productIds: string[]): string => {
    const selectedProducts = products.filter(p => productIds.includes(p.id));
    return productsToCSV(selectedProducts);
  },

  // Download products as CSV file
  downloadCSV: (filename = 'products.csv') => {
    const csv = productsToCSV(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  
  // Import products from CSV content
  importFromCSV: (csvContent: string): Product[] => {
    const importedProducts = parseCSVToProducts(csvContent);
    
    // Add imported products (avoiding duplicates by ID)
    importedProducts.forEach(newProduct => {
      const existingIndex = products.findIndex(p => p.id === newProduct.id);
      if (existingIndex >= 0) {
        // Update existing product
        products[existingIndex] = { ...products[existingIndex], ...newProduct };
      } else {
        // Add new product
        products.push(newProduct);
      }
    });
    
    saveProducts();
    return [...products];
  }
};

