import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, X, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const { personal } = portfolioData;

  const contactLinks = [
    { icon: Mail,    label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
    { icon: Phone,   label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}` },
    { icon: MapPin,  label: 'Location', value: personal.location, href: null },
  ];

  const socialLinks = [
    { icon: Github,   href: personal.links.github,   label: 'GitHub'   },
    { icon: Linkedin, href: personal.links.linkedin,  label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${personal.email}`, label: 'Email' },
  ];

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', company: '' });
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', company: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-compact bg-zinc-950 relative overflow-hidden noise-overlay">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-zinc-950 to-violet-950/20 pointer-events-none" />
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="relative z-10 container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-margin"
        >
          <h2 className="display-heading text-4xl md:text-5xl text-zinc-50 mb-3">
            Let's connect
          </h2>
          <p className="text-base text-zinc-400 max-w-[50ch]">
            Open to SDE roles, AI/ML internships, and collaboration. Response within 24 hours.
          </p>
        </motion.div>

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-5 gap-10">

            {/* Left — Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-2 space-y-6"
            >
              <div className="space-y-2.5">
                {contactLinks.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl
                               bg-zinc-900/60 border border-zinc-800/60"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={15} strokeWidth={1.75} className="text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="mono-label text-zinc-600 mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-zinc-300 hover:text-indigo-400 transition-colors truncate block">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-zinc-300">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="mono-label text-zinc-600 mb-3">Find me on</div>
                <div className="flex gap-2">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800
                                 flex items-center justify-center
                                 text-zinc-500 hover:text-indigo-400
                                 hover:border-indigo-700/60 transition-all duration-200"
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-3 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6"
            >
              {/* Honeypot — hidden from real users */}
              <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                <label htmlFor="company">Company (leave blank)</label>
                <input
                  type="text" id="company" name="company"
                  value={formData.company} onChange={handleInputChange}
                  tabIndex={-1} autoComplete="off"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block mono-label text-zinc-500 mb-1.5">Name</label>
                    <input
                      id="contact-name" type="text" name="name"
                      value={formData.name} onChange={handleInputChange} required
                      placeholder="Your name"
                      className="form-input bg-zinc-950/60 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block mono-label text-zinc-500 mb-1.5">Email</label>
                    <input
                      id="contact-email" type="email" name="email"
                      value={formData.email} onChange={handleInputChange} required
                      placeholder="you@email.com"
                      className="form-input bg-zinc-950/60 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block mono-label text-zinc-500 mb-1.5">Subject</label>
                  <input
                    id="contact-subject" type="text" name="subject"
                    value={formData.subject} onChange={handleInputChange} required
                    placeholder="What's this about?"
                    className="form-input bg-zinc-950/60 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block mono-label text-zinc-500 mb-1.5">Message</label>
                  <textarea
                    id="contact-message" rows={4} name="message"
                    value={formData.message} onChange={handleInputChange} required
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input bg-zinc-950/60 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-indigo-500 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                             text-sm font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-sm hover:shadow-indigo-md'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} strokeWidth={2} />
                      Send message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-4 z-50 bg-emerald-600 text-white p-4 rounded-xl shadow-2xl max-w-xs border border-emerald-500/50"
          >
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-0.5 flex-shrink-0" strokeWidth={2} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Message sent</p>
                <p className="text-emerald-200 text-xs mt-0.5">I'll get back to you soon.</p>
              </div>
              <button onClick={() => setShowSuccess(false)} aria-label="Dismiss">
                <X size={15} strokeWidth={2} className="text-emerald-300 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error toast */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-4 z-50 bg-red-600 text-white p-4 rounded-xl shadow-2xl max-w-xs border border-red-500/50"
          >
            <div className="flex items-start gap-3">
              <X size={18} className="mt-0.5 flex-shrink-0" strokeWidth={2} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to send</p>
                <p className="text-red-200 text-xs mt-0.5">Try emailing me directly instead.</p>
              </div>
              <button onClick={() => setShowError(false)} aria-label="Dismiss">
                <X size={15} strokeWidth={2} className="text-red-300 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
