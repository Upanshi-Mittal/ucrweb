import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/about' },
    { name: 'Project', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Knowledge Hub', path: '/knowledge-hub' },
   // { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         <div
  className="flex items-center space-x-2 cursor-pointer"
  onClick={() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }}
>
  <Logo />
<div className="flex flex-col leading-tight sm:leading-snug">
  <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-violet-400 to-electric-400 bg-clip-text text-transparent">
    Microcontroller-Based Systems
  </span>
  <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-violet-400 to-electric-400 bg-clip-text text-transparent">
    & Robotics Hub
  </span>
</div>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-violet-400 bg-violet-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
<div className="md:hidden">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>
</div>
</div>

{isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="md:hidden bg-gray-900/95 backdrop-blur-lg"
  >
    <div className="px-3 pt-2 pb-2 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            location.pathname === item.path
              ? 'text-violet-400 bg-violet-400/10'
              : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </motion.div>
)}
    </motion.nav>
  );  
};

export default Navbar;