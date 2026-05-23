import { useState, useEffect } from 'react';
import { Bot, Save, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { getAdminChatSettings, updateChatSettings } from '../../api';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const ChatSettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    welcomeMessage: '',
    systemPrompt: '',
    modelProvider: 'auto',
    maxTokens: 1024,
    temperature: 0.7,
    isEnabled: true,
  });
  const [apiStatus, setApiStatus] = useState({ hasOpenAI: false, hasGemini: false });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAdminChatSettings();
        setFormData({
          welcomeMessage: data.welcomeMessage || '',
          systemPrompt: data.systemPrompt || '',
          modelProvider: data.modelProvider || 'auto',
          maxTokens: data.maxTokens || 1024,
          temperature: data.temperature ?? 0.7,
          isEnabled: data.isEnabled !== false,
        });
        setApiStatus({ hasOpenAI: data.hasOpenAI, hasGemini: data.hasGemini });
      } catch (err) {
        toast.error('Failed to load chat settings');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateChatSettings(formData);
      toast.success('Chat settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading chatbot settings..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <Bot className="text-indigo-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Chatbot Settings</h2>
          <p className="text-slate-500 text-sm">Configure NexKind AI assistant behavior</p>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex items-start gap-3 ${apiStatus.hasOpenAI || apiStatus.hasGemini ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        {apiStatus.hasOpenAI || apiStatus.hasGemini ? (
          <CheckCircle className="text-green-600 shrink-0" size={20} />
        ) : (
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
        )}
        <div className="text-sm">
          <p className="font-semibold text-slate-800">API Key Status</p>
          <p className="text-slate-600 mt-1">
            OpenAI: {apiStatus.hasOpenAI ? '✓ Configured' : '✗ Not set'} · Gemini: {apiStatus.hasGemini ? '✓ Configured' : '✗ Not set'}
          </p>
          {!apiStatus.hasOpenAI && !apiStatus.hasGemini && (
            <p className="text-amber-700 mt-1">Add OPENAI_API_KEY or GEMINI_API_KEY to server/.env</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isEnabled"
            checked={formData.isEnabled}
            onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="isEnabled" className="font-medium text-slate-700">Enable AI Assistant</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Welcome Message</label>
          <textarea
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">System Prompt</label>
          <textarea
            value={formData.systemPrompt}
            onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
            rows={8}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">AI Provider</label>
            <select
              value={formData.modelProvider}
              onChange={(e) => setFormData({ ...formData, modelProvider: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="auto">Auto (OpenAI → Gemini)</option>
              <option value="openai">OpenAI</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Tokens</label>
            <input
              type="number"
              value={formData.maxTokens}
              onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
              min={256}
              max={4096}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Temperature</label>
            <input
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
              min={0}
              max={1}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary flex items-center gap-2"
        >
          {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ChatSettingsManager;
