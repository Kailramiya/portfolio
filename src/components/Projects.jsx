import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

// Hover wash per project: [panel, text on panel]. Cycles if there are more projects.
const washes = [
  ['#171916', '#e6e1d6'],
  ['#d3ff43', '#11120f'],
  ['#3f5373', '#e6e1d6'],
  ['#a84a30', '#e6e1d6'],
  ['#5b3fa0', '#e6e1d6'],
];

export default function Projects() {
  return (
    <section id="work" className="section bg-paper text-paper-ink">
      <div className="shell">
        <div className="grid lg:grid-cols-[220px_1fr_auto] items-end gap-6 mb-16">
          <p className="label text-olive order-2 lg:order-1">/ Selected work</p>
          <h2 className="display text-[clamp(2.8rem,6vw,5rem)] order-1 lg:order-2">
            Things I've <br /><em className="text-olive">put into production.</em>
          </h2>
          <span className="label text-paper-dim order-3 hidden lg:block">2024—26</span>
        </div>

        <ol>
          {portfolioData.projects.map((p, i) => {
            const [title, kicker] = p.title.split(' – ');
            const primary = p.demo || p.github;
            const [wash, washFg] = washes[i % washes.length];
            return (
              <motion.li
                {...reveal()}
                key={p.id}
                style={{ '--wash': wash, '--wash-fg': washFg }}
                className="project border-t border-paper-ink/15 py-10 md:py-14"
              >
                <div className="flex justify-between label text-paper-dim wash-dim mb-8">
                  <span>0{i + 1}</span>
                  <span>{p.period}</span>
                </div>

                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-6 md:gap-12 items-start">
                  <div>
                    {kicker && <p className="label text-olive wash-text mb-3">{kicker}</p>}
                    <h3 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">{title}</h3>
                  </div>

                  <div>
                    <p className="text-[15px] leading-relaxed text-paper-ink/75 wash-text max-w-[44ch]">{p.description}</p>
                    <details className="group mt-5 max-w-[44ch]">
                      <summary className="label text-olive wash-text cursor-pointer list-none hover:underline">
                        <span className="group-open:hidden">+ Engineering notes</span>
                        <span className="hidden group-open:inline">− Hide notes</span>
                      </summary>
                      <ul className="mt-4 space-y-3">
                        {p.features.map((f, j) => (
                          <li key={j} className="grid grid-cols-[16px_1fr] gap-2 text-sm leading-relaxed text-paper-ink/70 wash-text">
                            <span className="text-olive wash-text" aria-hidden="true">—</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    <a
                      href={primary}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${title}${p.demo ? ' live' : ' on GitHub'}`}
                      className="btn-circle w-14 h-14 border-paper-ink/80"
                    >
                      <ArrowUpRight size={20} strokeWidth={1.5} className="arrow" />
                    </a>
                    {p.demo && p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${title} source on GitHub`}
                        className="btn-circle w-14 h-14 border-paper-ink/25"
                      >
                        <Github size={18} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>

                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="chip text-paper-dim wash-dim">{t}</li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
