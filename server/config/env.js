const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath, override: true });

if (result.error) {
  console.warn('[ENV] No .env file found at', envPath, '- using process environment only');
} else {
  console.log('[ENV] Loaded', envPath);
}

const trim = (v) => (typeof v === 'string' ? v.trim() : '');

const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL,
  openaiApiKey: trim(process.env.OPENAI_API_KEY),
  openaiModel: trim(process.env.OPENAI_MODEL) || 'gpt-4o-mini',
  geminiApiKey: trim(process.env.GEMINI_API_KEY),
  geminiModel: trim(process.env.GEMINI_MODEL) || 'gemini-2.5-flash-lite',
  aiProvider: trim(process.env.AI_PROVIDER) || 'auto',
};

const logAiConfig = () => {
  console.log('[AI] Provider preference:', env.aiProvider);
  console.log('[AI] OpenAI key:', env.openaiApiKey ? `set (${env.openaiApiKey.slice(0, 7)}...)` : 'NOT SET');
  console.log('[AI] Gemini key:', env.geminiApiKey ? `set (${env.geminiApiKey.slice(0, 7)}...)` : 'NOT SET');
  console.log('[AI] Gemini model:', env.geminiModel);
};

module.exports = { env, logAiConfig, envPath };
