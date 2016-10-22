const mongoose = require("mongoose");
const Fruit = require('../models/fruit');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Main Block
describe('Fruits', () => {
  beforeEach((done) => {
    //Clear the database
    Fruit.remove({}, (err) =>{
      done();
    });
  });


});