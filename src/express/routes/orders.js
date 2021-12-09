const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getCart,
  updateOrder,
  deleteOrder,
} = require("../db/orders");

// GET SINGLE order by orderId
ordersRouter.get("/:id", async (req, res, next) => {
  try {
    console.log("WE ARE INSIDE THE ORDERS, orders");
    const order = await getOrderById(req.params.id);

    res.send(order);
  } catch (error) {
    console.log("LOOKING FOR ERRORS", error);
    next(error);
  }
});

//
ordersRouter.get("/users/:userId/cart", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// GET EVERY ORDER
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// // GET ALL USER'S ORDERS
// ordersRouter.get("/users/:userId", async (req, res, next) => {
//   try {
//     const orders = await getAllOrders(req.params.userId);
//     res.send(orders);
//   } catch (error) {
//     next(error);
//   }
// });

ordersRouter.patch("/orders/:orderId", async (req, res, next) => {
  try {
    const updatedOrder = await updateOrder(req.params.orderId);
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// DELETE
ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedOrder = await deleteOrder(req.params.id);

    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
