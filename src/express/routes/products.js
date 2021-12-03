const productsRouter = require("express").Router();

// get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    res.send("here is a test");
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
