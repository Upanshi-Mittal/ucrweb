import Sac from "../components/3Dsac";
import "../components/home.css";
import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, Zap } from 'lucide-react';
import Footer from "../components/Footer"
function Home() {
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const iconColors: Record<string, string> = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
    };

    const stats = [
        { icon: Users, value: 200, label: 'Proud Alumni & Builders', suffix: '+', iconcol: "red" },
        { icon: Calendar, value: 50, label: 'Workshops & Hackathons', suffix: '+', iconcol: "green" },
        { icon: Trophy, value: 20, label: 'National Podiums & Awards', suffix: '+', iconcol: "yellow" },
        { icon: Zap, value: 20, label: 'Years of Hardware Legacy', suffix: '', iconcol: "blue" },
    ];

    return (
        <main className="w-full flex flex-col min-h-screen">
            <section id="hero" className="relative w-full h-screen overflow-hidden z-10">
                <Sac />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-30 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black bg-[#fffdf7]/95 text-black backdrop-blur-md text-xs sm:text-sm font-bold tracking-wide shadow-[4px_4px_0_black]">
                        <span>↔ Rotate 360° to explore our lab • Click any card for event highlights</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;