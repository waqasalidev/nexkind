import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is NexKind and who is it for?",
      answer: "NexKind is a non-profit organization dedicated to providing free education, scholarships, and career opportunities to students worldwide. Our platform serves students looking for learning resources, job seekers aiming for their first role, and donors who wish to support education."
    },
    {
      question: "Are the courses really free?",
      answer: "Yes! All courses listed on our platform are 100% free. We partner with top universities, volunteer educators, and open-source platforms to curate high-quality educational content without any cost to you."
    },
    {
      question: "How do I apply for a scholarship?",
      answer: "To apply for a scholarship, navigate to the 'Scholarships' page, browse the available opportunities, and click 'View Details' on a scholarship that matches your profile. From there, you can see the requirements and click 'Apply Now' to submit your application."
    },
    {
      question: "Can I post a job on NexKind?",
      answer: "Currently, job postings are managed by our admin team to ensure quality and relevance. If you are an employer wishing to hire our talent, please contact us at partnerships@NexKind.org."
    },
    {
      question: "How can I donate to support the cause?",
      answer: "You can support us by visiting the 'Donate' page. We accept donations via credit card, PayPal, and bank transfer. Your contributions go directly towards funding student scholarships and maintaining our free educational platform."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-primary pt-24 pb-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 to-primary"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">Have questions? We're here to help.</p>

          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-full text-slate-800 shadow-xl focus:ring-4 focus:ring-blue-400/30 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="container-custom max-w-3xl -mt-20 relative z-20 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-100 last:border-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
              >
                <span className={`text-lg font-semibold transition-colors ${activeIndex === index ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-50 text-primary' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-primary'}`}>
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-600 leading-relaxed pb-6 pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Still have questions?</h3>
          <p className="text-slate-500 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <div className="inline-flex gap-4">
            <button className="btn btn-primary">Contact Support</button>
            <button className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex gap-2">
              <MessageCircle size={18} /> Chat with us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
