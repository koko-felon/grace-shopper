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
    rows: [singleAddress],
  } = await client.query(
    `
    INSERT INTO addresses("userId", address, city, state, "postalCode")
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `,
    [userId, address, city, state, postalCode]
  );

  return singleAddress;
}

async function updateAddressById(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const {
      rows: [address],
    } = await client.query(
      `
        UPDATE addresses
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return address;
  } catch (error) {
    throw error;
  }
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
  updateAddressById,
  deleteAddress,
};
