import Sac from "../components/3Dsac";
import About from "../components/About";
import "../components/home.css";
import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, Zap } from 'lucide-react';
import Footer from "../components/Footer"
function Home() {
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Icon color mapping kept intact for your custom color styling
    const iconColors: Record<string, string> = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
    };

    const stats = [
        { icon: Users, value: 200, label: 'Proud Alumni', suffix: '+', iconcol: "red" },
        { icon: Calendar, value: 50, label: 'Past Events', suffix: '+', iconcol: "green" },
        { icon: Trophy, value: 20, label: 'Competitions Conquered', suffix: '+', iconcol: "yellow" },
        { icon: Zap, value: 20, label: 'Years of Excellence', suffix: '', iconcol: "blue" },
    ];

    return (
        <main className="w-full flex flex-col min-h-screen">
            {/* 3D Lab Tour / Hero Section */}
            <section id="hero" className="relative w-full h-[75vh] overflow-hidden z-10">
                <Sac />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-20 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs sm:text-sm text-white tracking-wide shadow-xl">
                    <span>↔ Drag horizontally to look around</span>
                </div>
            </section>
            <section id="impact" ref={statsRef} className="relative z-10 w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-1">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed">
                            Empowering innovators, competing at the highest levels, and building a community that lasts.
                        </p>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${iconColors[stat.iconcol] || ""}`}
                                >
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2">
                                    {statsInView ? (
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    ) : (
                                        <span>0{stat.suffix}</span>
                                    )}
                                </div>
                                <div className="text-sm sm:text-base font-medium text-center tracking-wide">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <About />
            <Footer/>
        </main>
    );
}

export default Home;