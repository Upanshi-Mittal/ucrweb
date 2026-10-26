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

const projectsData: Project[] = [
    {
        id: 'robosoccer',
        title: 'RoboSoccer Striker & Goalie Duo',
        category: 'autonomous',
        categoryLabel: 'Robotics & Combat',
        status: 'Flagship',
        badgeColor: 'violet',
        icon: Bot,
        tagline: 'High-speed competitive omni-drive robots with pneumatic kicker systems',
        shortDescription: 'Custom dual-bot system engineered for fast-paced 2v2 arena soccer, featuring holonomic omni wheels, sub-millisecond RF telemetry, and quick-response kickers.',
        fullDescription: 'Designed and fabricated from the ground up for national robotics championships. The RoboSoccer duo pairs an agile high-torque striker with a responsive wide-angle goalkeeper. The chassis utilizes laser-cut acrylic and 3D-printed brackets, powered by planetary gear motors and high-current H-bridge drivers. Real-time control is managed over low-latency 2.4GHz wireless transceivers.',
        mcu: 'Arduino Mega 2560 & ESP32 Dual-Core',
        hardware: [
            'BTS7960 43A High-Current Motor Drivers',
            'NRF24L01+ PA/LNA Wireless Transceivers with Antenna',
            'Solenoid Ball-Striker & Spring Recoil Actuator',
            '3S 2200mAh 35C LiPo Power Distribution Board',
            'Four-Wheel Holonomic Omni-Directional Wheel Drive'
        ],
        techStack: ['C++', 'Embedded C', 'Hardware PWM', 'RF Telemetry', 'SolidWorks CAD'],
        features: [
            'Zero-radius instant holonomic rotation and omni-directional sprint maneuvers',
            'Custom high-power solenoid pulse circuit for calibrated goal shooting',
            'Independent dual-frequency channel hopping to resist arena RF noise',
            'Real-time voltage telemetry with low-battery LED alert warnings'
        ],
        achievements: 'Podium Winner at National Inter-College Robotics League & Spectra Showcase',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'pyroguard',
        title: 'PyroGuard: Autonomous Fire-Fighting Rover',
        category: 'autonomous',
        categoryLabel: 'Robotics & Autonomous',
        status: 'Completed',
        badgeColor: 'red',
        icon: Flame,
        tagline: 'Autonomous hazard search bot with directional flame suppression',
        shortDescription: 'Self-navigating tracked rover that scans hazardous corridors, pinpoints active flame signatures with analog sensors, and triggers automated fire extinction.',
        fullDescription: 'PyroGuard is an autonomous emergency hazard robot built to enter hazardous enclosures where human intervention is hazardous. It continuously samples surrounding optical wavelengths through a calibrated 5-point phototransistor array. Once a thermal anomaly or flame is detected, the bot adjusts heading, drives into optimal range, and activates a servo-guided nozzle powered by a submersible pump.',
        mcu: 'ATmega328P Microcontroller (Arduino Uno/Nano)',
        hardware: [
            '5-Channel Analog Infrared Flame Detection Array',
            'Dual HC-SR04 Ultrasonic Ranging Sensors',
            'L298N Dual Full-Bridge Motor Controller',
            '12V High-Pressure Submersible Micro Water Pump',
            'Metal-Gear SG90 Nozzle Aiming Servos',
            'Reinforced Double-Track Chassis with Rubber Tread Grips'
        ],
        techStack: ['Embedded C', 'Sensor Fusion', 'PID Navigation', 'Power MOSFET Control'],
        features: [
            '180-degree multi-zone flame vector calculation and homing logic',
            'Autonomous obstacle avoidance while maintaining flame line-of-sight',
            'Dynamic nozzle sweep angle for maximum extinguishing coverage',
            'Failsafe emergency shut-off and audible siren alerts'
        ],
        achievements: 'Featured at Annual Science & Technology Exhibition JIIT',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'gridrunner',
        title: 'GridRunner: High-Speed PID Line & Maze Follower',
        category: 'autonomous',
        categoryLabel: 'Robotics & Autonomous',
        status: 'Flagship',
        badgeColor: 'yellow',
        icon: Zap,
        tagline: 'Sub-millimeter line precision racer with real-time PID tuning',
        shortDescription: 'High-speed differential drive bot utilizing an 8-sensor reflectance array and PID control algorithms to conquer complex high-curvature race tracks and mazes.',
        fullDescription: 'GridRunner combines high-speed mechanics with tight mathematical control. The bot executes discrete-time Proportional-Integral-Derivative (PID) loops running at 500Hz to calculate exact lateral trajectory deviations. Coupled with Tremaux and Wall-Following algorithms, it is capable of resolving maze junctions and accelerating on straight paths up to 1.8 meters per second.',
        mcu: 'STM32 ARM Cortex-M4 (32-bit MCU)',
        hardware: [
            'Pololu QTR-8A High-Density IR Reflectance Sensor Array',
            'Pololu 30:1 Micro Metal High-RPM Gearmotors with Encoders',
            'DRV8835 Dual Low-Voltage Motor Driver Carrier',
            'Carbon Fiber Composite Ultra-Light Chassis Base',
            'High-Traction Silicone Foam Racing Tyres'
        ],
        techStack: ['STM32 HAL / C', 'PID Control Theory', 'Tremaux Algorithm', 'FreeRTOS'],
        features: [
            'Calculates real-time error position at 500 samples per second',
            'Automatic course calibration routine adapting to ambient floor reflectance',
            'Encoder-assisted odometry for smooth speed ramp-up on straight segments',
            'Onboard OLED telemetry displaying error values, Kp, Ki, Kd coefficients'
        ],
        achievements: '1st Place in Circuit Rush & Time-Trial Line Track Challenge',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'radar',
        title: 'Miniature Ultrasonic Radar & Sonar Mapper',
        category: 'iot',
        categoryLabel: 'Embedded & IoT',
        status: 'Completed',
        badgeColor: 'cyan',
        icon: Radio,
        tagline: '180° sweep sonar mapping station with interactive PC graphical radar',
        shortDescription: 'A compact sonar radar built with micro-servos and ultrasonic transducers, mapping environmental obstacle vectors to a real-time radar GUI display.',
        fullDescription: 'Built to demonstrate the fundamental physics of active sonar and target localization. A micro servo smoothly swings an ultrasonic transducer across 0 to 180 degrees. At every single degree step, high-frequency sound pulses measure flight time to identify boundaries. The spatial data streams over serial communication to a customized visual interface resembling an air traffic control radar sweep.',
        mcu: 'Arduino Uno (ATmega328P)',
        hardware: [
            'HC-SR04 Ultrasonic Distance Sensor (2cm - 400cm precision)',
            'TowerPro SG90 180-Degree Micro Servo',
            'Custom 3D-Printed Sensor Gimbal & Shock-Absorbing Mount',
            'USB UART High-Speed Serial Interface'
        ],
        techStack: ['Processing IDE', 'Python GUI / Pygame', 'Serial Stream Protocol', 'Trigonometric Math'],
        features: [
            'Smooth continuous sweep scan with adjustable scan velocity',
            'Visual target identification with distance markers and bearing angle',
            'Warning zone detection indicating proximity hazards under 20cm',
            'Data export capability to 2D room floorplan coordinate point clouds'
        ],
        achievements: 'Educational Showcase in μCR Hardware & Sensor Workshops',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'agrosense',
        title: 'AgroSense: IoT Soil & Autonomous Irrigation',
        category: 'iot',
        categoryLabel: 'Embedded & IoT',
        status: 'Completed',
        badgeColor: 'green',
        icon: Cpu,
        tagline: 'Solar-backed smart precision farming station with cloud analytics',
        shortDescription: 'Automated agriculture telemetry hub monitoring volumetric soil moisture and microclimate variables, activating precision drip solenoids over WiFi/MQTT.',
        fullDescription: 'AgroSense tackles agricultural resource conservation by modernizing irrigation. Using anti-corrosion capacitive soil sensors and ambient weather sensors, the ESP32 node continuously calculates evapotranspiration metrics. It automatically triggers localized water delivery, logs historical trends to a cloud dashboard, and sends WhatsApp / Telegram alerts if abnormal conditions arise.',
        mcu: 'ESP32-WROOM-32 with WiFi & Bluetooth BLE',
        hardware: [
            'Corrosion-Resistant Capacitive Soil Moisture Sensor V1.2',
            'DHT22 High-Precision Temperature & Humidity Sensor',
            '5V Optocoupler-Isolated Solid State Relays',
            '12V DC Brass Electric Solenoid Water Valves',
            'Solar Panel Charging Controller with 18650 Li-ion Battery Bank'
        ],
        techStack: ['ESP-IDF / Arduino', 'MQTT Protocol', 'Blynk IoT / Adafruit IO', 'RESTful API'],
        features: [
            'Deep-sleep power management cycle preserving battery life up to 6 months',
            'Threshold-based automatic watering with rain-sensor bypass logic',
            'Real-time cloud analytics dashboard accessible from any mobile browser',
            'Dual-channel alerts for low reservoir levels or sensor anomalies'
        ],
        achievements: 'Selected Project at Campus Sustainable Tech Showcase',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'thirdeye',
        title: 'Third Eye: Assistive Haptic Blind Navigator',
        category: 'assistive',
        categoryLabel: 'Assistive Tech',
        status: 'Completed',
        badgeColor: 'blue',
        icon: Eye,
        tagline: 'Wearable ultrasonic obstacle locator with adaptive tactile feedback',
        shortDescription: 'An ergonomic wearable device engineered to give visually impaired users heightened spatial awareness through adaptive multi-frequency vibrational pulses.',
        fullDescription: 'Third Eye was designed as a lightweight, unobtrusive wearable assistant. By mounting miniaturized ultrasonic transducers on an elastic ergonomic strap, the device sweeps the user’s forward trajectory. When an obstacle is detected within 2 meters, eccentric rotating mass (ERM) motors pulse against the skin. The vibration frequency ramps up exponentially as the object nears, granting intuitive spatial perception without blocking the user’s auditory senses.',
        mcu: 'ATmega328P (Arduino Pro Mini 3.3V)',
        hardware: [
            'Dual Waterproof Ultrasonic Sensors with Transducer Cones',
            'Coin-Type Precision ERM Vibration Haptic Motors',
            'Rechargeable 3.7V 650mAh Lithium-Polymer Battery',
            'TP4056 Micro-USB Li-ion Battery Charging Circuit with Protection',
            '3D-Printed Soft Bio-Compatible Wrist & Chest Casing'
        ],
        techStack: ['C++', 'Embedded Firmware', 'Ergonomic 3D Design', 'Low-Power Interrupts'],
        features: [
            'Non-intrusive sensory substitution keeping ears free for environmental hearing',
            'Adaptive feedback frequency varying from calm tap to urgent buzz',
            'Over 14 hours of continuous operation on a single micro-USB charge',
            'Ultra-lightweight total weight under 90 grams'
        ],
        achievements: 'Social Impact Project Award at JIIT Tech Fest',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'aerocrest',
        title: 'AeroCrest: Altitude-Stabilized UAV Quadcopter',
        category: 'aerial',
        categoryLabel: 'Aerial Systems',
        status: 'Flagship',
        badgeColor: 'teal',
        icon: Compass,
        tagline: 'Custom quadcopter platform featuring 6-axis IMU stabilization & telemetry',
        shortDescription: 'In-house built quadcopter integrating custom flight stabilization firmware, altitude hold via sensor fusion, and manual/autonomous failsafe maneuvers.',
        fullDescription: 'AeroCrest is the hub’s flagship aerial robotics initiative. Constructed with an F450 nylon-composite frame, the drone uses an STM32-based flight controller executing PID attitude stabilization loops at 400Hz. Sensor fusion combines data from an MPU6050 6-axis gyroscope/accelerometer and a BMP280 precision barometer to hold rock-steady hover altitudes even in breezy outdoor environments.',
        mcu: 'STM32F401 84MHz 32-bit Flight Processor',
        hardware: [
            'A2212 920KV High-Efficiency Brushless DC Motors',
            '30A SimonK Firmware Electronic Speed Controllers (ESCs)',
            '1045 Glass-Fiber Reinforced Counter-Rotating Propellers',
            'BMP280 High-Precision Barometric Pressure Altitude Sensor',
            'FlySky FS-i6 6-Channel 2.4GHz Digital Proportional Radio System',
            '4S 3300mAh High-Discharge LiPo Battery Pack'
        ],
        techStack: ['C++', 'Kalman Filter / Complementary Filter', 'PWM Motor Drive', 'Aero Dynamics'],
        features: [
            'Sub-centimeter barometer-assisted vertical altitude holding',
            'Auto-leveling angle mode with acrobatic agility switch option',
            'Independent low-voltage telemetry with automated descent return behavior',
            'Vibration-damped flight controller mount for crystal-clear sensor readings'
        ],
        achievements: 'Live Aerial Demonstration at JIIT Annual Hub Festival Spectra',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'gestureglove',
        title: 'CyberGlove: 6-DOF Robotic Arm Teleoperation',
        category: 'autonomous',
        categoryLabel: 'Robotics & Hardware',
        status: 'Ongoing',
        badgeColor: 'violet',
        icon: Sliders,
        tagline: 'Wearable human-machine glove mirroring hand gestures onto robotic servos',
        shortDescription: 'A cybernetic wearable glove equipped with flex sensors and inertial measurement units, wirelessly mirroring human finger articulation onto a 6-DOF robotic manipulator.',
        fullDescription: 'CyberGlove bridges human intention with robotic dexterity. Conductive flex sensors along each finger detect bending angles while an accelerometer on the back of the hand tracks wrist roll, pitch, and yaw. These analog signals are digitized, filtered through a moving-average algorithm, and transmitted via 2.4GHz wireless to drive a 6-axis aluminum robot arm in near-instantaneous synchrony.',
        mcu: 'Dual Arduino Nano (Transmitter & Receiver)',
        hardware: [
            '5x 2.2-inch Bend Flex Sensors with Voltage Divider Network',
            'MPU6050 6-Axis Motion Tracking Sensor (I2C Protocol)',
            '6-DOF Full Metal Mechanical Robotic Arm Frame',
            'MG996R High-Torque Metal Gear Digital Servomotors',
            'External 5V 10A High-Current Step-Down Buck Converter'
        ],
        techStack: ['Embedded C', 'Kinematics', 'Moving Average Filter', 'NRF24L01 Protocol'],
        features: [
            'Sub-50 millisecond low-latency wireless hand mirroring',
            'Inverse kinematics smoothing to prevent mechanical shuddering',
            'Pick-and-place end-effector gripper with adjustable pinch force',
            'Modular wearable glove fitted with breathable sports mesh'
        ],
        achievements: 'Highlighted in Advanced Embedded Systems Workshop Series',
        github: 'https://github.com/crjiit',
    },
    {
        id: 'smartmatrix',
        title: 'SmartHome Matrix: Dual-Tier IoT Controller',
        category: 'iot',
        categoryLabel: 'Embedded & IoT',
        status: 'Completed',
        badgeColor: 'cyan',
        icon: Layers,
        tagline: 'Local Bluetooth fallback & WiFi home automation with optoisolation',
        shortDescription: 'Industrial-grade home automation controller designed for appliance management via WiFi WebSockets, offline Bluetooth BLE fallback, and wall switch sync.',
        fullDescription: 'Addressing reliability issues in commercial smart switches, SmartHome Matrix offers dual-tiered connectivity. When the home internet is active, devices are managed globally via WebSockets and voice assistant routines. If internet fails, local Bluetooth connectivity takes over instantly. Built with optocoupler isolation to safely manage AC loads up to 10 Amps.',
        mcu: 'NodeMCU ESP8266 & ESP32 BLE',
        hardware: [
            '8-Channel 10A 250V AC Optocoupler-Isolated Relay Module',
            'HC-05 Bluetooth Serial Module for Offline Direct Sync',
            'HLK-PM01 AC-to-DC 230V Step-Down Isolated Power Supply',
            'Snubber Circuits to prevent inductive kickback from fans/motors'
        ],
        techStack: ['NodeMCU Lua / C++', 'WebSockets', 'BLE Protocol', 'Home Assistant Integration'],
        features: [
            'Zero-latency state synchronization with existing wall mechanical toggle switches',
            'Automatic switchover to local Bluetooth when WiFi connectivity drops',
            'Complete galvanic electrical isolation safeguarding low-voltage logic',
            'Integrated web dashboard requiring zero mobile app installation'
        ],
        achievements: 'Deployed across student lab benches and automated worktables in SAC',
        github: 'https://github.com/crjiit',
    }
];

const categoryFilters = [
    { id: 'all', name: 'All Projects' },
    { id: 'autonomous', name: 'Robotics & Autonomous' },
    { id: 'iot', name: 'Embedded & IoT' },
    { id: 'assistive', name: 'Assistive Tech' },
    { id: 'aerial', name: 'Aerial Systems' },
];

const categoryBadgeStyles: Record<string, string> = {
    autonomous: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    iot: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    assistive: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    aerial: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
};

const statusBadgeStyles: Record<string, string> = {
    Flagship: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Ongoing: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
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
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs sm:text-sm font-medium text-violet-400">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span>μCR Engineering & Hardware Showcase</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Our <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Projects</span>
                        </h1>
                        <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
                            From agile autonomous rovers and IoT telemetry hubs to assistive wearable devices — explore the custom hardware, circuit architectures, and intelligent firmware built by μCR members.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Impact / Stats Section */}
            <section ref={statsRef} className="py-12 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {projectStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6 rounded-2xl border border-gray-800 flex flex-col items-center text-center transition-all duration-300 hover:border-violet-500/40"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                                    {statsInView ? (
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    ) : (
                                        <span>0{stat.suffix}</span>
                                    )}
                                </div>
                                <div className="text-xs sm:text-sm font-medium tracking-wide">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Controls Section: Search & Category Filter */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, MCU, tech..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/60 text-sm focus:outline-none focus:border-violet-500 transition-colors placeholder:text-gray-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <div className="hidden lg:flex items-center text-gray-400 text-sm mr-2">
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
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                                            isSelected
                                                ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-violet-400/50 shadow-lg shadow-violet-500/20'
                                                : 'border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        <span>{tab.name}</span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full ${
                                                isSelected ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-400'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results Count Notification */}
                    {searchQuery && (
                        <p className="text-sm text-gray-400 mb-6">
                            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching "{searchQuery}"
                        </p>
                    )}

                    {/* Projects Grid */}
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
                                        className="group rounded-2xl border border-gray-800 hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1"
                                    >
                                        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                                            <div>
                                                {/* Header Badges */}
                                                <div className="flex items-center justify-between gap-2 mb-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                                            categoryBadgeStyles[project.category] || 'bg-gray-800 text-gray-300 border-gray-700'
                                                        }`}
                                                    >
                                                        {project.categoryLabel}
                                                    </span>
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                                                            statusBadgeStyles[project.status] || 'bg-gray-800 text-gray-300 border-gray-700'
                                                        }`}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                        {project.status}
                                                    </span>
                                                </div>

                                                {/* Icon & Title */}
                                                <div className="flex items-start gap-4 mb-3">
                                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-violet-500/20 bg-violet-500/10 text-violet-400 group-hover:scale-105 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold leading-snug group-hover:text-violet-400 transition-colors">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-xs text-violet-400/90 font-medium mt-1">
                                                            {project.mcu}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed text-gray-300 line-clamp-3 mb-4">
                                                    {project.shortDescription}
                                                </p>
                                            </div>

                                            {/* Tech Stack Chips */}
                                            <div>
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {project.techStack.slice(0, 4).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2.5 py-1 rounded-lg text-xs bg-gray-800/80 text-gray-300 border border-gray-700/60"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.techStack.length > 4 && (
                                                        <span className="px-2 py-1 rounded-lg text-xs bg-gray-800/50 text-gray-400 border border-gray-800">
                                                            +{project.techStack.length - 4}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
                                                    <button
                                                        onClick={() => setActiveProject(project)}
                                                        className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium bg-gray-800 hover:bg-violet-600 hover:text-white text-gray-200 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                                                    >
                                                        <span>View Architecture</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                    </button>

                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-10 h-10 rounded-xl border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-colors shrink-0"
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
                            className="fixed inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-3xl rounded-3xl border border-gray-700 bg-gray-900 text-white shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-6 sm:p-8 border-b border-gray-800 flex items-start justify-between gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                                categoryBadgeStyles[activeProject.category] || 'bg-gray-800 text-gray-300'
                                            }`}
                                        >
                                            {activeProject.categoryLabel}
                                        </span>
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                                                statusBadgeStyles[activeProject.status] || 'bg-gray-800 text-gray-300'
                                            }`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            {activeProject.status}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                        {activeProject.title}
                                    </h2>
                                    <p className="text-sm text-violet-400 font-medium">
                                        Core Controller: {activeProject.mcu}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className="w-10 h-10 rounded-full border border-gray-700 bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                                {/* Tagline & Overview */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                        Project Overview
                                    </h4>
                                    <p className="text-base text-gray-200 leading-relaxed">
                                        {activeProject.fullDescription}
                                    </p>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        Key Technical Features & Firmware
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {activeProject.features.map((feat, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-xl border border-gray-800 bg-gray-800/40 flex items-start gap-3"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                                                <span className="text-xs sm:text-sm text-gray-300 leading-snug">
                                                    {feat}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hardware Bill of Materials */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        Hardware & Sensors Implemented
                                    </h4>
                                    <div className="p-4 rounded-xl border border-gray-800 bg-gray-800/30">
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {activeProject.hardware.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Tech Stack Tags */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                                        Software & Protocols
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-lg text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements */}
                                {activeProject.achievements && (
                                    <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-3">
                                        <Award className="w-6 h-6 text-amber-400 shrink-0" />
                                        <div className="text-xs sm:text-sm text-amber-200">
                                            <span className="font-semibold text-amber-300">Milestone: </span>
                                            {activeProject.achievements}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-800 flex items-center justify-between gap-4 bg-gray-900/90">
                                <div className="text-xs text-gray-400">
                                    Engineered by μCR Hub Members
                                </div>
                                <div className="flex items-center gap-3">
                                    {activeProject.github && (
                                        <a
                                            href={activeProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-gray-700 hover:border-gray-500 text-gray-200 flex items-center gap-2 transition-colors"
                                        >
                                            <FaGithub className="w-4 h-4" />
                                            <span>Repository</span>
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setActiveProject(null)}
                                        className="px-5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
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
            <section className="py-20 border-t border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Have an Idea?{' '}
                            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Build With μCR
                            </span>
                        </h2>
                        <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            Whether you want to construct an autonomous rover, explore sensor fusion, or manufacture custom PCB micro-controllers, our hub provides the components, equipment, and peer mentorship you need.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            <Link
                                to="/contact"
                                className="px-8 py-3.5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105"
                            >
                                Submit a Project Pitch
                            </Link>
                            <Link
                                to="/knowledge"
                                className="px-8 py-3.5 border border-gray-700 hover:border-violet-500 rounded-xl font-medium text-gray-300 hover:text-white transition-all duration-300"
                            >
                                Browse Knowledge Hub
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Page Footer */}
            <Footer />
        </div>
    );
};

export default Projects;