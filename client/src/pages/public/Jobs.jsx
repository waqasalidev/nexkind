import { Search, MapPin, Building2, Clock, X, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { getJobs } from '../../api';
import CompanyLogo from '../../components/CompanyLogo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (typeFilter) params.type = typeFilter;
      if (workModeFilter) params.workMode = workModeFilter;
      if (categoryFilter) params.category = categoryFilter;
      const { data } = await getJobs(params);
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 300);
    return () => clearTimeout(timer);
  }, [search, typeFilter, workModeFilter, categoryFilter]);

  const categories = useMemo(() => {
    const cats = [...new Set(jobs.map((j) => j.category).filter(Boolean))];
    return cats.length ? cats : ['Technology', 'Marketing', 'Design', 'Finance'];
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
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Kickstart your career with opportunities from top employers worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-4 mb-10 bg-white p-5 rounded-xl shadow-md border border-slate-100 -mt-20 relative z-20"
        >
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white min-w-[150px]"
          >
            <option value="">All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Remote</option>
          </select>
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white min-w-[150px]"
          >
            <option value="">All Locations</option>
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white min-w-[150px]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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
                  key={job._id}
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
                        <a href={job.applyLink} target="_blank" rel="noreferrer" className="btn btn-primary text-sm py-2">
                          Apply Now
                        </a>
                      ) : (
                        <Link to={`/jobs/${job._id}/apply`} className="btn btn-primary text-sm py-2">Apply Now</Link>
                      )}
                      <Link to={`/jobs/${job._id}`} className="btn btn-secondary text-sm py-2">View Details</Link>
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
