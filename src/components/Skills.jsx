import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

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
            Technical Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive expertise across modern development technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center"
                  >
                    <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                      {skill}
                    </span>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="w-2 h-2 bg-primary-500 rounded-full ml-2"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Problem Solving Excellence</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">700+</div>
                <div className="text-primary-100 text-sm">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">&lt;3000</div>
                <div className="text-primary-100 text-sm">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">95%</div>
                <div className="text-primary-100 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
