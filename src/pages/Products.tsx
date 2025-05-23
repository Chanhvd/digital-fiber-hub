import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productCategories } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productService } from '@/lib/productService';
import { Button } from '@/components/ui/button';
import { FileUp, FileDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const productsPerPage = 8;
  useEffect(() => {
    // Get only published products for the public site
    const publishedProducts = productService.getPublishedProducts();
    setProducts(publishedProducts);
  }, []);
  const filteredProducts = activeCategory === 'all' ? products : products.filter(product => product.category === activeCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
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
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const updatedProducts = productService.importFromCSV(content);
        const publishedProducts = updatedProducts.filter(p => p.published);
        setProducts(publishedProducts);
        setIsDialogOpen(false);
        toast.success('Products loaded from CSV successfully');
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
    const blob = new Blob([sampleCSV], {
      type: 'text/csv;charset=utf-8;'
    });
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
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero title="Our Product Range" subtitle="High-quality fiber optic equipment for telecommunications infrastructure" imageUrl="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" />
        
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Telecommunications and Fiber Optic Equipment</h2>
            <p className="text-lg text-gray-600 mb-6">
              FiberTech Solutions offers a comprehensive range of high-quality fiber optic products for all your network infrastructure needs. Our product catalog includes optical distribution frames, fiber cables, connectors, and testing equipment from leading manufacturers.
            </p>
            
            <div className="flex justify-center gap-4 mb-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Import Products from CSV</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file with product data to display on this page. The file should include columns for id, title, code, description, imageUrl, category, and published status.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="csvFile" className="text-sm font-medium">
                        Select CSV File
                      </label>
                      <input id="csvFile" type="file" accept=".csv" onChange={handleFileUpload} className="border rounded p-2" />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-between">
                    <Button type="button" variant="outline" onClick={downloadSampleCSV}>
                      <FileDown className="mr-2 h-4 w-4" /> Download Sample
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={() => productService.downloadCSV('fiber_products.csv')} className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                <span>Download Catalog (CSV)</span>
              </Button>
            </div>
          </div>
          
          {/* Product Categories */}
          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center mb-8">
                <TabsTrigger value="all" onClick={() => setActiveCategory('all')} className="px-4 py-2 m-1">
                  All Products
                </TabsTrigger>
                {productCategories.map(category => <TabsTrigger key={category.id} value={category.id} onClick={() => setActiveCategory(category.id)} className="px-4 py-2 m-1">
                    {category.name}
                  </TabsTrigger>)}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedProducts.length > 0 ? paginatedProducts.map(product => <ProductCard key={product.id} id={product.id} title={product.title} code={product.code} description={product.description} imageUrl={product.imageUrl} />) : <div className="col-span-full text-center py-12 text-gray-500">
                      No products available in this category yet.
                    </div>}
                </div>
              </TabsContent>
              
              {productCategories.map(category => <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.length > 0 ? paginatedProducts.map(product => <ProductCard key={product.id} id={product.id} title={product.title} code={product.code} description={product.description} imageUrl={product.imageUrl} />) : <div className="col-span-full text-center py-12 text-gray-500">
                        No products available in this category yet.
                      </div>}
                  </div>
                </TabsContent>)}
            </Tabs>
            
            {/* Pagination */}
            {totalPages > 1 && <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(prev => Math.max(prev - 1, 1))} className={page === 1 ? 'pointer-events-none opacity-50' : ''} />
                  </PaginationItem>
                  {Array.from({
                length: Math.min(totalPages, 5)
              }).map((_, idx) => {
                let pageNum = idx + 1;

                // If current page is > 3 and total pages > 5, adjust displayed pages
                if (page > 3 && totalPages > 5) {
                  pageNum = page + idx - 2;
                  if (pageNum < 1) pageNum = 1;
                  if (pageNum > totalPages) pageNum = totalPages;
                }
                return <PaginationItem key={idx}>
                        <PaginationLink onClick={() => setPage(pageNum)} isActive={page === pageNum}>
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>;
              })}
                  {totalPages > 5 && page < totalPages - 2 && <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>}
                  <PaginationItem>
                    <PaginationNext onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} className={page === totalPages ? 'pointer-events-none opacity-50' : ''} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>}
          </div>
          
          {/* Download Catalog Section */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-telecom-blue mb-4">Need More Details?</h3>
            <p className="text-gray-700 mb-6">
              Download our complete product catalog for detailed specifications, pricing information, and more.
            </p>
            <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white">
              Download Product Catalog (PDF)
            </Button>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>;
};
export default Products;