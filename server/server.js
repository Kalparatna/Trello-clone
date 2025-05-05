const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));


app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);

const boardRoutes = require('./routes/boards');
app.use('/api/boards', boardRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

