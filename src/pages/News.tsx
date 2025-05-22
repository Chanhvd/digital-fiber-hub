
import React from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import NewsCard from '@/components/NewsCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { latestNews } from '@/lib/utils';

// Expanded news list for the news page
const allNews = [
  ...latestNews,
  {
    id: 'annual-telecom-conference',
    title: 'FiberTech Presents at Annual Telecom Conference',
    excerpt: 'Our technical team presented latest innovations in fiber optic technology at the Asia Telecom Conference 2023.',
    content: 'FiberTech Solutions was proud to participate in the Asia Telecom Conference 2023, where our technical team presented our latest innovations in fiber optic technology. The presentation focused on advancements in long-distance transmission and improved durability for outdoor installations. The conference was attended by industry leaders and provided an excellent opportunity to showcase our expertise and connect with potential partners.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000',
    date: '2023-07-05',
  },
  {
    id: 'training-program-launch',
    title: 'New Training Program for Fiber Optic Installation',
    excerpt: 'FiberTech launches comprehensive training program for technicians specializing in fiber optic installation.',
    content: 'In response to growing demand for skilled fiber optic technicians, FiberTech Solutions has launched a comprehensive training program. The program covers all aspects of fiber optic installation, from basic principles to advanced troubleshooting techniques. Participants will receive both theoretical knowledge and hands-on experience with industry-standard equipment. Upon completion, technicians will receive certification recognized throughout the industry.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000',
    date: '2023-06-18',
  },
  {
    id: 'rural-connectivity-project',
    title: 'FiberTech Completes Rural Connectivity Project',
    excerpt: 'Major project brings high-speed fiber internet to previously underserved rural communities.',
    content: 'FiberTech Solutions has successfully completed a major infrastructure project bringing high-speed fiber internet to previously underserved rural communities in central Vietnam. The project, which took six months to complete, involved installing over 200 kilometers of fiber optic cable and connecting more than 15 villages to the high-speed network. This initiative will significantly improve educational and economic opportunities for thousands of residents.',
    imageUrl: 'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=1000',
    date: '2023-05-22',
  }
];

const News: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero 
          title="News & Updates"
          subtitle="Stay updated with the latest news, events, and announcements from FiberTech Solutions"
          imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"
        />
        
        <Section bgColor="light-gray">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Latest News & Announcements</h2>
            <p className="text-lg text-gray-600">
              Keep up with company developments, industry trends, product launches, and major projects at FiberTech Solutions.
            </p>
          </div>
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((news) => (
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
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav aria-label="Pagination">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                    Previous
                  </a>
                </li>
                <li>
                  <a href="#" aria-current="page" className="px-3 py-2 text-white bg-telecom-blue border border-telecom-blue hover:bg-telecom-light-blue">
                    1
                  </a>
                </li>
                <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    2
                  </a>
                </li>
                <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Section>
        
        {/* Newsletter Subscription */}
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-telecom-blue mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-gray-600 mb-6">
              Stay updated with our latest news, product launches, and industry insights.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-telecom-blue"
                required
              />
              <button 
                type="submit"
                className="bg-telecom-blue hover:bg-telecom-light-blue text-white px-6 py-3 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to our privacy policy and consent to receive email updates from FiberTech Solutions.
            </p>
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
