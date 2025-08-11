import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, X, AlertCircle,Github,Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const { personal } = portfolioData;
  const socialLinks = [
      { icon: Github, href: personal.links.github, label: 'GitHub' },
      { icon: Linkedin, href: personal.links.linkedin, label: 'LinkedIn' },
      { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
    ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

    // EmailJS configuration
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const MAIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // Your main template
  const AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID; // Auto-reply template
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message,
        to_email: 'officialamankundu@gmail.com',
      };

      // Send main email to you
      await emailjs.send(
        SERVICE_ID,
        MAIN_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      // Send auto-reply to the sender
      await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error('EmailJS error:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-compact bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center section-margin"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate on innovative projects or discuss opportunities
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                  I'm always open to discussing new opportunities and innovative projects.
                </p>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">Email</div>
                    <a href={`mailto:${personal.email}`} className="text-primary-600 dark:text-primary-400 hover:underline text-xs">
                      {personal.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">Phone</div>
                    <a href={`tel:${personal.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline text-xs">
                      {personal.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">Location</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">{personal.location}</div>
                  </div>
                </motion.div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-sm"
                    placeholder="Project collaboration"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-colors text-sm"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl text-sm ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white p-4 rounded-xl shadow-2xl max-w-sm"
          >
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-white mt-1" />
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1">Message Sent! 🎉</h4>
                <p className="text-green-100 text-xs">
                  Thank you for reaching out! I'll get back to you soon.
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-200 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
