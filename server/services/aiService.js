const { env } = require('../config/env');

const SYSTEM_FALLBACK = `You are NexKind AI, an expert student career counselor and academic assistant for the NexKind platform.
Your goal is to guide students towards successful academic and career paths.

You specialize in:
1. Career Guidance: Help students identify fields of study, career options, industries, and pathways based on their interests.
2. Course Recommendations: Suggest relevant subjects, skills, or courses (direct them to NexKind's courses when appropriate).
3. Scholarship Advice: Help students find and prepare for undergraduate, master's, PhD, international, or government scholarships.
4. Job & Internship Guidance: Guide students on finding roles (Software Engineering, Frontend, Backend, UI/UX, AI, Data Analysis, etc.), remote/hybrid options, resumes, and interview preparation.
5. Skills & Roadmaps: Design step-by-step roadmaps to learn programming, design, marketing, cloud engineering, cybersecurity, etc.

Behavioral Guidelines:
- Be warm, encouraging, empathetic, and professional.
- Provide structured, actionable advice. Use clear headings and bullet points for readability.
- Keep responses concise but highly informative.
- If a student's request is vague, ask clarifying questions to tailor your advice.`;

const GEMINI_MODEL_FALLBACKS = [
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
  'gemini-2.0-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
];

const parseGeminiError = (data, status) => {
  const err = data?.error;
  if (!err) return `Gemini API error (HTTP ${status})`;
  const msg = err.message || err.status || 'Unknown Gemini error';
  if (status === 429) return `Gemini rate limit exceeded. Please wait a minute and try again. (${msg.slice(0, 120)})`;
  if (status === 404) return `Gemini model not found. Update GEMINI_MODEL in server/.env. (${msg.slice(0, 120)})`;
  return msg;
};

/** Merge consecutive same-role messages for Gemini's alternating user/model requirement */
const formatGeminiContents = (messages) => {
  const contents = [];
  for (const msg of messages) {
    if (msg.role === 'system') continue;
    const role = msg.role === 'assistant' ? 'model' : 'user';
    const text = (msg.content || '').trim();
    if (!text) continue;

    const last = contents[contents.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += `\n\n${text}`;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  if (contents.length && contents[0].role !== 'user') {
    contents.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
  }

  return contents;
};

const callGeminiWithModel = async (apiKey, model, messages, settings) => {
  const systemMsg = messages.find((m) => m.role === 'system');
  const contents = formatGeminiContents(messages);

  if (!contents.length) {
    throw new Error('No valid messages to send to Gemini');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: settings?.maxTokens || 512,
      temperature: settings?.temperature ?? 0.7,
    },
  };

  if (systemMsg?.content) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }

  console.log(`[AI/Gemini] Request → model=${model}, messages=${contents.length}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(parseGeminiError(data, response.status));
    err.status = response.status;
    err.model = model;
    err.raw = data;
    throw err;
  }

  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('') || '';

  if (!text) {
    const blockReason = candidate?.finishReason || data?.promptFeedback?.blockReason;
    throw new Error(
      blockReason
        ? `Gemini blocked the response (${blockReason}). Try rephrasing your question.`
        : 'Empty response from Gemini'
    );
  }

  console.log(`[AI/Gemini] Success ← model=${model}, chars=${text.length}`);
  return text;
};

const callGemini = async (messages, settings) => {
  const apiKey = env.geminiApiKey;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in server/.env');
  }

  const preferred = settings?.geminiModel || env.geminiModel;
  const modelsToTry = [
    preferred,
    ...GEMINI_MODEL_FALLBACKS.filter((m) => m !== preferred),
  ].filter(Boolean);

  let lastError;

  for (const model of modelsToTry) {
    try {
      return await callGeminiWithModel(apiKey, model, messages, settings);
    } catch (err) {
      lastError = err;
      console.error(`[AI/Gemini] Failed model=${model}:`, err.message);

      const retryable = [429, 503, 404].includes(err.status);
      if (!retryable) throw err;
    }
  }

  throw lastError || new Error('All Gemini models failed');
};

const callOpenAI = async (messages, settings) => {
  const apiKey = env.openaiApiKey;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set in server/.env');

  const model = env.openaiModel;
  console.log(`[AI/OpenAI] Request → model=${model}`);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: settings?.maxTokens || 1024,
      temperature: settings?.temperature ?? 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[AI/OpenAI] Error:', JSON.stringify(data?.error || data));
    throw new Error(data?.error?.message || `OpenAI API error (HTTP ${response.status})`);
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI');

  console.log(`[AI/OpenAI] Success ← chars=${text.length}`);
  return text;
};

const resolveProvider = (settings) => {
  const dbProvider = settings?.modelProvider;
  if (dbProvider && dbProvider !== 'auto') return dbProvider;
  if (env.aiProvider && env.aiProvider !== 'auto') return env.aiProvider;
  if (env.geminiApiKey && !env.openaiApiKey) return 'gemini';
  if (env.openaiApiKey && !env.geminiApiKey) return 'openai';
  return 'auto';
};

const generateAIResponse = async (messages, settings = {}) => {
  const systemPrompt = settings.systemPrompt || SYSTEM_FALLBACK;

  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.filter((m) => m.role !== 'system' && m.content?.trim()),
  ];

  const provider = resolveProvider(settings);
  console.log('[AI] Resolved provider:', provider);

  const tryOpenAI = () => callOpenAI(fullMessages, settings);
  const tryGemini = () => callGemini(fullMessages, settings);

  if (provider === 'openai') return tryOpenAI();
  if (provider === 'gemini') return tryGemini();

  const hasOpenAI = Boolean(env.openaiApiKey);
  const hasGemini = Boolean(env.geminiApiKey);

  if (!hasOpenAI && !hasGemini) {
    throw new Error(
      'No AI API key configured. Add GEMINI_API_KEY or OPENAI_API_KEY to server/.env and restart the server.'
    );
  }

  if (hasGemini && !hasOpenAI) return tryGemini();
  if (hasOpenAI && !hasGemini) return tryOpenAI();

  try {
    return await tryGemini();
  } catch (geminiErr) {
    console.warn('[AI] Gemini failed, falling back to OpenAI:', geminiErr.message);
    return tryOpenAI();
  }
};

module.exports = { generateAIResponse, SYSTEM_FALLBACK, resolveProvider };
