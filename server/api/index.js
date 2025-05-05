
const app = require('../server');  // Import the Express app
const serverless = require('serverless-http');  // Import serverless-http

// Default export with handler
module.exports.default = serverless(app);  // Use 'default' export for serverless platforms
