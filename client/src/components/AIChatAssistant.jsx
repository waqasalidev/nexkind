import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Send, Plus, Trash2, MessageSquare, Bot, User, Loader2,
  Sparkles, PanelLeftClose, PanelLeft, X, Minimize2, Maximize2, LogIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  sendChatMessage, getChatConversations, getChatConversation,
  deleteChatConversation, getChatSettings,
} from '../api';
import { getChatSessionId } from '../utils/chatSession';
import { isLoggedIn, getStoredUser } from '../utils/auth';
import toast from 'react-hot-toast';
import ChatMarkdown from './common/ChatMarkdown';
import ChatbotAvatar from './common/ChatbotAvatar';

const TypingIndicator = memo(() => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

const ChatBubble = memo(({ msg }) => (
  <div className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    {msg.role === 'assistant' && (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-400/20 flex items-center justify-center shrink-0 mt-1 shadow-sm">
        <ChatbotAvatar size="xs" />
      </div>
    )}
    <div
      className={`max-w-[88%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        msg.role === 'user'
          ? 'bg-indigo-600 text-white rounded-tr-sm'
          : msg.isError
          ? 'bg-red-900/40 border border-red-500/30 text-red-200 rounded-tl-sm'
          : 'bg-white/10 backdrop-blur-md border border-white/10 text-slate-100 rounded-tl-sm shadow-sm'
      }`}
    >
      {msg.role === 'user' ? (
        <p className="whitespace-pre-wrap">{msg.content}</p>
      ) : (
        <ChatMarkdown content={msg.content} />
      )}
    </div>
    {msg.role === 'user' && (
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1">
        <User size={16} />
      </div>
    )}
  </div>
));
ChatBubble.displayName = 'ChatBubble';

const WELCOME_DEFAULT = "Hello! I'm NexKind AI. How can I help you today?";

const AIChatAssistant = ({ embedded = false, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(!embedded);
  const [welcome, setWelcome] = useState(WELCOME_DEFAULT);
  const [hasAI, setHasAI] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sendingRef = useRef(false);
  const scrollRafRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isWaiting, scrollToBottom]);

  const welcomeMessage = useMemo(
    () => ({ id: 'welcome', role: 'assistant', content: welcome, createdAt: new Date().toISOString() }),
    [welcome]
  );

  const initWelcome = useCallback((text) => {
    setMessages([{ id: 'welcome', role: 'assistant', content: text, createdAt: new Date().toISOString() }]);
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const { data } = await getChatSettings();
      setWelcome(data.welcomeMessage || WELCOME_DEFAULT);
      setHasAI(data.hasAI !== false);
      initWelcome(data.welcomeMessage || WELCOME_DEFAULT);
    } catch {
      initWelcome(WELCOME_DEFAULT);
    }
  }, [initWelcome]);

  const loadConversations = useCallback(async () => {
    if (!isLoggedIn()) {
      setConversations([]);
      return;
    }
    try {
      const { data } = await getChatConversations();
      setConversations(Array.isArray(data) ? data : []);
    } catch {
      setConversations([]);
    }
  }, []);

  useEffect(() => {
    getChatSessionId();
    setLoggedIn(isLoggedIn());
    loadSettings();
    loadConversations();
  }, [loadSettings, loadConversations]);

  const handleNewChat = useCallback(() => {
    setActiveConvId(null);
    initWelcome(welcome);
    inputRef.current?.focus();
  }, [welcome, initWelcome]);

  const loadConversation = useCallback(async (id) => {
    if (!isLoggedIn()) return;
    try {
      const { data } = await getChatConversation(id);
      setActiveConvId(id);
      setMessages(
        data.messages.map((m, i) => ({
          id: `${id}-${i}`,
          role: m.role,
          content: m.content,
          createdAt: m.createdAt,
        }))
      );
    } catch {
      toast.error('Failed to load conversation');
    }
  }, []);

  const handleDeleteConv = useCallback(async (id, e) => {
    e.stopPropagation();
    if (!isLoggedIn()) return;
    try {
      await deleteChatConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (activeConvId === id) handleNewChat();
      toast.success('Conversation deleted');
    } catch {
      toast.error('Failed to delete');
    }
  }, [activeConvId, handleNewChat]);

  const buildApiHistory = useCallback(
    (currentMessages) =>
      currentMessages
        .filter((m) => m.id !== 'welcome' && m.role !== 'system')
        .map((m) => ({ role: m.role, content: m.content })),
    []
  );

  const handleSend = useCallback(
    async (e) => {
      e?.preventDefault();
      const text = input.trim();
      if (!text || isWaiting || sendingRef.current) return;

      sendingRef.current = true;
      const userMsg = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev.filter((m) => m.id !== 'welcome'), userMsg]);
      setInput('');
      setIsWaiting(true);

      try {
        const payload = {
          message: text,
          sessionId: getChatSessionId(),
        };

        if (loggedIn && activeConvId) {
          payload.conversationId = activeConvId;
        } else if (!loggedIn) {
          payload.history = buildApiHistory([...messages.filter((m) => m.id !== 'welcome'), userMsg]);
        }

        const { data } = await sendChatMessage(payload);

        const aiMsg = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, aiMsg]);

        if (data.persist && data.conversationId) {
          setActiveConvId(data.conversationId);
          loadConversations();
        }
      } catch (err) {
        console.error('[Chat] Error:', err.response?.data || err.message);
        const errMsg =
          err.response?.data?.message ||
          (err.code === 'ERR_NETWORK'
            ? 'Cannot reach server. Is the backend running on port 5000?'
            : 'Failed to get AI response.');
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: `⚠️ ${errMsg}`,
            createdAt: new Date().toISOString(),
            isError: true,
          },
        ]);
      } finally {
        setIsWaiting(false);
        sendingRef.current = false;
        inputRef.current?.focus();
      }
    },
    [input, isWaiting, loggedIn, activeConvId, messages, buildApiHistory, loadConversations]
  );

  const containerClass = embedded
    ? expanded
      ? 'fixed inset-4 z-[60] rounded-3xl'
      : 'w-full h-full'
    : 'fixed inset-0 z-[60]';

  const user = getStoredUser();

  return (
    <div className={`${containerClass} flex bg-slate-950 text-white overflow-hidden`}>
      <AnimatePresence>
        {sidebarOpen && loggedIn && (
          <>
            {/* Mobile Drawer Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute md:relative left-0 top-0 h-full z-20 w-72 bg-slate-900/95 md:bg-slate-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col shrink-0"
            >
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors"
                >
                  <Plus size={18} /> New Chat
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  title="Close Sidebar"
                >
                  <X size={18} />
                </button>
              </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {conversations.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-8 px-4">No saved chats yet</p>
              )}
              {conversations.map((conv) => (
                <button
                  key={conv._id}
                  type="button"
                  onClick={() => loadConversation(conv._id)}
                  className={`w-full text-left p-3 rounded-lg group flex items-start gap-2 transition-colors ${
                    activeConvId === conv._id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <MessageSquare size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-slate-500 truncate">{conv.preview}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteConv(conv._id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </button>
              ))}
            </div>
          </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center shadow-inner">
                <ChatbotAvatar size="sm" />
              </div>
              <div>
                <h2 className="font-bold text-sm">NexKind AI Assistant</h2>
                <p className="text-xs text-slate-400">
                  {isWaiting ? 'Thinking...' : loggedIn ? `Hi, ${user?.firstName || 'Student'}` : 'Guest mode'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {embedded && (
              <>
                <button type="button" onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-white/10 rounded-lg">
                  {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                {onClose && (
                  <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                    <X size={18} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {!loggedIn && (
          <div className="px-4 py-2 bg-indigo-900/30 border-b border-indigo-500/20 flex items-center justify-between gap-2 text-xs">
            <span className="text-indigo-200">Guest chat is not saved. Sign in to keep history.</span>
            <Link to="/student/login" className="flex items-center gap-1 text-white bg-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-500 shrink-0">
              <LogIn size={12} /> Login
            </Link>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
          {isWaiting && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-400/20 flex items-center justify-center shrink-0">
                <ChatbotAvatar size="xs" animated={true} />
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about careers, courses, scholarships..."
              disabled={isWaiting}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isWaiting}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2"
            >
              {isWaiting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-600 mt-2 flex items-center justify-center gap-1">
            <Sparkles size={10} className="text-indigo-400" />
            NexKind AI {hasAI ? '' : '(offline)'} · Verify important information
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
