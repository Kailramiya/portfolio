import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="section-compact bg-gray-50 dark:bg-gray-800">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Academic excellence in computer science and engineering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4"
                >
                  <GraduationCap size={32} />
                </motion.div>
              </div>

              <div className="md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.degree}
                </h3>
                
                <h4 className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-3">
                  {education.institution}
                </h4>

                <div className="flex flex-col sm:flex-row gap-3 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{education.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{education.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-yellow-500" size={18} />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      Academic Performance
                    </span>
                  </div>
                  <div className="text-xl font-bold gradient-text">
                    {education.gpa}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    Core Coursework:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {education.coursework.map((course) => (
                      <div
                        key={course}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs"
                      >
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
