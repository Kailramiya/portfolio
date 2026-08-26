import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
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
    { icon: Phone,    href: `tel:${personal.phone}`, label: 'Phone' },
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
                          bg-white/20 dark:bg-zinc-900/30 backdrop-blur-2xl saturate-[2]
                          border border-white/40 dark:border-zinc-700/30 
                          shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)] 
                          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            
            <a href="#contact" className="hidden sm:block mr-2 border-r border-zinc-400/30 dark:border-zinc-700/50 pr-5 group cursor-pointer transition-all">
              <span className="mono-label text-zinc-700 dark:text-zinc-300 whitespace-nowrap group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Let's Connect</span>
            </a>

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
