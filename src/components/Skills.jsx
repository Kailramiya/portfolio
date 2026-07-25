import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const categoryAccents = {
  'AI / ML':        { dot: 'bg-violet-500',  ring: 'ring-violet-500/20',  label: 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' },
  'Languages':      { dot: 'bg-sky-500',     ring: 'ring-sky-500/20',     label: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300' },
  'Frontend':       { dot: 'bg-emerald-500', ring: 'ring-emerald-500/20', label: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' },
  'Backend':        { dot: 'bg-orange-500',  ring: 'ring-orange-500/20',  label: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300' },
  'Databases':      { dot: 'bg-rose-500',    ring: 'ring-rose-500/20',    label: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' },
  'Cloud & DevOps': { dot: 'bg-amber-500',   ring: 'ring-amber-500/20',   label: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' },
};

const Skills = () => {
  const skillCategories = Object.entries(portfolioData.skills);

  return (
    <section id="skills" className="section-compact bg-white dark:bg-zinc-950">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-margin"
        >
          <h2 className="display-heading text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-3">
            Tech Stack
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-[52ch]">
            Tools I work with daily across AI, backend, and frontend.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map(([category, skills], index) => {
            const accent = categoryAccents[category] || categoryAccents['Languages'];
            // First card gets featured treatment (col-span-2 on lg)
            const isFeatured = index === 0;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className={`card-base p-6 group relative overflow-hidden transition-all duration-300
                  hover:shadow-card-hover dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                  ${isFeatured ? 'lg:col-span-2' : ''}`}
              >
                {/* Subtle top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${accent.dot}`} />

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${accent.dot} ring-4 ${accent.ring}`} />
                    <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 tracking-tight">
                      {category}
                    </span>
                  </div>
                  <span className="mono-label text-zinc-400 dark:text-zinc-600">
                    {skills.length} tools
                  </span>
                </div>

                {/* Skills grid */}
                <div className={`flex flex-wrap gap-2 ${isFeatured ? 'md:gap-2.5' : ''}`}>
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.07 + i * 0.04,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="skill-pill"
                    >
                      {skill}
                    </motion.span>
                  ))}
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
