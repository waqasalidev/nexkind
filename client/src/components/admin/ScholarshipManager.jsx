import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import AdminTable, { AdminModal, FormInput, FormTextArea, ConfirmDialog } from './AdminComponents';
import { getScholarships, createScholarship, updateScholarship, deleteScholarship } from '../../api';

const ScholarshipManager = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentScholarship, setCurrentScholarship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0, pages: 1 });

  // Initial Form State
  const initialFormState = {
    title: '',
    provider: '',
    category: 'Merit-based',
    amount: '',
    deadline: '',
    description: '',
    eligibilityCriteria: [''],
    requiredDocuments: [''],
    providerLink: '',
    applyLink: '',
    image: '',
    country: '',
    university: '',
    degreeLevel: 'Any',
    fundingType: 'Merit Award',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Scholarships
  const fetchScholarships = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await getScholarships({ page, limit: pagination.limit });
      if (data.scholarships) {
        setScholarships(data.scholarships);
        setPagination(prev => ({ ...prev, page: data.page, pages: data.pages, total: data.total }));
      } else {
        setScholarships(data);
      }
    } catch (error) {
      console.error("Failed to fetch scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships(pagination.page);
  }, [pagination.page]);

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Provider', accessor: 'provider' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Applicants', accessor: 'applicantsCount', render: (item) => <span className="font-semibold text-slate-700">{item.applicantsCount || 0}</span> },
    { header: 'Deadline', accessor: 'deadline', render: (item) => <span className="text-red-500 font-medium">{item.deadline}</span> },
    { header: 'Category', accessor: 'category', render: (item) => <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.category}</span> }
  ];

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentScholarship(item);
      setFormData({
        ...item,
        eligibilityCriteria: item.eligibilityCriteria && item.eligibilityCriteria.length ? item.eligibilityCriteria : [''],
        requiredDocuments: item.requiredDocuments && item.requiredDocuments.length ? item.requiredDocuments : ['']
      });
    } else {
      setCurrentScholarship(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentScholarship) {
        await updateScholarship(currentScholarship._id, formData);
      } else {
        await createScholarship(formData);
      }
      fetchScholarships();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save scholarship:", error);
      alert("Failed to save scholarship. Please check all fields.");
    }
  };

  const handleDelete = (id) => {
    const scholarshipId = typeof id === 'object' ? id._id : id;
    setItemToDelete(scholarshipId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteScholarship(itemToDelete);
      fetchScholarships();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete scholarship:", error);
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

  const filteredScholarships = scholarships.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AdminTable
        title="Scholarship Management"
        columns={columns}
        data={filteredScholarships}
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
              <h2 className="text-xl font-bold text-slate-800">{currentScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="scholarshipForm" onSubmit={handleSave} className="space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Scholarship Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  <FormInput label="Provider" value={formData.provider} onChange={e => setFormData({ ...formData, provider: e.target.value })} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="United States" />
                  <FormInput label="University" value={formData.university} onChange={e => setFormData({ ...formData, university: e.target.value })} placeholder="Harvard University" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput label="Amount (e.g. $5,000)" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
                  <FormInput label="Deadline" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} required type="date" />
                  <FormInput label="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Degree Level</label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" value={formData.degreeLevel} onChange={e => setFormData({ ...formData, degreeLevel: e.target.value })}>
                      <option>High School</option>
                      <option>Undergraduate</option>
                      <option>Masters</option>
                      <option>PhD</option>
                      <option>Any</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Funding Type</label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm" value={formData.fundingType} onChange={e => setFormData({ ...formData, fundingType: e.target.value })}>
                      <option>Fully Funded</option>
                      <option>Partially Funded</option>
                      <option>Merit Award</option>
                      <option>Grant</option>
                    </select>
                  </div>
                </div>

                <FormTextArea label="About the Scholarship" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Image URL (Logo)" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                  <FormInput label="Provider Website Link" value={formData.providerLink} onChange={e => setFormData({ ...formData, providerLink: e.target.value })} />
                </div>

                {/* Eligibility */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">Eligibility Criteria</label>
                  {formData.eligibilityCriteria.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'eligibilityCriteria')}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'eligibilityCriteria')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('eligibilityCriteria')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Criteria
                  </button>
                </div>

                {/* Required Documents */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700">Required Documents</label>
                  {formData.requiredDocuments.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={item}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'requiredDocuments')}
                        placeholder={`Document ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'requiredDocuments')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('requiredDocuments')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Document
                  </button>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
              <button form="scholarshipForm" type="submit" className="btn btn-primary px-6 py-2.5">
                {currentScholarship ? 'Update Scholarship' : 'Create Scholarship'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Scholarship"
        message="Are you sure you want to delete this scholarship?"
      />
    </>
  );
};

export default ScholarshipManager;
