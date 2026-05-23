import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import AdminTable, { AdminModal, ConfirmDialog } from './AdminComponents';
import { getMessages, deleteMessage } from '../../api';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const columns = [
    { header: 'From', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Date', accessor: 'createdAt', render: (item) => new Date(item.createdAt).toLocaleDateString() },
  ];

  const handleOpenModal = (item) => {
    setCurrentMessage(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const messageId = typeof id === 'object' ? id._id : id;
    setItemToDelete(messageId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMessage(itemToDelete);
      fetchMessages();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      setIsModalOpen(false); // Close view modal if deleting from there
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminTable
        title="Contact Messages"
        columns={columns}
        data={filteredMessages}
        onAdd={null} // No adding messages from admin
        onEdit={handleOpenModal} // View serves as edit here
        onDelete={handleDelete}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="View Message">
        {currentMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block font-bold text-slate-700">From:</span>
                {currentMessage.name}
              </div>
              <div>
                <span className="block font-bold text-slate-700">Email:</span>
                {currentMessage.email}
              </div>
              <div>
                <span className="block font-bold text-slate-700">Date sent:</span>
                {new Date(currentMessage.createdAt).toLocaleString()}
              </div>
            </div>

            <div>
              <span className="block font-bold text-slate-700 mb-2">Message:</span>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap">
                {currentMessage.message}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">Close</button>
              <button
                onClick={() => {
                  window.location.href = `mailto:${currentMessage.email}?subject=Re: Inquiry via NexKind&body=Dear ${currentMessage.name},\n\nThank you for contacting us.\n\n...`;
                }}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Reply via Email
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
      />
    </>
  );
};

export default MessageManager;
