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

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Experience />
      <CodingDashboard />
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
      <ScrollToTopButton />

      <footer className="relative bg-gray-950 text-white py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950" />
        <div className="relative container-custom section-padding text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-500" />
            <span className="text-sm font-semibold gradient-text">Aman Kumar</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <p className="text-gray-500 text-xs">
            Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
