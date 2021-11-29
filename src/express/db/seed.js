// This script runs to rebuild our DB and seed it with data.
const { rebuildDB, seedData } = require("./seedData")
const { client } = require('./index');

const main = async () => {
  await client.connect()
  await rebuildDB();
  await seedData();
  await client.end();
}

main();
