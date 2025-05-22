
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgColor?: 'white' | 'light-gray';
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  children, 
  className,
  id,
  bgColor = 'white'
}) => {
  return (
    <section 
      id={id}
      className={cn(
        'py-16',
        bgColor === 'light-gray' ? 'bg-telecom-light-gray' : 'bg-white',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;
