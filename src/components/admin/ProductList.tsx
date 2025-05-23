
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Filter, Check, X, FileUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { productCategories } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import the productService from our utils
import { productService } from '@/lib/productService';

interface ProductListProps {
  onEditProduct: (product: any) => void;
  onCreateProduct: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEditProduct, onCreateProduct }) => {
  const [products, setProducts] = useState(productService.getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  // Load products on component mount
  useEffect(() => {
    const loadedProducts = productService.getProducts();
    setProducts(loadedProducts);
  }, []);

  const handleToggleStatus = (productId: string) => {
    const updatedProducts = productService.toggleProductStatus(productId);
    setProducts(updatedProducts);
    toast.success('Product status updated successfully');
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = productService.deleteProduct(productId);
    setProducts(updatedProducts);
    toast.success('Product deleted successfully');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      toast.error('No file selected');
      return;
    }
    
    // Check if it's a CSV file
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const updatedProducts = productService.importFromCSV(content);
        setProducts(updatedProducts);
        setIsImportDialogOpen(false);
        toast.success('Products imported from CSV successfully');
      } catch (error) {
        console.error('Error parsing CSV file:', error);
        toast.error('Error parsing CSV file. Please check the format.');
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading the file');
    };
    
    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    // Create a minimal sample CSV
    const sampleCSV = `id,title,code,description,imageUrl,category,published,fullDescription
product-sample-1,"Fiber Optic Connector SC/APC","FO-CN-SCAPC-01","High-quality fiber optic connector for single-mode fiber","https://images.unsplash.com/photo-1599507082144-cc987841b0d0?q=80&w=1000","connectors",true,"High precision connector with low insertion loss"
product-sample-2,"Fiber Cable 24 Core SM","FO-CB-SM24-01","24-core single-mode fiber optic cable","https://images.unsplash.com/photo-1601131083572-bc8cb570c7c9?q=80&w=1000","cables",true,"Outdoor rated cable with armored protection"`;
    
    const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample-products.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Sample CSV template downloaded');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && product.published) || 
                         (statusFilter === 'draft' && !product.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-telecom-blue">Product Management</h1>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                <span>Import CSV</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Import Products from CSV</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with product data to import. The file should include columns for id, title, code, description, imageUrl, category, published status, and fullDescription.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="csvFile" className="text-sm font-medium">
                    Select CSV File
                  </label>
                  <input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="border rounded p-2"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button type="button" variant="outline" onClick={downloadSampleCSV}>
                  Download Sample
                </Button>
                <Button type="button" variant="ghost" onClick={() => setIsImportDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={onCreateProduct} className="bg-telecom-blue hover:bg-telecom-light-blue">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-40">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {productCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No products found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-16 h-16 object-contain rounded border"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {productCategories.find(c => c.id === product.category)?.name || product.category}
                    </TableCell>
                    <TableCell>
                      {product.published ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Published</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleStatus(product.id)}
                        title={product.published ? "Unpublish" : "Publish"}
                      >
                        {product.published ? (
                          <X className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEditProduct(product)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the product "{product.title}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
