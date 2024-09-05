// app.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentRoutes = require('./src/routes/commentRoutes');

const app = express();

// CORS settings
app.use(cors({
  origin: 'https://public-blog-iota.vercel.app', 
  methods: 'GET, POST, PUT, DELETE, OPTIONS', 
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, 
}));

// Preflight request handle
app.options('*', cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app; // Export the app for Vercel's serverless function
