import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import CodingDashboard from './components/CodingDashboard';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ScrollToTopButton from './components/ScrollToTopButton';
import CursorTrail from './components/CursorTrail';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <CursorTrail />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <CodingDashboard />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <ScrollToTopButton />

      <footer className="relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white py-10 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        {/* Ambient top fade */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative container-custom section-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">A</span>
              </div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">Aman Kumar</span>
            </div>

            <p className="mono-label text-zinc-500 dark:text-zinc-600 text-center">
              Built with React, Vite &amp; Tailwind · Deployed on Vercel
            </p>

            <p className="mono-label text-zinc-500 dark:text-zinc-700">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
