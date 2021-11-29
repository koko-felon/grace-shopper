// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index")

async function rebuildDB() {
  try {
    await client.query(/*sql*/`
      DROP TABLE IF EXISTS users;
    `);

    await client.query(/*sql*/`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );
    `)    // drop tables in correct order
    // build tables in correct order
  } catch (error) {
    throw error
  }
}

async function seedData() {
  try {

  const users = [
    { username: "testuser", password: "testuser999" }
  ];

  for(const user of users) {
    await client.query(/*sql*/`
      INSERT INTO users
      (username, password)
      VALUES ($1, $2);
    `,[user.username, user.password]);
  }

  // create useful starting data
  } catch (error) {
    throw error
  }
}

module.exports = {
  rebuildDB,
  seedData,
}
