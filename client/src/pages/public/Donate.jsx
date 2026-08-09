import { Heart, CreditCard, DollarSign, Users, GraduationCap, Compass, Briefcase, CheckCircle2, Target, Award, Quote, Lock, ShieldCheck, Building, Landmark, Smartphone, AlertCircle, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createDonation, createPaymentIntent, createPayPalDonation, createBankTransferDonation, createPayoneerDonation } from '../../api';
import toast from 'react-hot-toast';

const Donate = () => {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('Stripe'); // Stripe, PayPal, Google Pay, Bank Transfer, Payoneer
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    bankReference: '',
    payoneerReference: ''
  });
  const [step, setStep] = useState(1); // 1: Amount & Provider, 2: Checkout / Details, 3: Success
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

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!donorInfo.name || !donorInfo.email) {
      toast.error('Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (selectedProvider === 'Stripe' || selectedProvider === 'Google Pay') {
        const intentRes = await createPaymentIntent({
          amount: parseFloat(amount),
          currency: 'USD',
          donorName: donorInfo.name,
          email: donorInfo.email,
          message: donorInfo.message
        });

        const { transactionId, paymentProvider } = intentRes.data;

        await createDonation({
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          currency: 'USD',
          message: donorInfo.message,
          paymentProvider: selectedProvider === 'Google Pay' ? 'Google Pay' : (paymentProvider || 'Stripe'),
          transactionId: transactionId || `txn_${Date.now()}`,
          status: 'Completed'
        });

        setTransactionData({
          transactionId: transactionId || `txn_${Date.now()}`,
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          paymentProvider: selectedProvider === 'Google Pay' ? 'Google Pay' : 'Stripe',
          status: 'Completed'
        });
      } else if (selectedProvider === 'PayPal') {
        const res = await createPayPalDonation({
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          currency: 'USD',
          message: donorInfo.message,
          paypalOrderId: `paypal_ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
        });

        setTransactionData({
          transactionId: res.data.donation.transactionId,
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          paymentProvider: 'PayPal',
          status: 'Completed'
        });
      } else if (selectedProvider === 'Bank Transfer') {
        if (!donorInfo.bankReference || !donorInfo.bankReference.trim()) {
          toast.error("Bank Reference / Transaction ID is required for verification.");
          setIsSubmitting(false);
          return;
        }

        const res = await createBankTransferDonation({
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          currency: 'USD',
          message: donorInfo.message,
          bankReference: donorInfo.bankReference.trim()
        });

        setTransactionData({
          transactionId: res.data.donation.transactionId,
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          paymentProvider: 'Bank Transfer',
          status: 'Verification Required',
          notes: 'Submitted for manual Admin bank verification.'
        });
      } else if (selectedProvider === 'Payoneer') {
        if (!donorInfo.payoneerReference || !donorInfo.payoneerReference.trim()) {
          toast.error("Payoneer Transaction ID / Reference is required for verification.");
          setIsSubmitting(false);
          return;
        }

        const res = await createPayoneerDonation({
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          currency: 'USD',
          message: donorInfo.message,
          payoneerReference: donorInfo.payoneerReference.trim()
        });

        setTransactionData({
          transactionId: res.data.donation.transactionId,
          donorName: donorInfo.name,
          email: donorInfo.email,
          amount: parseFloat(amount),
          paymentProvider: 'Payoneer',
          status: 'Verification Required',
          notes: 'Submitted for manual Admin Payoneer verification.'
        });
      }

      setStep(3);
      toast.success(
        selectedProvider === 'Bank Transfer' || selectedProvider === 'Payoneer'
          ? "Thank you! Reference submitted for Admin verification."
          : "Thank you! Your donation was processed successfully!"
      );
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
              <Heart size={12} className="fill-indigo-400 text-indigo-400" /> NexKind Non-Profit Foundation
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              Fuel Education & Global Opportunity
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-4">
              NexKind is an NGO initiative connecting underprivileged students to quality education, tech skills, regional jobs, and global scholarships.
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
            {/* Mission & Impact */}
            <div className="lg:col-span-6 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
                  <Target className="text-indigo-400" /> Education → Skills → Opportunities
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  Every donation directly enables free course hosting, skill development workshops, scholarship verifications, and career matchmaking for Asian and global youth.
                </p>

                {/* Progress bar */}
                <div className="bg-slate-900/80 border border-white/5 p-6 rounded-2xl shadow-lg mb-8">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="font-semibold text-slate-300">Monthly Non-Profit Fund</span>
                    <span className="font-bold text-indigo-400">{progressPercent.toFixed(1)}% Funded</span>
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

            {/* Donation Payment Form (Right 6 cols) */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <div className="text-center mb-6">
                        <Heart size={44} className="mx-auto mb-3 text-rose-500 fill-rose-500/10 animate-pulse" />
                        <h3 className="text-2xl font-bold text-white mb-1">Make a Contribution</h3>
                        <p className="text-xs text-slate-400">Select an amount and preferred payment provider.</p>
                      </div>

                      {/* Preset Amounts */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {[10, 25, 50, 100].map((amt) => (
                          <motion.button
                            key={amt}
                            type="button"
                            onClick={() => handleAmountSelect(amt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`py-2.5 px-2 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-0.5 min-h-[44px] ${
                              amount == amt
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/20'
                            }`}
                          >
                            <DollarSign size={14} />{amt}
                          </motion.button>
                        ))}
                      </div>

                      <div className="relative mb-6">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                        <input
                          type="number"
                          placeholder="Or enter custom amount in USD"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-semibold min-h-[44px]"
                        />
                      </div>

                      {/* 5-Provider Payment Selector */}
                      <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                          Select Payment Provider
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: 'Stripe', label: 'Stripe Card', icon: CreditCard, badge: 'Instant' },
                            { id: 'PayPal', label: 'PayPal', icon: Landmark, badge: 'Instant' },
                            { id: 'Google Pay', label: 'Google Pay', icon: Smartphone, badge: 'Instant' },
                            { id: 'Bank Transfer', label: 'Bank Wire', icon: Building, badge: 'Manual Review' },
                            { id: 'Payoneer', label: 'Payoneer', icon: DollarSign, badge: 'Manual Review' }
                          ].map((prov) => {
                            const IconComp = prov.icon;
                            const isSelected = selectedProvider === prov.id;
                            return (
                              <button
                                key={prov.id}
                                type="button"
                                onClick={() => setSelectedProvider(prov.id)}
                                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[70px] ${
                                  isSelected
                                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                                    : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <IconComp size={16} className={isSelected ? 'text-indigo-400' : 'text-slate-400'} />
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                    {prov.badge}
                                  </span>
                                </div>
                                <span className="text-xs font-bold mt-2 truncate">{prov.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <motion.button
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm min-h-[44px]"
                      >
                        Continue to Details <CreditCard size={16} />
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
                        <div>
                          <h3 className="text-lg font-bold text-white">Complete {selectedProvider} Donation</h3>
                          <p className="text-xs text-slate-400">Selected Amount: <strong className="text-emerald-400">${parseFloat(amount).toFixed(2)} USD</strong></p>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <ShieldCheck size={14} /> 256-Bit SSL
                        </span>
                      </div>
                      
                      <form onSubmit={handleSubmitPayment} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-xs min-h-[44px]"
                              value={donorInfo.name}
                              onChange={e => setDonorInfo({ ...donorInfo, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="johndoe@example.com"
                              className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-xs min-h-[44px]"
                              value={donorInfo.email}
                              onChange={e => setDonorInfo({ ...donorInfo, email: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Specific Instructions per Provider */}
                        {selectedProvider === 'Bank Transfer' && (
                          <div className="bg-slate-950 border border-indigo-500/30 p-4 rounded-xl space-y-3">
                            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                              <Building size={16} /> Official Organization Bank Details
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-300 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Bank Name:</span>
                                <span>Habib Bank Limited (HBL)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Account Title:</span>
                                <span>NexKind Foundation NGO</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Account / IBAN:</span>
                                <span className="flex items-center gap-1 font-bold text-white">
                                  PK36HABB00012345678901 <Copy size={12} className="cursor-pointer text-indigo-400" onClick={() => copyToClipboard('PK36HABB00012345678901', 'IBAN')} />
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">SWIFT Code:</span>
                                <span>HABBPKKA</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-amber-400 mb-1">
                                Enter Your Deposit / Bank Reference Number *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. HBL-REF-984120"
                                className="w-full px-3.5 py-2.5 bg-slate-900 border border-amber-500/40 rounded-xl text-white focus:outline-none focus:border-amber-400 text-xs min-h-[44px]"
                                value={donorInfo.bankReference}
                                onChange={e => setDonorInfo({ ...donorInfo, bankReference: e.target.value })}
                              />
                              <p className="text-[11px] text-slate-400 mt-1">An authorized admin will verify your deposit reference.</p>
                            </div>
                          </div>
                        )}

                        {selectedProvider === 'Payoneer' && (
                          <div className="bg-slate-950 border border-indigo-500/30 p-4 rounded-xl space-y-3">
                            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                              <DollarSign size={16} /> Payoneer Receiving Account
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-300 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Payoneer Email:</span>
                                <span className="flex items-center gap-1 font-bold text-white">
                                  finance@nexkind.org <Copy size={12} className="cursor-pointer text-indigo-400" onClick={() => copyToClipboard('finance@nexkind.org', 'Payoneer Email')} />
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Recipient Name:</span>
                                <span>NexKind Foundation NGO</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-amber-400 mb-1">
                                Enter Payoneer Transaction ID / Payment Reference *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. PAY-TXN-741952"
                                className="w-full px-3.5 py-2.5 bg-slate-900 border border-amber-500/40 rounded-xl text-white focus:outline-none focus:border-amber-400 text-xs min-h-[44px]"
                                value={donorInfo.payoneerReference}
                                onChange={e => setDonorInfo({ ...donorInfo, payoneerReference: e.target.value })}
                              />
                            </div>
                          </div>
                        )}

                        {(selectedProvider === 'Stripe' || selectedProvider === 'PayPal' || selectedProvider === 'Google Pay') && (
                          <div className="p-3 bg-slate-950 border border-indigo-500/30 rounded-xl flex items-center justify-between text-xs font-semibold text-white">
                            <span className="flex items-center gap-2">
                              <CreditCard size={16} className="text-indigo-400" /> {selectedProvider} Instant Gateway
                            </span>
                            <span className="text-emerald-400">Live Secure Processing</span>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Message / Note (Optional)</label>
                          <textarea
                            placeholder="Add a message of support..."
                            className="w-full px-3.5 py-2 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-xs placeholder:text-slate-600"
                            rows="2"
                            value={donorInfo.message}
                            onChange={e => setDonorInfo({ ...donorInfo, message: e.target.value })}
                          ></textarea>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors text-xs min-h-[44px]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 min-h-[44px]"
                          >
                            {isSubmitting ? 'Processing...' : `Confirm ${selectedProvider}`} <Lock size={14} />
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
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-400 w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {transactionData?.status === 'Verification Required' ? 'Reference Submitted!' : 'Donation Confirmed!'}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        Thank you <strong className="text-white">{transactionData?.donorName}</strong> for supporting NexKind with <span className="font-bold text-emerald-400">${transactionData?.amount} USD</span> via <strong className="text-white">{transactionData?.paymentProvider}</strong>.
                      </p>

                      <div className="bg-slate-950 border border-white/10 p-4 rounded-xl text-left text-xs space-y-2 mb-6 text-slate-300 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Transaction ID:</span>
                          <span className="text-white truncate max-w-[200px]">{transactionData?.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payment Method:</span>
                          <span>{transactionData?.paymentProvider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status:</span>
                          <span className={transactionData?.status === 'Verification Required' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {transactionData?.status}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setStep(1);
                          setAmount('50');
                          setDonorInfo({ name: '', email: '', message: '', bankReference: '', payoneerReference: '' });
                        }}
                        className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors min-h-[44px]"
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
              <Award className="text-indigo-400" /> Community Impact Stories
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
