import { Search, MapPin, Building2, Clock, X, DollarSign, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getJobs } from '../../api';
import CompanyLogo from '../../components/CompanyLogo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fallbackJobs } from '../../data/fallbackJobs';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');

  const filterFallbackJobs = useCallback(() => {
    let list = [...fallbackJobs];
    if (countryFilter) {
      const c = countryFilter.toLowerCase();
      list = list.filter(
        (j) =>
          (j.country && j.country.toLowerCase().includes(c)) ||
          (j.location && j.location.toLowerCase().includes(c))
      );
    }
    if (cityFilter) {
      const city = cityFilter.toLowerCase();
      list = list.filter(
        (j) =>
          (j.city && j.city.toLowerCase().includes(city)) ||
          (j.location && j.location.toLowerCase().includes(city))
      );
    }
    if (typeFilter) {
      list = list.filter((j) => j.type && j.type.toLowerCase() === typeFilter.toLowerCase());
    }
    if (workModeFilter) {
      list = list.filter((j) => j.workMode && j.workMode.toLowerCase() === workModeFilter.toLowerCase());
    }
    if (expFilter) {
      list = list.filter((j) => j.experienceLevel && j.experienceLevel.toLowerCase() === expFilter.toLowerCase());
    }
    if (categoryFilter) {
      list = list.filter((j) => j.category && j.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          (j.title && j.title.toLowerCase().includes(q)) ||
          (j.company && j.company.toLowerCase().includes(q)) ||
          (j.description && j.description.toLowerCase().includes(q)) ||
          (j.location && j.location.toLowerCase().includes(q)) ||
          (j.skills && j.skills.some((s) => s.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [countryFilter, cityFilter, typeFilter, workModeFilter, expFilter, categoryFilter, search]);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (typeFilter) params.type = typeFilter;
      if (workModeFilter) params.workMode = workModeFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (countryFilter) params.country = countryFilter;
      if (cityFilter) params.city = cityFilter;
      if (expFilter) params.experienceLevel = expFilter;

      const fetchPromise = getJobs(params);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Jobs timeout')), 3500)
      );

      const res = await Promise.race([fetchPromise, timeoutPromise]);
      const data = res?.data;
      const jobList = Array.isArray(data) ? data : data?.jobs || [];

      if (jobList.length > 0) {
        setJobs(jobList);
      } else {
        setJobs(filterFallbackJobs());
      }
    } catch (error) {
      console.warn('Jobs API unavailable, using verified fallback opportunities:', error.message);
      setJobs(filterFallbackJobs());
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, workModeFilter, categoryFilter, countryFilter, cityFilter, expFilter, filterFallbackJobs]);

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 250);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const categories = useMemo(() => {
    const combined = jobs.concat(fallbackJobs);
    const cats = [...new Set(combined.map((j) => j.category).filter(Boolean))];
    return cats.sort();
  }, [jobs]);

  const variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="relative bg-primary py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="Office"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
              NexKind NGO Opportunity Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Asian & Global Career Opportunities</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connecting students and job seekers across Pakistan, India, Bangladesh, UAE, and international remote teams.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 -mt-20 relative z-20 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job title, skill, or employer..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[44px]"
              />
            </div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-primary bg-white min-w-[160px] min-h-[44px]"
            >
              <option value="">All Countries</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="UAE">UAE</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Qatar">Qatar</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Global">Global Remote</option>
            </select>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold focus:outline-none focus:border-primary bg-white min-w-[150px] min-h-[44px]"
            >
              <option value="">All Cities</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="">All Experience Levels</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Internship">Internship</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {loading ? (
          <LoadingSpinner text="Loading jobs..." />
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <X className="text-slate-400 mx-auto mb-4" size={40} />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Jobs Found</h2>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex-1 space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">
                Latest Opportunities ({jobs.length})
              </h2>
              {jobs.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  variants={variants}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col sm:flex-row gap-6"
                >
                  <CompanyLogo src={job.logoCandidates?.[0] || job.image || job.logoUrl} name={job.company} size="md" className="border border-slate-100" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-slate-500 font-medium">{job.company}</p>
                      </div>
                      <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-1 rounded whitespace-nowrap">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Building2 size={14} /> {job.workMode || 'On-site'}</span>
                      {job.salary && (
                        <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                      )}
                      {job.category && (
                        <span className="flex items-center gap-1"><Clock size={14} /> {job.category}</span>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      {job.applyLink ? (
                        <a href={job.applyLink} target="_blank" rel="noreferrer" className="btn btn-primary text-sm py-2 inline-flex items-center gap-1.5">
                          Apply Now <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link to={`/jobs/${job._id || job.id}/apply`} className="btn btn-primary text-sm py-2">Apply Now</Link>
                      )}
                      <Link to={`/jobs/${job._id || job.id}`} className="btn btn-secondary text-sm py-2">View Details</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80 space-y-6"
            >
              <div className="bg-blue-900 text-white p-8 rounded-2xl relative overflow-hidden text-center">
                <h3 className="text-xl font-bold mb-3">Upload Your Resume</h3>
                <p className="text-blue-100 text-sm mb-6">Let employers find you! Create a profile and showcase your skills.</p>
                <Link to="/student/register" className="btn bg-white text-primary w-full justify-center">Create Profile</Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
