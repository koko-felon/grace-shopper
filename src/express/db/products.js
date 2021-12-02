const client = require("./client");

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

async function updateProduct(id, ...fields) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(",");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `
  UPDATE products SET ${setString}
  WHERE id = $1
  RETURNING *
  `,
    [id, ...fieldValues]
  );

  const [product] = rows;

  return product;
}

async function deleteProduct(productId) {
  const {
    rows: [product],
  } = await client.query(
    `
        DELETE FROM products WHERE id=$1 
        `,
    [productId]
  );

  return product;
}

module.exports(
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
);
