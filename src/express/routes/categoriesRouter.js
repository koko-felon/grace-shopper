const categoriesRouter = require("express").Router();
const {
  getAllCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../db");

// get all categories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories(req, res, next);
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

// PATCH REQUEST for category
categoriesRouter.patch("/:id", async (req, res, next) => {
  try {
    const category = await updateCategory(req.body);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

// POST REQUEST for category
categoriesRouter.post("/", async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

// DELETE REQUEST for category
categoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const category = await deleteCategory(req.params.id);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesRouter;
