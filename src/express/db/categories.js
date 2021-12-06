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

async function getCategoryById(id) {
  const {
    rows: [category],
  } = await client.query(
    `
         SELECT * FROM categories WHERE id=$1;
        `,
    [id]
  );

  return category;
}

async function updateCategory(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE categories
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getCategoryById(id);
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId) {
  const {
    rows: [category],
  } = await client.query(
    `
    DELETE FROM categories WHERE id = $1
    RETURNING *
    `,
    [categoryId]
  );
  return category;
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
