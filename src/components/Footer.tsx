
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-telecom-dark-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FiberTech Solutions</h3>
            <p className="text-sm mb-4">
              Leading provider of telecommunications and fiber optic equipment solutions. Quality products, expert installation, and reliable maintenance.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="text-white hover:text-telecom-light-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-telecom-light-blue transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-telecom-light-blue transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products#odf" className="text-gray-300 hover:text-white transition-colors">ODF Solutions</Link></li>
              <li><Link to="/products#fiber-cables" className="text-gray-300 hover:text-white transition-colors">Fiber Cables</Link></li>
              <li><Link to="/products#accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/products#testing-equipment" className="text-gray-300 hover:text-white transition-colors">Testing Equipment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Telecom Street, Hanoi, Vietnam</span>
              </p>
              <p className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+84 123 456 789</span>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>info@fibertechsolutions.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center md:text-left md:flex md:justify-between">
          <p>© 2023 FiberTech Solutions. All rights reserved.</p>
          <div className="mt-2 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white mr-4">Privacy Policy</Link>
            <Link to="/terms-of-use" className="text-gray-300 hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
