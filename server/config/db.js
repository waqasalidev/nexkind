const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing.");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MONGO] Remote connection warning: ${error.message}. Attempting local MongoDB fallback...`);
    try {
      const localUri = 'mongodb://127.0.0.1:27017/nexkind';
      const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[MONGO] Connected to local database: ${conn.connection.host}`);
    } catch (localErr) {
      console.warn(`[MONGO] Could not connect to database (${localErr.message}). Server will run in degraded mode.`);
    }
  }
};

module.exports = connectDB;
