import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
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
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
      <ScrollToTopButton />
      
      <footer className="bg-gray-900 dark:bg-black text-white py-6">
        <div className="container-custom section-padding text-center">
          <p className="text-sm">&copy; 2024 Aman Kumar. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-1">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
