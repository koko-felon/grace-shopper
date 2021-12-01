// Connect to DB
const { Client } = require('pg')
const DB_NAME = 'coco-felon'
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`
const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
})

// database methods
// Here is a test from Pawan
// export
module.exports = {
  client,
  // db methods
}
