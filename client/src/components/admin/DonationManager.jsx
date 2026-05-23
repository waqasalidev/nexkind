import { useState, useEffect } from 'react';
import AdminTable, { AdminModal, ConfirmDialog, FormInput, FormTextArea } from './AdminComponents';
import { getDonations, getDonationStats, deleteDonation, createDonation } from '../../api';
import { DollarSign, TrendingUp, Users, X } from 'lucide-react';

const DonationManager = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalAmount: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initialFormState = {
    donorName: '',
    email: '',
    amount: '',
    paymentMethod: 'Cash',
    message: '',
    status: 'Completed'
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [donationsRes, statsRes] = await Promise.all([
        getDonations(),
        getDonationStats()
      ]);
      setDonations(donationsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: 'Donor', accessor: 'donorName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Amount', accessor: 'amount', render: (item) => <span className="font-bold text-green-700">${item.amount.toFixed(2)}</span> },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    { header: 'Date', accessor: 'createdAt', render: (item) => new Date(item.createdAt).toLocaleDateString() },
    { header: 'Status', accessor: 'status', render: (item) => <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{item.status}</span> },
  ];

  const handleOpenModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createDonation({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create donation:", error);
      alert("Failed to create donation record.");
    }
  };

  const handleDelete = (id) => {
    const donationId = typeof id === 'object' ? id._id : id;
    setItemToDelete(donationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDonation(itemToDelete);
      fetchData();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete donation:", error);
    }
  };

  const filteredDonations = donations.filter(d =>
    d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Raised</p>
            <h3 className="text-2xl font-bold text-slate-800">${stats.totalAmount.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Donations</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.count}</h3>
          </div>
        </div>
      </div>

      <AdminTable
        title="Donations Received"
        columns={columns}
        data={filteredDonations}
        onAdd={handleOpenModal}
        onEdit={() => { }} // No editing for donations
        onDelete={handleDelete}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record New Donation"
      >
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Donor Name" value={formData.donorName} onChange={e => setFormData({ ...formData, donorName: e.target.value })} required />
            <FormInput label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Amount ($)" type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Method</label>
              <select
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                value={formData.paymentMethod}
                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="Cash">Cash (Manual)</option>
                <option value="Check">Check</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
          </div>

          <FormTextArea label="Message/Notes (Optional)" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3} />

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Add Record
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Record"
        message="Are you sure you want to delete this donation record?"
      />
    </>
  );
};

export default DonationManager;
