// src/components/Logo.tsx
import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="relative w-12 h-12 rounded-xl p-1 bg-gradient-to-br from-violet-500 to-electric-500 shadow-lg"
    >
      {/* Static SVG Image */}
      <img src={logo} alt="μCR Logo" 
      />

      {/* Optional: Glow animation effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-electric-500 opacity-40 blur-lg rounded-xl animate-pulse-glow pointer-events-none"></div>
    </motion.div>
  );
};

export default Logo;
