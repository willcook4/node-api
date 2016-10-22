const mongoose = require("mongoose");
const Fruit = require('../models/fruit');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();
let api = "http://localhost:8000";

chai.use(chaiHttp);

// Main Block
describe('Fruits', () => {
  beforeEach((done) => {
    //Clear the database
    Fruit.remove({}, (err) =>{
      done();
    });
  });

// Test the Index
  describe('GET /fruits', () => {
    it('it should GET all the fruits', (done) => {
      chai.request(api)
      .get('/fruit')
      .end((err, res) => {
          res.should.have.status(200);
          // console.log(res.body);
          res.body.fruits.should.be.a('array');
          res.body.fruits.length.should.be.eql(0);
        done();
      });
    });
  });

  // Test the POST route
  describe('POST one fruit', () => {
    it('It should NOT POST a fruit without a name', (done) => {
      let fruit = {
        "image": "http://image/of/an/apple.jpg",
        "type": "Cox Orange",
        "price": 3.48,
        "shortDescription": "Short description goes here",
        "longDescription": "Long description goes here",
        "quantityAvail": 12,
        "packSize": "Bag of four",
        "taxRate": 0
      };
      chai.request(api)
      .post('/fruit')
      .send(fruit)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('itemName');
          res.body.errors.itemName.should.have.property('kind').eql('required');
        done();
      });
    });
    it('Should POST a fruit ', (done)=> {
      let fruit = {
        "itemName": "Cox Apples",
        "image": "http://image/of/an/apple.jpg",
        "type": "Cox Orange",
        "price": 3.48,
        "shortDescription": "Short description goes here",
        "longDescription": "Long description goes here",
        "quantityAvail": 12,
        "packSize": "Bag of four",
        "taxRate": 0
      };
      chai.request(api)
        .post('/fruit')
        .send(fruit)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Successfully created: ');
            res.body.fruit.should.have.property('itemName');
            res.body.fruit.should.have.property('image');
            res.body.fruit.should.have.property('type');
            res.body.fruit.should.have.property('price');
            res.body.fruit.should.have.property('shortDescription');
            res.body.fruit.should.have.property('longDescription');
            res.body.fruit.should.have.property('quantityAvail');
            res.body.fruit.should.have.property('packSize');
            res.body.fruit.should.have.property('taxRate');
            res.body.fruit.should.have.property('_id');
            res.body.fruit.should.have.property('createdAt');
            res.body.fruit.should.have.property('onSpecial');
          done();
        });
    });
  });

  // Test the GET with id (/fruit/:id) route
  describe('GET one Fruit by :id', () => {
    it('it should GET a fruit by the given id', (done) => {
      let fruit = new Fruit({
        "itemName": "Lemons",
        "image": "http://image/of/an/lemon.jpg",
        "type": "Meyer",
        "price": 1.48,
        "shortDescription": "Short description goes here",
        "longDescription": "Long description goes here",
        "quantityAvail": 12,
        "packSize": "Bag of four",
        "taxRate": 0
      });
      fruit.save((err, fruit) => {
        chai.request(api)
        .get('/fruit/' + fruit.id)
        .send(fruit)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.fruit.should.have.property('itemName');
            res.body.fruit.should.have.property('image');
            res.body.fruit.should.have.property('type');
            res.body.fruit.should.have.property('price');
            res.body.fruit.should.have.property('shortDescription');
            res.body.fruit.should.have.property('longDescription');
            res.body.fruit.should.have.property('quantityAvail');
            res.body.fruit.should.have.property('packSize');
            res.body.fruit.should.have.property('taxRate');
            res.body.fruit.should.have.property('_id');
            res.body.fruit.should.have.property('createdAt');
            res.body.fruit.should.have.property('onSpecial');
            res.body.fruit.should.have.property('_id').eql(fruit.id);
          done();
        });
      });
    });
  });

  // Test the update route
  describe('PUT/:id', () => {
    it('it should Update a fruit with a given :id', (done) => {
      let limes = new Fruit({
        "itemName": "Limes",
        "image": "http://image/of/an/limes.jpg",
        "type": "Key",
        "price": 1.48,
        "shortDescription": "Short description goes here",
        "longDescription": "Long description goes here",
        "quantityAvail": 12,
        "packSize": "Bag of four",
        "taxRate": 0
      });
      limes.save((err, fruit) => {
        chai.request(api)
        .put('/fruit/' + fruit.id)
        .send({ "quantityAvail": 21 })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Fruit updated!");
            res.body.fruit.should.have.property("quantityAvail").eql(21);
          done();
        });
      });
    });
  });
});