import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import AdminTable, { AdminModal, FormInput, FormTextArea, ConfirmDialog } from './AdminComponents';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../api';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0, pages: 1 });

  // Initial Form State
  const initialFormState = {
    title: '',
    instructor: '',
    description: '',
    category: '',
    duration: '',
    totalLectures: 0,
    skillLevel: 'Beginner',
    language: 'English',
    price: 0,
    aboutCourse: '',
    image: '',
    platform: 'NexKind Academy',
    enrollLink: '',
    whatYouWillLearn: [''], // Array of strings
    modules: [{ title: '', description: '', duration: '' }], // Array of objects
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Courses
  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await getCourses({ page, limit: pagination.limit });
      if (data.courses) {
        setCourses(data.courses);
        setPagination(prev => ({ ...prev, page: data.page, pages: data.pages, total: data.total }));
      } else {
        // Fallback if API returns just array (backward compatibility or full fetch)
        setCourses(data);
        // Manually handle pagination state if needed or leave as is if no paging data
        // But since we updated API to return paging object if params sent...
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(pagination.page);
  }, [pagination.page]); // Refetch when page changes

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Instructor', accessor: 'instructor' },
    { header: 'Category', accessor: 'category' },
    { header: 'Students', accessor: 'studentsEnrolled', render: (item) => <span className="font-semibold text-slate-700">{item.studentsEnrolled || 0}</span> },
    { header: 'Price', accessor: 'price', render: (item) => item.price === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${item.price}` },
    {
      header: 'Level', accessor: 'skillLevel', render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.skillLevel === 'Beginner' ? 'bg-green-100 text-green-700' :
          item.skillLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>{item.skillLevel}</span>
      )
    },
  ];

  const handleOpenModal = (course = null) => {
    if (course) {
      setCurrentCourse(course);
      setFormData({
        ...course,
        whatYouWillLearn: course.whatYouWillLearn.length ? course.whatYouWillLearn : [''],
        modules: course.modules.length ? course.modules : [{ title: '', description: '', duration: '' }]
      });
    } else {
      setCurrentCourse(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentCourse) {
        await updateCourse(currentCourse._id, formData);
      } else {
        await createCourse(formData);
      }
      fetchCourses();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save course:", error);
      alert("Failed to save course. Please check all fields.");
    }
  };

  const handleDelete = (id) => {
    // Check if id is an object (the whole row) or just the ID string
    const courseId = typeof id === 'object' ? id._id : id;
    setItemToDelete(courseId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourse(itemToDelete);
      fetchCourses();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete course:", error);
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

  // Module Handlers
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setFormData({ ...formData, modules: updatedModules });
  };

  const addModule = () => {
    setFormData({ ...formData, modules: [...formData.modules, { title: '', description: '', duration: '' }] });
  };

  const removeModule = (index) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AdminTable
        title="Course Management"
        columns={columns}
        data={filteredCourses}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page={pagination.page}
        totalPages={pagination.pages}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
      />

      {/* Custom Modal Content manually rendered to allow scrolling if needed, or use AdminModal with custom width */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-800">{currentCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="courseForm" onSubmit={handleSave} className="space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Course Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  <FormInput label="Instructor Name" value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Platform" value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} placeholder="NexKind Academy" />
                  <FormInput label="Enroll Link" value={formData.enrollLink} onChange={e => setFormData({ ...formData, enrollLink: e.target.value })} placeholder="https://..." />
                </div>

                <FormTextArea label="Short Description (for cards)" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} required />
                <FormTextArea label="About Course (Detailed)" value={formData.aboutCourse} onChange={e => setFormData({ ...formData, aboutCourse: e.target.value })} rows={4} />

                {/* Meta Data */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormInput label="Duration (e.g. 8 Weeks)" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} required />
                  <FormInput label="Total Lectures" type="number" value={formData.totalLectures} onChange={e => setFormData({ ...formData, totalLectures: e.target.value })} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Skill Level</label>
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                      value={formData.skillLevel}
                      onChange={e => setFormData({ ...formData, skillLevel: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <FormInput label="Price ($0 for free)" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Development">Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <FormInput label="Language" value={formData.language} onChange={e => setFormData({ ...formData, language: e.target.value })} />
                </div>

                <FormInput label="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />

                {/* What You'll Learn Sections */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">What You'll Learn points</label>
                  {formData.whatYouWillLearn.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 input-field py-2"
                        value={point}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'whatYouWillLearn')}
                        placeholder={`Point ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'whatYouWillLearn')} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('whatYouWillLearn')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Point
                  </button>
                </div>

                {/* Modules Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Course Content (Modules)</h3>
                    <button type="button" onClick={addModule} className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                      <Plus size={14} /> Add Module
                    </button>
                  </div>

                  {formData.modules.map((mod, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                      <button
                        type="button"
                        onClick={() => removeModule(index)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <FormInput label={`Module ${index + 1} Title`} value={mod.title} onChange={e => handleModuleChange(index, 'title', e.target.value)} placeholder="e.g. Introduction" />
                        <FormInput label="Duration" value={mod.duration} onChange={e => handleModuleChange(index, 'duration', e.target.value)} placeholder="e.g. 45 min" />
                      </div>
                      <FormTextArea label="Description" value={mod.description} onChange={e => handleModuleChange(index, 'description', e.target.value)} rows={2} />
                    </div>
                  ))}
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
              <button form="courseForm" type="submit" className="btn btn-primary px-6 py-2.5">
                {currentCourse ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </>
  );
};

export default CourseManager;
