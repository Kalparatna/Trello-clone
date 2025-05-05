// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boards');

require('dotenv').config();

const app = express();
connectDB(); // MongoDB connection

app.use(cors({
  origin: 'http://localhost:5173',  // or your production frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/boards', boardRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
