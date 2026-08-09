import { Heart, CreditCard, DollarSign, Users, GraduationCap, Compass, Briefcase, CheckCircle2, Target, Award, Quote, Lock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createDonation, createPaymentIntent } from '../../api';
import toast from 'react-hot-toast';

const Donate = () => {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', message: '', paymentMethod: 'Credit Card' });
  const [step, setStep] = useState(1); // 1: Amount, 2: Details/Checkout, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const handleAmountSelect = (val) => {
    setAmount(val.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const nextStep = () => {
    const numAmt = parseFloat(amount);
    if (!numAmt || isNaN(numAmt) || numAmt <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!donorInfo.name || !donorInfo.email) {
      toast.error('Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Initialize Payment Intent
      const intentRes = await createPaymentIntent({
        amount: parseFloat(amount),
        currency: 'USD',
        donorName: donorInfo.name,
        email: donorInfo.email,
        message: donorInfo.message
      });

      const { transactionId, paymentProvider } = intentRes.data;

      // 2. Complete and store Donation Record in Database
      const donationRes = await createDonation({
        donorName: donorInfo.name,
        email: donorInfo.email,
        amount: parseFloat(amount),
        currency: 'USD',
        message: donorInfo.message,
        paymentProvider: paymentProvider || 'Stripe',
        transactionId: transactionId || `txn_${Date.now()}`,
        status: 'Completed'
      });

      setTransactionData({
        transactionId: transactionId || `txn_${Date.now()}`,
        donorName: donorInfo.name,
        email: donorInfo.email,
        amount: parseFloat(amount),
        paymentProvider: paymentProvider || 'Stripe'
      });

      setStep(3);
      toast.success("Thank you! Your donation was processed successfully!");
    } catch (error) {
      console.error('Donation payment error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: "Students Helped", count: "15,400+", description: "Gained free career pathing", icon: Users, color: "from-blue-500 to-indigo-600" },
    { label: "Scholarships Shared", count: "500+", description: "Fully and partially funded", icon: GraduationCap, color: "from-purple-500 to-pink-600" },
    { label: "Career Guidance Sessions", count: "4,200+", description: "Driven by NexKind AI", icon: Compass, color: "from-emerald-500 to-teal-600" },
    { label: "Active Users Daily", count: "8,500+", description: "Learning and building skills", icon: Briefcase, color: "from-orange-500 to-red-600" },
  ];

  const benefits = [
    { title: "100% Free Career Support", desc: "We ensure underrepresented students get professional pathing without costly counselor fees." },
    { title: "Continuous AI Enhancements", desc: "Donations directly fund educational services and hosting infrastructures to keep our counselors online 24/7." },
    { title: "Verified Scholarships & Jobs", desc: "We actively source and verify quality opportunities worldwide, maintaining high-trust listings." },
    { title: "Empowering Next-Gen Talent", desc: "Your support builds robust paths from local classrooms to global technical careers." }
  ];

  const stories = [
    {
      name: "Amina Al-Mansoor",
      role: "Software Engineering Scholar",
      content: "Finding master's scholarships was overwhelming. NexKind's AI advisor and verified lists pointed me to MBZUAI. Today I am studying fully funded!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Marcus Thorne",
      role: "Frontend Developer",
      content: "I took the Web Development Bootcamps here and applied to a remote internship from the job board. The process was direct and transparent. NexKind works!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  const currentRaised = 18450;
  const monthlyGoal = 25000;
  const progressPercent = Math.min((currentRaised / monthlyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6">
              <Heart size={12} className="fill-indigo-400 text-indigo-400" /> NexKind Foundation
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              Fuel Education & Career Success
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-4">
              NexKind is a non-profit ecosystem designed to bridge the gap between education and global careers. 
              We rely on supporters like you to keep our platforms and expert guidance free for students worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pb-24 bg-slate-950">
        <div className="container-custom">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-12 mb-20 relative z-20">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col justify-between"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight mb-1">{stat.count}</h3>
                    <p className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</p>
                    <p className="text-xs text-slate-500">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            {/* Why support & Progress Bar (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
                  <Target className="text-indigo-400" /> Our Mission & Impact Goals
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  Every dollar donated directly covers educational resources, technical infrastructure, 
                  and platform maintenance, ensuring quality guidance remains open to everyone.
                </p>

                {/* Progress bar */}
                <div className="bg-slate-900/80 border border-white/5 p-6 rounded-2xl shadow-lg mb-8">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="font-semibold text-slate-300">Monthly Support Goal</span>
                    <span className="font-bold text-indigo-400">{progressPercent.toFixed(1)}% Completed</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden mb-4 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-400 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Raised: <strong className="text-white">${currentRaised.toLocaleString()}</strong></span>
                    <span>Goal: <strong className="text-white">${monthlyGoal.toLocaleString()}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Why Donate to NexKind?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 className="text-indigo-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm mb-1">{benefit.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Donation Form Card (Right 5 cols) */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-center"
                    >
                      <Heart size={48} className="mx-auto mb-4 text-rose-500 fill-rose-500/10 animate-pulse" />
                      <h3 className="text-2xl font-bold text-white mb-2">Support Our Cause</h3>
                      <p className="text-sm text-slate-400 mb-8">
                        Select or enter a custom amount to support our student ecosystem.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[10, 25, 50, 100].map((amt) => (
                          <motion.button
                            key={amt}
                            type="button"
                            onClick={() => handleAmountSelect(amt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`py-3.5 px-4 rounded-xl font-bold text-base border-2 transition-all flex items-center justify-center gap-1 min-h-[44px] ${
                              amount == amt
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800 hover:border-white/15'
                            }`}
                          >
                            <DollarSign size={16} />{amt}
                          </motion.button>
                        ))}
                      </div>

                      <div className="relative mb-8">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">$</span>
                        <input
                          type="number"
                          placeholder="Or enter custom amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-9 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-semibold min-h-[44px]"
                        />
                      </div>

                      <motion.button
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        Proceed to Payment <CreditCard size={18} />
                      </motion.button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Donor Details & Checkout</h3>
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <ShieldCheck size={14} /> 256-Bit Encrypted
                        </span>
                      </div>
                      
                      <form onSubmit={handleSubmitPayment} className="space-y-4 text-left">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 min-h-[44px]"
                            value={donorInfo.name}
                            onChange={e => setDonorInfo({ ...donorInfo, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address (For Receipt)</label>
                          <input
                            type="email"
                            required
                            placeholder="johndoe@example.com"
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 min-h-[44px]"
                            value={donorInfo.email}
                            onChange={e => setDonorInfo({ ...donorInfo, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Payment Gateway</label>
                          <div className="p-3 bg-slate-950 border border-indigo-500/30 rounded-xl flex items-center justify-between text-xs font-semibold text-white">
                            <span className="flex items-center gap-2"><CreditCard size={16} className="text-indigo-400" /> Stripe Secure Checkout</span>
                            <span className="text-slate-400 font-normal">Card / Debit</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Message / Note (Optional)</label>
                          <textarea
                            placeholder="Add a message of support..."
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                            rows="2"
                            value={donorInfo.message}
                            onChange={e => setDonorInfo({ ...donorInfo, message: e.target.value })}
                          ></textarea>
                        </div>

                        <div className="bg-slate-950 border border-white/5 p-4 rounded-xl flex justify-between items-center font-bold">
                          <span className="text-slate-400 text-sm">Donation Amount:</span>
                          <span className="text-2xl text-emerald-400">${parseFloat(amount).toFixed(2)} USD</span>
                        </div>

                        <div className="flex gap-4 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors text-sm min-h-[44px]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 min-h-[44px]"
                          >
                            {isSubmitting ? 'Processing...' : 'Pay & Complete'} <Lock size={16} />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-emerald-400 w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Donation Confirmed!</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        Thank you <strong className="text-white">{transactionData?.donorName}</strong> for your contribution of <span className="font-bold text-emerald-400">${transactionData?.amount} USD</span>.
                      </p>

                      <div className="bg-slate-950 border border-white/5 p-4 rounded-xl text-left text-xs space-y-2 mb-6 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Transaction ID:</span>
                          <span className="font-mono text-white">{transactionData?.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payment Gateway:</span>
                          <span>{transactionData?.paymentProvider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Receipt Sent To:</span>
                          <span className="text-white">{transactionData?.email}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setStep(1);
                          setAmount('50');
                          setDonorInfo({ name: '', email: '', message: '', paymentMethod: 'Credit Card' });
                        }}
                        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors min-h-[44px]"
                      >
                        Make Another Donation
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="border-t border-white/5 pt-20">
            <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-tight flex items-center justify-center gap-2">
              <Award className="text-indigo-400" /> Student Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {stories.map((story, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-white/5 p-8 rounded-2xl relative"
                >
                  <Quote className="absolute top-6 right-6 text-slate-800 w-10 h-10 -z-10" />
                  <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                    "{story.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{story.name}</h4>
                      <p className="text-xs text-slate-500">{story.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
