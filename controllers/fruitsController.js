// let mongoose = require('mongoose');
let Fruit = require('../models/fruit');

// GET Index - ('/fruit') All the Fruit
function getFruits(req, res) {
  let query = Fruit.find({});
  query.exec((err, fruits) => {
    if(err) return res.send(err);
    res.json({ message:"List of all items", fruits});
  });
}

// POST Create - ('/fruit')

// Need to add:
// - Error handling codes for missing items, currently 200.
function postFruit(req, res) {
  Fruit.create(req.body, (err, fruit) => {
    if(err) return res.send(err);
    res.json({ message: "Successfully created: ", fruit});
  });
}

// SHOW -('/fruit/:id') Return a single requested fruit
function getFruit(req, res) {
    Fruit.findById(req.params.id, (err, fruit) => {
      if(err) return res.send(err);
      res.json({ message: "Found one fruit: ", fruit });
    });
}

// UPDATE - ('/fruit/:id') Update a single entry
function updateFruit(req, res) {
  Fruit.findById({ _id: req.params.id }, (err, fruit) => {
    if(err) return res.send(err);
    Object.assign(fruit, req.body).save((err, fruit) => {
      if(err) return res.send(err);
      res.json({ message: "Fruit updated!", fruit});
    });

  });
}


// DELETE - ('/fruit/:id')
function deleteFruit(req, res) {
  Fruit.findByIdAndRemove(req.params.id, (err, fruit) => {
    if(err) return res.send(err);
    if(!fruit) return res.json({ message: "Fruit not found: ", fruit });
    res.json({ message: "Following fruit was destroyed: ", fruit });
  });
}

module.exports = { getFruits, postFruit, getFruit, updateFruit, deleteFruit };