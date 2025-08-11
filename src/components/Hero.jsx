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
    link.href = '/Aman_kumar_resume_08-08.pdf';
    link.download = 'Aman_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Main photo container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              >
                <img
                  src="/profile-pic.jpg"
                  alt="Aman Kumar"
                  className="w-full h-full object-cover rounded-full border-8 border-white dark:border-gray-800 shadow-2xl relative z-10"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left space-y-6"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
            >
              👋 Hello, I'm
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight"
            >
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium"
            >
              {personal.title}
            </motion.h2>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl lg:max-w-none"
            >
              {personal.summary}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row items-center lg:items-start lg:flex-col xl:flex-row gap-4 text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-600" />
                <span className="text-sm">{personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-600" />
                <span className="text-sm">{personal.location}</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all text-primary-600 hover:text-primary-700 border border-gray-200 dark:border-gray-700"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
              >
                🚀 Explore My Work
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1UN4v1r85zWxOAm2yoN90OT5_CMpxtvD6/view?usp=drive_link"
                
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:bg-primary-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 text-sm"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Stats or Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4"
            >
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                🎯 8.3 GPA
              </div>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                💻 700+ Problems Solved
              </div>
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                🏆 SIH 2024 Finalist
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
