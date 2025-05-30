// api/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boards');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['https://trello-clone-phi-snowy.vercel.app', 'http://localhost:5173'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  credentials: true,  // Allow credentials (cookies)
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api/boards', boardRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Run locally: only call listen if we are running locally (not in Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
