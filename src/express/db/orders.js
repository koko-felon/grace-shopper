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

async function getOrderById(orderId) {
  const {
    rows: [order],
  } = await client.query(
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

  return order;
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
  return rows;
}

async function updateOrder({ id, ...fields }) {
  const fieldNames = Object.keys(fields);
  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(",");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `
  UPDATE orders SET ${setString}
  WHERE id = $1
  RETURNING *
  `,
    [id, ...fieldValues]
  );

  const [order] = rows;

  return order;
}

async function deleteOrder(orderId) {
  const {
    rows: [orderId],
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
};
