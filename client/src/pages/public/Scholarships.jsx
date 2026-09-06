import { Search, GraduationCap, X, Globe, Building, Calendar, Filter, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { getScholarships } from '../../api';
import { fallbackScholarships } from '../../data/fallbackScholarships';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TIMEOUT_MS = 6000;

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('');
  const [fundingType, setFundingType] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  const filterFallbackList = useCallback((list) => {
    return list.filter((s) => {
      if (country) {
        if (!s.country || !s.country.toLowerCase().includes(country.toLowerCase())) return false;
      }
      if (degreeLevel && degreeLevel !== 'Any') {
        if (!s.degreeLevel || s.degreeLevel.toLowerCase() !== degreeLevel.toLowerCase()) return false;
      }
      if (fundingType) {
        if (!s.fundingType || s.fundingType.toLowerCase() !== fundingType.toLowerCase()) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        const matches =
          (s.title && s.title.toLowerCase().includes(q)) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.provider && s.provider.toLowerCase().includes(q)) ||
          (s.university && s.university.toLowerCase().includes(q)) ||
          (s.country && s.country.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [country, degreeLevel, fundingType, search]);

  const fetchScholarships = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (country) params.country = country;
      if (degreeLevel && degreeLevel !== 'All Degree Levels') params.degreeLevel = degreeLevel;
      if (fundingType && fundingType !== 'All Funding Types') params.fundingType = fundingType;

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Scholarship request timed out')), TIMEOUT_MS)
      );

      const response = await Promise.race([getScholarships(params), timeoutPromise]);
      const data = response?.data;
      const list = Array.isArray(data) ? data : data?.scholarships || [];

      if (list.length > 0) {
        setScholarships(list);
        setIsFallback(false);
      } else {
        const filtered = filterFallbackList(fallbackScholarships);
        setScholarships(filtered);
        setIsFallback(true);
      }
    } catch (error) {
      console.warn('[SCHOLARSHIPS] API fetch error or timeout, applying fallback:', error.message);
      const filtered = filterFallbackList(fallbackScholarships);
      setScholarships(filtered);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [search, country, degreeLevel, fundingType, filterFallbackList]);

  useEffect(() => {
    const timer = setTimeout(fetchScholarships, 250);
    return () => clearTimeout(timer);
  }, [fetchScholarships]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="bg-gradient-to-r from-blue-900 via-primary to-indigo-900 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="container-custom relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur text-blue-100 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <GraduationCap size={14} className="text-amber-300" /> NexKind Financial Aid & Grants
          </span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Verified Scholarships & Fellowships
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Financial aid opportunities for students across Pakistan, India, Bangladesh, Asia, and premier global universities.
          </motion.p>
        </div>
      </div>

      <div className="py-12 container-custom max-w-6xl">
        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-5 gap-3 mb-8 -mt-20 relative z-20"
        >
          {/* Search Box */}
          <div className="lg:col-span-2 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 relative">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scholarship name, subject, university..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 min-h-[42px]"
            />
          </div>

          {/* Country Selector */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-700 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[42px]"
          >
            <option value="">All Countries</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            <option value="International">International</option>
          </select>

          {/* Degree Level */}
          <select
            value={degreeLevel}
            onChange={(e) => setDegreeLevel(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-700 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[42px]"
          >
            <option value="">All Degree Levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD / Doctoral</option>
            <option value="High School">High School</option>
          </select>

          {/* Funding Type */}
          <select
            value={fundingType}
            onChange={(e) => setFundingType(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-lg text-slate-700 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[42px]"
          >
            <option value="">All Funding Types</option>
            <option value="Fully Funded">Fully Funded</option>
            <option value="Partially Funded">Partially Funded</option>
            <option value="Merit Award">Merit Award</option>
            <option value="Government">Government Scheme</option>
          </select>
        </motion.div>

        {/* Fallback notification notice if live catalog is synchronizing */}
        {isFallback && !loading && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-blue-50/80 border border-blue-200/60 text-blue-900 text-xs flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing verified NexKind curated scholarship opportunities.
            </span>
            <button
              onClick={fetchScholarships}
              className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner text="Loading scholarships..." />
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="text-slate-400" size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No Scholarships Found Matching Filter</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">
              Try adjusting your country or degree level filter to view all financial aid options.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCountry('');
                setDegreeLevel('');
                setFundingType('');
              }}
              className="btn btn-primary text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {scholarships.map((item) => (
              <motion.div
                key={item._id || item.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl border border-slate-200/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
              >
                {/* Card Top Image & Badges */}
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Country Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                    <Globe size={11} className="text-emerald-400" />
                    {item.country || 'Global'}
                  </span>

                  {/* Verification / Funding Badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 backdrop-blur text-[11px] font-bold rounded-lg ${
                    item.fundingType === 'Fully Funded' ? 'bg-emerald-600/90 text-white' : 'bg-blue-600/90 text-white'
                  }`}>
                    {item.fundingType || 'Verified'}
                  </span>

                  <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold">
                    <span>{item.degreeLevel || 'All Degrees'}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                      {item.university && (
                        <p className="flex items-center gap-1.5 line-clamp-1">
                          <Building size={13} className="text-primary shrink-0" />
                          <span>{item.university}</span>
                        </p>
                      )}
                      <p className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-primary shrink-0" />
                        <span>Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Ongoing'}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Coverage</p>
                        <p className="text-xs font-extrabold text-emerald-600 line-clamp-1">{item.amount || 'Tuition Aid'}</p>
                      </div>
                      <Link
                        to={`/scholarships/${item._id || item.id}`}
                        className="btn btn-primary text-xs py-1.5 px-3.5 min-h-[34px]"
                      >
                        View Details
                      </Link>
                    </div>

                    <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg flex items-center justify-between border border-slate-100">
                      <span>Source: <strong className="text-slate-700 font-semibold">{item.provider || 'Official Portal'}</strong></span>
                      <span className="text-emerald-600 font-bold">Verified</span>
                    </div>
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
