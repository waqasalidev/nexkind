import { Heart, CreditCard, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { createDonation } from '../../api';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', message: '', paymentMethod: 'Credit Card' });
  const [step, setStep] = useState(1); // 1: Amount, 2: Details, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createDonation({
        donorName: donorInfo.name,
        email: donorInfo.email,
        amount: parseFloat(amount),
        message: donorInfo.message,
        paymentMethod: donorInfo.paymentMethod
      });
      setTimeout(() => {
        setStep(3);
        setIsSubmitting(false);
      }, 1000); // Simulate processing time
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const nextStep = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setStep(2);
  };

  return (
    <div className="min-h-[80vh]">
      <div className="bg-gradient-to-br from-blue-500 to-primary py-16 text-center text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-4">Make a Difference</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Your donation helps us provide education and opportunities to those in need.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass max-w-3xl mx-auto p-12 rounded-2xl text-center shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={64} className="mx-auto mb-6 text-secondary fill-secondary" />
            </motion.div>

            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold text-primary mb-4">Support Our Cause</h2>
                <p className="text-slate-500 mb-10 text-lg">
                  Choose an amount to donate. Secure payment processing.
                </p>

                <div className="flex flex-wrap gap-4 justify-center mb-10">
                  {[10, 25, 50, 100].map((amt) => (
                    <motion.button
                      key={amt}
                      onClick={() => handleAmountSelect(amt)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`btn text-xl px-8 py-3 rounded-xl min-w-[100px] border-2 ${amount == amt ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary hover:bg-blue-50'}`}
                    >
                      ${amt}
                    </motion.button>
                  ))}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className={`w-36 pl-8 pr-4 py-3 border-2 rounded-xl text-left text-lg focus:outline-none transition-colors ${customAmount ? 'border-primary' : 'border-slate-300 focus:border-primary'}`}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary w-full sm:w-auto px-12 py-4 text-lg justify-center shadow-lg hover:shadow-xl transform transition-all"
                >
                  Next Step <CreditCard size={24} />
                </motion.button>
              </>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold text-primary mb-6">Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      required
                      value={donorInfo.name}
                      onChange={e => setDonorInfo({ ...donorInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="input-field"
                      required
                      value={donorInfo.email}
                      onChange={e => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                    <select
                      className="input-field"
                      value={donorInfo.paymentMethod}
                      onChange={e => setDonorInfo({ ...donorInfo, paymentMethod: e.target.value })}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
                    <textarea
                      className="input-field"
                      rows="3"
                      value={donorInfo.message}
                      onChange={e => setDonorInfo({ ...donorInfo, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center text-primary font-bold">
                    <span>Total Donation:</span>
                    <span className="text-xl">${amount}</span>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setStep(1)} className="btn bg-slate-200 text-slate-700 hover:bg-slate-300 flex-1">Back</button>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1 justify-center">
                      {isSubmitting ? 'Processing...' : 'Confirm Donation'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="text-green-600 w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
                <p className="text-slate-600 text-lg mb-8">
                  Your generous donation of <span className="font-bold text-primary">${amount}</span> has been received via <span className="font-semibold">{donorInfo.paymentMethod}</span>.
                  We have sent a receipt to {donorInfo.email}.
                </p>
                <button onClick={() => { setStep(1); setAmount(''); setDonorInfo({ name: '', email: '', message: '', paymentMethod: 'Credit Card' }) }} className="btn btn-outline">
                  Make Another Donation
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
