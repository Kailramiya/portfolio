import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Achievements = () => {
  const achievements = portfolioData.achievements;

  const gradients = [
    "from-primary-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-red-500 to-pink-600",
    "from-purple-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-emerald-600",
  ];

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
            Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Competitive programming milestones and recognition
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {achievements.slice(0, 4).map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all p-5 text-center group"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`text-3xl font-bold bg-gradient-to-br ${gradients[index]} bg-clip-text text-transparent mb-1`}>
                {achievement.stat}
              </div>
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {achievement.label}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-500">
                {achievement.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remaining achievements in smaller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.slice(4).map((achievement, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-4 text-center group"
            >
              <div className={`text-xl font-bold bg-gradient-to-br ${gradients[index + 4]} bg-clip-text text-transparent mb-0.5`}>
                {achievement.stat}
              </div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {achievement.label}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                {achievement.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-emerald-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold mb-1">500+</div>
                <div className="text-white/70 text-xs">LeetCode</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">400+</div>
                <div className="text-white/70 text-xs">GeeksforGeeks</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">50+</div>
                <div className="text-white/70 text-xs">Codeforces</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">&lt;3K</div>
                <div className="text-white/70 text-xs">Global Rank</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
