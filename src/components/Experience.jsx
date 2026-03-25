import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Experience = () => {
  const { experience } = portfolioData;

  const colorMap = {
    emerald: {
      dot: 'bg-emerald-500',
      glow: 'shadow-emerald-500/30',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      line: 'from-emerald-500',
      accent: 'from-emerald-500 to-teal-600',
    },
    blue: {
      dot: 'bg-blue-500',
      glow: 'shadow-blue-500/30',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      line: 'from-blue-500',
      accent: 'from-blue-500 to-indigo-600',
    },
  };

  return (
    <section id="experience" className="section-compact bg-gray-50 dark:bg-gray-800">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building production-grade AI systems and scalable platforms
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 opacity-30" />

          <div className="space-y-8">
            {experience.map((exp, index) => {
              const colors = colorMap[exp.color] || colorMap.blue;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full ${colors.dot} shadow-lg ${colors.glow} ring-4 ring-white dark:ring-gray-800 z-10`}>
                    {exp.status === 'active' && (
                      <span className={`absolute inset-0 rounded-full ${colors.dot} animate-ping opacity-40`} />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700/50"
                  >
                    {/* Top accent bar */}
                    <div className={`h-1 bg-gradient-to-r ${colors.accent}`} />

                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {exp.company}
                            </h3>
                            {exp.status === 'active' && (
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.badge}`}>
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                            {exp.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
