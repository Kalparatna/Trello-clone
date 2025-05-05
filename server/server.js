// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boards');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes (No `/api` prefix here!)
app.use('/login', authRoutes);
app.use('/boards', boardRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
