const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const { logAiConfig } = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const courseRoutes = require('./routes/courseRoutes');
const eventRoutes = require('./routes/eventRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const jobRoutes = require('./routes/jobRoutes');
const messageRoutes = require('./routes/messageRoutes');
const donationRoutes = require('./routes/donationRoutes');
const studentRoutes = require('./routes/studentRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const seedData = require('./utils/seeder');
const { runAllSyncs } = require('./services/integrations/syncManager');

logAiConfig();

connectDB().then(async () => {
  await seedData();
  runAllSyncs().catch(err => console.warn('[SERVER-SYNC] Initial sync error:', err.message));
});

const app = express();
const server = http.createServer(app);

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://nexkind.vercel.app',
  'https://nexkiind.vercel.app',
].filter(Boolean).map(origin => origin.replace(/\/$/, ''));

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    const isAllowed = allowedOrigins.includes(normalizedOrigin) ||
      (!isProduction && (normalizedOrigin.includes('localhost') || normalizedOrigin.includes('127.0.0.1'))) ||
      normalizedOrigin.endsWith('.vercel.app') ||
      /https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(normalizedOrigin);

    if (isAllowed) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS blocked origin: ${origin}`), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'x-session-id',
  ],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/test-ai', async (req, res) => {
  try {
    const { generateAIResponse } = require('./services/aiService');
    const result = await generateAIResponse([
      { role: 'user', content: 'Say hello, tell me you are online in 5 words or less.' }
    ]);
    res.json({ success: true, result });
  } catch (error) {
    console.error('[TEST-AI] Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
}

module.exports = app;
