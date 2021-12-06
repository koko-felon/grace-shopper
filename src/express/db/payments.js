const client = require("./index.js");

//database functions
async function createPaymentInfoWithUserId(userId) {
  const {
    rows: [paymentInfo],
  } = await client.query(
    `
    INSERT INTO payments("creditCardNumber", "cardExp", cvv, "billingAddress", "billingCity", "billingState", "billingPostalCode")
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *; 
    `,
    [
      creditCardNumber,
      cardExp,
      cvv,
      billingAddress,
      billingCity,
      billingState,
      billingPostalCode,
      isDefault,
    ]
  );
  return paymentInfo;
}

async function updatePaymentInfo({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(", ");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `
    UPDATE payments SET ${setString}
    WHERE id = $1
    RETURNING *;
    `,
    [id, ...fieldValues]
  );
  const [paymentInfo] = rows;
  return paymentInfo;
}

async function getAllUserPaymentInfo(userId) {
  const { rows } = await client.query(`
    SELECT *
    FROM payments;
    `);
  return rows;
}

async function getPaymentInfo(userId, paymentId) {
  const {
    rows: [paymentInfo],
  } = await client.query(
    `
    SELECT *
    FROM payments
    WHERE "userId"=$1 AND "paymentId"=$2; 
    `,
    [userId, paymentId]
  );
  return paymentInfo;
}

async function deletePaymentInfo(paymentId) {
  const {
    rows: [paymentInfo],
  } = await client.query(
    `
    DELETE FROM users WHERE id = $1
    `,
    [paymentInfo]
  );
  return paymentInfo;
}

module.exports(
  createPaymentInfoWithUserId,
  updatePaymentInfo,
  getAllUserPaymentInfo,
  getPaymentInfo,
  deletePaymentInfo
);
