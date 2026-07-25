import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Coding',     id: 'codingdashboard' },
  { label: 'Contact',    id: 'contact' },
];

const Header = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Using passive listener — no window.scrollY in state on every tick
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_1px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_24px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom section-padding" aria-label="Primary navigation">
        <div className="flex justify-between items-center h-16">

          {/* Logo — monogram */}
          <button
            onClick={() => handleNavClick('home')}
            aria-label="Go to top"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-indigo-sm group-hover:shadow-indigo-md transition-shadow duration-200">
              <span className="text-white font-black text-sm leading-none">A</span>
            </div>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 tracking-tight hidden sm:block">
              Aman Kumar
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1" role="list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                role="listitem"
                className="px-3 py-1.5 text-sm font-medium
                           text-zinc-500 dark:text-zinc-400
                           hover:text-zinc-900 dark:hover:text-zinc-100
                           hover:bg-zinc-100 dark:hover:bg-zinc-800/80
                           rounded-lg transition-all duration-150"
              >
                {item.label}
              </button>
            ))}
            <div className="ml-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400
                         hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mb-3 py-2 bg-white dark:bg-zinc-900
                         rounded-xl border border-zinc-200 dark:border-zinc-800
                         shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-4 py-2.5 text-sm font-medium
                             text-zinc-600 dark:text-zinc-300
                             hover:text-indigo-600 dark:hover:text-indigo-400
                             hover:bg-zinc-50 dark:hover:bg-zinc-800/60
                             transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
