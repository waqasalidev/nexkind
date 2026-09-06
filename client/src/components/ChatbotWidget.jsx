import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import AIChatAssistant from './AIChatAssistant';
import ChatbotAvatar from './common/ChatbotAvatar';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] md:inset-auto md:bottom-24 md:right-6 md:w-[420px] md:h-[600px] md:max-h-[calc(100vh-8rem)] md:rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10"
          >
            <AIChatAssistant embedded onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open NexKind AI Assistant"
        className={`fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-indigo-500/40 transition-all overflow-hidden ${
          isOpen ? 'bg-slate-800 border border-white/20' : 'bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-900 border border-white/30'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <ChatbotAvatar size="lg" animated={true} />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </div>
        )}
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-24 right-6 z-40 hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-full border border-indigo-500/30 shadow-xl cursor-pointer select-none"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles size={13} className="text-amber-400" />
          <span className="font-medium text-slate-200">Ask NexKind AI</span>
        </motion.div>
      )}
    </>
  );
};

export default ChatbotWidget;
