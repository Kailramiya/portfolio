import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Copy, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { reveal } from './reveal';

const empty = { name: '', email: '', subject: '', message: '', company: '' };
const intents = ['Full-time role', 'Internship', 'Freelance project', 'Just saying hi'];

const istTime = () =>
  new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());

export default function Contact() {
  const { personal } = portfolioData;
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(istTime);

  useEffect(() => {
    const id = setInterval(() => setTime(istTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');
      setForm(empty);
      setStatus('sent');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Ctrl/Cmd + Enter in the message box submits.
  const onMessageKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) e.currentTarget.form.requestSubmit();
  };

  const socials = [
    ['GitHub', personal.links.github],
    ['LinkedIn', personal.links.linkedin],
    ['LeetCode', personal.links.leetcode],
    ['Codeforces', personal.links.codeforces],
  ];

  return (
    <section id="contact" className="bg-lime text-ink pt-24 md:pt-32 pb-16">
      <div className="shell">
        <p className="label mb-10">/ Start a conversation</p>
        <motion.h2 {...reveal()} className="display text-[clamp(3.4rem,11vw,10rem)] leading-[0.88]">
          Let's build <br /><em>something real.</em>
        </motion.h2>

        <div className="mt-20 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-3 text-[clamp(1.2rem,2.6vw,2rem)] tracking-tight border-b border-ink pb-1 break-all"
              >
                {personal.email}
                <ArrowUpRight size={24} strokeWidth={1.5} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-ink/40 label hover:bg-ink hover:text-lime transition-colors"
              >
                {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <dl className="mt-10 space-y-3 text-sm">
              <div className="flex gap-6"><dt className="label w-20 pt-0.5 opacity-60">Phone</dt><dd><a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="hover:underline">{personal.phone}</a></dd></div>
              <div className="flex gap-6">
                <dt className="label w-20 pt-0.5 opacity-60">Based in</dt>
                <dd>
                  {personal.location} · <time className="tabular-nums">{time}</time> IST
                </dd>
              </div>
              <div className="flex gap-6"><dt className="label w-20 pt-0.5 opacity-60">Reply</dt><dd>Within 24 hours</dd></div>
            </dl>
            <ul className="mt-10 flex flex-wrap gap-2">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center h-10 px-4 rounded-full border border-ink/40 label hover:bg-ink hover:text-lime transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="self-center"
              >
                <p className="label opacity-70 mb-5">/ Message received</p>
                <p className="display text-[clamp(2.6rem,5vw,4.2rem)]">
                  Thanks, <br /><em>talk soon.</em>
                </p>
                <p className="mt-5 text-sm opacity-75 max-w-[38ch]">I read every message myself and usually reply within a day.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-8 label border-b border-ink pb-1 hover:opacity-70">
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                onSubmit={onSubmit}
                className="space-y-6"
              >
                {/* Honeypot — hidden from real users */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company (leave blank)</label>
                  <input id="company" name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" />
                </div>

                <fieldset>
                  <legend className="label opacity-70 mb-3">I'm reaching out about</legend>
                  <div className="flex flex-wrap gap-2">
                    {intents.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={form.subject === t}
                        onClick={() => setForm((f) => ({ ...f, subject: t }))}
                        className={`h-9 px-4 rounded-full border text-sm transition-colors ${
                          form.subject === t ? 'bg-ink text-lime border-ink' : 'border-ink/40 hover:border-ink'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="c-name" className="label opacity-70">Name</label>
                    <input id="c-name" name="name" required autoComplete="name" value={form.name} onChange={onChange} placeholder="Your name" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="label opacity-70">Email</label>
                    <input id="c-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} placeholder="you@company.com" className="field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="label opacity-70">Subject</label>
                  <input id="c-subject" name="subject" required autoComplete="off" value={form.subject} onChange={onChange} placeholder="Role, project, or just hello" className="field" />
                </div>
                <div>
                  <label htmlFor="c-message" className="label opacity-70">Message</label>
                  <textarea id="c-message" name="message" rows={4} required autoComplete="off" value={form.message} onChange={onChange} onKeyDown={onMessageKey} placeholder="Tell me a little about it…" className="field resize-none" />
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-ink text-lime label disabled:opacity-60 transition-opacity"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-lime text-ink transition-transform group-hover:translate-x-1">
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </button>
                  <span className="label opacity-50 hidden sm:inline">or Ctrl + Enter</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div role="status" aria-live="polite">
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-20 right-4 z-50 flex items-start gap-3 max-w-xs bg-ink text-cream border border-cream/15 p-4 rounded-xl shadow-2xl"
            >
              <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 bg-red-400" aria-hidden="true" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Failed to send</p>
                <p className="text-cream/60 text-xs mt-0.5">Try emailing me directly instead.</p>
              </div>
              <button type="button" onClick={() => setStatus('idle')} aria-label="Dismiss">
                <X size={15} className="text-cream/50 hover:text-cream" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
