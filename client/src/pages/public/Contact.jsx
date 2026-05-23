import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { createMessage } from '../../api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await createMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-[80vh]">
      <div className="bg-gradient-to-br from-blue-500 to-primary py-16 text-center text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with our team.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container-custom">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 md:p-12 bg-white/60"
            >
              <h2 className="text-2xl font-bold text-primary mb-8">Send a Message</h2>
              {status === 'success' ? (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  Message sent successfully! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-slate-700">Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-slate-700">Message</label>
                    <textarea
                      className="input-field min-h-[150px] resize-y"
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-3"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                  {status === 'error' && <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>}
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-primary to-primary-dark p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden"
            >
              <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>

              <div className="space-y-8 relative z-10">
                {/* ... existing info ... */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                    <p className="text-blue-100/80 leading-relaxed">123 Education Lane<br />Knowledge City, KC 45678</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-blue-100/80">info@NexKind.org</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-blue-100/80">+1 (234) 567-890</p>
                  </div>
                </div>
              </div>

              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
