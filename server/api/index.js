// api/index.js
const app = require('./server');  // Import the Express app
const serverless = require('serverless-http');  // Import serverless-http

module.exports.handler = serverless(app);  // Wrap the app with serverless-http for Vercel
