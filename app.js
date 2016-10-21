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

// Database connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Don't show the log when in test
if(config.util.getEnv('NODE_ENV') !== 'test'){
  // morgan setup (logging)
  app.use(morgan('tiny'));
}
