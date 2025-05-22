
import React from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero 
          title="About FiberTech Solutions"
          subtitle="Leading provider of fiber optic equipment and telecommunications solutions in Asia"
          imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000"
        />
        
        {/* Company History */}
        <Section title="Our Story" bgColor="light-gray">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                Founded in 2008, FiberTech Solutions began as a small supplier of fiber optic components in Hanoi, Vietnam. Through our commitment to quality and customer satisfaction, we quickly grew to become one of the leading providers of telecommunications equipment in Southeast Asia.
              </p>
              <p className="text-gray-700 mb-4">
                With over 15 years of experience in the industry, we have established strong partnerships with manufacturers and suppliers worldwide to ensure we offer our customers the best products at competitive prices.
              </p>
              <p className="text-gray-700">
                Today, FiberTech Solutions serves customers across Asia, providing not only quality products but also comprehensive services including installation, maintenance, and technical consultation.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000" 
                alt="FiberTech team meeting" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </Section>
        
        {/* Mission and Vision */}
        <Section title="Mission & Vision">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-telecom-blue">
              <h3 className="text-2xl font-bold text-telecom-blue mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide high-quality telecommunications and fiber optic equipment along with superior technical services that enable our customers to build reliable and efficient network infrastructure. We are committed to delivering innovative solutions that meet the evolving needs of the telecommunications industry while maintaining the highest standards of customer satisfaction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-telecom-light-blue">
              <h3 className="text-2xl font-bold text-telecom-blue mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading provider of telecommunications and fiber optic solutions in Asia, recognized for our technical expertise, product quality, and exceptional customer service. We aim to contribute to the development of advanced telecommunications infrastructure that connects people and businesses across the region.
              </p>
            </div>
          </div>
        </Section>
        
        {/* Our Team */}
        <Section title="Our Team" bgColor="light-gray">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nguyen Van Minh",
                position: "CEO & Founder",
                photo: "https://placehold.co/300x300?text=NVM"
              },
              {
                name: "Tran Thi Huong",
                position: "Technical Director",
                photo: "https://placehold.co/300x300?text=TTH"
              },
              {
                name: "Le Quang Duc",
                position: "Sales Manager",
                photo: "https://placehold.co/300x300?text=LQD"
              },
              {
                name: "Pham Thanh Hoa",
                position: "Operations Manager",
                photo: "https://placehold.co/300x300?text=PTH"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-telecom-blue"
                />
                <h3 className="text-xl font-bold text-telecom-blue">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </Section>
        
        {/* Our Facilities */}
        <Section title="Our Facilities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000" 
                alt="FiberTech office" 
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <h3 className="text-xl font-bold text-telecom-blue mb-2">Modern Office</h3>
              <p className="text-gray-700">
                Our headquarters features modern facilities designed to foster collaboration and innovation. With dedicated spaces for product demonstrations and customer meetings, we provide a professional environment for discussing and planning telecommunications projects.
              </p>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000" 
                alt="FiberTech warehouse" 
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <h3 className="text-xl font-bold text-telecom-blue mb-2">Warehouse & Distribution</h3>
              <p className="text-gray-700">
                Our state-of-the-art warehouse ensures efficient inventory management and quick order processing. With strategic locations in key markets, we maintain extensive stock of fiber optic equipment and components for prompt delivery to our customers throughout the region.
              </p>
            </div>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
