'use-strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();
const routes = require('./../routes');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Routes', function() {

  beforeEach(
    () => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  );

  afterEach(
    () => knex.migrate.rollback()
  );

  describe('Product Routes', function () {

    it('Should return all products', function(done) {
      chai.request(server)
      .get('/api/products/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.products.should.be.a('array');
        res.body.products.length.should.equal(3);
        res.body.should.deep.equal({ 
          products: [
            {
              "product_id": 1,
              "name": "Chicken",
              "description": "British sourced whole chicken",
              "price": 1500
            },
            {
              "product_id": 2,
              "name": "Yoghurt",
              "description": "Organic greek style yoghurt",
              "price": 200
            },
            {
              "product_id": 3,
              "name": "Juice",
              "description": "Ribena squash black currant",
              "price": 150
            }
          ]
        });
        done();
      });
    });

    it('Should create and return a new product', function (done) {
      chai.request(server)
        .post('/api/products/')
        .send({name: 'Test Product', description: 'Test Product Description', price: 500})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('successfully added product');
          res.body.should.have.property('createdProduct');
          done();
        });
    });
  });
});
