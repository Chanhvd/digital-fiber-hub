import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'vn' : 'en');
  };
  return <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-telecom-blue">
            FiberTech<span className="text-telecom-light-blue">Solutions</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 my-[5px]">
          <Link to="/" className="text-gray-700 font-medium hover-link">Home</Link>
          <Link to="/about" className="text-gray-700 font-medium hover-link">About Us</Link>
          <Link to="/products" className="text-gray-700 font-medium hover-link">Products</Link>
          <Link to="/services" className="text-gray-700 font-medium hover-link">Services</Link>
          <Link to="/news" className="text-gray-700 font-medium hover-link">News</Link>
          <Link to="/contact" className="text-gray-700 font-medium hover-link">Contact</Link>
          
          {/* Language Selector */}
          <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-100" onClick={toggleLanguage}>
            {currentLang.toUpperCase()}
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <nav className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>About Us</Link>
            <Link to="/products" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>Products</Link>
            <Link to="/services" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>Services</Link>
            <Link to="/news" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>News</Link>
            <Link to="/contact" className="text-gray-700 font-medium hover:text-telecom-blue" onClick={toggleMenu}>Contact</Link>
            
            {/* Language Selector */}
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium w-fit hover:bg-gray-100" onClick={toggleLanguage}>
              {currentLang.toUpperCase()}
            </button>
          </div>
        </nav>}
    </header>;
};
export default Header;