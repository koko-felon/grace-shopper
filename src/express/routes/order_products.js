const order_productsRouter = require("express").Router();

const {
  addToCart,
  updateCart,
  removeFromCart,
} = require("../db/order_products");

order_productsRouter.post("/", async (req, res, next) => {
  try {
    const cart = await addToCart(req.body);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

order_productsRouter.patch("/", async (req, res, next) => {
  try {
    const updatedCart = await updateCart(req.body);
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});

order_productsRouter.delete("/:orderId/:productId", async (req, res, next) => {
  try {
    const removedFromCart = await removeFromCart({
      productId: req.params.productId,
      orderId: req.params.orderId,
    });

    res.send(removedFromCart);
  } catch (error) {
    next(error);
  }
});

module.exports = order_productsRouter;
