import Sac from "../components/3Dsac";
import "../components/home.css";
import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Users, Trophy, Calendar, Zap, ArrowRight, Bot } from 'lucide-react';
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

                {/* ClawClash Form Link near Header */}
                <div className="absolute top-22 sm:top-24 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-auto px-4 max-w-full">
                    <Link
                        to="/clawclash"
                        className="group flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 sm:border-3 border-black bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs sm:text-sm shadow-[4px_4px_0_black] hover:shadow-[4px_4px_0_#ef4444] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200"
                    >
                        <span className="flex h-2.5 w-2.5 relative shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                        </span>
                        <span className="tracking-wide text-black font-black">CLAWCLASH 2026:</span>
                        <span className="flex items-center gap-1 text-red-600 underline decoration-2 underline-offset-2">
                            <span>Register Team & Bot</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>

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