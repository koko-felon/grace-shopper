const { client } = require("./index");

async function addToCart({ orderId, productId, historicalPrice, quantity }) {
  const {
    rows: [order_product],
  } = await client.query(
    `
    INSERT INTO order_products("orderId", "productId", "historicalPrice", quantity)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [orderId, productId, historicalPrice, quantity]
  );

  return order_product;
}

async function removeFromCart({ orderId, productId }) {
  const { rows } = await client.query(
    `
        DELETE FROM order_products
        WHERE order_products."orderId"=$1 and order_products."productId"=$2
        RETURNING *
        `,
    [orderId, productId]
  );

  console.log("Deleted: ", rows);

  return rows[0];
}

async function updateCart({ orderId, productId, quantity }) {
  const {
    rows: [order_product],
  } = await client.query(
    `
        UPDATE order_products
            SET quantity=$3
            WHERE "orderId"=$1 and "productId"=$2
            RETURNING *
        `,
    [orderId, productId, quantity]
  );

  return order_product;
}

module.exports = { addToCart, removeFromCart, updateCart };
