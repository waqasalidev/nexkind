import { Users, Target, Heart, Globe, Award, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const stagger = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <div className="min-h-[80vh] overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-primary py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1768&q=80" alt="Teamwork" className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/95"></div>
        <div className="container-custom relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About NexKind
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Building a bridge between potential and opportunity. We are a non-profit dedicated to democratizing education.
          </motion.p>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-24 bg-slate-50">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: Target, title: 'Our Mission', text: 'To democratize education and employment opportunities for underserved communities through technology and mentorship.', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Globe, title: 'Our Vision', text: 'A world where every individual has the skills, resources, and opportunities to build a dignified and prosperous career.', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: Heart, title: 'Our Values', text: 'Inclusivity, Excellence, Integrity, and Community Impact drive everything we do. We believe in people first.', color: 'text-red-500', bg: 'bg-red-50' }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-10 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                <div className={`w-16 h-16 mx-auto ${item.bg} ${item.color} rounded-full flex items-center justify-center mb-6`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="py-20 bg-primary-dark text-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
        ></motion.div>
        <div className="container-custom relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { count: '50+', label: 'Partner NGOs', icon: Users },
              { count: '10,000+', label: 'Students Impacted', icon: Smile },
              { count: '$2M+', label: 'Scholarships Distributed', icon: Award }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <stat.icon size={40} className="text-secondary mb-4 opacity-80" />
                <h3 className="text-5xl font-extrabold text-white mb-2">{stat.count}</h3>
                <p className="font-medium text-blue-200 text-lg uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Team Section (New) */}
      <div className="py-24 bg-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">Dedicated professionals working to make a difference.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { name: 'Sarah Ahmed', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'David Kim', role: 'Head of Education', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Priya Patel', role: 'Community Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'James Wilson', role: 'Tech Lead', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-primary font-medium mt-1">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
