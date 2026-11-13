import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Filter } from 'lucide-react';
import Footer from '../components/Footer';
import { SmartImg } from '../components/SmartImg';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ayush from '../assets/ayush.webp';
import bhavyanshika from '../assets/bhavyanshika.webp';
import hema from "../assets/hema.webp";
import arjun from '../assets/arjun.webp';
import navyaa from '../assets/navyaa.webp';
import rakshit from '../assets/rakshit.webp';
import shivam from '../assets/shivam.webp';
import vedansh from '../assets/vedansh.webp';
import upanshi from '../assets/upanshi.webp';
import vanshika from '../assets/vanshika.webp';
import amisha from '../assets/amisha.webp';
import priyanshu from '../assets/priyanshu.webp';
import aadya from '../assets/aadya.webp';
import jahnavi from '../assets/jahnavi.webp';
import shreyansh from '../assets/shreyansh.webp';
const Team = () => {
    const [filter, setFilter] = useState('all');

    const facultyCoordinator = {
        id: 5,
        name: "Dr.Hema Nagaraja",
        role: "Faculty Coordinator",
        category: "faculty",
        branch: "Computer Science",
        image: hema,
        bio: "Faculty coordinator and mentor specializing in embedded systems and automated control, guiding student research across robotics, intelligent sensor networks, and edge computing.",
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
            bio: "Directs club operations, hardware procurement, and competitive strategy, ensuring flawless execution across national robotics tournaments and hands-on workshops.",
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
            bio: "Mentors hardware-firmware integration, circuit architecture, and competitive bot design with a sharp focus on real-world mechanical reliability and PCB precision.",
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
            bio: "Advises technical roadmap, embedded systems development, and high-performance microcontroller architectures across autonomous rovers and IoT projects.",
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
            bio: "Leads firmware engineering, sensor interfacing, and technical bootcamps across Arduino, ESP32, and Raspberry Pi platforms to empower upcoming student builders.",
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
            bio: "Drives mechanical fabrication, high-torque motor driver circuitry, and rapid CAD prototyping for arena combat bots and agile autonomous rovers.",
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
            bio: "Specializes in circuit board design, RF telemetry, and real-time sensor fusion for mobile robotic platforms and line-tracking systems.",
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
            bio: "Focuses on intelligent firmware algorithms, autonomous path planning, and embedded systems architecture for complex multi-sensor platforms.",
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
            bio: "Coordinates inter-college hackathons, corporate sponsorship acquisition, and end-to-end event logistics for flagship campus robotics exhibitions.",
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
            bio: "Spearheads operational logistics, bench inventory management, and event execution for high-stakes tech fests and hands-on workshops.",
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
            bio: "Directs digital outreach, social media presence, and brand storytelling to showcase μCR’s engineering journey and tournament milestones.",
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
            bio: "Captures the engineering hustle through visual cinematography, documenting late-night bench sessions, bot testing, and arena matches.",
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
            bio: "Leads publicity campaigns, community engagement, and digital outreach to expand μCR’s footprint across student engineering communities.",
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
            bio: "Drives strategic outreach, semiconductor design exploration, and technical partnerships across college hubs and tech communities.",
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
            bio: "Designs UI/UX visuals, promotional banners, and graphic identities that give μCR projects and events their distinct neo-brutalist aesthetic.",
            github: "https://github.com/AmishaMittal01",
            linkedin: "https://www.linkedin.com/in/01-amisha-mittal/",
            instagram: "https://www.instagram.com/amisha_m01/",
            email: "mittalamisha2005@gmail.com"
        },
    ];
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


    const MemberCard = ({ member, index = 0 }: MemberCardProps) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="group rounded-2xl border-2 border-black transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md"
        >
            <div className="aspect-square relative overflow-hidden border-b-2 border-black bg-neutral-100">
                <SmartImg
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div className="flex space-x-2">
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0_black] hover:bg-yellow-400 hover:scale-110 flex items-center justify-center transition-all"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-4 h-4" />
                            </a>
                        )}

                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0_black] hover:bg-yellow-400 hover:scale-110 flex items-center justify-center transition-all"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                        )}

                        {member.instagram && (
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0_black] hover:bg-yellow-400 hover:scale-110 flex items-center justify-center transition-all"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                        )}

                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="w-9 h-9 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0_black] hover:bg-yellow-400 hover:scale-110 flex items-center justify-center transition-all"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 h-[260px] flex flex-col justify-between space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors duration-200">
                        {member.name}
                    </h3>
                    <p className="text-blue-600 font-bold text-sm mt-0.5">{member.role}</p>

                    {member.branch && (
                        <div className="text-xs text-neutral-600 font-medium mt-1">
                            <p>{member.branch}</p>
                        </div>
                    )}

                    <p className="text-xs text-neutral-700 leading-relaxed mt-2.5 line-clamp-3">{member.bio}</p>
                </div>

                <div>
                    <span className={`px-3 py-1 border-2 border-black rounded-full text-xs font-bold uppercase tracking-wider ${
                        member.category === 'faculty' ? 'bg-cyan-100 text-cyan-800' :
                        member.category === 'advisor' ? 'bg-amber-100 text-amber-800' :
                        member.category === 'tech' ? 'bg-red-100 text-red-800' :
                        member.category === 'management' ? 'bg-blue-100 text-blue-800' :
                        member.category === 'creative' ? 'bg-pink-100 text-pink-800' :
                        member.category === 'digital' ? 'bg-teal-100 text-teal-800' :
                        member.category === 'cinematography' ? 'bg-purple-100 text-purple-800' :
                        member.category === 'marketing' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-neutral-100 text-neutral-800'
                    }`}>
                        {member.category}
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
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                            The Minds Behind μCR
                        </h1>
                        <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-neutral-700">
                            Meet the engineers, designers, and organizers powering our robotics benches. From autonomous rovers to national arena championships, we build together.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-6 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
                            Faculty Mentorship
                        </h2>
                        <p className="text-lg sm:text-xl text-neutral-700">
                            Academic leadership, institutional support, and research guidance powering μCR
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
                            Senior Advisory Council
                        </h2>
                        <p className="text-lg sm:text-xl text-neutral-700">
                            Strategic guidance, tournament wisdom, and technical mentorship from veteran leads
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
                            Executive Core Team
                        </h2>
                        <p className="text-lg sm:text-xl text-neutral-700">
                            The active leads driving hardware builds, firmware workshops, events, and community outreach
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border-2 border-black bg-white shadow-[2px_2px_0_black]">
                                <Filter className="w-4 h-4 text-neutral-600" />
                                <span className="font-bold text-xs uppercase tracking-wider text-black">Filter by Role</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2.5">
                            {filters.map((filterOption) => (
                                <button
                                    key={filterOption.id}
                                    onClick={() => setFilter(filterOption.id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-black flex items-center space-x-2 ${
                                        filter === filterOption.id
                                            ? 'bg-blue-500 text-white shadow-[3px_3px_0_black]'
                                            : 'bg-white text-black shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5'
                                    }`}
                                >
                                    <span>{filterOption.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                        filter === filterOption.id ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                                    }`}>
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

            <Footer />
        </div>
    );
};

export default Team;