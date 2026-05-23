const Conversation = require('../models/Conversation');
const ChatSettings = require('../models/ChatSettings');
const { generateAIResponse, resolveProvider } = require('../services/aiService');
const { env } = require('../config/env');

const getSessionId = (req) =>
  req.headers['x-session-id'] || req.body.sessionId || `guest-${Date.now()}`;

const getOrCreateSettings = async () => {
  let settings = await ChatSettings.findOne();
  if (!settings) {
    settings = await ChatSettings.create({});
  }
  return settings;
};

const normalizeHistory = (history, userMessage) => {
  const base = Array.isArray(history) ? history : [];
  const trimmed = base
    .filter((m) => m?.content?.trim() && ['user', 'assistant'].includes(m.role))
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.trim() }));

  trimmed.push({ role: 'user', content: userMessage.trim() });
  return trimmed;
};

// @desc    AI health check
// @route   GET /api/chat/health
const getChatHealth = async (req, res) => {
  res.json({
    status: 'ok',
    hasGemini: Boolean(env.geminiApiKey),
    hasOpenAI: Boolean(env.openaiApiKey),
    provider: resolveProvider({}),
    geminiModel: env.geminiModel,
    openaiModel: env.openaiModel,
  });
};

// @desc    Send message and get AI response
// @route   POST /api/chat/message
const sendMessage = async (req, res) => {
  const sessionId = getSessionId(req);
  const isAuthenticated = Boolean(req.user?._id);

  try {
    const settings = await getOrCreateSettings();

    if (!settings.isEnabled) {
      return res.status(503).json({ message: 'AI assistant is temporarily unavailable.' });
    }

    const { message, conversationId, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const fastSettings = {
      ...(settings.toObject ? settings.toObject() : settings),
      maxTokens: Math.min(settings.maxTokens || 512, 512),
    };

    // Guest: no database persistence
    if (!isAuthenticated) {
      console.log(`[CHAT] Guest message (not saved): "${message.trim().slice(0, 50)}"`);
      const guestHistory = normalizeHistory(history, message);
      const aiReply = await generateAIResponse(guestHistory, fastSettings);

      return res.json({
        success: true,
        reply: aiReply,
        persist: false,
      });
    }

    // Authenticated: save to database
    console.log(`[CHAT] User ${req.user._id} msg="${message.trim().slice(0, 50)}"`);

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId: req.user._id,
      });
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      conversation = await Conversation.create({
        sessionId,
        userId: req.user._id,
        title: message.slice(0, 50),
        messages: [],
      });
    }

    conversation.messages.push({ role: 'user', content: message.trim() });

    const dbHistory = conversation.messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let aiReply;
    try {
      aiReply = await generateAIResponse(dbHistory, fastSettings);
    } catch (aiError) {
      console.error('[CHAT] AI Error:', aiError.message);
      conversation.messages.pop();
      await conversation.save().catch(() => {});
      return res.status(502).json({
        message: aiError.message || 'AI service unavailable.',
        code: 'AI_ERROR',
      });
    }

    conversation.messages.push({ role: 'assistant', content: aiReply });
    if (conversation.messages.length === 2) {
      conversation.title = message.slice(0, 60);
    }
    await conversation.save();

    res.json({
      success: true,
      persist: true,
      conversationId: conversation._id,
      sessionId,
      reply: aiReply,
    });
  } catch (error) {
    console.error('[CHAT] Server error:', error);
    res.status(500).json({
      message: error.message || 'Failed to process message',
      code: 'SERVER_ERROR',
    });
  }
};

// @desc    Get all conversations (logged-in users only)
// @route   GET /api/chat/conversations
const getConversations = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.json([]);
    }

    const conversations = await Conversation.find({ userId: req.user._id })
      .select('title createdAt updatedAt messages')
      .sort({ updatedAt: -1 })
      .limit(50);

    const list = conversations.map((c) => ({
      _id: c._id,
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      preview: c.messages[c.messages.length - 1]?.content?.slice(0, 80) || '',
      messageCount: c.messages.length,
    }));

    res.json(list);
  } catch (error) {
    console.error('[CHAT] getConversations:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single conversation (logged-in users only)
// @route   GET /api/chat/conversations/:id
const getConversation = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Login required to access chat history' });
    }

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    res.status(404).json({ message: 'Conversation not found' });
  }
};

// @desc    Delete conversation (logged-in users only)
// @route   DELETE /api/chat/conversations/:id
const deleteConversation = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Login required' });
    }

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    await conversation.deleteOne();
    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get chat settings / welcome
// @route   GET /api/chat/settings
const getChatSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({
      welcomeMessage: settings.welcomeMessage,
      isEnabled: settings.isEnabled,
      hasAI: Boolean(env.geminiApiKey || env.openaiApiKey),
      provider: resolveProvider(settings),
      requiresLoginToSave: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update chat settings (admin)
// @route   PUT /api/chat/settings
const updateChatSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const fields = ['welcomeMessage', 'systemPrompt', 'modelProvider', 'maxTokens', 'temperature', 'isEnabled'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) settings[f] = req.body[f];
    });
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get full admin chat settings
// @route   GET /api/chat/settings/admin
const getAdminChatSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({
      ...settings.toObject(),
      hasOpenAI: Boolean(env.openaiApiKey),
      hasGemini: Boolean(env.geminiApiKey),
      geminiModel: env.geminiModel,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getChatHealth,
  sendMessage,
  getConversations,
  getConversation,
  deleteConversation,
  getChatSettings,
  updateChatSettings,
  getAdminChatSettings,
};
