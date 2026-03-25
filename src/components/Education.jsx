import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
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
            Academic foundation in computer science
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50">
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-emerald-500" />

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left - Icon + GPA */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                  >
                    <GraduationCap size={28} />
                  </motion.div>

                  {/* GPA card */}
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-100 dark:border-primary-800/30">
                    <div className="text-2xl font-bold gradient-text">{education.gpa}</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">CGPA</div>
                  </div>
                </div>

                {/* Right - Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.degree}
                  </h3>

                  <h4 className="text-base text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {education.institution}
                  </h4>

                  <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary-500" />
                      <span>{education.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary-500" />
                      <span>{education.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={15} className="text-primary-500" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Core Coursework
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {education.coursework.map((course) => (
                        <motion.div
                          key={course}
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex-shrink-0" />
                          {course}
                        </motion.div>
                      ))}
                    </div>
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
