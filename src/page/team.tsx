import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Mail, Filter } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ayush from '../assets/ayush.jpeg';
import bhavyanshika from '../assets/bhavyanshika.jpeg';
import hema from "../assets/hema.png";
import arjun from '../assets/arjun.jpeg';
import navyaa from '../assets/navyaa.jpeg'
import rakshit from '../assets/rakshit.jpeg'
import shivam from '../assets/shivam.jpeg'
import vedansh from '../assets/vedansh.jpg'
import upanshi from '../assets/upanshi.jpeg'
import vanshika from '../assets/vanshika.jpeg'
import amisha from '../assets/amisha.jpeg'
import priyanshu from '../assets/priyanshu.jpg'
import aadya from '../assets/aadya.jpeg'
import jahnavi from '../assets/jahnavi.jpeg'
import shreyansh from '../assets/shreyansh.png'
const Team = () => {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const facultyCoordinator = {
        id: 5,
        name: "Dr.Hema Nagaraja",
        role: "Faculty Coordinator",
        category: "faculty",
        branch: "Computer Science",
        image: hema,
        bio: "Experienced mentor and researcher in robotics and embedded systems, guiding innovative student projects in automation, smart systems, and sensor applications",
        //github: "https://github.com",
        //linkedin: "https://linkedin.com",
        // instagram: "https://instagram.com",
        email: "hema.n@jiit.ac.in"
    };
    const seniorAdvisors = [
        {
            id: 1,
            name: "Arjun Gupta",
            role: "Senior Advisor",
            category: "advisor",
            branch: "Computer Science Engineering",
            image: arjun,
            bio: "Excels in organizing, streamlining operations, and ensuring smooth execution with sharp strategy and leadership.",
            github: "https://github.com/arjun-1703",
            linkedin: "https://www.linkedin.com/in/arjun-gupta-74b726286",
            instagram: "https://www.instagram.com/arjunn._.04/",
            email: "arjgupta05@gmail.com"
        },
        {
            id: 2,
            name: "Bhavyanshika Gupta",
            role: "Senior Advisor",
            category: "advisor",
            branch: "Computer Science Engineering",
            image: bhavyanshika,
            bio: "Leads innovation with expertise, creativity, and passion, driving cutting-edge solutions and technical excellence.",
            github: "https://github.com/BhavyanshikaGupta",       //change
            linkedin: "https://www.linkedin.com/in/bhavyanshika-gupta-8888bb284",
            instagram: "https://www.instagram.com/_bhavyanshikagupta_9453/",
            email: "bhavyanshikagupta@gmail.com"
        },
        {
            id: 3,
            name: "Ayush Agrawal",
            role: "Senior Advisor",
            category: "advisor",
            branch: "Computer Science Engineering",
            image: ayush,
            bio: "Leads with innovation, technical expertise, and a passion for building efficient, future-ready solutions.",
            github: "https://github.com/agrawalayush29",
            linkedin: "http://www.linkedin.com/in/ayush-agrawal-1825582a0",
            instagram: "https://www.instagram.com/ayushagrawal1839/",
            email: "ayush.2601agrawal@gmail.com"
        },
    ];

    const teamMembers = [
        // Technical Team
        {
            id: 10,
            name: "Navyaa Jain",
            role: "Technical Head",
            category: "tech",
            branch: "Computer Science Engineering",
            image: navyaa,
            bio: "Leads innovation with expertise, creativity, and passion, driving cutting-edge solutions and technical excellence.",
            github: "https://github.com/navyaa9706",
            linkedin: "https://www.linkedin.com/in/navyaa-jain-04b882373",
            instagram: "https://www.instagram.com/09_navyaa/",
            email: "navyaa9706@gmail.com"
        },
        {
            id: 11,
            name: "Shivam Diwakar",
            role: "Technical Head",
            category: "tech",
            branch: "Computer Science Engineering",
            image: shivam,
            bio: "Fun loving more than technical. Makes imagination into bots with enthusiasm as a power fuel.",
            github: "https://github.com/shivamdiwaker1147-dot",
            linkedin: "https://www.linkedin.com/in/shivam-diwaker-10bb8b312",
            instagram: "https://www.instagram.com/shivamdiwaker_0609/",
            email: "shivamdiwaker1147@gmail.com"
        },
        {
            id: 13,
            name: "Vedansh Goel",
            role: "Technical Head",
            category: "tech",
            branch: "Electronics & Communication Engineering",
            image: vedansh,
            bio: "Strong Calm and Steady",
            github: "#",
            linkedin: "https://www.linkedin.com/in/vedansh-goel-21a37930b",
            instagram: "https://www.instagram.com/vedanshgoel12/",
            email: "vedanshgoel331@gmail.com"
        },
        {
            id: 14,
            name: "Upanshi Mittal",
            role: "Technical Head",
            category: "tech",
            branch: "Computer Science Engineering",
            image: upanshi,
            bio: "Leads with innovation, technical expertise, and a passion for building efficient, future-ready solutions.",
            github: "https://github.com/Upanshi-Mittal",
            linkedin: "https://www.linkedin.com/in/upanshi-mittal-498213320/",
            instagram: "https://www.instagram.com/shi.in_stxllar/",
            email: "upanshimittal7@gmail.com"
        },
        // Management Team
        {
            id: 16,
            name: "Jahnavi Singh",
            role: "Management Head",
            category: "management",
            branch: "Computer Science Engineering",
            image: jahnavi,
            bio: "Purpose. Creativity. Impact",
            github: "https://github.com/itsjahnavi09",
            linkedin: "www.linkedin.com/in/jahnavi-singh-2ba644326/",
            instagram: "https://www.instagram.com/jahnavi_singhhh/",
            email: "singhjahnavi711@gmail.com"
        },
        {
            id: 17,
            name: "Priyanshu Singh",
            role: "Management Head",
            category: "management",
            branch: "Computer Science Engineering",
            image: priyanshu,
            bio: "Creative instinct. Strategic mind.",
            github: "#",
            linkedin: "https://www.linkedin.com/in/priyanshu-singh-6a3588385/",
            instagram: "https://www.instagram.com/priynshu__singh/",
            email: "priyanshusingh3aug2005@gmail.com"
        },
        // Digital Team
        {
            id: 20,
            name: "Aadya Mudgal",
            role: "Digital Head",
            category: "digital",
            branch: "Computer Science Engineering",
            image: aadya,
            bio: "Made of Side Quests ",
            github: "#",
            linkedin: "https://www.linkedin.com/in/aadya-mudgal-62a31632a/",
            instagram: "https://www.instagram.com/aady4core/",
            email: "shouryamudgal14@gmail.com"
        },
        {
            id: 21,
            name: "Vanshika Gupta",
            role: "Cinematography Head",
            category: "cinematography",
            branch: "Electronics & Communication Engineering",
            image: vanshika,
            bio: "The goal is to experience.",
            github: "#",
            linkedin: "https://www.linkedin.com/in/vanshika-gupta-5313612ba/",
            instagram: "https://www.instagram.com/vanshika._vg/",
            email: "Vanshikagupta.nov04@gmail.com"
        },

        // Marketing Team
        {
            id: 22,
            name: "Shreyansh Rajat",
            role: "Marketing Head",
            category: "marketing",
            branch: "Computer Science Engineering",
            image: shreyansh,
            bio: "Cloud computing enthusiast, always looking for fun, distracted by everything ",
            github: "https://github.com/SRajat26",
            linkedin: "#",
            instagram: "https://www.instagram.com/shutup.shreyansh/",
            email: "shreyansh.rajat.26@gmail.com"
        },
        {
            id: 23,
            name: "Rakshit Goyal",
            role: "Marketing Head",
            category: "marketing",
            branch: "Electronics & Communication Engineering",
            image: rakshit,
            bio: "Exploring semiconductor design and building impactful engineering projects.",
            github: "https://github.com/rakshitx11",
            linkedin: "https://linkedin.com/in/rakshitgoyal11",
            instagram: "https://www.instagram.com/__rakshit_11",
            email: "rakshitgoel11052006@gmail.com"
        },
        // Creative Team
        {
            id: 24,
            name: "Amisha Mittal",
            role: "Creative Head",
            category: "creative",
            branch: "Computer Science Engineering",
            image: amisha,
            bio: "Passionate about technology and design, with a keen eye for detail and a constant drive to refine every idea.",
            github: "https://github.com/AmishaMittal01",
            linkedin: "https://www.linkedin.com/in/01-amisha-mittal/",
            instagram: "https://www.instagram.com/amisha_m01/",
            email: "mittalamisha2005@gmail.com"
        },
    ];
    console.log(hema);
    const filters = [
        { id: 'all', name: 'All Members', count: teamMembers.length },
        { id: 'tech', name: 'Technical', count: teamMembers.filter(m => m.category === 'tech').length },
        { id: 'management', name: 'Management', count: teamMembers.filter(m => m.category === 'management').length },
        { id: 'marketing', name: 'Marketing', count: teamMembers.filter(m => m.category === 'marketing').length },
        { id: 'digital', name: 'Digital', count: teamMembers.filter(m => m.category === 'digital').length },
        { id: 'cinematography', name: 'Cinematography', count: teamMembers.filter(m => m.category === 'cinematography').length },
        { id: 'creative', name: 'Creative', count: teamMembers.filter(m => m.category === 'creative').length },
    ];

    const filteredMembers = filter === 'all'
        ? teamMembers
        : teamMembers.filter(member => member.category === filter);

    type Member = {
        name: string;
        image: string;
        github?: string;
        linkedin?: string;
        instagram?: string;
        email?: string;
        role: string;
        branch?: string;
        bio: string;
        category:
        | 'faculty'
        | 'advisor'
        | 'tech'
        | 'management'
        | 'marketing'
        | 'digital'
        | 'cinematography'
        | string; // optional fallback
    };


    type MemberCardProps = {
        member: Member;
        index?: number;
    };


    const MemberCard = ({ member, index = 0 }: MemberCardProps) => (<motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        className="rounded-lg overflow-hidden border border-gray-700 hover:border-violet-500/50 transition-all duration-300 group"
    >
        <div className="aspect-square relative overflow-hidden">
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                        {/* GitHub (optional) */}
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8  backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <FaGithub className="w-4 h-4 text-white" />
                            </a>
                        )}

                        {/* LinkedIn */}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <FaLinkedin className="w-4 h-4 text-white" />
                            </a>
                        )}
                        {/* Instagram */}
                        {member.instagram && (
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <FaInstagram className="w-4 h-4 text-white" />
                            </a>
                        )}

                        {/* Email */}
                        <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <Mail className="w-4 h-4 text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* Member Info */}
        <div className="p-6 h-[260px] flex flex-col justify-between space-y-3">
            {/* Top section */}
            <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors duration-300">
                    {member.name}
                </h3>
                <p className="text-violet-400 font-medium text-sm">{member.role}</p>

                {member.branch && (
                    <div className="text-sm text-gray-400 mt-1">
                        <p>{member.branch}</p>
                    </div>
                )}

                <p className="text-gray-400 text-xs leading-relaxed mt-2">{member.bio}</p>
            </div>

            {/* Badge pinned at the bottom */}
            <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.category === 'faculty' ? 'bg-cyan-500/20 text-cyan-400' :
                        member.category === 'leadership' ? 'bg-violet-500/20 text-violet-400' :
                            member.category === 'tech' ? 'bg-red-500/20 text-red-400' :
                                member.category === 'finance' ? 'bg-green-500/20 text-green-400' :
                                    member.category === 'management' ? 'bg-blue-500/20 text-blue-400' :
                                        member.category === 'creative' ? 'bg-pink-500/20 text-pink-400' :
                                            member.category === 'digital' ? 'bg-teal-500/20 text-teal-400' :
                                                member.category === 'cinematography' ? 'bg-teal-500/20 text-teal-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {member.category.charAt(0).toUpperCase() + member.category.slice(1)}
                </span>
            </div>
        </div>

    </motion.div>
    );

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold ">
                            Our Team
                        </h1>
                        <p className="text-xl md:text-2xl max-w-4xl mx-auto">
                            Meet the passionate individuals who drive innovation and excellence at μCR.
                            Our diverse team brings together expertise from various domains to create amazing robotics solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Faculty Coordinator
                        </h2>
                        <p className="text-xl text-gray-400">
                            Academic leadership and guidance for μCR
                        </p>
                    </motion.div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                            <MemberCard member={facultyCoordinator} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Senior
                            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                Advisors
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Expert guidance and mentorship from experienced Seniors
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {seniorAdvisors.map((advisor, index) => (
                            <MemberCard key={advisor.id} member={advisor} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Core Team
                        </h2>
                        <p className="text-xl text-gray-400">
                            The driving force behind μCR's innovation and success
                        </p>
                    </motion.div>

                    {/* Filter Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Filter className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-400 font-medium">Filter by Role</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {filters.map((filterOption) => (
                                <button
                                    key={filterOption.id}
                                    onClick={() => setFilter(filterOption.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${filter === filterOption.id
                                            ? 'bg-gradient-to-r from-violet-500 to-electric-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    <span>{filterOption.name}</span>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                        {filterOption.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMembers.map((member, index) => (
                            <MemberCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/*
      <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Want to Join Our{' '}
              <span className="bg-gradient-to-r from-violet-400 to-electric-400 bg-clip-text text-transparent">
                Amazing Team?
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're always looking for passionate individuals who share our vision of innovation
              and excellence in robotics. Join us and be part of something extraordinary.
            </p>
            <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-4 bg-gradient-to-r from-violet-500 to-electric-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
  onClick={() => navigate("/joinus")} // 👈 this line does the redirection
>
  Apply to Join μCR
</motion.button>
        </div>
          </motion.div>
      </section>*/}
    </div>
  );
};

export default Team;