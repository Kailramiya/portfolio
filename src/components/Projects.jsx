import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Filter } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Extract all unique tech stacks from projects
  const getAllTechStacks = () => {
    const allTech = portfolioData.projects.flatMap(project => project.tech);
    return ['All', ...new Set(allTech)].sort();
  };

  const techFilters = getAllTechStacks();

  // Filter projects based on selected tech stack
  const filteredProjects = selectedFilter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => 
        project.tech.includes(selectedFilter)
      );

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
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            A showcase of innovative solutions spanning web development, AI/ML, and system architecture
          </p>

          {/* Tech Stack Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Filter size={18} />
              <span className="font-medium text-sm">Filter by Technology:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              {techFilters.map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => setSelectedFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFilter === tech
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {selectedFilter !== 'All' && ` with ${selectedFilter}`}
            </p>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.id}-${selectedFilter}`} // Key includes filter for animation
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Live' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {project.period && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={14} />
                      <span>{project.period}</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start text-xs">
                          <span className="text-primary-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1 }}
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          selectedFilter === tech
                            ? 'bg-primary-600 text-white'
                            : 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800'
                        }`}
                        onClick={() => setSelectedFilter(tech)}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs"
                    >
                      <Github size={14} />
                      Code
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="lg:w-64">
                  <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg p-6 text-white h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🚀</div>
                      <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                      <p className="text-primary-100 text-xs">
                        {project.tech.slice(0, 3).join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No projects found message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No projects found with the selected technology: <strong>{selectedFilter}</strong>
            </p>
            <motion.button
              onClick={() => setSelectedFilter('All')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Show All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
