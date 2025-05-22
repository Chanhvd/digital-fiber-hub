
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  imageUrl,
  ctaText = "Learn More",
  ctaLink = "/about"
}) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-telecom-dark-blue bg-opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl">
            {subtitle}
          </p>
        )}
        <Link to={ctaLink}>
          <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-6 py-2 rounded-md transition-colors">
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
