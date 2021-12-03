const apiRouter = require('express').Router()

// GET /api
// This is a sample route
apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  })
})

apiRouter.use('/products', require('./products'))

// use your sub-routers here

module.exports = apiRouter
