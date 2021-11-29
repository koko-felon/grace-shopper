require('dotenv').config();
const http = require('http');
const app = require('./app');
// bring in the DB connection
const { client } = require('./db');

const server = http.createServer(app);

// connect to the server
const PORT = process.env.PORT || 5000;

// Listen on the port
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);
  // Try to connect to the DB after the server is listening
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});