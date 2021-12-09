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
       "userId" INTEGER REFERENCES users(id),
       "paymentId" INTEGER REFERENCES payments(id),
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
        userId: 1,
        paymentId: 1,
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
        userId: 2,
        paymentId: 2,
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
        userId: 3,
        paymentId: 3,
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
      ("userId", "paymentId", "creditCardNumber", "cardExp", cvv, "billingAddress", "billingCity", "billingState","billingPostalCode", "isDefault")
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10);
    `,
        [
          payment.userId,
          payment.paymentId,
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
    //categoryId: 1 === Art Category
    //categoryId: 2 === Food/Drink Category
    //categoryId: 3 === Apparel Category
    const products = [
      {
        categoryId: 1,
        SKU: 64738293,
        productName: "Bulldog With Bulldogs",
        productDescription:
          "Created by Coco de Paris, this is an original acrylic piece handsinged by her on a streched canvas.",
        currentPrice: 14999,
        productQuantity: 1,
        discount: 0,
        MSRP: 22499,
        image:
          "https://www.cocodeparis.com/uploads/5/8/3/5/58353153/s833661200733038015_p815_i73_w567.jpeg",
      },
      {
        categoryId: 2,
        SKU: 71264738,
        productName: "Coconut",
        productDescription: "Get your antioxidants with these nuts!",
        currentPrice: 199,
        productQuantity: 232,
        discount: 0,
        MSRP: 299,
        image:
          "https://media.istockphoto.com/photos/broken-coconut-isolated-on-white-picture-id165695881?b=1&k=20&m=165695881&s=170667a&w=0&h=cH19mEVHscxpL-P3GbsoWKEoSlwm_R7O6uOuzk-cCFY=",
      },
      {
        categoryId: 1,
        SKU: 46382317,
        productName: "Framed Coco Chanel Wall Art",
        productDescription:
          "Size 20x24 frame of Coco Chanel. Great for looking fashionable and having cool vibes.",
        currentPrice: 7499,
        productQuantity: 24,
        discount: 0,
        MSRP: 9999,
        image:
          "https://www.nicepng.com/png/full/763-7639957_coco-chanel-coco-chanel-illustration.png",
      },
      {
        categoryId: 3,
        SKU: 49862734,
        productName: "Disney/Pixar Coco Baseball Shirt",
        productDescription:
          'Represent everyones favorite Coco with this trendy baseball shirt! (Chest 40"-42", Waist 36"-38")',
        currentPrice: 2499,
        productQuantity: 2,
        discount: 0,
        MSRP: 4999,
        image:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTwLz9ohrKh5PG6vZjl0w6QvjG9-gz748nb5IMb291Sb2ndcT8Ql3CblGGD56wOGnIKb8FVXFOG7Bl7ex4k9ia158HbY07G0N_zZ31MB-EU6vL1Wv5m-Qz51y8&usqp=CAE",
      },
      {
        categoryId: 3,
        SKU: 61163425,
        productName: "Matching Coconut Crop-Top/Short Set",
        productDescription:
          "Stay stylish and cozy with this Coconut apparel set!",
        currentPrice: 1999,
        productQuantity: 6,
        discount: 0,
        MSRP: 2499,
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRnxUIfk0BAYdwDi3NTgx1XDWH6kyyFmgkUnWnjM1AYH0SQy34JBfOXFAc5aumFO5YnEZpP_ySkZ54HNS0FGkTCBo28DIEO&usqp=CAE",
      },
      {
        categoryId: 1,
        SKU: 29231842,
        productName: "Disney's/Pixar Coco Poster",
        productDescription:
          "20x24 High Digital Print of everyones favorite Coco movie! Great for getting into those Coco vibes.",
        currentPrice: 999,
        productQuantity: 63,
        discount: 0,
        MSRP: 1499,
        image:
          "https://mypostercollection.com/wp-content/uploads/2019/08/coco-1-646x1024.jpg",
      },
      {
        categoryId: 2,
        SKU: 15249187,
        productName: "Cocoyams (6)",
        productDescription: "Cheap Steals on Cocoyams 50% off!",
        currentPrice: 99,
        productQuantity: 1000,
        discount: 0,
        MSRP: 199,
        image:
          "https://thumbs.dreamstime.com/b/taro-root-isolated-white-background-36634033.jpg",
      },
      {
        categoryId: 2,
        SKU: 22123499,
        productName: "Cocoa Beans (8oz)",
        productDescription: "Make all things sweet with some Cocoa beans!",
        currentPrice: 499,
        productQuantity: 548,
        discount: 0,
        MSRP: 600,
        image:
          "https://media.istockphoto.com/photos/worker-holding-a-handful-of-cocoa-beans-picture-id1277772882?b=1&k=20&m=1277772882&s=170667a&w=0&h=BLHDqtYjOpwfuJfIuk-ghbDtNw4JcZrXQzZbV0rP9Lk=",
      },
      {
        categoryId: 3,
        SKU: 56749231,
        productName: "Oversize Cutie Coconut Shirt",
        productDescription:
          'Cutie Coconut oversized to fit well for homewear and sleepwear! (Chest 44"-46", Waist 38"-40")',
        currentPrice: 1499,
        productQuantity: 33,
        discount: 0,
        MSRP: 2499,
        image:
          "https://res.cloudinary.com/teepublic/image/private/s--2i8MUlwP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_348/c_crop,g_north_west,h_626,w_470,x_-61,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-456,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1516317859/production/designs/2290233_0.jpg",
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
