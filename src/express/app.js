// This is the Web Server
const express = require('express');
const app = express();

// create logs for everything
const morgan = require('morgan');
app.use(morgan('dev'));

// handle application/json requests
app.use(express.json());

// here's our static files
const path = require('path');
app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

// here's our API
app.use('/api', require('./routes/apiRouter'));

// by default serve up the react app if we don't recognize the route
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
});

module.exports = app;