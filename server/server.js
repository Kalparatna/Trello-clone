const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boards');
require('dotenv').config();

const app = express();

// Connect to MongoDB (cached)
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust according to your front-end settings
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export the app for serverless handling
module.exports = app;
