
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Download, FileText, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredProducts } from '@/lib/utils';

// Extended product data for detail page
interface ProductDetailData {
  id: string;
  title: string;
  code: string;
  description: string;
  imageUrl: string;
  category: string;
  images?: string[];
  fullDescription?: string;
  specifications?: Array<{ name: string; value: string }>;
  features?: string[];
  documents?: Array<{ name: string; url: string }>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = featuredProducts.find(p => p.id === id);
    
    if (foundProduct) {
      const extendedProduct: ProductDetailData = {
        ...foundProduct,
        images: [
          foundProduct.imageUrl,
          "https://placehold.co/800x600?text=Product+Image+2",
          "https://placehold.co/800x600?text=Product+Image+3",
        ],
        fullDescription: `The ${foundProduct.title} is a high-quality telecommunications equipment designed for professional use in network infrastructure. Built with premium materials and advanced technology, it offers reliable performance and durability in various environments.
        
        This product is fully compatible with industry standards and can be integrated seamlessly into existing networks. Its efficient design ensures optimal performance while minimizing space requirements and power consumption.`,
        specifications: [
          { name: "Dimensions", value: "48.26 cm × 43.18 cm × 4.45 cm" },
          { name: "Weight", value: "3.5 kg" },
          { name: "Operating Temperature", value: "-10°C to 60°C" },
          { name: "Material", value: "Aluminum alloy, steel" },
          { name: "Standard Compliance", value: "ISO 9001, IEC 61754-20, TIA-568" },
          { name: "Warranty", value: "2 years" },
        ],
        features: [
          "High-density port configuration for space efficiency",
          "Tool-less installation and maintenance",
          "Built-in cable management system",
          "Modular design allowing for future expansion",
          "Clear port labeling for easy identification",
          "Robust construction for long service life",
        ],
        documents: [
          { name: "Product Datasheet", url: "#" },
          { name: "Installation Guide", url: "#" },
          { name: "Technical Specifications", url: "#" },
        ]
      };
      
      setProduct(extendedProduct);
      setActiveImage(extendedProduct.imageUrl);
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
              <p className="text-gray-600 mt-4 mb-8">The requested product could not be found.</p>
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
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(image)}
                      className={`border p-2 rounded-md ${activeImage === image ? 'border-telecom-blue' : 'border-gray-200'}`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.title} - Image ${index + 1}`} 
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div>
              <h1 className="text-3xl font-bold text-telecom-blue mb-2">{product.title}</h1>
              <p className="text-gray-500 mb-4">Product Code: {product.code}</p>
              
              <div className="bg-telecom-light-gray p-4 rounded-lg mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-telecom-blue mb-2">Key Features:</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features?.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-8">
                  Request Quotation
                </Button>
                <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white">
                  Add to Project
                </Button>
              </div>
              
              {/* Documents */}
              {product.documents && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-telecom-blue mb-3">Documentation:</h2>
                  <div className="space-y-2">
                    {product.documents.map((doc, index) => (
                      <a 
                        key={index} 
                        href={doc.url} 
                        className="flex items-center text-telecom-blue hover:text-telecom-light-blue"
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
                  <p className="text-gray-700 whitespace-pre-line">{product.fullDescription}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="py-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {product.specifications?.map((spec, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap bg-telecom-light-gray font-medium text-gray-700 w-1/3">
                            {spec.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="py-6">
                <ul className="space-y-3">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-telecom-blue flex items-center justify-center text-white text-sm mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="section-title">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts
                .filter(p => p.id !== product.id)
                .filter(p => p.category === product.category)
                .slice(0, 4)
                .map(p => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/products/${p.id}`}>
                      <img 
                        src={p.imageUrl} 
                        alt={p.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-telecom-blue">{p.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">Code: {p.code}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
