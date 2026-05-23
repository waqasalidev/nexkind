const express = require('express');
const router = express.Router();
const {
  getChatHealth,
  sendMessage,
  getConversations,
  getConversation,
  deleteConversation,
  getChatSettings,
  updateChatSettings,
  getAdminChatSettings,
} = require('../controllers/chatController');
const { protect, optionalAuth, admin } = require('../middleware/authMiddleware');
const { chatRateLimiter } = require('../middleware/rateLimiter');

router.get('/health', getChatHealth);
router.get('/settings', getChatSettings);
router.post('/message', chatRateLimiter(30, 60000), optionalAuth, sendMessage);
router.get('/conversations', optionalAuth, getConversations);
router.get('/conversations/:id', optionalAuth, getConversation);
router.delete('/conversations/:id', optionalAuth, deleteConversation);

router.get('/settings/admin', protect, admin, getAdminChatSettings);
router.put('/settings', protect, admin, updateChatSettings);

module.exports = router;
