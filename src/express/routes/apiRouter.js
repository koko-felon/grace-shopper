const apiRouter = require('express').Router();

// GET /api
// This is a sample route
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

// use your sub-routers here

module.exports = apiRouter;
