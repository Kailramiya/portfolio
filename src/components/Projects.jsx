import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const projectGradients = [
  "from-purple-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-cyan-600",
  "from-orange-500 to-red-600",
];

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="projects" className="section-compact bg-gray-50 dark:bg-gray-800">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI/ML systems, full-stack platforms, and computer vision solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project, index) => {
            const gradient = projectGradients[index % projectGradients.length];
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700/50"
              >
                {/* Project header with gradient */}
                <div className={`bg-gradient-to-r ${gradient} p-5 text-white`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold mb-1 leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <Calendar size={12} />
                        <span>{project.period}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      project.status === 'Live'
                        ? 'bg-white/20 text-white'
                        : 'bg-white/15 text-white/90'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project body */}
                <div className="p-5">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Expandable features */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-3 transition-colors"
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                    {isExpanded ? 'Hide' : 'Show'} Key Features
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 mb-4 overflow-hidden"
                      >
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient} flex-shrink-0`} />
                            {feature}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
                    >
                      <Github size={14} />
                      Source Code
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r ${gradient} text-white rounded-lg transition-colors text-xs font-medium`}
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
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

export default Projects;
