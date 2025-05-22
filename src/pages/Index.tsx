
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
  // Carousel images for the hero section
  const heroImages = [
    "https://images.unsplash.com/photo-1586772002345-339f8042a777?q=80&w=1000",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main Banner with Carousel */}
      <main className="flex-grow pt-16">
        <Hero 
          title="Advanced Fiber Optic Solutions for Modern Telecommunications"
          subtitle="High-quality products and professional services for all your network infrastructure needs"
          imageUrl="https://images.unsplash.com/photo-1586772002345-339f8042a777?q=80&w=1000"
          ctaText="Explore Our Products"
          ctaLink="/products"
          carouselImages={heroImages}
        />
        
        {/* Brief Introduction */}
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4 transition-transform duration-300 hover:scale-105">Welcome to FiberTech Solutions</h2>
            <p className="text-lg text-gray-600 mb-6 transition-all duration-300 hover:text-telecom-blue">
              FiberTech Solutions is a leading provider of telecommunications and fiber optic equipment. 
              With over 15 years of experience, we offer high-quality products, professional installation 
              services, and reliable technical support to businesses and telecommunications providers across Asia.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white transition-all duration-300 hover:scale-105">
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
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white transition-all duration-300 hover:scale-105">
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
              <Button variant="outline" className="border-telecom-blue text-telecom-blue hover:bg-telecom-blue hover:text-white transition-all duration-300 hover:scale-105">
                Read More News
              </Button>
            </Link>
          </div>
        </Section>
        
        {/* Partners & Clients */}
        <Section title="Our Partners">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-4 shadow-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-110">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  className="h-16 object-contain transition-opacity duration-300 hover:opacity-90"
                />
              </div>
            ))}
          </div>
        </Section>
        
        {/* Quick Contact Form */}
        <Section title="Get In Touch" bgColor="light-gray">
          <div className="max-w-md mx-auto">
            <p className="text-center mb-6 text-gray-600 transition-all duration-300 hover:text-telecom-blue">
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
