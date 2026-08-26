import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    // Show after scrolling past Hero section
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection observer to hide when near Contact section
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsAtContact(entries[0].isIntersecting);
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(contactSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const socialLinks = [
    { icon: Github,   href: personal.links.github,   label: 'GitHub'   },
    { icon: Linkedin, href: personal.links.linkedin, label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${personal.email}`, label: 'Email' },
  ];

  return (
    <AnimatePresence>
      {isVisible && !isAtContact && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
        >
          <div className="flex items-center gap-5 px-6 py-3.5 rounded-full 
                          bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl saturate-150
                          border border-zinc-200/50 dark:border-zinc-800/50 
                          shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            
            <div className="hidden sm:block mr-2 border-r border-zinc-300/50 dark:border-zinc-700/50 pr-5">
              <span className="mono-label text-zinc-600 dark:text-zinc-400 whitespace-nowrap">Let's Connect</span>
            </div>

            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
              >
                <Icon size={20} strokeWidth={1.75} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
