
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, imageUrl, date }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{formatDate(date)}</span>
        </div>
        <h3 className="text-xl font-bold text-telecom-blue mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/news/${id}`} className="w-full">
          <Button variant="ghost" className="w-full text-telecom-blue hover:text-telecom-light-blue hover:bg-blue-50">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
