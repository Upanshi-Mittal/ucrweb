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
    { name: 'Gallery', path: '/gallery' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Knowledge Hub', path: '/knowledge' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 w-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto my-3 relative pointer-events-auto group">
        {/* Outer 3D dashed/striped background box - sized & aligned precisely with the navbar */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-black translate-x-2 translate-y-2 sm:translate-x-2.5 sm:translate-y-2.5 transition-transform duration-300 pointer-events-none"
          style={{
            backgroundColor: '#facc15',
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2.5px, transparent 0, transparent 9px)',
          }}
        />

        {/* Foreground Navbar Card */}
        <div className="relative z-10 rounded-2xl border-2 border-black bg-white px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-sm sm:text-lg font-bold text-black">
                  Microcontroller-Based Systems
                </span>
                <span className="text-sm sm:text-lg font-bold text-black">
                  & Robotics Hub
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1 lg:space-x-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-red-600 font-bold bg-red-50'
                        : 'text-black hover:text-yellow-600 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-black hover:bg-neutral-100 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden relative z-20 mt-2 bg-white rounded-2xl border-2 border-black p-3 shadow-xl"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-red-600 font-bold bg-red-50'
                      : 'text-black hover:bg-neutral-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;