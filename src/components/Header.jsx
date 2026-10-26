import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'Selected work', href: '#work' },
  { label: 'Tech stack', href: '#stack' },
  { label: 'Stats', href: '#stats' },
  { label: 'Resume', href: '/Aman_Kumar_Resume.pdf', external: true },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkProps = (l) => (l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        open ? 'bg-ink' : scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="shell">
        <div className="flex h-[72px] items-center justify-between border-b border-cream/10">
          <a href="#top" className="text-lg font-semibold tracking-tight" aria-label="Aman Kumar, back to top">
            AK<span className="text-lime align-super text-xs">°</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...linkProps(l)}
                    className="label text-cream/80 hover:text-lime transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-2 label text-cream/80">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" aria-hidden="true" />
            Open to SDE roles
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-cream"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden shell pb-8">
          <ul className="divide-y divide-cream/10">
            {links.map((l, i) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...linkProps(l)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 text-2xl tracking-tight hover:text-lime transition-colors"
                >
                  <span className="label text-lime">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 label text-cream/70">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
            Open to SDE roles
          </div>
        </nav>
      )}
    </header>
  );
}
