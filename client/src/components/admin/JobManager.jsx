import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import AdminTable, { AdminModal, FormInput, FormTextArea, ConfirmDialog } from './AdminComponents';
import { getJobs, createJob, updateJob, deleteJob } from '../../api';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0, pages: 1 });

  // Initial Form State
  const initialFormState = {
    title: '',
    description: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    experience: '',
    image: '',
    category: 'Technology',
    workMode: 'On-site',
    country: '',
    city: '',
    education: '',
    deadline: '',
    sourceName: '',
    applyLink: '',
    companyLink: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    applicationInstructions: [''],
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Jobs
  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await getJobs({ page, limit: pagination.limit });
      if (data.jobs) {
        setJobs(data.jobs);
        setPagination(prev => ({ ...prev, page: data.page, pages: data.pages, total: data.total }));
      } else {
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(pagination.page);
  }, [pagination.page]);

  const columns = [
    { header: 'Job Title', accessor: 'title' },
    { header: 'Company', accessor: 'company' },
    { header: 'Location', accessor: 'location' },
    { header: 'Applicants', accessor: 'applicantsCount', render: (item) => <span className="font-semibold text-slate-700">{item.applicantsCount || 0}</span> },
    {
      header: 'Type', accessor: 'type', render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium text-slate-600 ${item.type === 'Full-time' ? 'bg-blue-100/50' :
          item.type === 'Internship' ? 'bg-purple-100/50' : 'bg-slate-100'
          }`}>
          {item.type}
        </span>
      )
    },
  ];

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentJob(item);
      setFormData({
        ...item,
        responsibilities: item.responsibilities && item.responsibilities.length ? item.responsibilities : [''],
        requirements: item.requirements && item.requirements.length ? item.requirements : [''],
        benefits: item.benefits && item.benefits.length ? item.benefits : [''],
        applicationInstructions: item.applicationInstructions && item.applicationInstructions.length ? item.applicationInstructions : [''],
        deadline: item.deadline ? new Date(item.deadline).toISOString().split('T')[0] : '',
      });
    } else {
      setCurrentJob(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentJob) {
        await updateJob(currentJob._id, formData);
      } else {
        await createJob(formData);
      }
      fetchJobs();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save job:", error);
      alert("Failed to save job. Please check all fields.");
    }
  };

  const handleDelete = (id) => {
    const jobId = typeof id === 'object' ? id._id : id;
    setItemToDelete(jobId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(itemToDelete);
      fetchJobs();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  // Dynamic Field Handlers
  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AdminTable
        title="Job Listing Management"
        columns={columns}
        data={filteredJobs}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page={pagination.page}
        totalPages={pagination.pages}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-800">{currentJob ? 'Edit Job' : 'Post New Job'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="jobForm" onSubmit={handleSave} className="space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Job Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  <FormInput label="Company Name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                  <FormInput label="Salary (e.g. $20 - $25 / hr)" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Type</label>
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Technology" />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Mode</label>
                    <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" value={formData.workMode} onChange={e => setFormData({ ...formData, workMode: e.target.value })}>
                      <option>Remote</option>
                      <option>On-site</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Experience Level (e.g. Entry Level)" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                  <FormInput label="Company Website Link" value={formData.companyLink} onChange={e => setFormData({ ...formData, companyLink: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Country (e.g. Pakistan, India)" value={formData.country || ''} onChange={e => setFormData({ ...formData, country: e.target.value })} />
                  <FormInput label="City (e.g. Lahore, Bangalore)" value={formData.city || ''} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Education Prerequisite" value={formData.education || ''} onChange={e => setFormData({ ...formData, education: e.target.value })} placeholder="Bachelor's in CS / Software Engineering" />
                  <FormInput label="Application Deadline" type="date" value={formData.deadline || ''} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Apply Link (Official URL)" value={formData.applyLink || formData.applyUrl || ''} onChange={e => setFormData({ ...formData, applyLink: e.target.value, applyUrl: e.target.value })} placeholder="https://company.com/careers" />
                  <FormInput label="Application Source Label" value={formData.sourceName || ''} onChange={e => setFormData({ ...formData, sourceName: e.target.value })} placeholder="Official Company Careers Portal" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Company Website Link" value={formData.companyLink || ''} onChange={e => setFormData({ ...formData, companyLink: e.target.value })} />
                  <FormInput label="Company Logo URL" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://logo.clearbit.com/company.com" />
                </div>

                <FormTextArea label="Job Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} required />

                {/* Key Responsibilities */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">Key Responsibilities</label>
                  {formData.responsibilities.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'responsibilities')}
                        placeholder={`Responsibility ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'responsibilities')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('responsibilities')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Responsibility
                  </button>
                </div>

                {/* Requirements */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">Requirements</label>
                  {formData.requirements.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'requirements')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('requirements')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Requirement
                  </button>
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">Benefits</label>
                  {formData.benefits.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                        placeholder={`Benefit ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'benefits')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('benefits')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Benefit
                  </button>
                </div>

                {/* How to Apply Instructions */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">How to Apply (Step-by-Step Instructions)</label>
                  {(formData.applicationInstructions || ['']).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'applicationInstructions')}
                        placeholder={`Step ${index + 1}: e.g. Review eligibility and submit CV on official portal`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'applicationInstructions')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('applicationInstructions')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Application Step
                  </button>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
              <button form="jobForm" type="submit" className="btn btn-primary px-6 py-2.5">
                {currentJob ? 'Update Job' : 'Post Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job listing?"
      />
    </>
  );
};

export default JobManager;
