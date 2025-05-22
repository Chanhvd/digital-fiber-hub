
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  carouselImages?: string[];
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  imageUrl,
  ctaText = "Learn More",
  ctaLink = "/about",
  carouselImages = []
}) => {
  // Use the provided imageUrl as the first image if no carousel images are provided
  const allImages = carouselImages.length > 0 
    ? carouselImages 
    : [imageUrl];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images if we have more than one
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image Carousel */}
      {allImages.length > 1 ? (
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {allImages.map((img, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                  style={{ 
                    backgroundImage: `url(${img})`,
                    opacity: index === currentImageIndex ? 1 : 0
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-telecom-dark-blue bg-opacity-70"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 z-20" />
          <CarouselNext className="right-4 z-20" />
        </Carousel>
      ) : (
        // Single image background (original behavior)
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-telecom-dark-blue bg-opacity-70"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl animate-fade-in transition-transform duration-300 hover:translate-x-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl animate-fade-in transition-all duration-300 hover:text-white hover:translate-x-1">
            {subtitle}
          </p>
        )}
        <Link to={ctaLink}>
          <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-6 py-2 rounded-md transition-all duration-300 hover:scale-105">
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
