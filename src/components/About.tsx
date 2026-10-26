import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Wrench, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const activities = [
    {
      icon: Wrench,
      title: "Hands-on Workshops",
      description: "From blinking LEDs to autonomous bots — explore robotics through regular workshops centered on Arduino, Raspberry Pi, and real-world applications. No lectures, just hands-on tech."
    },
    {
      icon: Users,
      title: "Project Exhibitons", 
      description: "Showcasing member built robots and systems, from intelligent bots to autonomous tech, at campus wide exhibitions."
    },
    {
      icon: Award,
      title: "Competitions",
      description: "Engaging in national-level robotics competitions that challenge technical expertise, innovation, and effective team collaboration."
    },
   {
  icon: Lightbulb,
  title: "Knowledge Sharing",
  description: "Peer-led tutorials and discussions to strengthen core robotics concepts, programming, and embedded skills within the team."
}

  ];


  return (
    <div className="w-full flex flex-col">
      <section className="py-5 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              About μCR
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Microcontroller-Based Systems and Robotics Hub<br/> Dream. Build. Innovate. Repeat.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              Our Activities
            </h2>
            <p className="text-xl ">
              Comprehensive learning experiences designed to build expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 rounded-lg border border-gray-700 hover:border-violet-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                    <p className="">{activity.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold ">
             Where Curiosity Powers Creation
            </h2>
           <p className="text-xl ">
  μCR isn't just a hub — it's a workshop of minds. We bring together tinkerers, coders, builders, and dreamers
  to design and deploy real tech solutions. From tackling hardware challenges to writing intelligent control code,
  our members learn by building, not just by reading. Whether it's a maze-solving robot or a homegrown AI system,
  every project is a step closer to engineering something that matters.
</p>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;