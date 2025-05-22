
import React from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero 
          title="Professional Telecom Services"
          subtitle="Expert installation, maintenance, and consultation for your network infrastructure"
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000"
        />
        
        {/* Services Overview */}
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Our Service Offerings</h2>
            <p className="text-lg text-gray-600">
              FiberTech Solutions provides comprehensive services to support your telecommunications infrastructure. From initial planning and installation to ongoing maintenance and technical consultation, our team of experts ensures your network operates at peak performance.
            </p>
          </div>
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={service.icon} alt={service.title} className="w-12 h-12 mr-3" />
                    <h3 className="text-xl font-bold text-telecom-blue">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <Link to={`/services#${service.id}`} className="text-telecom-blue font-medium hover:text-telecom-light-blue">
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        
        {/* Detailed Service Descriptions */}
        {services.map((service, index) => (
          <Section 
            key={index} 
            id={service.id}
            bgColor={index % 2 === 0 ? 'white' : 'light-gray'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 0 ? 'order-2 md:order-1' : 'order-2'}>
                <h2 className="text-3xl font-bold text-telecom-blue mb-4">{service.title}</h2>
                <p className="text-lg text-gray-700 mb-6">{service.content}</p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Professional team with certified technicians',
                    'State-of-the-art equipment and tools',
                    'Adherence to industry standards and best practices',
                    'Comprehensive documentation and reporting',
                    'Follow-up support and quality assurance'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-telecom-light-blue mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="bg-telecom-blue hover:bg-telecom-light-blue text-white">
                    Request Service
                  </Button>
                </Link>
              </div>
              <div className={index % 2 === 0 ? 'order-1 md:order-2' : 'order-1'}>
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-72 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </Section>
        ))}
        
        {/* Service Process */}
        <Section title="Our Service Process" bgColor="light-gray">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Steps */}
              {[
                {
                  step: 1,
                  title: 'Consultation',
                  description: 'We start with a detailed consultation to understand your requirements and objectives.'
                },
                {
                  step: 2,
                  title: 'Assessment',
                  description: 'Our experts conduct a thorough assessment of your existing infrastructure and needs.'
                },
                {
                  step: 3,
                  title: 'Planning',
                  description: 'We develop a comprehensive plan tailored to your specific requirements.'
                },
                {
                  step: 4,
                  title: 'Implementation',
                  description: 'Our certified technicians implement the solution with minimal disruption.'
                },
                {
                  step: 5,
                  title: 'Quality Assurance',
                  description: 'We perform rigorous testing to ensure everything works according to specifications.'
                },
                {
                  step: 6,
                  title: 'Ongoing Support',
                  description: 'We provide continuous support and maintenance to ensure optimal performance.'
                }
              ].map((step, index) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  <div className="mr-6 flex-shrink-0">
                    <div className="bg-telecom-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-telecom-blue mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
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

export default Services;
