import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Brain, Code, Monitor, Server, Database, Cloud } from 'lucide-react';

const categoryIcons = {
  "AI / ML": Brain,
  "Languages": Code,
  "Frontend": Monitor,
  "Backend": Server,
  "Databases": Database,
  "Cloud & DevOps": Cloud,
};

const categoryGradients = {
  "AI / ML": "from-purple-500 to-indigo-600",
  "Languages": "from-blue-500 to-cyan-600",
  "Frontend": "from-emerald-500 to-teal-600",
  "Backend": "from-orange-500 to-red-600",
  "Databases": "from-pink-500 to-rose-600",
  "Cloud & DevOps": "from-amber-500 to-orange-600",
};

const Skills = () => {
  const skillCategories = Object.entries(portfolioData.skills);

  return (
    <section id="skills" className="section-compact bg-white dark:bg-gray-900">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Tech Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and technologies I work with daily
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map(([category, skills], index) => {
            const Icon = categoryIcons[category] || Code;
            const gradient = categoryGradients[category] || "from-gray-500 to-gray-600";

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700/50 overflow-hidden"
              >
                {/* Top accent */}
                <div className={`h-1 bg-gradient-to-r ${gradient}`} />

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
