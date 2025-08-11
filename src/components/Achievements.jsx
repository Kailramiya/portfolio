import { motion } from 'framer-motion';
import { Trophy, Star, Target, Users, Code, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Achievements = () => {
  const achievementIcons = [Trophy, Star, Target, Users, Code, Shield];

  return (
    <section id="achievements" className="section-compact bg-white dark:bg-gray-900">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognition for excellence in competitive programming and technical leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {portfolioData.achievements.map((achievement, index) => {
            const IconComponent = achievementIcons[index % achievementIcons.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium leading-relaxed text-sm">
                      {achievement}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-3">Competitive Programming Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-bold mb-1">350+</div>
                <div className="text-primary-100 text-sm">LeetCode</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">300+</div>
                <div className="text-primary-100 text-sm">GeeksforGeeks</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">50+</div>
                <div className="text-primary-100 text-sm">Codeforces</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">&lt;3K</div>
                <div className="text-primary-100 text-sm">Global Rank</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
