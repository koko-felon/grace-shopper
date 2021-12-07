const { client } = require("./index");

async function createProduct({
  categoryId,
  SKU,
  productName,
  productDescription,
  currentPrice,
  productQuantity,
  discount,
  MSRP,
  image,
}) {
  const {
    rows: [product],
  } = await client.query(
    `
      INSERT INTO products("categoryId", "SKU", "productName", "productDescription" , "currentPrice" , "productQuantity", discount, "MSRP", image)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `,
    [
      categoryId,
      SKU,
      productName,
      productDescription,
      currentPrice,
      productQuantity,
      discount,
      MSRP,
      image,
    ]
  );
  return product;
}

async function getProducts() {
  const { rows } = await client.query(
    `
        SELECT * FROM products;
    `
  );

  return rows;
}

async function getProductById(productId) {
  const {
    rows: [product],
  } = await client.query(
    `
         SELECT * FROM products WHERE id=$1;
        `,
    [productId]
  );

  return product;
}

async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getProductById(id);
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  const {
    rows: [product],
  } = await client.query(
    `
        DELETE FROM products WHERE id=$1 
        RETURNING *
        `,
    [productId]
  );

  return product;
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
