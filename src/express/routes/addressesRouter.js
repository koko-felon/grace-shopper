const addressesRouter = require("express").Router();
const {
  getAddressByUserId,
  updateAddressByUserId,
  createAddressByUserId,
  deleteAddress,
} = require("../db");

// GET REQUEST for single address
addressesRouter.get("/:id", async (req, res, next) => {
  try {
    const address = await getAddressByUserId(req.params.id);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

// PATCH REQUEST for single address
addressesRouter.patch("/:id", async (req, res, next) => {
  try {
    const address = await updateAddressByUserId(req.body);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

// POST REQUEST for single address
addressesRouter.post("/", async (req, res, next) => {
  try {
    const address = await createAddressByUserId(req.body);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

// DELETE REQUEST for single address
addressesRouter.delete("/:id", async (req, res, next) => {
  try {
    const address = await deleteAddress(req.params.id);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

module.exports = addressesRouter;
