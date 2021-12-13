const { route } = require("../routes/orders");
const { client } = require("./index");

async function getAllOrders() {
  const { rows } = await client.query(
    `
    SELECT *
    FROM orders;
    `
  );

  return rows;
}

function mapTheRows(rows) {
  const mappedOrders = {};

  for (const row of rows) {
    if (!mappedOrders[row.id]) {
      mappedOrders[row.id] = {
        orderId: row.id,
        userId: row.userId,
        paymentId: row.paymentId,
        salesTax: row.salesTax,
        total: row.total,
        discount: row.discount,
        isActive: row.isActive,
        paymentDate: row.paymentDate,
        products: [],
      };
      if (row.productId) {
        mappedOrders[row.id].products.push({
          productId: row.productId,
          historicalPrice: row.historicalPrice,
          quantity: row.quantity,
          categoryId: row.categoryId,
          SKU: row.SKU,
          productName: row.productName,
          productDescription: row.productDescription,
          currentPrice: row.currentPrice,
          productQuantity: row.productQuantity,
          MSRP: row.MSRP,
          image: row.image,
        });
      }
    } else {
      if (row.productId) {
        mappedOrders[row.id].products.push({
          productId: row.productId,
          historicalPrice: row.historicalPrice,
          quantity: row.quantity,
          categoryId: row.categoryId,
          SKU: row.SKU,
          productName: row.productName,
          productDescription: row.productDescription,
          currentPrice: row.currentPrice,
          productQuantity: row.productQuantity,
          MSRP: row.MSRP,
          image: row.image,
        });
      }
    }
  }
  return Object.values(mappedOrders);
}

async function getOrderById(orderId) {
  const { rows } = await client.query(
    ` SELECT 
 orders.id , 
  orders."userId" ,
  orders."paymentId" ,
  orders."salesTax" ,
  orders.total ,
  orders.discount ,
  orders."isActive",
  orders."paymentDate" ,
  order_products."productId" ,
  order_products."historicalPrice" ,
  order_products."quantity",
  products."categoryId" ,
  products."SKU" ,
  products."productName" ,
  products."productDescription" ,
  products."currentPrice" ,
  products."productQuantity",
  products.discount,
  products."MSRP",
  products.image
FROM orders
FULL JOIN order_products 
ON orders.id = order_products."orderId"
FULL JOIN products
ON order_products."productId" = products.id 
    WHERE orders.id= $1;
        `,
    [orderId]
  );

  const orderArray = mapTheRows(rows);
  return orderArray[0];
}

async function getCart(userId) {
  const { rows } = await client.query(
    `
    SELECT 
      orders.id,  
      orders."userId" ,
      orders."paymentId" ,
      orders."salesTax" ,
      orders.total ,
      orders.discount ,
      orders."isActive",
      orders."paymentDate" ,
      order_products."productId" ,
      order_products."historicalPrice" ,
      order_products."quantity",
      products."categoryId" ,
      products."SKU" ,
      products."productName" ,
      products."productDescription" ,
      products."currentPrice" ,
      products."productQuantity",
      products.discount,
      products."MSRP",
      products.image
    FROM orders
    FULL JOIN order_products 
    ON orders.id = order_products."orderId"
    FULL JOIN products
    ON order_products."productId" = products.id 
    WHERE orders."userId" = $1 and orders."isActive" = true
    `,
    [userId]
  );

  const orderArray = mapTheRows(rows);
  return orderArray[0];
}

async function createOrder(userId) {
  const { rows } = await client.query(
    `
  INSERT INTO orders("userId", "salesTax", total)
  VALUES ($1, $2, $3)
 RETURNING *
  `,
    [userId, 9, 0]
  );
  const orderArray = mapTheRows(rows);
  console.log("ORDER ARRYYYY", orderArray);
  return orderArray[0];
}

async function updateOrder(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE orders
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return getOrderById(id);
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(orderId) {
  const {
    rows: [order],
  } = await client.query(
    `
    DELETE FROM orders
    WHERE id= $1
    `,
    [orderId]
  );

  return order;
}

module.exports = {
  getAllOrders,
  getOrderById,
  getCart,
  updateOrder,
  deleteOrder,
  createOrder,
};
