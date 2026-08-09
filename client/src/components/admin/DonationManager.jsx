import { useState, useEffect } from 'react';
import AdminTable, { AdminModal, ConfirmDialog, FormInput, FormTextArea } from './AdminComponents';
import { getDonations, getDonationStats, deleteDonation, createDonation, verifyDonation } from '../../api';
import { DollarSign, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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
    paymentProvider: 'Stripe',
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
      setDonations(Array.isArray(donationsRes.data) ? donationsRes.data : donationsRes.data.donations || []);
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

  const handleVerify = async (id, newStatus = 'Completed') => {
    try {
      await verifyDonation(id, { status: newStatus, verificationNotes: 'Admin approved transfer reference' });
      toast.success(`Donation marked as ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update donation status');
    }
  };

  const columns = [
    { header: 'Donor', accessor: 'donorName' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Amount', 
      accessor: 'amount', 
      render: (item) => <span className="font-bold text-emerald-600">${item.amount ? item.amount.toFixed(2) : '0.00'}</span> 
    },
    { 
      header: 'Provider', 
      accessor: 'paymentProvider',
      render: (item) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
          {item.paymentProvider || item.paymentMethod || 'Stripe'}
        </span>
      )
    },
    {
      header: 'Reference ID',
      accessor: 'transactionId',
      render: (item) => (
        <span className="font-mono text-xs text-slate-500">
          {item.bankReference || item.payoneerReference || item.transactionId || 'N/A'}
        </span>
      )
    },
    { 
      header: 'Date', 
      accessor: 'createdAt', 
      render: (item) => new Date(item.createdAt).toLocaleDateString() 
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (item) => {
        const isPendingVerif = item.status === 'Verification Required';
        return (
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
              isPendingVerif ? 'bg-amber-100 text-amber-800' :
              'bg-slate-100 text-slate-600'
            }`}>
              {item.status || 'Completed'}
            </span>
            {isPendingVerif && (
              <button
                onClick={() => handleVerify(item._id, 'Completed')}
                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition-colors"
                title="Verify and Approve Transfer"
              >
                Approve
              </button>
            )}
          </div>
        );
      } 
    },
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
      toast.success('Donation record created');
    } catch (error) {
      console.error("Failed to create donation:", error);
      toast.error("Failed to create donation record.");
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
      toast.success('Record removed');
    } catch (error) {
      console.error("Failed to delete donation:", error);
    }
  };

  const filteredDonations = donations.filter(d =>
    (d.donorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.paymentProvider || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Verified Support</p>
            <h3 className="text-2xl font-bold text-slate-800">${stats.totalAmount ? stats.totalAmount.toLocaleString() : 0}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Contributions</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.count || 0}</h3>
          </div>
        </div>
      </div>

      <AdminTable
        title="Donations & Payment Records"
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
        title="Record New Contribution"
      >
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Donor Name" value={formData.donorName} onChange={e => setFormData({ ...formData, donorName: e.target.value })} required />
            <FormInput label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Amount ($)" type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Provider</label>
              <select
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                value={formData.paymentProvider}
                onChange={e => setFormData({ ...formData, paymentProvider: e.target.value })}
              >
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="Google Pay">Google Pay</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Payoneer">Payoneer</option>
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
