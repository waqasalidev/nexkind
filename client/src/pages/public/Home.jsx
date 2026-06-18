import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Briefcase, GraduationCap, Users, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import CompanyLogo from '../../components/CompanyLogo';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center py-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left z-10"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-blue-100 text-primary font-semibold rounded-full text-sm"
            >
              🚀 Empowering the Future
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Bridge the Gap to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Dream Career</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We provide free world-class education, scholarships to support your studies, and direct connections to top employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses" className="btn btn-primary justify-center text-lg px-8 py-4 shadow-lg shadow-blue-500/20">
                Start Learning Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-secondary justify-center text-lg px-8 py-4">
                Explore Our Mission
              </Link>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="whileInView"
              className="pt-8 border-t border-slate-200 flex gap-12 justify-center lg:justify-start"
            >
              {[
                { num: '50k+', label: 'Active Learners' },
                { num: '1.2k+', label: 'Free Courses' },
                { num: '85%', label: 'Employment Rate' }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <span className="block text-3xl font-bold text-primary">{stat.num}</span>
                  <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Real Image for Hero */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                alt="Students Collaboration"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-xs"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Briefcase size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Job Secured</p>
                  <p className="text-xs text-slate-500">Just now by Sarah M.</p>
                </div>
              </motion.div>
            </div>
            {/* Decor elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </section>

      {/* Partners/Trusted By Section */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by leading organizations</p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {/* Dummy Logos with manual animation for simplicity or scroll effect could be added */}
            {['Google', 'Microsoft', 'Amazon', 'Coursera', 'Udemy', 'LinkedIn'].map((logo) => (
              <span key={logo} className="text-lg font-bold text-slate-500 flex items-center gap-3 hover:text-slate-700 transition-colors">
                <CompanyLogo name={logo} size="sm" className="!w-10 !h-10" />
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="section-title">Your Journey to Success</h2>
            <p className="section-subtitle">We guide you through every step of your career path with a structured and personalized approach.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: BookOpen, title: '1. Learn for Free', text: 'Access high-quality video lectures, notes, and resources across various domains.', color: 'bg-blue-50 text-blue-600' },
              { icon: Award, title: '2. Get Certified', text: 'Complete courses and earn certificates to showcase your skills to employers.', color: 'bg-purple-50 text-purple-600' },
              { icon: GraduationCap, title: '3. Scholarships', text: 'Apply for financial aid and scholarships to support your higher education.', color: 'bg-yellow-50 text-yellow-600' },
              { icon: Briefcase, title: '4. Get Hired', text: 'Connect with top employers and land your dream job or internship.', color: 'bg-green-50 text-green-600' }
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-primary mb-2">Featured Courses</h2>
              <p className="text-slate-500">Explore our most popular free courses.</p>
            </motion.div>
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Courses <ArrowRight size={20} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { id: 1, title: "Full Stack Web Development", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Development", students: "1.2k" },
              { id: 2, title: "Data Science Fundamentals", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Data Science", students: "850" },
              { id: 3, title: "Digital Marketing Mastery", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Marketing", students: "2.5k" }
            ].map((course) => (
              <motion.div
                key={course.id}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><Users size={14} /> {course.students} Students</span>
                    <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor" /> 4.8</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">Free</span>
                    <Link to={`/courses/${course.id}`} className="flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                      Enroll Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="btn btn-secondary w-full justify-center">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Students Choose NexKind?</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We go beyond traditional learning. Our holistic approach ensures you not only gain knowledge but also the confidence and opportunities to succeed.
              </p>
              <div className="space-y-6">
                {[
                  "Personalized Learning Paths tailored to your goals.",
                  "Direct Mentorship from industry experts.",
                  "Guaranteed Internship opportunities for top performers.",
                  "24/7 AI-powered academic support."
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg mt-12" alt="Student learning"
                />
                <motion.img
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Classroom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Hear from students who transformed their lives with NexKind.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            {[
              { name: "Alex Johnson", role: "Software Engineer at Google", text: "NexKind gave me the roadmap I needed. The mentorship was invaluable, and the scholarship helped me focus on my studies.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
              { name: "Maria Garcia", role: "Data Analyst", text: "I never thought I could switch careers without a degree. The certification program here is recognized by employers and got me my first job.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
              { name: "David Chen", role: "Digital Marketer", text: "The community support is amazing. Whenever I was stuck, there was always someone to help. Highly recommended!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
            ].map((story, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-slate-600 italic mb-6">"{story.text}"</p>
                <h4 className="font-bold text-slate-900">{story.name}</h4>
                <span className="text-sm text-primary font-medium">{story.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Updated</h2>
            <p className="text-slate-500 mb-8">Subscribe to our newsletter for the latest scholarships, course updates, and career tips.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email address" className="flex-1 px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <button className="btn btn-primary rounded-full px-8 py-4">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary to-blue-900 rounded-[2.5rem] p-12 lg:p-20 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 text-xl leading-relaxed">Join over 10,000 students transforming their lives through education. It's free and always will be.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/student/register" className="btn bg-secondary text-white hover:bg-secondary-hover text-lg px-10 py-5 rounded-xl shadow-lg shadow-orange-500/20">
                  Get Started for Free
                </Link>
              </div>
            </div>

            {/* Decorative circles */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            ></motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
