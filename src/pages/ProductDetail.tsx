
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Download, FileText, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productService } from '@/lib/productService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundProduct = productService.getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.imageUrl);
        
        // Get related products (same category, exclude current product)
        const published = productService.getPublishedProducts();
        const related = published
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <Section>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-telecom-blue">Product not found</h2>
              <p className="text-gray-600 mt-4 mb-8">The requested product could not be found or is no longer available.</p>
              <Link to="/products">
                <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white">
                  Return to Products
                </Button>
              </Link>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Create an array of product images
  const productImages = [product.imageUrl];
  if (product.images && product.images.length > 0) {
    // Add additional images if they exist
    productImages.push(...product.images.filter((img: string) => img !== product.imageUrl));
  } else {
    // Add placeholder images if no additional images
    productImages.push(
      "https://placehold.co/800x600?text=Product+Image+2",
      "https://placehold.co/800x600?text=Product+Image+3"
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Section>
          {/* Breadcrumb Navigation */}
          <div className="mb-8 flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-telecom-blue">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/products" className="hover:text-telecom-blue">Products</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-telecom-blue">{product.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4 bg-white p-4 border border-gray-200 rounded-lg">
                <img 
                  src={activeImage} 
                  alt={product.title} 
                  className="w-full h-80 object-contain"
                />
              </div>
              
              <div className="flex space-x-4">
                {productImages.map((image: string, index: number) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(image)}
                    className={`border p-2 rounded-md transition-all duration-300 ${activeImage === image ? 'border-telecom-blue scale-105' : 'border-gray-200'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - Image ${index + 1}`} 
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Information */}
            <div>
              <h1 className="text-3xl font-bold text-telecom-blue mb-2 transition-transform duration-300 hover:translate-y-[-5px]">{product.title}</h1>
              <p className="text-gray-500 mb-4">Product Code: {product.code}</p>
              
              <div className="bg-telecom-light-gray p-4 rounded-lg mb-6 transition-all duration-300 hover:bg-telecom-light-gray/80">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-telecom-blue mb-2">Key Features:</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features ? (
                    product.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="transition-transform duration-300 hover:translate-x-1">{feature}</li>
                    ))
                  ) : (
                    <li>High-quality fiber optic product</li>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-8 transition-transform duration-300 hover:scale-105">
                  Request Quotation
                </Button>
                <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white transition-transform duration-300 hover:scale-105">
                  Add to Project
                </Button>
              </div>
              
              {/* Documents */}
              {product.documents && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-telecom-blue mb-3">Documentation:</h2>
                  <div className="space-y-2">
                    {product.documents.map((doc: { name: string; url: string }, index: number) => (
                      <a 
                        key={index} 
                        href={doc.url} 
                        className="flex items-center text-telecom-blue hover:text-telecom-light-blue transition-transform duration-300 hover:translate-x-1"
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        <span>{doc.name}</span>
                        <Download className="h-4 w-4 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Detailed Product Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full flex justify-start border-b border-gray-200">
                <TabsTrigger value="description" className="px-6 py-3">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="px-6 py-3">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="features" className="px-6 py-3">
                  Features
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{product.fullDescription || product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="py-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {product.specifications ? (
                        product.specifications.map((spec: { name: string; value: string }, index: number) => (
                          <tr key={index} className="transition-colors duration-300 hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap bg-telecom-light-gray font-medium text-gray-700 w-1/3">
                              {spec.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {spec.value}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                            Specifications not available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="py-6">
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start transition-transform duration-300 hover:translate-x-1">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-telecom-blue flex items-center justify-center text-white text-sm mr-3 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Feature list not available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="section-title transition-all duration-300 hover:translate-y-[-5px] hover:text-telecom-light-blue">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => (
                  <Link 
                    key={p.id} 
                    to={`/products/${p.id}`}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <img 
                      src={p.imageUrl} 
                      alt={p.title} 
                      className="w-full h-48 object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-telecom-blue">{p.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">Code: {p.code}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
