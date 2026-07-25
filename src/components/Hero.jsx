import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = () => {
  const { personal } = portfolioData;

  const [show3D, setShow3D] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse  = window.matchMedia('(pointer: coarse)').matches;
    setShow3D(!reduced);
    setTiltEnabled(!reduced && !coarse);
  }, []);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springCfg = { stiffness: 100, damping: 20, mass: 0.5 };
  const sx = useSpring(mvX, springCfg);
  const sy = useSpring(mvY, springCfg);

  const photoRotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const photoRotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const contentRotateY = useTransform(sx, [-0.5, 0.5], [5, -5]);
  const contentRotateX = useTransform(sy, [-0.5, 0.5], [-3, 3]);

  const handlePointer = (e) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - r.left) / r.width - 0.5);
    mvY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => { mvX.set(0); mvY.set(0); };

  const socialLinks = [
    { icon: Github,   href: personal.links.github,             label: 'GitHub'   },
    { icon: Linkedin, href: personal.links.linkedin,           label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${personal.email}`,         label: 'Email'    },
  ];

  const stats = [
    { value: '8.16', label: 'CGPA' },
    { value: '1000+', label: 'Problems' },
    { value: '1540', label: 'LC Rating' },
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16">

      {/* Background — dark slate with warm tint, not pure black */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-slate-50 to-indigo-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950/20" />

      {/* Ambient orbs — desaturated, intentional placement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/8 dark:bg-indigo-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/8 dark:bg-violet-500/4 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-2/3 left-1/3 w-56 h-56 bg-emerald-500/6 dark:bg-emerald-500/3 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* 3D neural core */}
      {show3D && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-80">
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 container-custom section-padding w-full">
        <div
          className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center py-12"
          style={{ perspective: 1200 }}
          onMouseMove={handlePointer}
          onMouseLeave={resetPointer}
        >

          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: photoRotateX, rotateY: photoRotateY, transformStyle: 'preserve-3d' }}
            className="flex justify-center lg:justify-end order-1 lg:order-1"
          >
            <div className="relative group" style={{ transformStyle: 'preserve-3d' }}>
              {/* Outer glow */}
              <div className="absolute -inset-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 rounded-full opacity-15 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />

              {/* Spinning gradient ring */}
              <div className="absolute -inset-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 rounded-full animate-spin-slow opacity-70" />

              {/* White gap ring */}
              <div className="absolute -inset-[1px] bg-white dark:bg-zinc-950 rounded-full" />

              {/* Photo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="relative w-60 h-60 md:w-72 md:h-72 lg:w-[21rem] lg:h-[21rem]"
              >
                <img
                  src="/profile-pic.jpg"
                  alt="Aman Kumar — AI/ML Engineer"
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
              </motion.div>

              {/* Floating badge — SDE */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ z: 60 }}
                className="absolute -top-1 -right-3 z-20 px-3 py-1.5 bg-white dark:bg-zinc-900 rounded-full shadow-indigo-sm border border-zinc-100 dark:border-zinc-800"
              >
                <span className="mono-label text-emerald-600 dark:text-emerald-400">SDE Intern</span>
              </motion.div>

              {/* Floating badge — AI/ML */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ z: 50 }}
                className="absolute -bottom-1 -left-3 z-20 px-3 py-1.5 bg-white dark:bg-zinc-900 rounded-full shadow-indigo-sm border border-zinc-100 dark:border-zinc-800"
              >
                <span className="mono-label text-indigo-600 dark:text-indigo-400">AI · ML</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: 'preserve-3d' }}
            className="text-center lg:text-left space-y-6 order-2 lg:order-2"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                         bg-emerald-50 dark:bg-emerald-950/40
                         border border-emerald-200 dark:border-emerald-800/60
                         text-emerald-700 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="mono-label text-emerald-700 dark:text-emerald-400">Open to opportunities</span>
            </motion.div>

            {/* Name — display heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mono-label text-zinc-400 dark:text-zinc-500 mb-2">Hello, I'm</div>
              <h1 className="display-heading text-5xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-50">
                <span className="gradient-text">Aman Kumar</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium tracking-snug"
            >
              {personal.title}
            </motion.p>

            {/* One-liner summary — shorter, punchier */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[55ch] lg:max-w-none"
            >
              Building production AI systems at QuickIntell — RPA bots, NLP pipelines, and full-stack platforms.
              IIIT Raichur · 1000+ DSA problems · Global rank &lt;3000.
            </motion.p>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900
                             rounded-lg border border-zinc-200 dark:border-zinc-800
                             shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                >
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tabular-nums">{value}</span>
                  <span className="mono-label text-zinc-400 dark:text-zinc-500">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs + Social */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900
                               border border-zinc-200 dark:border-zinc-800
                               text-zinc-600 dark:text-zinc-400
                               hover:text-indigo-600 dark:hover:text-indigo-400
                               hover:border-indigo-300 dark:hover:border-indigo-700
                               shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                               transition-all duration-200"
                  >
                    <Icon size={19} strokeWidth={1.75} />
                  </motion.a>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  href="#experience"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                             bg-indigo-600 hover:bg-indigo-500
                             shadow-indigo-sm hover:shadow-indigo-md
                             transition-all duration-200"
                >
                  View my work
                </motion.a>

                <motion.a
                  href="/Aman_Kumar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                             bg-white dark:bg-zinc-900
                             text-zinc-700 dark:text-zinc-300
                             border border-zinc-200 dark:border-zinc-800
                             hover:border-indigo-300 dark:hover:border-indigo-700
                             shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                             transition-all duration-200"
                >
                  <Download size={15} strokeWidth={2} />
                  Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-zinc-300 dark:text-zinc-600"
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
