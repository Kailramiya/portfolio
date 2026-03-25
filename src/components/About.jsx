import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Brain, Code, Database, Zap, Server, Eye } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI/ML Engineering",
      description: "NLP, transformer models, and production ML pipelines",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Real-time CV systems with 95% recognition accuracy",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Server,
      title: "Scalable Systems",
      description: "Multi-tenant platforms on AWS with async pipelines",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Code,
      title: "Full-Stack Dev",
      description: "React, Node.js, FastAPI, PostgreSQL, MongoDB",
      gradient: "from-blue-500 to-cyan-600",
    },
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
            Turning ML research into production-grade systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {portfolioData.personal.summary}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              Currently pursuing B.Tech at <span className="font-semibold text-gray-900 dark:text-white">IIIT Raichur</span> with
              a CGPA of <span className="font-semibold text-gray-900 dark:text-white">8.16/10.0</span>. Previously at{' '}
              <span className="font-semibold text-gray-900 dark:text-white">AI4Chat</span>, where I scaled ML inference
              throughput by ~40%. Passionate about PyTorch, HuggingFace, FastAPI, and system design.
            </p>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold gradient-text">2+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Internships</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold gradient-text">1000+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">DSA Problems</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold gradient-text">~40%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Throughput Boost</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">CV Accuracy</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700/50"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
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
