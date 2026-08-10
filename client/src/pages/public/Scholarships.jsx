import { Search, GraduationCap, X, Globe, Building, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getScholarships } from '../../api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('');
  const [fundingType, setFundingType] = useState('');

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (country) params.country = country;
      if (degreeLevel) params.degreeLevel = degreeLevel;
      if (fundingType) params.fundingType = fundingType;
      const { data } = await getScholarships(params);
      setScholarships(Array.isArray(data) ? data : data.scholarships || []);
    } catch (error) {
      console.error('Failed to fetch scholarships', error);
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchScholarships, 300);
    return () => clearTimeout(timer);
  }, [search, country, degreeLevel, fundingType]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="bg-primary py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="University"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        <div className="container-custom relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">
            Scholarships & Grants
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 max-w-2xl mx-auto">
            Don't let finances hold you back. Discover millions in financial aid.
          </motion.p>
        </div>
      </div>

      <div className="py-12 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-4 gap-4 mb-10 -mt-24 relative z-20"
        >
          <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 relative">
            <Search size={20} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scholarships..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-600"
          >
            <option value="">All Countries</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>Australia</option>
            <option>International</option>
          </select>
          <select
            value={degreeLevel}
            onChange={(e) => setDegreeLevel(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-600"
          >
            <option value="">All Degree Levels</option>
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Masters</option>
            <option>PhD</option>
            <option>Any</option>
          </select>
          <select
            value={fundingType}
            onChange={(e) => setFundingType(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-600 lg:col-span-1"
          >
            <option value="">All Funding Types</option>
            <option>Fully Funded</option>
            <option>Partially Funded</option>
            <option>Merit Award</option>
            <option>Grant</option>
          </select>
        </motion.div>

        {loading ? (
          <LoadingSpinner text="Loading scholarships..." />
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <X className="text-slate-400 mx-auto mb-4" size={40} />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Scholarships Found</h2>
            <p className="text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {scholarships.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeInUp}
                className="bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'; }}
                  />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 backdrop-blur text-xs font-bold rounded-full ${
                    item.verificationStatus === 'Expired' ? 'bg-rose-600/90 text-white' :
                    item.verificationStatus === 'Pending Verification' ? 'bg-amber-500/90 text-white' :
                    'bg-emerald-600/90 text-white'
                  }`}>
                    {item.verificationStatus || 'Verified'}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5 text-sm text-slate-500 mb-4">
                    {item.country && (
                      <p className="flex items-center gap-1.5"><Globe size={14} /> {item.country}</p>
                    )}
                    {item.university && (
                      <p className="flex items-center gap-1.5"><Building size={14} /> {item.university}</p>
                    )}
                    <p className="flex items-center gap-1.5">
                      <Calendar size={14} /> Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Ongoing'}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">Award Coverage</p>
                      <p className="text-base font-extrabold text-emerald-600">{item.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/scholarships/${item._id}`} className="btn btn-primary text-sm py-2 px-4">View Opportunity</Link>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg space-y-1 border border-slate-100">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Source: <strong className="text-slate-700">{item.source || item.sourceReference || 'NexKind NGO Partner'}</strong></span>
                      <span className={item.verificationStatus === 'Expired' ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                        {item.verificationStatus || 'Verified'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Verify details on the official scholarship website before applying.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;
