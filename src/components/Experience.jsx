import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

const PREVIEW = 3;

function Role({ job, index }) {
  const [open, setOpen] = useState(false);
  const bullets = open ? job.description : job.description.slice(0, PREVIEW);
  const listId = `exp-${job.id}`;

  return (
    <motion.article {...reveal()} className="border-t border-cream/10 py-12">
      <div className="flex items-center justify-between label text-cream/50 mb-8">
        <span>0{index + 1}</span>
        <span className="flex items-center gap-3">
          {job.status === 'active' && (
            <span className="inline-flex items-center gap-1.5 text-lime">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" aria-hidden="true" />
              Now
            </span>
          )}
          {job.period}
        </span>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16">
        <div>
          <p className="label text-lime mb-3">{job.role}</p>
          <h3 className="display text-[clamp(2.4rem,5vw,4rem)]">{job.company}</h3>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2" aria-label="Technologies">
            {job.tech.map((t) => (
              <li key={t} className="chip text-cream/55">{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <ul id={listId} className="space-y-4">
            {bullets.map((d, i) => (
              <li key={i} className="grid grid-cols-[16px_1fr] gap-3 text-[15px] leading-relaxed text-cream/75 font-light">
                <span className="text-lime mt-[2px]" aria-hidden="true">—</span>
                {d}
              </li>
            ))}
          </ul>
          {job.description.length > PREVIEW && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((o) => !o)}
              className="mt-6 label text-lime hover:text-cream transition-colors"
            >
              {open ? '− Show less' : `+ ${job.description.length - PREVIEW} more`}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section bg-ink-2">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <p className="label text-lime mb-6">/ Experience</p>
            <h2 className="display text-[clamp(2.8rem,6vw,5rem)]">
              Where I've <br /><em className="text-lime">shipped.</em>
            </h2>
          </div>
          <span className="label text-cream/50 hidden sm:block">2025—now</span>
        </div>
        {portfolioData.experience.map((job, i) => (
          <Role key={job.id} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
