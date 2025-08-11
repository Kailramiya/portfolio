import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Hero = () => {
  const { personal } = portfolioData;

  const socialLinks = [
    { icon: Github, href: personal.links.github, label: 'GitHub' },
    { icon: Linkedin, href: personal.links.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = "../../public/Aman_kumar_resume_08-08.pdf";
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="container-custom section-padding">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          >
            AK
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-3 gradient-text"
          >
            {personal.name}
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-4"
          >
            {personal.title}
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-5 leading-relaxed"
          >
            {personal.summary}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-3 mb-5"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all text-primary-600 hover:text-primary-700"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 text-gray-600 dark:text-gray-400 mb-6"
          >
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span className="text-xs">{personal.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span className="text-xs">{personal.location}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              Explore My Work
            </motion.a>

            <a
              href='/Aman_kumar_resume_08-08.pdf'
              download="Aman_Kumar_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:bg-primary-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
