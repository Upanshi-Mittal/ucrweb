import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, BookOpen, FileText, Video, Code, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SmartImg from '../components/SmartImg';
import sensors from "../assets/resource/Sensors.pdf"; 
import diodes from "../assets/resource/diodes.pdf";
import bcr from "../assets/resource/BluetoothControlledRobot.pdf";
import hgr from "../assets/resource/HandGestureRobot.pdf";
import drone from "../assets/resource/IntroductionToDrones.pdf";
import oar from "../assets/resource/ObstacleAvoidingRobot.pdf";
import vcr from "../assets/resource/VoiceControlledRobot.pdf";
import ad from "../assets/resource/arduino_download.pdf";
import intro from "../assets/resource/Arduino_intro.pdf";
import boa from "../assets/resource/Basics_of_Arduino.pdf";
import advance from "../assets/resource/Advance_Ardunio.pdf";
import basicEle from "../assets/resource/basic_electronics.pdf";
import motor from "../assets/resource/Motors.pdf";


const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const learningMaterials = [
    {
      id: 1,
      title: "Bluetooth Controlled Robot",
      type: "pdf",
      category: "robotics",
      description: "A beginner-friendly guide to building and programming a Bluetooth-controlled Arduino robot.",
      downloadUrl: bcr
    },
    {
      id: 2,
      title: "Diodes",
      type: "pdf", 
      category: "hardware",
      description: "A concise reference on diode behavior, types, and applications in PCB design.",
      downloadUrl: diodes
    },
    {
      id: 3,
      title: "Sensors",
      type: "pdf",
      category: "hardware",
      description: "An overview of essential sensors used in robotics with integration examples.",
      downloadUrl: sensors
    },
    {
      id: 4,
      title: "Hand Gesture Controlled Robot",
      type: "pdf",
      category: "robotics",
      description: "Learn to build a robot that responds to hand gestures using sensor input.",
      downloadUrl: hgr
    },
      {
      id: 5,
      title: "Introduction to Drones",
      type: "pdf",
      category: "robotics",
      description: "Foundational material on drone mechanics, control systems, and sensor usage.",
      downloadUrl: drone
    },
      {
      id: 6,
      title: "Obstacle Avoiding Robot",
      type: "pdf",
      category: "robotics",
      description: "A practical guide to designing robots that detect and avoid obstacles autonomously.",
      downloadUrl: oar
    },
      {
      id: 7,
      title: "Voice Controlled Robot",
      type: "pdf",
      category: "robotics",
      description: "Instructions to create a robot that moves based on voice command recognition.",
      downloadUrl: vcr
    },
    {
      id: 8,
      title: "How to Download Arduino IDE",
      type: "pdf",
      category: "programming",
      description: "Step-by-step guide to downloading and setting up the Arduino IDE for development.",
      downloadUrl: ad
    },
    {
      id: 9,
      title: "Introduction to Arduino",
      type: "pdf",
      category: "programming",
      description: "A beginner's introduction to Arduino boards, programming, and basic circuit interfacing.",
      downloadUrl: intro
    },
    {
      id: 10,
      title: "Basic Arduino Programming",
      type: "pdf",
      category: "programming",
      description: "An introductory guide to programming Arduino boards using basic code structures and logic.",
      downloadUrl: boa
    },
    {
      id: 11,
      title: "Advanced Arduino Programming",
      type: "pdf",
      category: "programming",
      description: "Covers advanced concepts in Arduino development including sensors, libraries, and complex logic.",
      downloadUrl: advance
    },
    {
      id: 12,
      title: "Basic Electronics",
      type: "pdf",
      category: "hardware",
      description: "Learn the fundamental concepts of voltage, current, resistance, and basic components like resistors and capacitors.",
      downloadUrl: basicEle
    },
    {
      id: 13,
      title: "Introduction to Motors",
      type: "pdf",
      category: "hardware",
      description: "Understand different types of motors and how to control them in robotic and electronic systems.",
      downloadUrl: motor
    }
  ];

  const techBlogs = [
     {
    id: 15,
    title: "Keypad Matrix Module Demystified: Smarter Input, Fewer Pins",
    authors: [
      { name: "Prisha Bhatia", insta: "https://www.instagram.com/prishabhatia_/" },
      { name: "Parth Singh", insta: "https://www.instagram.com/parth_singh723" }, 
    ],
    date: "2025-09-21",
    category: "Hardware",
  tags: ["Keypad", "Input", "Embedded"],
  excerpt: "A keypad matrix is a simple and efficient input device that reduces wiring by arranging keys in rows and columns, widely used in embedded systems and microcontroller projects.",
    readTime: "10 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaHNOWXRVHb99oZ5h3UNnB0hqYPY7m4aRlh-GESMYVcnJZKrHUizlI4w&s=10"
  },
    {
    id: 14,
    title: "Bluetooth Module: Cutting the Wires, Connecting the World",
    authors: [
      { name: "Isha Bhargava", insta: "https://www.instagram.com/ishaabhargava/" },
      { name: "Ragya Jain", insta: "/NotFound" }, 
    ],
    date: "2025-09-14",
    category: "Hardware",
    tags: ["Bluetooth", "Wireless Communication", "IoT"],
  excerpt: "Bluetooth modules have revolutionized the way devices connect by eliminating the need for wires. Learn how Bluetooth technology works, its protocols, versions, applications in IoT, and its role in enabling seamless wireless communication across the globe.",
    readTime: "8 min read",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20200524231402/hc051.jpg"
  },

    {
    id: 13,
    title: "Lithium-Ion Battery Demystified: Powering the Modern World",
    authors: [
      { name: "Vansh Singhal", insta: "https://www.instagram.com/vanshhh_singhal09/" },
    ],
    date: "2025-09-07",
    category: "Hardware",
    tags: ["Battery", "Energy Storage", "Lithium-Ion"],
    excerpt: "Lithium-ion batteries power everything from smartphones to electric vehicles. Explore how they work, their chemistry, charging cycles, safety considerations, and the future of battery technology in powering the modern world.",
    readTime: "10 min read",
    image: "https://isieindia.com/wp-content/uploads/2024/10/Li-Ion-Rechargeable-Battery.jpg"
  },
    {
    id: 12,
    title: "LCD Display Module: Giving Your Projects a Voice",
    authors: [
      { name: "Ipsita Jain", insta: "https://www.instagram.com/me_pistaa/" },
    ],
    date: "2025-08-31",
    category: "Hardware",
  tags: ["LCD", "Displays", "I2C"],
    excerpt: "Character LCDs like the 16×2 and 20×4 make it easy to show sensor values, menus, and status messages. Learn pinouts, 4-bit wiring vs I²C backpacks, common libraries, and tips for contrast, backlight, and custom characters.",
    readTime: "8 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIYRdiml4wN9PcIyroULUTzaNot6o-rHQYdml3HxK2NhpQ0W3ghyZ8bNg&s=10"
  },
  {
    id: 11,
    title: "Brushed DC Motor Demystified: Reliable Power in Motion",
    authors: [
      { name: "Aadya Mudgal", insta: "https://www.instagram.com/aady4core/" },
      { name: "Shambhavi Sharma", insta: "https://www.instagram.com/sshhambhavii/" }
    ],
    date: "2025-08-24",
    category: "Hardware",
    tags: ["DC Motor", "Motion Control", "Robotics"],
    excerpt: "Brushed DC motors provide straightforward speed and torque control, making them ideal for robotics, automation, and low-cost motion systems.",
    readTime: "6 min read",
    image: "https://assunmotor.com/blog/wp-content/uploads/round_brushless_dc_motor-sideview.jpeg"
  },
  {
    id: 10,
    title: "Ultrasonic Sensors Demystified: Precision in Motion Detection",
    authors: [
      { name: "Sarthak Tripathi", insta: "https://www.instagram.com/_quarky/" }
    ],
    date: "2025-08-17",
    category: "Sensors",
    tags: ["Ultrasonic Sensor", "Distance", "IoT"],
    excerpt: "An ultrasonic sensor measures distance using sound waves, enabling precise obstacle detection and ranging in robotics, IoT devices, and automation systems.",
    readTime: "7 min read",
    image: "https://cdn.mos.cms.futurecdn.net/YSNQkvg6L6rcYC7vAQZLLa.jpg"
  },
  {
    id: 9,
    title: "ESP32: The Powerhouse of IoT and Embedded Innovation",
    authors: [
      { name: "Vedant Singh", insta: "https://www.instagram.com/_.vedant._77/" },
      { name: "Utkarsh Gupta", insta: "" }
    ],
    date: "2025-08-10",
    category: "Hardware",
    tags: ["ESP32", "IoT", "Wi-Fi", "Bluetooth"],
    excerpt: "The ESP32 microcontroller packs Wi-Fi, Bluetooth, and dual-core processing into a compact form, making it the go-to choice for IoT, automation, and embedded system projects.",
    readTime: "10 min read",
    image: "https://home-assistant-guide.com/wp-content/uploads/2021/08/esp32-thumbnail.png"
  },
  {
    id: 8,
    title: "Micro SD Card Modules: The Tiny Genius behind Big Data Storage",
    authors: [
      { name: "Bristi Bisai", insta: "https://www.instagram.com/ughbristiiiii/" },
      { name: "Amisha Mittal", insta: "https://www.instagram.com/amisha_m01/" }
    ],
    date: "2025-08-03",
    category: "Hardware",
    tags: ["Arduino", "Data Logging", "Sensors"],
    excerpt: "Micro SD card modules pack massive storage into a tiny form, enabling efficient data logging, storage, and transfer for electronics, IoT, and embedded projects.",
    readTime: "8 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkb5kh2ezV9r5ClWcXcDwezaJROQOHMmYkzhbvmYd2kw&s=10"
  },
  {
    id: 7,
    title: "DPDT Switch Demystified: Wired Control, Twice the Power",
    authors: [
      { name: "Ayush Agrawal", insta: "https://www.instagram.com/ayushagrawal1839/" }
    ],
    date: "2025-07-27",
    category: "Hardware",
    tags: ["DPDT Switch", "Motor Reversal", "H-Bridge"],
    excerpt: "Demystify DPDT switches, essential components for controlling two independent circuits. Learn their working principles, types, practical applications in robotics and motor control",
    readTime: "10 min read",
    image: "https://cdn.sparkfun.com/assets/6/e/d/9/0/517edbabce395fd51d000000.png"
  },
  {
    id: 6,
    title: "NRF Modules: Tiny Radios for Big Wireless Projects",
    authors: [
      { name: "Annanya Priyadarshini", insta: "https://www.instagram.com/annanya_ps" },
      { name: "Kamna Thakur", insta: "https://www.instagram.com/kamnaaa_22/" }
    ],
    date: "2025-07-20",
    category: "Communication",
    tags: ["Wireless", "NRF24L01", "IoT", "Robotics"],
    excerpt: "Explore NRF modules, from the popular NRF24L01 to BLE-enabled NRF52 chips — learn how they work, how to use them in Arduino and IoT projects, and how to get the best performance.",
    readTime: "8 min read",
    image: "https://www.rcpano.net/wp-content/uploads/2024/02/Arduino-NRF24L01-Remote-Control-Connection-Problem-Why-do-not-work-RC.jpg"
  },
  {
    id: 5,
    title: "LiPo Batteries: Tiny Cells, Massive Power",
    authors: [
      { name: "Rishabh Kapur", insta: "https://www.instagram.com/rishabh.kapur/" }
    ],
    date: "2025-07-13",
    category: "Hardware",
    tags: ["Electronics", "Power", "Batteries", "LiPo"],
    excerpt: "Discover the fundamentals of Lithium Polymer (LiPo) batteries, their advantages for portable electronics and RC projects, and essential safety tips for charging and handling.",
    readTime: "7 min read",
    image: "https://robosynckits.in/wp-content/uploads/2021/06/or.png"
  },
  {
    id: 4,
    title: "7-Segment Displays: Illuminating Numbers with Ease",
    authors: [
      { name: "Shivansh Agarwal", insta: "https://www.instagram.com/_shivansh.agarwal_/" }
    ],
    date: "2025-07-06",
    category: "Hardware",
    tags: ["Electronics", "Displays", "7-Segment"],
    excerpt: "Learn how 7-segment displays work to show numbers and characters, and explore practical wiring techniques to integrate them with microcontrollers.",
    readTime: "8 min read",
    image: "https://external-preview.redd.it/i-made-a-7-segment-display-module-that-allows-you-to-add-v0-Oys86qV1ClNmLsjpou8ZTD6HjmEaP4uvWuQW91HofFo.jpg?auto=webp&s=99075413144134b559de67677d5db5c9f5482034"
  },
  {
    id: 3,
    title: "Servo Motors: A Beginner's Guide",
    authors: [
      { name: "Bhavyanshika Gupta", insta: "https://www.instagram.com/_bhavyanshikagupta_9453/" },
      { name: "Maanya Gupta", insta: "https://www.instagram.com/maanya.g14/" }
    ],
    date: "2025-06-29",
    category: "Hardware",
    tags: ["Electronics", "Servo Motors"],
    excerpt: "Discover how servo motors enable precise motion control in robotics and automation, and how to connect them with your microcontroller.",
    readTime: "12 min read",
    image: "https://roboman.in/wp-content/uploads/2022/09/109.jpg"
  },
  {
    id: 2,
    title: "Infrared Sensors in Robotics",
    authors: [
      { name: "Kushal Makkar", insta: "https://www.instagram.com/kushal_m_06/" },
      { name: "Vanshika Aggarwal", insta: "https://www.instagram.com/vanshika_7605/" }
    ],
    date: "2025-06-22",
    category: "Sensors",
    tags: ["Arduino", "Electronics", "Infrared Sensors"],
    excerpt: "Discover how IR sensors enable object detection and line following in robots, and how to connect them with Arduino.",
    readTime: "10 min read",
    image: "https://srituhobby.com/wp-content/uploads/2021/04/1-36.jpg"
  },
  {
    id: 1,
    title: "Working with Arduino",
    authors: [
      { name: "Sanskar Phougat", insta: "https://www.instagram.com/sanskar__phougat/" }
    ],
    date: "2025-06-15",
    category: "Robotics",
    tags: ["Arduino", "Sensor", "Autonomous Navigation"],
    excerpt: "Learn about Ardunio programming and its applications in robotics. This tutorial covers the basics of Arduino, sensor integration, and building autonomous robots.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D"
  }


  
    // {
    //   id: 2,
    //   title: "Introduction to ROS (Robot Operating System)",
    //   author: "Sneha Gupta", 
    //   date: "2024-01-22",
    //   category: "Software",
    //   tags: ["ROS", "Linux", "Robot Programming"],
    //   excerpt: "Discover the power of ROS for robotics development. This beginner-friendly tutorial introduces you to ROS concepts, node communication, and building your first robotic application.",
    //   readTime: "12 min read",
    //   image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg"
    // }
];
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'iot', name: 'IoT' }
  ];

  const filteredMaterials = learningMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredBlogs = techBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

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
              μCR Knowledge Hub
            </h1>
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-neutral-700">
              Explore open-source engineering schematics, microcontroller tutorials, and deep-dive technical articles written by student roboticists and mentors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 border-y-2 border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search microcontrollers, sensors, schematics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm shadow-[2px_2px_0_black] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all placeholder:text-neutral-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black font-bold text-base"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-black ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-[3px_3px_0_black]'
                        : 'bg-white text-black shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Materials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center shadow-[2px_2px_0_black]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Learning Materials</h2>
            </div>
            <p className="text-base sm:text-lg text-neutral-700">
              Download step-by-step PDF schematics, pinout guides, and lab tutorials curated for hands-on robotics development.
            </p>
          </motion.div>

          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl border-2 border-black bg-[#fffdf7] shadow-[6px_6px_0_black] max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-2 text-black">No material found</h3>
              <p className="text-sm text-neutral-600 mb-4">Try selecting a different category or clearing the search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 rounded-xl border-2 border-black bg-blue-500 text-white font-bold text-sm shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group rounded-2xl border-2 border-black transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md p-6"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_black] bg-white">
                        {material.type === 'pdf' ? (
                          <FileText className="w-6 h-6 text-red-500" />
                        ) : material.type === 'video' ? (
                          <Video className="w-6 h-6 text-blue-500" />
                        ) : (
                          <Code className="w-6 h-6 text-emerald-500" />
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-black capitalize ${
                          material.category === 'programming'
                            ? 'bg-blue-100 text-blue-800'
                            : material.category === 'hardware'
                            ? 'bg-red-100 text-red-800'
                            : material.category === 'robotics'
                            ? 'bg-yellow-200 text-yellow-900'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {material.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                      {material.title}
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                      {material.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      {material.type.toUpperCase()} GUIDE
                    </span>
                    <a
                      href={material.downloadUrl}
                      download
                      className="px-4 py-2 border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Blogs */}
      <section className="py-16 border-t-2 border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center shadow-[2px_2px_0_black]">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Tech Blogs</h2>
            </div>
            <p className="text-base sm:text-lg text-neutral-700">
              Technical deep-dives, circuit breakdowns, and component explorations penned by μCR engineers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group rounded-2xl border-2 border-black transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md"
              >
                <div className="aspect-video relative overflow-hidden border-b-2 border-black bg-neutral-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-yellow-400 text-black border-2 border-black text-xs font-bold rounded-full shadow-[2px_2px_0_black]">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{new Date(blog.date).toLocaleDateString("en-GB")}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded border border-black/15 bg-white text-neutral-700">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white border border-black/20 text-neutral-800 text-xs font-medium rounded-lg"
                        >
                          <Tag className="w-3 h-3 text-neutral-500" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t-2 border-black/10 text-xs">
                      <div className="text-neutral-700 font-medium">
                        By{" "}
                        {blog.authors.map((author, aIdx) => (
                          <span key={aIdx}>
                            <a
                              href={author.insta}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 font-bold hover:underline"
                            >
                              {author.name}
                            </a>
                            {aIdx < blog.authors.length - 2 && ", "}
                            {aIdx === blog.authors.length - 2 && " & "}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/blog/${blog.id}`}
                        className="inline-flex items-center space-x-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowledgeHub;