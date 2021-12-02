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
      "SKU" INTEGER NOT NULL,
      "productName" varchar(255) NOT NULL,
      "productDescription" varchar(255) NOT NULL,
      "currentPrice" INTEGER NOT NULL,
      "productQuantity" INTEGER NOT NULL,
      discount INTEGER,
      "MSRP" INTEGER NOT NULL,
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
    await addressesData();
    await categoriesData();
    await productsData();
    await ordersData();
    await userPaymentData();
    await orderProductsData();

    console.log("Finished seeding data!");
  } catch (error) {
    throw error;
  }
}

// Functions to test all data for seedData
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

    console.log("Inserted usersData!");
  } catch (error) {
    console.error("Error running usersData :(");
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
    console.log("Inserted paymentsData!");
  } catch (error) {
    console.error("Error running paymentsData :(");
    throw error;
  }
}

async function addressesData() {
  try {
    const addresses = [
      {
        userId: 1,
        address: "1234 Main Street",
        city: "Mandeville",
        state: "LA",
        postalCode: 70448,
      },
      {
        userId: 2,
        address: "333 Prairie Street",
        city: "Prairieville",
        state: "LA",
        postalCode: 32448,
      },
      {
        userId: 3,
        address: "3636 John Doe Street",
        city: "New York",
        state: "NY",
        postalCode: 73254,
      },
    ];

    for (const address of addresses) {
      await client.query(
        `
      INSERT INTO addresses
      ("userId", address, city, state, "postalCode")
      VALUES ($1, $2, $3, $4, $5);
    `,
        [
          address.userId,
          address.address,
          address.city,
          address.state,
          address.postalCode,
        ]
      );
    }
    console.log("Inserted addressesData!");
  } catch (error) {
    console.error("Error running addressesData :(");
    throw error;
  }
}

async function categoriesData() {
  try {
    const categories = [
      {
        name: "Art",
        description: "Art on all things Coco!",
        image: "http://somelink.fakeurl",
      },
      {
        name: "Food/Drink",
        description: "Get steals on all your Coco groceries!",
        image: "http://somelink.fakeurl",
      },
      {
        name: "Apparel",
        description: "Coco apparel to fit all styles!",
        image: "http://somelink.fakeurl",
      },
    ];

    for (const category of categories) {
      await client.query(
        `
      INSERT INTO categories
      (name, description, image)
      VALUES ($1, $2, $3);
    `,
        [category.name, category.description, category.image]
      );
    }
    console.log("Inserted categoriesData!");
  } catch (error) {
    console.error("Error running categoriesData :(");
    throw error;
  }
}

async function productsData() {
  try {
    const products = [
      {
        categoryId: 1,
        SKU: 64738293,
        productName: "Crazy Coconuts!",
        productDescription: "Coconuts painted by Coco herself!",
        currentPrice: 50000,
        productQuantity: 1,
        discount: 0,
        MSRP: 100000,
        image: "http://someimage.fakeurl",
      },
      {
        categoryId: 2,
        SKU: 71264738,
        productName: "Coconut",
        productDescription: "Get your antioxidants with these nuts!",
        currentPrice: 200,
        productQuantity: 200,
        discount: 0,
        MSRP: 300,
        image: "http://someimage.fakeurl",
      },
      {
        categoryId: 3,
        SKU: 56749231,
        productName: "Cocomelons",
        productDescription: "Lululemons with coconuts (size SMed)!",
        currentPrice: 7000,
        productQuantity: 1,
        discount: 0,
        MSRP: 300,
        image: "http://someimage.fakeurl",
      },
    ];

    for (const product of products) {
      await client.query(
        `
      INSERT INTO products
      ("categoryId", "SKU", "productName" , "productDescription", "currentPrice", "productQuantity", discount, "MSRP", image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `,
        [
          product.categoryId,
          product.SKU,
          product.productName,
          product.productDescription,
          product.currentPrice,
          product.productQuantity,
          product.discount,
          product.MSRP,
          product.image,
        ]
      );
    }
    console.log("Inserted productsData!");
  } catch (error) {
    console.error("Error running productsData :(");
    throw error;
  }
}

async function ordersData() {
  try {
    const orders = [
      {
        userId: 1,
        paymentId: 1,
        salesTax: 9,
        total: 10000,
        discount: 0,
        isActive: true,
        paymentDate: "01/03/21",
      },
      {
        userId: 2,
        paymentId: 2,
        salesTax: 9,
        total: 2500,
        discount: 1000,
        isActive: false,
        paymentDate: "04/13/21",
      },
      {
        userId: 3,
        paymentId: 3,
        salesTax: 9,
        total: 5000,
        discount: 500,
        isActive: true,
        paymentDate: "11/24/21",
      },
    ];

    for (const order of orders) {
      await client.query(
        `
      INSERT INTO orders
      ("userId", "paymentId", "salesTax", total, discount, "isActive", "paymentDate")
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
        [
          order.userId,
          order.paymentId,
          order.salesTax,
          order.total,
          order.discount,
          order.isActive,
          order.paymentDate,
        ]
      );
    }
    console.log("Inserted ordersData!");
  } catch (error) {
    console.error("Error running ordersData :(");
    throw error;
  }
}

async function userPaymentData() {
  try {
    const userPayments = [
      {
        userId: 1,
        paymentId: 1,
      },
      {
        userId: 2,
        paymentId: 2,
      },
      {
        userId: 3,
        paymentId: 3,
      },
    ];

    for (const userPayment of userPayments) {
      await client.query(
        `
      INSERT INTO user_payment
      ("userId", "paymentId")
      VALUES ($1, $2);
    `,
        [userPayment.userId, userPayment.paymentId]
      );
    }
    console.log("Inserted userPaymentsData!");
  } catch (error) {
    console.error("Error running userPaymentsData :(");
    throw error;
  }
}

async function orderProductsData() {
  try {
    const orderProducts = [
      {
        orderId: 1,
        productId: 1,
        historicalPrice: 10000,
        quantity: 1,
      },
      {
        orderId: 2,
        productId: 2,
        historicalPrice: 1300,
        quantity: 1,
      },
      {
        orderId: 3,
        productId: 3,
        historicalPrice: 2000,
        quantity: 5,
      },
    ];

    for (const orderProduct of orderProducts) {
      await client.query(
        `
      INSERT INTO order_products
      ("orderId", "productId", "historicalPrice", quantity)
      VALUES ($1, $2, $3, $4);
    `,
        [
          orderProduct.orderId,
          orderProduct.productId,
          orderProduct.historicalPrice,
          orderProduct.quantity,
        ]
      );
    }
    console.log("Inserted orderProductsData!");
  } catch (error) {
    console.error("Error running orderProductsData :(");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  seedData,
};
