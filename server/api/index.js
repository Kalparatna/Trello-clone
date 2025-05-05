// api/index.js
const serverless = require('serverless-http');
const app = require('../server'); // Import Express app

module.exports.handler = serverless(app); // Wrap for Vercel serverless
