const Message = require('../models/Message');

// @desc    Create a new message (Public)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(400).json({ message: 'Invalid message data', error: error.message });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const count = await Message.countDocuments();
      const messages = await Message.find({})
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      return res.json({
        messages,
        page,
        pages: Math.ceil(count / limit),
        total: count
      });
    } else {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        return res.json(messages);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage
};
