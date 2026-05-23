import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import AdminTable, { AdminModal, FormInput, FormTextArea, ConfirmDialog } from './AdminComponents';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../api';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0, pages: 1 });

  // Initial Form State
  const initialFormState = {
    title: '',
    description: '',
    date: '',
    time: '', // e.g., "09:00 AM - 05:00 PM"
    location: '',
    organizer: '',
    category: '',
    image: '',
    agenda: [{ time: '', activity: '' }],
    speakers: [{ name: '', role: '', institution: '', image: '' }],
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Events
  const fetchEvents = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await getEvents({ page, limit: pagination.limit });
      if (data.events) {
        setEvents(data.events);
        setPagination(prev => ({ ...prev, page: data.page, pages: data.pages, total: data.total }));
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pagination.page);
  }, [pagination.page]);

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Location', accessor: 'location' },
    { header: 'Attendees', accessor: 'attendeesCount', render: (item) => <span className="font-semibold text-slate-700">{item.attendeesCount || 0}</span> },
    { header: 'Category', accessor: 'category' },
  ];

  const handleOpenModal = (eventItem = null) => {
    if (eventItem) {
      setCurrentEvent(eventItem);
      setFormData({
        ...eventItem,
        agenda: eventItem.agenda && eventItem.agenda.length ? eventItem.agenda : [{ time: '', activity: '' }],
        speakers: eventItem.speakers && eventItem.speakers.length ? eventItem.speakers : [{ name: '', role: '', institution: '', image: '' }]
      });
    } else {
      setCurrentEvent(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentEvent) {
        await updateEvent(currentEvent._id, formData);
      } else {
        await createEvent(formData);
      }
      fetchEvents();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Failed to save event. Please check all fields.");
    }
  };

  const handleDelete = (id) => {
    const eventId = typeof id === 'object' ? id._id : id;
    setItemToDelete(eventId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(itemToDelete);
      fetchEvents();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  // Agenda Handlers
  const handleAgendaChange = (index, field, value) => {
    const updatedAgenda = [...formData.agenda];
    updatedAgenda[index] = { ...updatedAgenda[index], [field]: value };
    setFormData({ ...formData, agenda: updatedAgenda });
  };

  const addAgendaItem = () => {
    setFormData({ ...formData, agenda: [...formData.agenda, { time: '', activity: '' }] });
  };

  const removeAgendaItem = (index) => {
    const updatedAgenda = formData.agenda.filter((_, i) => i !== index);
    setFormData({ ...formData, agenda: updatedAgenda });
  };

  // Speaker Handlers
  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index] = { ...updatedSpeakers[index], [field]: value };
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  const addSpeaker = () => {
    setFormData({ ...formData, speakers: [...formData.speakers, { name: '', role: '', institution: '', image: '' }] });
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  const filteredEvents = events.filter(ev => ev.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AdminTable
        title="Event Management"
        columns={columns}
        data={filteredEvents}
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
              <h2 className="text-xl font-bold text-slate-800">{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="eventForm" onSubmit={handleSave} className="space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Event Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  <FormInput label="Organizer" value={formData.organizer} onChange={e => setFormData({ ...formData, organizer: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput label="Date (e.g. March 15, 2026)" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                  <FormInput label="Time (e.g. 09:00 AM - 05:00 PM)" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                  <FormInput label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                </div>

                <FormTextArea label="About the Event (Description)" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                  <FormInput label="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                </div>

                {/* Agenda Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Event Agenda</h3>
                    <button type="button" onClick={addAgendaItem} className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                      <Plus size={14} /> Add Item
                    </button>
                  </div>

                  {formData.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                      <div className="w-1/4">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Time (e.g. 09:00 AM)"
                          value={item.time}
                          onChange={(e) => handleAgendaChange(index, 'time', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Activity / Session Name"
                          value={item.activity}
                          onChange={(e) => handleAgendaChange(index, 'activity', e.target.value)}
                        />
                      </div>
                      <button type="button" onClick={() => removeAgendaItem(index)} className="text-slate-400 hover:text-red-500 pt-2"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>

                {/* Speakers Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Speakers</h3>
                    <button type="button" onClick={addSpeaker} className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                      <Plus size={14} /> Add Speaker
                    </button>
                  </div>

                  {formData.speakers.map((speaker, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                      <button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <FormInput label="Name" value={speaker.name} onChange={e => handleSpeakerChange(index, 'name', e.target.value)} placeholder="Speaker Name" />
                        <FormInput label="Role" value={speaker.role} onChange={e => handleSpeakerChange(index, 'role', e.target.value)} placeholder="e.g. CEO, NexKind" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Institution (Optional)" value={speaker.institution} onChange={e => handleSpeakerChange(index, 'institution', e.target.value)} placeholder="e.g. Tech University" />
                        <FormInput label="Image URL" value={speaker.image} onChange={e => handleSpeakerChange(index, 'image', e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                  ))}
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
              <button form="eventForm" type="submit" className="btn btn-primary px-6 py-2.5">
                {currentEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
      />
    </>
  );
};

export default EventManager;
