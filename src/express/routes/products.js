const productsRouter = require("express").Router();
const {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../db/products");

// get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts(req, res, next);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET REQUEST for single product
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// PATCH REQUEST for single product
productsRouter.patch("/:id", async (req, res, next) => {
  let productId = req.params.id;
  try {
    const product = await updateProduct(productId, req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// POST REQUEST for single product
productsRouter.post("/", async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    console.log("LOOKING FOR product", product);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// DELETE REQUEST for single product
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
