
import React from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import NewsCard from '@/components/NewsCard';
import ContactForm from '@/components/ContactForm';
import { featuredProducts, latestNews, partners } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main Banner */}
      <main className="flex-grow pt-16">
        <Hero 
          title="Advanced Fiber Optic Solutions for Modern Telecommunications"
          subtitle="High-quality products and professional services for all your network infrastructure needs"
          imageUrl="https://images.unsplash.com/photo-1586772002345-339f8042a777?q=80&w=1000"
          ctaText="Explore Our Products"
          ctaLink="/products"
        />
        
        {/* Brief Introduction */}
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Welcome to FiberTech Solutions</h2>
            <p className="text-lg text-gray-600 mb-6">
              FiberTech Solutions is a leading provider of telecommunications and fiber optic equipment. 
              With over 15 years of experience, we offer high-quality products, professional installation 
              services, and reliable technical support to businesses and telecommunications providers across Asia.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </Section>
        
        {/* Featured Products */}
        <Section title="Featured Products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
          <div className="mt-10 text-center">
            <Link to="/products">
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </Section>
        
        {/* Latest News */}
        <Section title="Latest News" bgColor="light-gray">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard 
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                imageUrl={news.imageUrl}
                date={news.date}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/news">
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white">
                Read More News
              </Button>
            </Link>
          </div>
        </Section>
        
        {/* Partners & Clients */}
        <Section title="Our Partners">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-4 shadow-sm rounded-lg">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </Section>
        
        {/* Quick Contact Form */}
        <Section title="Get In Touch" bgColor="light-gray">
          <div className="max-w-md mx-auto">
            <p className="text-center mb-6 text-gray-600">
              Have questions about our products or services? Contact us and we'll get back to you shortly.
            </p>
            <ContactForm />
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
