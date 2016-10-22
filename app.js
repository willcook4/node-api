const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;
const router = require('./config/routes');
// const config = require('config');

// Database options
// let options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
//   };

// Database connection
// mongoose.connect(config.DBHost, options);
// let db = mongoose.connection;
mongoose.connect('mongodb://localhost/apifruittests');
// db.on('error', console.error.bind(console, 'connection error:'));

// morgan setup (logging)
app.use(morgan('tiny'));

// Parse application json and text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// app.get('/', (req, res) => res.json({ message: "Welcome to the Fruitstore!"}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Wating to catch a banana on port: ${port}...`);
});
// Maybe add Istanbul?