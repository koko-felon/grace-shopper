const { client } = require("./index");

//database functions
async function getAllCategories() {
  const { rows } = await client.query(`
    SELECT *
    FROM categories;
    `);
  return rows;
}

async function createCategory({ name, description, image }) {
  const {
    rows: [category],
  } = await client.query(
    `
    INSERT INTO categories(name, description, image)
    VALUES($1, $2, $3)
    RETURNING *;
    `,
    [name, description, image]
  );
  return category;
}

async function updateCategory({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(", ");

  const fieldValues = Object.values(fields);
  const { rows } = await client.query(
    `
    UPDATE categories SET ${setString}
    WHERE id = $1
    RETURNING *;
    `,
    [id, ...fieldValues]
  );
  const [category] = rows;
  return category;
}

async function deleteCategory(categoryId) {
  const {
    rows: [category],
  } = await client.query(
    `
    DELETE FROM categories WHERE id = $1
    `,
    [category]
  );
  return category;
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
