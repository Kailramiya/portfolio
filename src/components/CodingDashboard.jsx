import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { useCodingStats } from '../hooks/useCodingStats';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

const calendarTheme = { dark: ['#22231d', '#4e5f1e', '#7a9a20', '#a9d12f', '#d3ff43'] };

const num = (v) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : null);

export default function CodingDashboard() {
  const { data, loading, error, reload, handles } = useCodingStats();
  const [year, setYear] = useState('last');
  const n = data?.normalized || {};

  const currentYear = new Date().getFullYear();
  const years = ['last', ...Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i)];

  // Live values replace the static fallbacks in portfolio.js when the API answers.
  const live = useMemo(() => {
    const solved = [
      n.leetcode?.solved?.total,
      n.codeforces?.solved?.total,
      n.codechef?.solved?.total,
      n.geeksforgeeks?.totalSolved,
    ].map(num).filter((v) => v != null);
    return {
      totalSolved: solved.length ? solved.reduce((a, b) => a + b, 0) : null,
      leetcodeRating: num(n.leetcode?.contest?.rating),
      gfgScore: num(n.geeksforgeeks?.codingScore),
      codeforcesMax: num(n.codeforces?.maxRating),
      codechefMax: num(n.codechef?.maxRating ?? n.codechef?.rating),
    };
  }, [n]);

  const platforms = [
    {
      name: 'LeetCode',
      url: handles.leetcode && `https://leetcode.com/${handles.leetcode}/`,
      rows: [
        ['Solved', n.leetcode?.solved?.total],
        ['Easy / Med / Hard', n.leetcode && [n.leetcode.solved?.easy, n.leetcode.solved?.medium, n.leetcode.solved?.hard].join(' / ')],
        ['Contest rating', num(n.leetcode?.contest?.rating)],
      ],
    },
    {
      name: 'Codeforces',
      url: handles.codeforces && `https://codeforces.com/profile/${handles.codeforces}`,
      rows: [
        ['Rating', n.codeforces?.rating],
        ['Max rating', n.codeforces?.maxRating],
        ['Rank', n.codeforces?.rank],
      ],
    },
    {
      name: 'GeeksforGeeks',
      url: handles.gfg && `https://www.geeksforgeeks.org/user/${handles.gfg}/`,
      rows: [
        ['Solved', n.geeksforgeeks?.totalSolved],
        ['Coding score', n.geeksforgeeks?.codingScore],
        ['Institute rank', n.geeksforgeeks?.instituteRank],
      ],
    },
  ];

  return (
    <section id="stats" className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <p className="label text-lime mb-6">/ Proof of practice</p>
            <h2 className="display text-[clamp(2.8rem,6vw,5rem)]">
              Numbers that <br /><em className="text-lime">keep moving.</em>
            </h2>
          </div>
          <p className="label text-cream/50 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${data ? 'bg-lime' : 'bg-cream/40'}`} aria-hidden="true" />
            {loading ? 'Syncing…' : data ? 'Live · synced every 6h' : 'Offline · last known'}
          </p>
        </div>

        {/* Headline numbers */}
        <dl className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-cream/10">
          {portfolioData.achievements.map((a, i) => (
            <motion.div
              {...reveal((i % 4) * 0.06)}
              key={a.title}
              className="border-r border-b border-cream/10 p-5 md:p-7"
            >
              <dt className="label text-cream/50">{a.label}</dt>
              <dd className="mt-4 display text-[clamp(2rem,4vw,3.2rem)] tabular-nums text-cream">
                {(a.live && live[a.live]) ?? a.stat}
              </dd>
              <dd className="mt-2 text-xs text-cream/50 leading-snug">{a.detail}</dd>
            </motion.div>
          ))}
        </dl>

        {error && (
          <div role="status" className="mt-6 flex items-center justify-between gap-4 border border-cream/15 px-5 py-4 text-sm text-cream/70">
            Couldn't reach the stats API, so you're seeing last known values.
            <button type="button" onClick={reload} className="btn-pill h-9 shrink-0">
              <RefreshCw size={13} aria-hidden="true" /> Retry
            </button>
          </div>
        )}

        {/* Per-platform detail */}
        <div className="mt-16 grid md:grid-cols-3 gap-x-10">
          {platforms.map((p) => (
            <div key={p.name} className="border-t border-cream/10 py-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl tracking-tight">{p.name}</h3>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} profile`}
                    className="btn-circle w-10 h-10 text-cream/70 border-cream/25 hover:text-ink hover:bg-lime hover:border-lime"
                  >
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </a>
                )}
              </div>
              <dl className="space-y-2.5">
                {p.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 text-sm">
                    <dt className="text-cream/50">{k}</dt>
                    <dd className="tabular-nums text-cream/90">
                      {loading ? <span className="inline-block w-10 h-3 bg-cream/10 animate-pulse" /> : v ?? '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* GitHub calendar */}
        <motion.div {...reveal()} className="mt-16 border-t border-cream/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl tracking-tight">GitHub contributions</h3>
            <label className="flex items-center gap-3 label text-cream/50">
              Year
              <select
                value={year}
                onChange={(e) => setYear(e.target.value === 'last' ? 'last' : Number(e.target.value))}
                className="bg-ink-2 border border-cream/20 rounded-full px-4 py-2 text-cream normal-case tracking-normal font-sans text-sm focus:border-lime"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y === 'last' ? 'Last 12 months' : y}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="overflow-x-auto pb-4 text-cream/60">
            <div className="min-w-[760px]">
              <GitHubCalendar
                username={handles?.github || 'Kailramiya'}
                colorScheme="dark"
                theme={calendarTheme}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                year={year}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
