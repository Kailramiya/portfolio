import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Code, Database, Brain, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "MERN stack expertise with 95% project delivery success"
    },
    {
      icon: Database,
      title: "System Architecture",
      description: "Scalable solutions handling 1000+ daily API requests"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "AI-powered systems with 95% accuracy benchmarks"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Enhanced algorithms reducing false positives by 40%"
    }
  ];

  return (
    <section id="about" className="section-compact bg-white dark:bg-gray-900">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about creating innovative solutions that bridge technology and real-world impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Brief Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-sm">
              {portfolioData.personal.summary}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              Currently pursuing my B.Tech at IIIT Raichur with a stellar GPA of 8.3/10.0, 
              I've demonstrated leadership in cross-functional teams while maintaining a 95% 
              project delivery success rate across 6+ technical initiatives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="p-4 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
              >
                <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
