import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
    Bot,
    Cpu,
    Zap,
    Flame,
    Radio,
    Compass,
    Eye,
    Sliders,
    Search,
    Filter,
    ExternalLink,
    X,
    Sparkles,
    CheckCircle2,
    Layers,
    Wrench,
    Award,
    Code,
    ArrowRight
} from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import AnimatedCounter from '../components/AnimatedCounter';
import Footer from '../components/Footer';

interface Project {
    id: string;
    title: string;
    category: 'autonomous' | 'iot' | 'assistive' | 'aerial';
    categoryLabel: string;
    status: 'Flagship' | 'Completed' | 'Ongoing';
    badgeColor: string;
    icon: React.ComponentType<{ className?: string }>;
    tagline: string;
    shortDescription: string;
    fullDescription: string;
    mcu: string;
    hardware: string[];
    techStack: string[];
    features: string[];
    achievements?: string;
    github?: string;
    demoUrl?: string;
}


const projectsData:  Project[] = [
    {
        id: 'rcplane',
        title: 'AeroCraft: Remote-Controlled RC Plane',
        category: 'aerial',
        categoryLabel: 'Aerial Systems',
        status: 'Completed',
        badgeColor: 'teal',
        icon: Compass,
        tagline: 'A custom-built RC aircraft designed for controlled flight and aerial manoeuvrability',
        shortDescription: 'A remote-controlled fixed-wing aircraft integrating propulsion, radio control and servo-actuated flight surfaces for stable manual flight.',
        fullDescription: 'AeroCraft is a hands-on aerial robotics project focused on aircraft assembly, flight mechanics and radio-controlled navigation. The aircraft combines a lightweight airframe with a motor-driven propulsion system and servo-operated control surfaces. It demonstrates the fundamentals of aerodynamics, thrust management, stability and remote flight control.',
        mcu: 'RC Transmitter & Receiver System',
        hardware: [
            'Brushless DC Propulsion Motor',
            'Electronic Speed Controller (ESC)',
            'RC Transmitter and Receiver',
            'Servo Motors for Flight Surface Control',
            'LiPo Battery and Power Distribution',
            'Fixed-Wing Aircraft Frame and Propeller'
        ],
        techStack: ['RC Flight Control', 'Aerodynamics', 'Servo Actuation', 'Power Management'],
        features: [
            'Wireless manual flight control',
            'Servo-operated control surfaces for directional manoeuvring',
            'Electronic speed control for propulsion management',
            'Integrated lightweight airframe and propulsion assembly'
        ],
        achievements: 'RC Aircraft Project Showcase',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'robosoccer',
        title: 'RoboSoccer: Striker & Goalie Duo',
        category: 'autonomous',
        categoryLabel: 'Robotics & Hardware',
        status: 'Flagship',
        badgeColor: 'violet',
        icon: Bot,
        tagline: 'Competitive omni-directional robots built for high-speed robotic soccer',
        shortDescription: 'A dual-robot soccer system featuring omni-wheel mobility, wireless control and a custom ball-striking mechanism for competitive arena gameplay.',
        fullDescription: 'The RoboSoccer project features a striker and goalkeeper robot designed for fast-paced robotic soccer. The robots use omni-directional wheel configurations for agile movement and wireless communication for remote operation. The striker incorporates a dedicated ball-kicking mechanism, while the goalkeeper focuses on defensive positioning and rapid response.',
        mcu: 'Arduino Mega / ESP32',
        hardware: [
            'Omni-Directional Wheels',
            'High-Torque DC Gear Motors',
            'High-Current H-Bridge Motor Drivers',
            'NRF24L01+ Wireless Transceivers',
            'Ball-Striking Mechanism',
            'Rechargeable LiPo Battery Pack'
        ],
        techStack: ['Embedded C/C++', 'Motor Control', 'RF Communication', 'PWM'],
        features: [
            'Omni-directional movement and rapid turning',
            'Wireless robot control',
            'Dedicated ball-striking mechanism',
            'Coordinated striker and goalkeeper gameplay'
        ],
        achievements: 'Robotics Competition & Demonstration',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'pickandplace',
        title: 'Pick & Place Robotic Arm',
        category: 'autonomous',
        categoryLabel: 'Robotics & Automation',
        status: 'Completed',
        badgeColor: 'violet',
        icon: Sliders,
        tagline: 'A robotic manipulator designed for object handling and precise placement',
        shortDescription: 'A multi-joint robotic arm that uses servo-driven movements and a gripper mechanism to pick up objects and place them at designated positions.',
        fullDescription: 'The Pick & Place Robotic Arm demonstrates the fundamentals of robotic manipulation and automation. Multiple actuated joints control the arm movement, while an end-effector gripper handles objects during the picking and placement process. The project explores coordinated servo movement, positioning and basic robotic automation.',
        mcu: 'Arduino Microcontroller',
        hardware: [
            'Servo Motors for Joint Actuation',
            'Robotic Arm Frame and Linkages',
            'Gripper / End-Effector Mechanism',
            'Motor Power Supply',
            'Microcontroller Control Board',
            'Connecting Wires and Control Circuitry'
        ],
        techStack: ['Embedded C/C++', 'Servo Control', 'PWM', 'Robotic Manipulation'],
        features: [
            'Multi-joint robotic arm movement',
            'Gripper-based object handling',
            'Controlled picking and placement operations',
            'Coordinated actuator movement'
        ],
        achievements: 'Robotics & Automation Project Showcase',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'tankbot',
        title: 'Tracked Tank Robot',
        category: 'autonomous',
        categoryLabel: 'Robotics & Hardware',
        status: 'Completed',
        badgeColor: 'red',
        icon: Bot,
        tagline: 'A motor-driven tracked robot built for manoeuvrability and terrain movement',
        shortDescription: 'A compact tank-style robot using a differential-drive mechanism, DC motors and motor-driver circuitry for controlled movement and turning.',
        fullDescription: 'The Tracked Tank Robot explores mobile robotics through a dual-motor drive architecture. Motor-driver circuits control the direction and speed of the DC motors, allowing the robot to move forward, reverse and turn by varying the speed of its left and right tracks. The project demonstrates embedded motor control, power management and basic mobile robot mechanics.',
        mcu: 'Arduino / Microcontroller',
        hardware: [
            'Tracked Tank Chassis',
            'DC Geared Motors',
            'Dual H-Bridge Motor Driver Module',
            'Rechargeable Battery Pack',
            'Microcontroller Board',
            'Motor Driver Connections and Power Circuit'
        ],
        techStack: ['Embedded C/C++', 'DC Motor Control', 'H-Bridge Drivers', 'PWM'],
        features: [
            'Independent left and right motor control',
            'Forward and reverse movement',
            'Differential steering and turning',
            'Variable motor speed through PWM signals'
        ],
        achievements: 'Mobile Robotics Project Showcase',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'beatfall',
        title: 'BeatFall: Gesture-Controlled 3D Rhythm Game',
        category: 'computer-vision',
        categoryLabel: 'Computer Vision & Interactive Systems',
        status: 'Completed',
        badgeColor: 'cyan',
        icon: Eye,
        tagline: 'A 3D rhythm-based experience controlled through real-time hand gestures',
        shortDescription: 'An interactive 3D rhythm game combining OpenCV-based vision processing and MediaPipe hand tracking to translate physical gestures into in-game actions.',
        fullDescription: 'BeatFall combines computer vision with an interactive 3D gaming environment. Using a webcam, the system tracks hand movements and gestures through MediaPipe and processes visual input with OpenCV. Detected gestures are mapped to gameplay actions, creating an immersive experience where players interact with the game using physical hand movements instead of conventional input devices.',
        mcu: 'Computer-Based Vision System',
        hardware: [
            'Webcam for Real-Time Hand Tracking',
            'Computer / Laptop',
            'Display for 3D Gameplay'
        ],
        techStack: ['React', 'OpenCV', 'MediaPipe', 'Three.js / React Three Fiber', 'JavaScript', 'Firebase'],
        features: [
            'Real-time hand landmark detection',
            'Gesture-based gameplay interactions',
            '3D game environment and visual effects',
            'Computer vision integrated with interactive game logic'
        ],
        achievements: 'Gesture-Controlled 3D Gaming Project',
        github: 'https://github.com/Upanshi-Mittal/BeatFall',
    },
    {
        id: 'webshooter',
        title: 'WebShooter: Vision-Based Hardware Launcher',
        category: 'computer-vision',
        categoryLabel: 'Computer Vision & Hardware',
        status: 'Completed',
        badgeColor: 'blue',
        icon: Eye,
        tagline: 'A computer-vision-powered interactive system connecting visual input with physical actuation',
        shortDescription: 'An interactive project combining OpenCV-based visual processing with a hardware shooting mechanism to translate detected visual input into physical actions.',
        fullDescription: 'WebShooter bridges computer vision and hardware interaction. OpenCV processes camera input to detect and interpret visual information, while a connected hardware mechanism executes the corresponding physical action. The project explores the integration of software-based vision processing, control signals and electromechanical actuation.',
        mcu: 'Hardware Controller — specify exact board',
        hardware: [
            'Webcam / Camera Module',
            'Microcontroller-Based Hardware Interface',
            'Motor / Actuator-Based Shooting Mechanism',
            'Power Supply for Hardware System',
            'Mechanical Launcher Assembly'
        ],
        techStack: ['Python', 'OpenCV', 'Computer Vision', 'Embedded C/C++', 'Hardware Interfacing'],
        features: [
            'Camera-based visual input processing',
            'OpenCV-based object / target detection',
            'Communication between vision software and hardware',
            'Physical actuation through a connected mechanism'
        ],
        achievements: 'Computer Vision & Hardware Integration Project',
        github: 'https://github.com/Upanshi-Mittal/Web-shooter',
    },
    {
        id: 'gridrunner',
        title: 'GridRunner: PID Line Following Robot',
        category: 'autonomous',
        categoryLabel: 'Robotics & Autonomous Systems',
        status: 'Flagship',
        badgeColor: 'yellow',
        icon: Zap,
        tagline: 'Precision line tracking powered by sensor feedback and PID control',
        shortDescription: 'A line-following robot that uses an IR sensor array and differential motor control to follow paths with real-time trajectory correction.',
        fullDescription: 'GridRunner demonstrates closed-loop control in mobile robotics. An array of infrared reflectance sensors detects the line position relative to the robot. The controller calculates the tracking error and adjusts the left and right motor speeds using a PID control algorithm, enabling smooth corrections while following a predefined path.',
        mcu: 'Microcontroller-Based Control System',
        hardware: [
            'IR Reflectance Sensor Array',
            'DC Geared Motors',
            'Dual H-Bridge Motor Driver',
            'Robot Chassis and Wheels',
            'Rechargeable Battery Pack',
            'Microcontroller Board'
        ],
        techStack: ['Embedded C/C++', 'PID Control', 'IR Sensing', 'PWM Motor Control'],
        features: [
            'Real-time line position detection',
            'PID-based trajectory correction',
            'Differential motor speed adjustment',
            'Automatic path following'
        ],
        achievements: 'Line Following Robotics Challenge',
        github: 'https://github.com/crjiit',
    },
];


const categoryFilters = [
    { id: 'all', name: 'All Projects' },
    { id: 'autonomous', name: 'Robotics & Autonomous' },
    { id: 'iot', name: 'Embedded & IoT' },
    { id: 'assistive', name: 'Assistive Tech' },
    { id: 'aerial', name: 'Aerial Systems' },
];

const categoryBadgeStyles: Record<string, string> = {
    autonomous: 'bg-blue-600/20 text-blue-500 border-blue-500',
    iot: 'bg-yellow-500/15 text-yellow-600 border-yellow-500',
    assistive: 'bg-green-500/15 text-green-600 border-green-500',
    aerial: 'bg-red-500/15 text-red-500 border-red-500',
};

const statusBadgeStyles: Record<string, string> = {
    Flagship: 'bg-amber-500/15 text-yellow-500 border-amber-500',
    Completed: 'bg-emerald-500/15 text-green-500 border-green-500',
    Ongoing: 'bg-purple-500/15 text-purple-500 border-purple-500',
};

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const filteredProjects = projectsData.filter((project) => {
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !query ||
            project.title.toLowerCase().includes(query) ||
            project.shortDescription.toLowerCase().includes(query) ||
            project.mcu.toLowerCase().includes(query) ||
            project.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
            project.hardware.some((hw) => hw.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
    });

    const projectStats = [
        { label: 'Prototypes Built', value: 25, suffix: '+', icon: Wrench, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
        { label: 'Competitions Won', value: 12, suffix: '+', icon: Award, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
        { label: 'Microcontrollers Used', value: 50, suffix: '+', icon: Cpu, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
        { label: 'Student Engineered', value: 100, suffix: '%', icon: Bot, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    ];

    return (
        <div className="pt-16 min-h-screen flex flex-col">
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                            Featured Engineering Projects
                        </h1>
                        <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-neutral-700">
                            From battle-tested combat bots and precision line racers to IoT telemetry stations and assistive wearables — explore the custom hardware, circuit architectures, and intelligent firmware engineered by μCR members.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section ref={statsRef} className="py-12 border-y-2 border-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {projectStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative group"
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl border-2 bg-yellow-400 translate-x-2.5 translate-y-2.5 transition-transform duration-300 "
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2.5px, transparent 0, transparent 9px)',
                                    }}
                                />

                                <div className="relative z-10 p-6 rounded-2xl border-2 bg-white backdrop-blur-md  text-black flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-lg">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 text-black">
                                        {statsInView ? (
                                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                        ) : (
                                            <span>0{stat.suffix}</span>
                                        )}
                                    </div>
                                    <div className="text-xs sm:text-sm font-bold tracking-wide text-neutral-800">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search by name, MCU, tech..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm shadow-[2px_2px_0_black] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all placeholder:text-neutral-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black font-bold text-base"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <div className="hidden lg:flex items-center text-neutral-600 text-sm mr-1 font-semibold">
                                <Filter className="w-4 h-4 mr-1.5" />
                                <span>Filter:</span>
                            </div>
                            {categoryFilters.map((tab) => {
                                const count =
                                    tab.id === 'all'
                                        ? projectsData.length
                                        : projectsData.filter((p) => p.category === tab.id).length;

                                const isSelected = selectedCategory === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSelectedCategory(tab.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 border-2 border-black ${
                                            isSelected
                                                ? 'bg-blue-500 text-white shadow-[3px_3px_0_black]'
                                                : 'bg-white text-black shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5'
                                        }`}
                                    >
                                        <span>{tab.name}</span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                                isSelected ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {searchQuery && (
                        <p className="text-sm mb-6">
                            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching "{searchQuery}"
                        </p>
                    )}

                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20 border border-gray-800 rounded-3xl p-8">
                            <Cpu className="w-12 h-12 mx-auto text-gray-600 mb-4 animate-pulse" />
                            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm">
                                We couldn't find any projects matching your current filter and search criteria.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => {
                                const IconComponent = project.icon;

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.06, duration: 0.5 }}
                                        className="group rounded-2xl border-2 border-black transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7] backdrop-blur-md"
                                    >
                                        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-black ${
                                                            categoryBadgeStyles[project.category] || 'bg-neutral-100 text-neutral-800'
                                                        }`}
                                                    >
                                                        {project.categoryLabel}
                                                    </span>
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border-2 border-black flex items-center gap-1.5 ${
                                                            statusBadgeStyles[project.status] || 'bg-neutral-100 text-neutral-800'
                                                        }`}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                        {project.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-start gap-4 mb-3">
                                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 border-black bg-white text-black shadow-[2px_2px_0_black] group-hover:bg-yellow-400 group-hover:scale-105 transition-all duration-200">
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold leading-snug text-black group-hover:text-blue-600 transition-colors">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-xs text-blue-600 font-bold mt-1">
                                                            {project.mcu}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3 mb-4">
                                                    {project.shortDescription}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {project.techStack.slice(0, 4).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2.5 py-1 rounded-lg text-xs font-medium border-2 border-black/15 bg-white text-neutral-800"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.techStack.length > 4 && (
                                                        <span className="px-2 py-1 rounded-lg text-xs font-bold border-2 border-black bg-yellow-400 text-black">
                                                            +{project.techStack.length - 4}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
                                                    <button
                                                        onClick={() => setActiveProject(project)}
                                                        className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 border-black bg-blue-500 hover:bg-blue-600 text-white shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                                                    >
                                                        <span>View Architecture</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                    </button>

                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-10 h-10 rounded-xl border-2 border-black bg-white text-black hover:bg-yellow-400 shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 flex items-center justify-center transition-all shrink-0"
                                                            aria-label="GitHub Repository"
                                                        >
                                                            <FaGithub className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal for In-depth Architecture & Specifications */}
            <AnimatePresence>
                {activeProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveProject(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-3xl rounded-3xl border-2 border-black bg-[#fffdf7] text-black shadow-[10px_10px_0_black] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-6 sm:p-8 border-b-2 border-black/10 bg-white/70 flex items-start justify-between gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-black ${
                                                categoryBadgeStyles[activeProject.category] || 'bg-neutral-100 text-neutral-800'
                                            }`}
                                        >
                                            {activeProject.categoryLabel}
                                        </span>
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border-2 border-black flex items-center gap-1.5 ${
                                                statusBadgeStyles[activeProject.status] || 'bg-neutral-100 text-neutral-800'
                                            }`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            {activeProject.status}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
                                        {activeProject.title}
                                    </h2>
                                    <p className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                                        <Cpu className="w-4 h-4" /> Core MCU: {activeProject.mcu}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className="w-10 h-10 rounded-xl border-2 border-black bg-white text-black hover:bg-yellow-400 shadow-[2px_2px_0_black] flex items-center justify-center transition-all shrink-0 cursor-pointer"
                                    aria-label="Close dialog"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-6 sm:p-8 overflow-y-auto space-y-7">
                                {/* Tagline & Overview */}
                                <div>
                                    <h4 className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider mb-2">
                                        Project Overview
                                    </h4>
                                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                                        {activeProject.fullDescription}
                                    </p>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h4 className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider mb-3">
                                        Key Technical Features & Firmware
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {activeProject.features.map((feat, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-xl border-2 border-black/10 bg-white flex items-start gap-3 shadow-[2px_2px_0_black]"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                                <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                                                    {feat}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hardware Bill of Materials */}
                                <div>
                                    <h4 className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider mb-3">
                                        Hardware & Sensors Implemented
                                    </h4>
                                    <div className="p-4 sm:p-5 rounded-2xl border-2 border-black/10 bg-white shadow-[2px_2px_0_black]">
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {activeProject.hardware.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 font-medium">
                                                    <span className="w-2 h-2 rounded-full border border-black bg-yellow-400 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Tech Stack Tags */}
                                <div>
                                    <h4 className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider mb-2.5">
                                        Software & Protocols
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-neutral-900 border-2 border-black shadow-[2px_2px_0_black]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements */}
                                {activeProject.achievements && (
                                    <div className="p-4 rounded-xl border-2 border-black bg-yellow-100/70 flex items-center gap-3.5 shadow-[3px_3px_0_black]">
                                        <div className="w-9 h-9 rounded-lg border-2 border-black bg-yellow-400 text-black flex items-center justify-center shrink-0">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs sm:text-sm text-neutral-900">
                                            <span className="font-bold text-black">Milestone: </span>
                                            {activeProject.achievements}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-5 sm:p-6 border-t-2 border-black/10 flex items-center justify-between gap-4 bg-white/70">
                                <div className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                                    Engineered by μCR Hub Members
                                </div>
                                <div className="flex items-center gap-3">
                                    {activeProject.github && (
                                        <a
                                            href={activeProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 border-black bg-white text-black hover:bg-yellow-400 shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 flex items-center gap-2 transition-all"
                                        >
                                            <FaGithub className="w-4 h-4" />
                                            <span>Repository</span>
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setActiveProject(null)}
                                        className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 border-black bg-blue-500 hover:bg-blue-600 text-white shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Call to Action Section - Matching Home & Team vibe */}
            <section className="py-20 border-t-2 border-black/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                            Have a Hardware Idea? Build It With μCR
                        </h2>
                        <p className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto text-neutral-700">
                            Whether you want to construct an autonomous rover, explore multi-sensor telemetry, or spin your first custom PCB, our SAC bench provides the microcontrollers, test equipment, and peer mentorship to bring it to life.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            <Link
                                to="/contact"
                                className="px-8 py-3.5 border-2 border-black text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-xl shadow-[4px_4px_0_black] hover:shadow-[4px_4px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200"
                            >
                                Submit a Project Pitch
                            </Link>
                            <Link
                                to="/knowledge"
                                className="px-8 py-3.5 border-2 border-black bg-white text-black hover:bg-yellow-400 font-bold rounded-xl shadow-[4px_4px_0_black] hover:shadow-[4px_4px_0_#facc15] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200"
                            >
                                Browse Knowledge Hub
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Projects;