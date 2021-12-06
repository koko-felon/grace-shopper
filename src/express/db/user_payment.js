const client = require("./index.js");

async function addPayment({ userId, paymentId }) {
  const {
    rows: [user_payment],
  } = await client.query(
    `
    INSERT INTO user_payment("userId", "paymentId")
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, paymentId]
  );

  return user_payment;
}

async function removePayment({ userId, paymentId }) {
  const { rows } = await client.query(
    `
    DELETE FROM user_payment
    WHERE user_payment."userId"=$1 and user_payment."paymentId"=$2
    RETURNING *
    `,
    [userId, paymentId]
  );

  console.log("Deleted: ", rows);

  return rows[0];
}

module.exports(addPayment, removePayment);
