import { Component, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, ArrowDownRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Hero3D = lazy(() => import('./Hero3D'));

// WebGL can fail on old devices; the hero must still render.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const ease = [0.16, 1, 0.3, 1];
const up = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
});

function Marquee() {
  const items = Object.values(portfolioData.skills).flat().slice(0, 14);
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {loop.map((s, i) => (
          <span key={i} className="flex items-center label text-cream/85 text-xs">
            <span className="px-7">{s}</span>
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section id="top" className="relative">
      <div className="shell relative min-h-[100svh] pt-[72px] flex flex-col">
        <div className="flex-1 grid lg:grid-cols-[1.05fr_1fr] items-center gap-6 py-12 lg:py-0">
          <div className="relative z-10 order-2 lg:order-1">
            <motion.p {...up(0.1)} className="label text-lime flex items-center gap-2 mb-6">
              <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
              AI/ML Engineer / India
            </motion.p>

            <h1 className="display text-[clamp(3.4rem,9vw,7.5rem)]">
              <motion.span {...up(0.2)} className="block">Building AI</motion.span>
              <motion.em {...up(0.32)} className="block pr-2">that ships.</motion.em>
            </h1>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-8">
              <motion.p {...up(0.45)} className="max-w-[34ch] text-[15px] leading-relaxed text-cream/75 font-light">
                I'm {personal.name}. I build production AI (NLP, computer vision and automation)
                on backends that hold up under real traffic.
              </motion.p>
              <motion.div {...up(0.55)} className="flex items-center gap-3">
                <a href="/Aman_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-pill">
                  <FileText size={14} strokeWidth={1.5} aria-hidden="true" />
                  Resume
                </a>
                <a
                  href="#work"
                  aria-label="Jump to selected work"
                  className="btn-circle text-lime border-lime/70 hover:bg-lime hover:text-ink"
                >
                  <ArrowDownRight size={18} strokeWidth={1.5} />
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="relative order-1 lg:order-2 h-[340px] sm:h-[440px] lg:h-[620px] -mx-4 sm:mx-0"
          >
            <span className="absolute left-1/2 top-4 -translate-x-1/2 label text-cream/60 z-10">
              Signal / 001
            </span>
            <SceneBoundary>
              <Suspense fallback={null}>
                <Hero3D />
              </Suspense>
            </SceneBoundary>
          </motion.div>
        </div>

        <span
          className="hidden lg:block absolute right-4 xl:right-0 bottom-28 label text-lime [writing-mode:vertical-rl] rotate-180"
          aria-hidden="true"
        >
          Ship with care
        </span>

        <div className="flex items-center justify-between pb-6 label text-cream/50" aria-hidden="true">
          <span className="flex items-center gap-3">
            <span className="w-8 h-px bg-cream/40" />
            Scroll to explore
          </span>
          <span>01 — 08</span>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
