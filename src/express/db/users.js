const client = require("./client");

async function createUser({
  email,
  phoneNumber,
  password,
  firstName,
  lastName,
}) {
  const {
    rows: [user],
  } = await client.query(
    `
    INSERT INTO users(email, "phoneNumber", password, "firstName", "lastName")
    VALUES($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO NOTHING
    RETURNING *;
    `,
    [email, phoneNumber, password, firstName, lastName]
  );

  delete user.password;
  return user;
}

async function getUserById(userId) {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [userId]
  );
  delete user.password;
  return user;
}

async function updateUser({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(",");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `
    UPDATE users SET ${setString}
    WHERE id = $1
    RETURNING *`,
    [id, ...fieldValues]
  );

  const [user] = rows;

  return user;
}

async function deleteUser(userId) {
  const {
    rows: [user],
  } = await client.query(
    `
        DELETE FROM users WHERE id = $1
        `,
    [userId]
  );

  return user;
}

module.exports(createUser, getUserById, updateUser, deleteUser);
