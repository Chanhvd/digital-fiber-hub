
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Mock data for the website
export const featuredProducts = [
  {
    id: 'odf-rack-24',
    title: 'ODF Rack 24 Ports',
    code: 'ODF-R24',
    description: 'High-quality 24-port optical distribution frame rack, perfect for medium-sized network installations.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000',
    category: 'odf',
  },
  {
    id: 'fiber-cable-sm',
    title: 'Single-Mode Fiber Cable',
    code: 'FC-SM-1000',
    description: 'Premium single-mode fiber optic cable, 1000m roll, suitable for long-distance transmission.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000',
    category: 'fiber-cables',
  },
  {
    id: 'fiber-splice-kit',
    title: 'Fiber Splicing Kit',
    code: 'FSK-PRO',
    description: 'Complete professional fiber splicing kit with all necessary tools and components for field installations.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000',
    category: 'accessories',
  },
  {
    id: 'otdr-tester',
    title: 'OTDR Fiber Tester',
    code: 'OTDR-T2000',
    description: 'Advanced Optical Time Domain Reflectometer for precise testing and troubleshooting of fiber optic networks.',
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000',
    category: 'testing-equipment',
  },
];

export const latestNews = [
  {
    id: 'new-product-line-2023',
    title: 'New Product Line Launched for 2023',
    excerpt: 'FiberTech Solutions introduces next-generation fiber optic equipment with enhanced performance and reliability.',
    content: 'FiberTech Solutions is proud to announce our new line of fiber optic equipment for 2023. These products feature cutting-edge technology, improved durability, and enhanced performance metrics across the board. Our engineering team has worked tirelessly to ensure these products meet the demands of modern telecommunications networks while maintaining competitive pricing.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000',
    date: '2023-10-15',
  },
  {
    id: 'expansion-southeast-asia',
    title: 'FiberTech Expands Operations in Southeast Asia',
    excerpt: 'New regional office opens in Singapore to better serve growing customer base in Southeast Asian markets.',
    content: 'As part of our strategic growth plan, FiberTech Solutions has opened a new regional headquarters in Singapore. This expansion allows us to better serve our growing customer base throughout Southeast Asia with faster delivery times, local technical support, and tailored solutions for regional requirements. The new office includes a state-of-the-art demonstration lab where customers can experience our products firsthand.',
    imageUrl: 'https://images.unsplash.com/photo-1505081598304-3bee85f930d4?q=80&w=1000',
    date: '2023-09-28',
  },
  {
    id: 'certification-iso9001',
    title: 'FiberTech Achieves ISO 9001:2015 Certification',
    excerpt: 'Company recognized for meeting international standards in quality management systems.',
    content: 'We are pleased to announce that FiberTech Solutions has successfully achieved ISO 9001:2015 certification for our quality management systems. This certification demonstrates our commitment to providing products and services that consistently meet customer and regulatory requirements. The rigorous certification process examined our operations, manufacturing processes, and quality control procedures.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000',
    date: '2023-08-12',
  },
];

export const partners = [
  { name: 'Telco Systems', logoUrl: 'https://placehold.co/200x80?text=Telco+Systems' },
  { name: 'NetworkPro', logoUrl: 'https://placehold.co/200x80?text=NetworkPro' },
  { name: 'FiberLink', logoUrl: 'https://placehold.co/200x80?text=FiberLink' },
  { name: 'OptiCore', logoUrl: 'https://placehold.co/200x80?text=OptiCore' },
  { name: 'CommTech', logoUrl: 'https://placehold.co/200x80?text=CommTech' },
];

export const services = [
  {
    id: 'fiber-installation',
    title: 'Fiber Optic Installation',
    description: 'Professional installation of fiber optic networks for businesses and telecommunications providers.',
    content: 'Our experienced technicians handle complete fiber optic network installations, from planning and design to implementation and testing. We ensure minimal disruption to your operations while providing a reliable, high-performance network infrastructure.',
    imageUrl: 'https://images.unsplash.com/photo-1586772002345-339f8042a777?q=80&w=1000',
    icon: 'https://placehold.co/80x80?text=Install',
  },
  {
    id: 'network-maintenance',
    title: 'Network Maintenance',
    description: 'Regular maintenance and emergency repair services to keep your network running smoothly.',
    content: 'Our comprehensive maintenance services include scheduled preventative maintenance, emergency repairs, and performance optimization. Our service level agreements guarantee rapid response times to minimize downtime and keep your critical communications infrastructure operational.',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000',
    icon: 'https://placehold.co/80x80?text=Maintain',
  },
  {
    id: 'technical-consultation',
    title: 'Technical Consultation',
    description: 'Expert advice on network design, equipment selection, and optimization strategies.',
    content: 'Our team of certified engineers provides technical consultation services to help you design efficient network architectures, select appropriate equipment, and implement best practices for your telecommunications infrastructure. We analyze your requirements and constraints to develop custom solutions that meet your specific needs.',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000',
    icon: 'https://placehold.co/80x80?text=Consult',
  },
];

export const productCategories = [
  {
    id: 'odf',
    name: 'ODF Solutions',
    description: 'Optical Distribution Frames for efficient fiber management',
  },
  {
    id: 'fiber-cables',
    name: 'Fiber Cables',
    description: 'High-quality fiber optic cables for various applications',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential components and tools for fiber optic networks',
  },
  {
    id: 'testing-equipment',
    name: 'Testing Equipment',
    description: 'Professional tools for testing and maintaining fiber optics',
  },
];
