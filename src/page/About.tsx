import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Award, Lightbulb } from 'lucide-react';
import { Users, Trophy, Calendar, Zap } from 'lucide-react';
import Footer from "../components/Footer"
import AnimatedCounter from '../components/AnimatedCounter';


const About: React.FC = () => {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
    { icon: Users, value: 200, label: 'Proud Alumni & Builders', suffix: '+', iconcol: "red" },
    { icon: Calendar, value: 50, label: 'Workshops & Hackathons', suffix: '+', iconcol: "green" },
    { icon: Trophy, value: 20, label: 'National Podiums & Awards', suffix: '+', iconcol: "yellow" },
    { icon: Zap, value: 20, label: 'Years of Hardware Legacy', suffix: '', iconcol: "blue" },
  ];
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const iconColors: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
  };

  const activities = [
    {
      icon: Wrench,
      title: "Hands-on Workshops",
      description: "From first-time LED circuits to multi-core autonomous rovers — we run intensive hardware bootcamps on Arduino, STM32, ESP32, and Raspberry Pi. Zero passive lectures, 100% bench time and breadboards.",
      color: "bg-red-500 text-white"
    },
    {
      icon: Users,
      title: "Project Exhibitions",
      description: "Deploying and exhibiting member-built systems — holonomic soccer bots, obstacle-navigating rovers, and IoT telemetry rigs — across campus showcases and national engineering expos.",
      color: "bg-blue-500 text-white"
    },
    {
      icon: Award,
      title: "Competitive Robotics",
      description: "Fielding battle-tested robots in national leagues, time-trial maze races, and robosoccer tournaments where split-second control and robust mechanical fabrication decide the podium.",
      color: "bg-yellow-400 text-black"
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "Open-source culture at heart: peer-led schematic reviews, firmware debugging circles, component libraries, and beginner-to-advanced guides written by students, for students.",
      color: "bg-emerald-500 text-white"
    }
  ];

  return (
    <div className="w-full flex flex-col">
      
      <section className="py-28 sm:py-26 relative z-10 w-full sm:py-20 px-4 sm:px-6 lg:px-8 border-t" id="impact" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 max-w-4xl mx-auto"
          >
            <span className="px-3.5 py-1 rounded-full text-xs font-bold border-2 border-black bg-yellow-400 text-black inline-block">
              WHO WE ARE
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              About μCR
            </h1>
            <p className="text-lg md:text-2xl text-neutral-700 leading-relaxed font-medium">
              Jaypee Institute of Information Technology’s hub for embedded systems, autonomous robotics, and hardware innovation.<br />
              <span className="text-neutral-900 font-bold">Dream. Build. Innovate. Repeat.</span>
            </p>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
              Engineering Impact in Numbers
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
              From late-night soldering at the SAC bench to national robotics podiums — fostering hands-on builders, competitive grit, and lasting hardware excellence.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-black translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
                  style={{
                    backgroundColor: '#facc15',
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2.5px, transparent 0, transparent 9px)',
                  }}
                />

                {/* Foreground Impact Card with White Background */}
                <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-black bg-white text-black transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-lg">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${iconColors[stat.iconcol] || ""}`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-black">
                    {statsInView ? (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-center tracking-wide text-neutral-800">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 sm:py-16 border-t-2 border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
              What We Do at μCR
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto">
              From foundational circuitry to competitive national arena leagues — here is how we build real engineering capability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group p-6 sm:p-8 rounded-2xl border-2 border-black bg-[#fffdf7] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] flex flex-col justify-between"
                >
                  <div className="flex items-start space-x-5">
                    <div className={`w-14 h-14 rounded-xl border-2 border-black ${activity.color} flex items-center justify-center shrink-0 shadow-[2px_2px_0_black] transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-black group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manifesto Card with Hazard Stripes */}
      <section ref={missionRef} className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div
              className="absolute inset-0 rounded-2xl border-2 border-black translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
              style={{
                backgroundColor: '#facc15',
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2.5px, transparent 0, transparent 9px)',
              }}
            />
            <div className="relative z-10 p-8 sm:p-12 rounded-2xl border-2 border-black bg-[#fffdf7] text-center shadow-lg space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold border-2 border-black bg-yellow-400 text-black inline-block">
                THE μCR PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
                Where Curiosity Powers Creation
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto">
                μCR isn't just a college society — it’s a living workshop. We bring together circuit tinkerers, firmware programmers, CAD designers, and robotics enthusiasts to build hardware that solves real problems. In our SAC lab, learning doesn't happen behind desks; it happens across oscilloscope screens, solder smoke, motor driver testing, and iterative design. Whether it’s an agile line-maze racer, a disaster-response rover, or a smart IoT ecosystem, every prototype is proof that student curiosity can engineer the future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;