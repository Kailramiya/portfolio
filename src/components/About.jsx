import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const highlights = [
  {
    label: 'AI / ML Engineering',
    detail: 'NLP, transformer models, production ML pipelines',
    color: 'bg-violet-500',
  },
  {
    label: 'Computer Vision',
    detail: 'Real-time face recognition, multi-threaded video & alerts',
    color: 'bg-emerald-500',
  },
  {
    label: 'Scalable Systems',
    detail: 'Multi-tenant platforms on AWS with async pipelines',
    color: 'bg-orange-500',
  },
  {
    label: 'Full-Stack Dev',
    detail: 'React, Next.js, Node.js, FastAPI, PostgreSQL, MongoDB',
    color: 'bg-sky-500',
  },
];

const quickStats = [
  { value: '2+',    label: 'Internships' },
  { value: '1000+', label: 'DSA solved' },
  { value: '~40%',  label: 'Throughput boost' },
  { value: '26',    label: 'PTE types graded' },
];

const About = () => {
  return (
    <section id="about" className="section-compact bg-zinc-50 dark:bg-zinc-900">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <h2 className="display-heading text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50 mb-4">
                About me
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[58ch]">
                {portfolioData.personal.summary}
              </p>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[58ch]">
              Pursuing B.Tech at{' '}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">IIIT Raichur</span>{' '}
              · CGPA{' '}
              <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">8.16/10</span>.
              Previously at{' '}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">AI4Chat</span>,
              scaling ML inference throughput by ~40%.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {quickStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl bg-white dark:bg-zinc-800/60
                             border border-zinc-100 dark:border-zinc-700/50
                             shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums tracking-tighter leading-none mb-1">
                    {value}
                  </div>
                  <div className="mono-label text-zinc-400 dark:text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — expertise cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="mono-label text-zinc-400 dark:text-zinc-500 mb-5">Areas of expertise</div>
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 rounded-xl
                           bg-white dark:bg-zinc-800/60
                           border border-zinc-100 dark:border-zinc-700/50
                           shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                           transition-all duration-200 group cursor-default"
              >
                <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0 mt-1.5 ring-4 ring-current/20`} />
                <div>
                  <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
