import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import AIChatAssistant from './AIChatAssistant';

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
        className={`fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-indigo-500/40 transition-all overflow-hidden ${
          isOpen ? 'bg-slate-800' : 'bg-gradient-to-br from-indigo-600 to-purple-700'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            <MessageSquare className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-24 right-6 z-40 hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full border border-white/10 shadow-lg"
        >
          <Sparkles size={14} className="text-indigo-400" />
          Ask NexKind AI
        </motion.div>
      )}
    </>
  );
};

export default ChatbotWidget;
