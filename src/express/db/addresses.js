const { client } = require("./index");

async function getAddressByUserId(userId) {
  const {
    rows: [address],
  } = await client.query(
    `
         SELECT * FROM addresses WHERE id=$1;
        `,
    [userId]
  );

  return address;
}

async function createAddressByUserId({
  userId,
  address,
  city,
  state,
  postalCode,
}) {
  const {
    rows: [address],
  } = await client.query(
    `
    INSERT INTO addresses("userId", address, city, state, "postalCode")
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `,
    [userId, address, city, state, postalCode]
  );

  return address;
}

async function updateAddressByUserId({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(",");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `
  UPDATE addresses SET ${setString}
  WHERE id = $1
  RETURNING *
  `,
    [id, ...fieldValues]
  );

  const [address] = rows;

  return address;
}

async function deleteAddress(addressId) {
  const {
    rows: [address],
  } = await client.query(
    `
    DELETE FROM addresses WHERE id=$1 
            `,
    [addressId]
  );

  return address;
}

module.exports = {
  getAddressByUserId,
  createAddressByUserId,
  updateAddressByUserId,
  deleteAddress,
};
