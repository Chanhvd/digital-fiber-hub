
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  code?: string;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, code, description, imageUrl }) => {
  return (
    <Card className="overflow-hidden h-full transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold text-telecom-blue mb-1">{title}</h3>
        {code && <p className="text-sm text-telecom-gray mb-2">Code: {code}</p>}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/products/${id}`} className="w-full">
          <Button variant="outline" className="w-full text-telecom-blue border-telecom-blue hover:bg-telecom-blue hover:text-white">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
