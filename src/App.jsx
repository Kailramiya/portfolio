import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CodingDashboard from './components/CodingDashboard';
import Education from './components/Education';
import Contact from './components/Contact';
import ScrollToTopButton from './components/ScrollToTopButton';
import { portfolioData } from './data/portfolio';

const { personal } = portfolioData;
const footerLinks = [
  ['Resume', '/Aman_Kumar_Resume.pdf'],
  ['GitHub', personal.links.github],
  ['LinkedIn', personal.links.linkedin],
  ['LeetCode', personal.links.leetcode],
  ['Email', `mailto:${personal.email}`],
];

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-lime focus:text-ink focus:px-4 focus:py-2 label">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <CodingDashboard />
        <Education />
        <Contact />
      </main>
      <ScrollToTopButton />

      <footer className="bg-ink">
        <div className="shell py-8 flex flex-col md:flex-row items-center justify-between gap-5 label text-cream/50">
          <span>© {new Date().getFullYear()} {personal.name}</span>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map(([label, href]) => (
              <li key={label}>
                <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="hover:text-lime transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <span>Designed & built by Aman</span>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default App;
