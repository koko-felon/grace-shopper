const categoriesRouter = require("express").Router();

categoriesRouter.use((req, res, next) => {
  console.log("A request is being made to /categories");
  next();
});

const { getAllCategories } = require(".../db");

categoriesRouter.get("/", async (req, res, next) => {
  try {
    res.send("hello!");
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesRouter;
