import React, { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
//import { addDoc, collection } from "firebase/firestore";
//import  db from "../firebase"; 

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isFirebaseConfigured = !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

    if (!isFirebaseConfigured) {
      console.warn("⚠️ Firebase is not configured. Simulating a mock submission for local development.");
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            subject: '',
            message: ''
          });
        }, 3000);
      }, 1000);
      return;
    }

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Firebase write timed out after 5 seconds. Please ensure your Firestore database is created in the Firebase console and your security rules allow public writes in Test Mode.")), 5000)
      );

      // Only save subject and message anonymously
      await Promise.race([
        addDoc(collection(db, "ucrMessages"), {
          subject: formData.subject,
          message: formData.message,
          submittedAt: new Date().toISOString()
        }),
        timeoutPromise
      ]);

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting anonymous feedback:", error);
      alert(error.message || "Failed to submit your message. Please check your network or try again.");
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ucrjiit',
      icon: FaInstagram,
      hoverClass: 'hover:bg-[#E1306C] hover:text-white',
    },
    {
      name: 'WhatsApp',
      href: 'https://chat.whatsapp.com/LetzjBZc00eCMNzwRnyc5c',
      icon: FaWhatsapp,
      hoverClass: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'LinkedIn',
      href: 'http://www.linkedin.com/company/ucr-jiit',
      icon: FaLinkedinIn,
      hoverClass: 'hover:bg-[#0077B5] hover:text-white',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/uCR.jiit',
      icon: FaFacebookF,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/Jp4Kje999B',
      icon: FaDiscord,
      hoverClass: 'hover:bg-[#5865F2] hover:text-white',
    },
  ];

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              Contact & Connect
            </h1>
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-neutral-700">
              Have questions about our robots, want to pitch a collaborative build, or looking to sponsor our team? Reach out to the μCR community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group rounded-2xl border-3 border-black transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md p-6 sm:p-8 space-y-8"
            >
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-yellow-400 text-black">
                  CONNECT WITH μCR
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-black mt-3 mb-2">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  Whether you're a student looking to get hands-on with microcontrollers, an organization proposing a technical workshop, or an industry partner seeking collaboration, our doors are always open.
                </p>
              </div>

              {/* Contact Details Cards */}
              <div className="space-y-5">
                {/* Location */}
                <div className="flex items-start space-x-4 p-4 rounded-xl border-2 border-black/10 bg-white/60">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-red-500 text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_black]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-black font-bold text-base mb-1">Location</h3>
                    <p className="text-sm text-neutral-700 leading-snug">
                      μCR SAC Room,<br />
                      Jaypee Institute of Information Technology,<br />
                      Sector 62, Noida
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 rounded-xl border-2 border-black/10 bg-white/60">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_black]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-black font-bold text-base mb-1">Email Inquiries</h3>
                    <p className="text-sm text-neutral-700">
                      <span className="font-semibold text-black">General: </span>
                      <a href="mailto:ucr@ucrjiit.com" className="text-blue-600 font-medium hover:underline">
                        ucr@ucrjiit.com
                      </a>
                    </p>
                    <p className="text-sm text-neutral-700">
                      <span className="font-semibold text-black">Projects: </span>
                      <a href="mailto:ucrjiit62@gmail.com" className="text-blue-600 font-medium hover:underline">
                        ucrjiit62@gmail.com
                      </a>
                    </p>
                    <p className="text-sm text-neutral-700">
                      <span className="font-semibold text-black">Events: </span>
                      <a href="mailto:ucrjiit2526@gmail.com" className="text-blue-600 font-medium hover:underline">
                        ucrjiit2526@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 p-4 rounded-xl border-2 border-black/10 bg-white/60">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_black]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-black font-bold text-base mb-1">Hub Hours</h3>
                    <p className="text-sm text-neutral-700 leading-snug">
                      Monday – Friday: 10:00 AM – 6:00 PM<br />
                      Active during college working hours & robotics workshops
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 border-t-2 border-black/10">
                <h3 className="text-black font-bold text-sm mb-3">
                  Follow & Connect On Socials
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-11 h-11 rounded-xl border-2 border-black bg-white text-black flex items-center justify-center shadow-[3px_3px_0_black] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#facc15] transition-all duration-200 ${social.hoverClass}`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact & Feedback Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group rounded-2xl border-3 border-black transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md p-6 sm:p-8"
            >
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b-2 border-black/10">
                <div className="w-11 h-11 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center shadow-[2px_2px_0_black]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black">Send Us Feedback</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Share suggestions, technical questions, or project collaboration ideas</p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-4 rounded-xl border-2 border-black bg-emerald-50 shadow-[4px_4px_0_black] space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500 text-white border-2 border-black rounded-2xl mx-auto flex items-center justify-center shadow-[3px_3px_0_black]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-black">Message Sent!</h4>
                  <p className="text-neutral-700 text-sm max-w-sm mx-auto">
                    Thank you for your valuable feedback. Our team has received your message.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-black font-bold text-sm mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                      placeholder="What's this about? (e.g. Project Inquiry, Workshop Suggestion)"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-bold text-sm mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black] resize-none"
                      placeholder="Tell us more about your feedback, project idea, or query..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-[4px_4px_0_black] hover:shadow-[4px_4px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;