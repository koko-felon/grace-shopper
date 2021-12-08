const apiRouter = require("express").Router();
const { getUserById } = require("../db/users");
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Our user Id:-----", id);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      console.error(error);
      next(error);
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

apiRouter.use("/products", require("./products"));
apiRouter.use("/addresses", require("./addresses"));
apiRouter.use("/categories", require("./categories"));
apiRouter.use("/orders", require("./orders"));
apiRouter.use("/orderProducts", require("./order_products"));
apiRouter.use("/users", require("./users"));
// use your sub-routers here

module.exports = apiRouter;
