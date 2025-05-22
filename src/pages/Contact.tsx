
import React from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero 
          title="Contact Us"
          subtitle="Get in touch with our team for inquiries, support, or partnership opportunities"
          imageUrl="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000"
        />
        
        <Section bgColor="light-gray">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-telecom-blue mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? Need technical support or want to discuss a project? Our team is ready to assist you. Contact us using the information below or fill out the form.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-telecom-blue rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-telecom-blue">Office Address</h3>
                    <p className="text-gray-600">
                      123 Telecom Street<br />
                      Hanoi, Vietnam 100000
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-telecom-blue rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-telecom-blue">Phone Numbers</h3>
                    <p className="text-gray-600">
                      Sales: +84 123 456 789<br />
                      Support: +84 123 456 790
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-telecom-blue rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-telecom-blue">Email Addresses</h3>
                    <p className="text-gray-600">
                      General Inquiries: info@fibertechsolutions.com<br />
                      Support: support@fibertechsolutions.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-telecom-blue rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-telecom-blue">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:30 PM<br />
                      Saturday: 8:00 AM - 12:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Google Maps Placeholder */}
              <div className="mt-8 h-64 bg-gray-300 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97785448771!2d105.80194413492285!3d21.02269873209833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1664107178532!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FiberTech Solutions Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-telecom-blue mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </Section>
        
        {/* Quick Links Section */}
        <Section title="Quick Links">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Request a Quote",
                description: "Get pricing information for our products and services tailored to your needs.",
                link: "/contact?query=quote"
              },
              {
                title: "Technical Support",
                description: "Need help with our products? Our technical team is ready to assist you.",
                link: "/contact?query=support"
              },
              {
                title: "Join Our Team",
                description: "Interested in career opportunities at FiberTech Solutions? Check our openings.",
                link: "/contact?query=careers"
              },
              {
                title: "Partnership Inquiry",
                description: "Interested in becoming a partner or distributor? Let's discuss collaboration.",
                link: "/contact?query=partnership"
              }
            ].map((item, index) => (
              <div key={index} className="bg-telecom-light-gray p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-telecom-blue mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a 
                  href={item.link} 
                  className="text-telecom-blue font-medium hover:text-telecom-light-blue"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
