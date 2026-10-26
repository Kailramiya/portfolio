import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

export default function Education() {
  const e = portfolioData.education;
  return (
    <section id="education" className="section pt-0">
      <div className="shell">
        <motion.div {...reveal()} className="border-t border-cream/10 pt-10 grid lg:grid-cols-[220px_1fr_auto] gap-8">
          <p className="label text-lime">/ Education</p>
          <div>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] tracking-tight leading-tight">{e.institution}</h2>
            <p className="mt-2 text-cream/60">{e.degree} · <span className="font-serif italic text-lime text-lg">{e.gpa}</span> CGPA</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Coursework">
              {e.coursework.map((c) => (
                <li key={c} className="chip text-cream/55">{c}</li>
              ))}
            </ul>
          </div>
          <p className="label text-cream/50">{e.period}</p>
        </motion.div>
      </div>
    </section>
  );
}
