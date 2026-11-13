import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { MapPin, Clock, Mail, } from 'lucide-react';
import Logo from './Logo';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
      <div className="flex items-start space-x-4">
  <div className="w-14 h-14 flex-shrink-0">
    <Link
  to="/"
  onClick={(e) => {
    if (location.pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  }}
  className="w-fit"
>
    <Logo />
    </Link>
  </div>
  <div className="flex flex-col max-w-md">
<Link
  to="/"
  onClick={(e) => {
    if (location.pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  }}
  className="w-fit"
>
      <span className="text-lg sm:text-xl font-bold">
      Microcontroller-Based Systems & Robotics Hub
    </span>
    </Link>
    <p className="text-sm mt-1 text-neutral-700">
      More than a hub — no less than a legacy.
    </p>
  </div>
</div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-black">Contact Info</h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="shrink-0 text-black" />
                <span>μCR SAC Room, Jaypee Institute of Information Technology, Sector 62, Noida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="shrink-0 text-black" />
                <span>Mon-Fri: 10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
<a href="mailto:ucr@ucrjiit.com" className="flex items-center space-x-2 hover:underline text-blue-600 font-medium">
  <Mail size={16} />
  <span>ucr@ucrjiit.com</span>
</a>
              </div>
             
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-black">Connect With Us</h3>
            <div className="text-sm text-neutral-700">
              <p>Join our community of robotics builders, firmware hackers, and creators driving hardware innovation forward.</p>
            </div>
            <div className="flex space-x-4">
              {[
                {
                  name: 'Instagram',
                  href: 'https://www.instagram.com/ucrjiit',
                  color: 'from-pink-500 to-purple-500',
                  icon: <FaInstagram className="text-white w-5 h-5" />
                },
                {
                  name: 'WhatsApp',
                  href: 'https://chat.whatsapp.com/LetzjBZc00eCMNzwRnyc5c',
                  color: 'from-green-400 to-green-600',
                  icon: <FaWhatsapp className="text-white w-5 h-5" />
                },
                {
                  name: 'LinkedIn',
                  href: 'http://www.linkedin.com/company/ucr-jiit',
                  color: 'from-blue-500 to-blue-600',
                  icon: <FaLinkedinIn className="text-white w-5 h-5" />
                },
                {
                  name: 'Facebook',
                  href: 'https://www.facebook.com/uCR.jiit',
                  color: 'from-blue-600 to-blue-800',
                  icon: <FaFacebookF className="text-white w-5 h-5" />
                },
                {
                  name: 'Discord',
                  href: 'https://discord.gg/Jp4Kje999B',
                  color: 'from-indigo-500 to-indigo-700',
                  icon: <FaDiscord className="text-white w-5 h-5" />
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 border-2 border-black bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 transition-all duration-200`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
        </div>

        <div className="mt-8 pt-8 border-t-2 border-black/10 text-center text-sm text-neutral-600 font-medium">
          <p>&copy; 2026 μCR - Microcontroller-Based Systems and Robotics Hub. All rights reserved.</p>
         <p>Developed by <a href="https://www.linkedin.com/in/anshulsingh27" target="_blank" rel="noopener noreferrer">🌼</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;