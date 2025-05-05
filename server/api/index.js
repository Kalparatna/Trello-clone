// api/index.js
const app = require('../server');  // Import the Express app
const serverless = require('serverless-http');  // Import serverless-http

// Export the handler for serverless functions
module.exports.handler = serverless(app);
