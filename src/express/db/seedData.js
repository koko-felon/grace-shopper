// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function dropTables() {
  try {
    console.log("Dropping Tables!");

    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS user_payment;
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS payments;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished Dropping Tables!");
  } catch (error) {
    console.error("Error Dropping Tables :(");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Creating Tables!");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email varchar(255) UNIQUE NOT NULL,
      "phoneNumber" varchar(15),
      password varchar(255) NOT NULL,
      "firstName" varchar(255),
      "lastName" varchar(255),
      "isAdmin" BOOLEAN DEFAULT false
    );`);

    console.log("Created Table users!");

    await client.query(`
    CREATE TABLE payments (
       id SERIAL PRIMARY KEY,
       "creditCardNumber" varchar(16) NOT NULL,
      "cardExp" INTEGER NOT NULL,
       cvv INTEGER NOT NULL,
       "billingAddress" varchar(255) NOT NULL,
       "billingCity" varchar(255) NOT NULL,
       "billingState" varchar(255) NOT NULL,
      "billingPostalCode" INTEGER NOT NULL,
      "isDefault" BOOLEAN DEFAULT true
    );`);

    console.log("Created Table payments!");

    await client.query(`
    CREATE TABLE addresses (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      address varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      "postalCode" INTEGER NOT NULL
    );`);

    console.log("Created Table addresses!");

    await client.query(`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      description varchar(255),
      image varchar(2048) NOT NULL
    );`);

    console.log("Created Table categories!");

    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      "categoryId" INTEGER REFERENCES categories(id),
      SKU INTEGER NOT NULL,
      "productName" varchar(255) NOT NULL,
      "productDescription" varchar(255) NOT NULL,
      "currentPrice" INTEGER NOT NULL,
      "productQuantity" INTEGER NOT NULL,
      discount INTEGER,
      MSRP INTEGER NOT NULL,
      image varchar(2048)
    );`);

    console.log("Created Table products!");

    await client.query(`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "paymentId" INTEGER REFERENCES payments(id),
      "salesTax" INTEGER NOT NULL,
      total INTEGER NOT NULL,
      discount INTEGER,
      "isActive" BOOLEAN DEFAULT false,
      "paymentDate" varchar(255)
    );`);

    console.log("Created Table orders!");

    await client.query(`
    CREATE TABLE user_payment (
      "userId" INTEGER REFERENCES users(id),
      "paymentId" INTEGER REFERENCES payments(id)
    );`);

    console.log("Created Table user_payment!");

    await client.query(`
    CREATE TABLE order_products (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      "historicalPrice" INTEGER NOT NULL,
      quantity INTEGER NOT NULL
    );`);

    console.log("Created Table order_products!");

    console.log("Finished Creating Tables!");
  } catch (error) {
    console.error("Error Creating Tables :(");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.error("Error running rebuildDB :(");
    throw error;
  }
}

async function seedData() {
  try {
    await usersData();
    await paymentsData();
  } catch (error) {
    throw error;
  }
}

async function usersData() {
  try {
    const users = [
      {
        email: "testuser",
        phoneNumber: "5041234567",
        password: "testuser999",
        firstName: "Pawan",
        lastName: "Benjamin",
        isAdmin: false,
      },
      {
        email: "testuser2",
        phoneNumber: "0000000000",
        password: "testuserpawan",
        firstName: "Riz",
        lastName: "Ruvie",
        isAdmin: false,
      },
      {
        email: "testuser3",
        phoneNumber: "3333333333",
        password: "testuserriz",
        firstName: "Jessica",
        lastName: "TheCoolest",
        isAdmin: false,
      },
    ];

    for (const user of users) {
      await client.query(
        `
      INSERT INTO users
      (email, "phoneNumber", password, "firstName", "lastName", "isAdmin")
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
        [
          user.email,
          user.phoneNumber,
          user.password,
          user.firstName,
          user.lastName,
          user.isAdmin,
        ]
      );
    }
  } catch (error) {
    throw error;
  }
}
async function paymentsData() {
  try {
    const paymentsData = [
      {
        creditCardNumber: "1234567890000000",
        cardExp: 1212,
        cvv: 123,
        billingAddress: "1234 Main Street",
        billingCity: "Mandeville",
        billingState: "LA",
        billingPostalCode: 70448,
        isDefault: true,
      },
      {
        creditCardNumber: "1234567890000001",
        cardExp: 1213,
        cvv: 234,
        billingAddress: "607 A Street",
        billingCity: "Austin",
        billingState: "TX",
        billingPostalCode: 78727,
        isDefault: true,
      },
      {
        creditCardNumber: "1234567890000002",
        cardExp: 1214,
        cvv: 345,
        billingAddress: "1234 Easy Street",
        billingCity: "New Orleans",
        billingState: "LA",
        billingPostalCode: 70112,
        isDefault: true,
      },
    ];

    for (const payment of paymentsData) {
      await client.query(
        `
      INSERT INTO payments
      ("creditCardNumber", "cardExp", cvv, "billingAddress", "billingCity", "billingState","billingPostalCode", "isDefault")
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8);
    `,
        [
          payment.creditCardNumber,
          payment.cardExp,
          payment.cvv,
          payment.billingAddress,
          payment.billingCity,
          payment.billingState,
          payment.billingPostalCode,
          payment.isDefault,
        ]
      );
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
  seedData,
};
