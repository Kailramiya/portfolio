import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

export default function Skills() {
  return (
    <section id="stack" className="section bg-ink-2">
      <div className="shell grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
        <div>
          <p className="label text-lime mb-6">/ Technical skills & stack</p>
          <h2 className="display text-[clamp(2.6rem,5.5vw,4.6rem)]">
            Engineering <br /><em className="text-lime">toolkit.</em>
          </h2>
          <p className="mt-8 inline-flex rounded-full border border-lime/60 px-4 py-2 label text-lime">
            1000+ DSA problems · GeekStreak top 5%
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12">
          {Object.entries(portfolioData.skills).map(([group, items], i) => (
            <motion.div {...reveal((i % 2) * 0.08)} key={group} className="border-t border-cream/10 py-7">
              <h3 className="label text-lime mb-3">{group}</h3>
              <p className="text-[15px] leading-relaxed text-cream/85">{items.join(' · ')}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
