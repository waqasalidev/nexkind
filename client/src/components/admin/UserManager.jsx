import { useState, useEffect } from 'react';
import AdminTable, { AdminModal, FormInput, ConfirmDialog } from './AdminComponents';
import { getUsers, updateUser, deleteUser } from '../../api';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: '', status: '' });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'firstName', render: (u) => `${u.firstName} ${u.lastName}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Status', accessor: 'status', render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {item.status || 'Active'}
        </span>
      )
    },
  ];

  const handleOpenModal = (item) => {
    setCurrentUser(item);
    setFormData({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      role: item.role,
      status: item.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(currentUser._id, formData);
      const updatedUser = response.data;
      setUsers(users.map(u => u._id === currentUser._id ? updatedUser : u));
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(itemToDelete);
      setUsers(users.filter(u => u._id !== itemToDelete));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u =>
    (u.firstName + ' ' + u.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading users...</div>
      ) : (
        <AdminTable
          title="User Management"
          columns={columns}
          data={filteredUsers}
          onAdd={() => alert('User registration is done via sign up.')}
          onEdit={handleOpenModal}
          onDelete={(item) => handleDelete(item)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit User">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            <FormInput label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          </div>
          <FormInput label="Email" value={formData.email} readOnly className="bg-slate-100 cursor-not-allowed" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                <option>Active</option><option>Pending</option><option>Suspended</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">Save Changes</button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
      />
    </>
  );
};

export default UserManager;
