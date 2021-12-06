const apiRouter = require("express").Router();
const usersRouter = require("./users");
const productsRouter = require("./products");
const { getUserById } = require("../db/users");
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    console.log("there is no auth D:");
    next();
  } else if (auth.startsWith(prefix)) {
    console.log("there is an auth :D");
    const token = auth.slice(prefix.length);
    console.log("token: ", token);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Our user Id:-----", id);
      if (id) {
        req.user = await getUserById(id);

        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// GET /api
// This is a sample route
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
// use your sub-routers here

module.exports = apiRouter;
