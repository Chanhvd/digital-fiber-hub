
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { featuredProducts, productCategories } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Expanding our product list for the products page
const allProducts = [
  ...featuredProducts,
  {
    id: 'odf-wall-mount-12',
    title: 'Wall-Mount ODF 12 Ports',
    code: 'ODF-W12',
    description: 'Compact wall-mounted optical distribution frame with 12 ports, ideal for small office installations.',
    imageUrl: 'https://placehold.co/400x300?text=ODF-W12',
    category: 'odf',
  },
  {
    id: 'odf-rack-48',
    title: 'ODF Rack 48 Ports',
    code: 'ODF-R48',
    description: 'High-capacity 48-port optical distribution frame rack for large network installations.',
    imageUrl: 'https://placehold.co/400x300?text=ODF-R48',
    category: 'odf',
  },
  {
    id: 'fiber-cable-mm',
    title: 'Multi-Mode Fiber Cable',
    code: 'FC-MM-1000',
    description: 'Premium multi-mode fiber optic cable, 1000m roll, suitable for short-distance applications.',
    imageUrl: 'https://placehold.co/400x300?text=FC-MM-1000',
    category: 'fiber-cables',
  },
  {
    id: 'fiber-cable-armored',
    title: 'Armored Fiber Cable',
    code: 'FC-ARM-500',
    description: 'Heavy-duty armored fiber optic cable with enhanced protection for underground and outdoor applications.',
    imageUrl: 'https://placehold.co/400x300?text=FC-ARM-500',
    category: 'fiber-cables',
  },
  {
    id: 'fiber-connectors-sc',
    title: 'SC Fiber Connectors (10-pack)',
    code: 'CON-SC-10',
    description: 'Pack of 10 high-quality SC fiber optic connectors for reliable network connections.',
    imageUrl: 'https://placehold.co/400x300?text=CON-SC-10',
    category: 'accessories',
  },
  {
    id: 'fiber-connectors-lc',
    title: 'LC Fiber Connectors (10-pack)',
    code: 'CON-LC-10',
    description: 'Pack of 10 high-quality LC fiber optic connectors for reliable network connections.',
    imageUrl: 'https://placehold.co/400x300?text=CON-LC-10',
    category: 'accessories',
  },
  {
    id: 'fiber-power-meter',
    title: 'Fiber Optic Power Meter',
    code: 'TEST-PM-1',
    description: 'Handheld optical power meter for quick and accurate measurement of optical signal strength.',
    imageUrl: 'https://placehold.co/400x300?text=TEST-PM-1',
    category: 'testing-equipment',
  }
];

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero 
          title="Our Product Range"
          subtitle="High-quality fiber optic equipment for telecommunications infrastructure"
          imageUrl="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000"
        />
        
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Telecommunications and Fiber Optic Equipment</h2>
            <p className="text-lg text-gray-600">
              FiberTech Solutions offers a comprehensive range of high-quality fiber optic products for all your network infrastructure needs. Our product catalog includes optical distribution frames, fiber cables, connectors, and testing equipment from leading manufacturers.
            </p>
          </div>
          
          {/* Product Categories */}
          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center mb-8">
                <TabsTrigger 
                  value="all"
                  onClick={() => setActiveCategory('all')}
                  className="px-4 py-2 m-1"
                >
                  All Products
                </TabsTrigger>
                {productCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="px-4 py-2 m-1"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      code={product.code}
                      description={product.description}
                      imageUrl={product.imageUrl}
                    />
                  ))}
                </div>
              </TabsContent>
              
              {productCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        code={product.code}
                        description={product.description}
                        imageUrl={product.imageUrl}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Download Catalog Section */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-telecom-blue mb-4">Need More Details?</h3>
            <p className="text-gray-700 mb-6">
              Download our complete product catalog for detailed specifications, pricing information, and more.
            </p>
            <button className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-6 py-3 rounded-md transition-colors">
              Download Product Catalog (PDF)
            </button>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
