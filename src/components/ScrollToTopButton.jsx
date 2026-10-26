import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Scroll-progress pill that doubles as back-to-top.
export default function ScrollToTopButton() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-[3px] bg-lime origin-left" style={{ width: `${pct}%` }} aria-hidden="true" />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={`Back to top (${pct}% scrolled)`}
        className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-ink/90 backdrop-blur border border-cream/15 text-cream label transition-all duration-500 hover:border-lime hover:text-lime ${
          pct > 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={13} aria-hidden="true" />
        <span className="tabular-nums">{pct}%</span>
      </button>
    </>
  );
}
