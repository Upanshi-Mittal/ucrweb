import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Users, Award, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const activities = [
    {
      icon: Wrench,
      title: "Hands-on Workshops",
      description: "From blinking LEDs to autonomous bots — explore robotics through regular workshops centered on Arduino, Raspberry Pi, and real-world applications. No lectures, just hands-on tech.",
      color: "bg-red-500 text-white"
    },
    {
      icon: Users,
      title: "Project Exhibitions", 
      description: "Showcasing member built robots and systems, from intelligent bots to autonomous tech, at campus-wide exhibitions and national tech fests.",
      color: "bg-blue-500 text-white"
    },
    {
      icon: Award,
      title: "Competitions",
      description: "Engaging in national-level robotics leagues that challenge technical expertise, hardware design, and agile team collaboration under pressure.",
      color: "bg-yellow-400 text-black"
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "Peer-led tutorials, schematics reviews, and open documentation to strengthen core robotics, microcontrollers, and embedded programming.",
      color: "bg-emerald-500 text-white"
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* About Header */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Microcontroller-Based Systems and Robotics Hub at JIIT.<br />
              <span className="text-neutral-900 font-bold">Dream. Build. Innovate. Repeat.</span>
            </p>
          </motion.div>
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
              Our Core Activities
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto">
              Comprehensive learning experiences engineered to build real technical capability.
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
                μCR isn't just a hub — it's a workshop of minds. We bring together tinkerers, coders, builders, and dreamers
                to design and deploy real tech solutions. From tackling hardware challenges to writing intelligent control code,
                our members learn by building, not just by reading. Whether it's a maze-solving robot or a homegrown AI system,
                every project is a step closer to engineering something that matters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;