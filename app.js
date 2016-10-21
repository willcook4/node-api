let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let drink = require('./app/routes/drink');
let config = require('config');

// Database options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
  };

