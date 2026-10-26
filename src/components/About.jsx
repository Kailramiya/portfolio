import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

const focus = [
  {
    title: 'Applied AI / ML',
    body: 'Transformer NLP, computer vision and vision-LLM pipelines, tuned for latency and reliability rather than demos.',
  },
  {
    title: 'Systems & APIs',
    body: 'Multi-tenant platforms, RBAC, payments, caching and rate limiting: the plumbing that keeps a product honest.',
  },
  {
    title: 'Automation',
    body: 'RPA bots that replace manual workflows end to end, packaged, licensed and monitored like real software.',
  },
];

export default function About() {
  const { personal, experience, education } = portfolioData;
  const facts = [
    ['Based in', personal.location],
    ['Currently', `${experience[0].role} @ ${experience[0].company}`],
    ['Studying', `B.Tech CSE · IIIT Raichur · ${education.gpa.split('/')[0]} CGPA`],
  ];

  return (
    <>
      <section id="about" className="section">
        <div className="shell grid lg:grid-cols-[220px_1fr] gap-10">
          <p className="label text-lime lg:pt-6">/ A quick read</p>
          <div>
            <motion.h2 {...reveal()} className="display text-[clamp(2.3rem,5.4vw,4.4rem)] leading-[1.02] max-w-[18ch]">
              I like problems where <em className="text-lime">models</em> meet messy, real-world systems.
            </motion.h2>
            <div className="mt-14 md:pl-[30%] lg:pl-[38%]">
              <motion.p {...reveal(0.1)} className="max-w-[46ch] text-[15px] leading-relaxed text-cream/70 font-light">
                {personal.summary}
              </motion.p>
              <motion.dl {...reveal(0.2)} className="mt-10 divide-y divide-cream/10 border-y border-cream/10 max-w-[46ch]">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3.5 text-sm">
                    <dt className="label text-cream/50 pt-0.5">{k}</dt>
                    <dd className="text-right text-cream/90">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="section pt-0">
        <div className="shell grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <p className="label text-lime mb-6">/ Focus</p>
            <h2 id="focus-heading" className="display text-[clamp(2.6rem,5.5vw,4.6rem)]">
              Useful, by <br /><em className="text-lime">design.</em>
            </h2>
          </div>
          <ol className="border-t border-cream/10">
            {focus.map((f, i) => (
              <motion.li
                key={f.title}
                {...reveal(i * 0.08)}
                className="group grid grid-cols-[48px_1fr_auto] gap-4 items-start py-8 border-b border-cream/10"
              >
                <span className="label text-lime pt-2">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-cream/60 leading-relaxed max-w-[48ch]">{f.body}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-lime text-xl pt-1 transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
