const order_productsRouter = require("express").Router();

const {
  addToCart,
  updateCart,
  removeFromCart,
} = require("../db/order_products");

order_productsRouter.post("/addToCart", async (req, res, next) => {
  try {
    const cart = await addToCart(req.params.orderId, req.params.productId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = order_productsRouter;
