'use-strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();
const routes = require('./../routes');
const knex = require('../db/knex');
const util = require('./utils');

chai.use(chaiHttp);

describe.only('Product API Routes', function() {

  beforeEach(
    () => knex.migrate.rollback()
    .then(knex.migrate.latest())
    .then(knex.seed.run())
  );

  afterEach(
    () => knex.migrate.rollback()
  );

  describe('Retrieving Products', function () {
    it('Should return all products', function(done) {
      chai.request(server)
      .get('/api/products/')
      .end(function(err, res){
        util.standardResponseObject200;
        res.body.products.length.should.equal(5);
        res.body.should.deep.equal({ 
          products: [
            {
              product_id: 1,
              name: "Test Product 1",
              description: "Test Description 1",
              price: 1000
            },
            {
              product_id: 2,
              name: 'Test Product 2',
              description: 'Test Description 2',
              price: 2000
            },
            {
              product_id: 3,
              name: 'Test Product 3',
              description: 'Test Description 3',
              price: 3000
            },
            {
              product_id: 4,
              name: 'Test Product 4',
              description: 'Test Description 4',
              price: 4000
            },
            {
              product_id: 5,
              name: 'Test Product 5',
              description: 'Test Description 5',
              price: 5000
            }
          ]
        });
        done();
      });
    });

    it('Should return product by id', function(done) {
      chai.request(server)
      .get('/api/products/1')
      .end(function(err, res) {
        util.standardResponseObject200;
        res.body.should.deep.equal({ 
          products: [
            {
              product_id: 1,
              name: 'Test Product 1',
              description: 'Test Description 1',
              price: 1000
            }
          ]
        });
        done();
      });
    });

    it('Should return product by name', function(done) {
      chai.request(server)
      .get('/api/products?name=Test Product 2')
      .end(function(err, res) {
        util.standardResponseObject200;
        res.body.should.deep.equal({ 
          products: [
            {
              product_id: 2,
              name: 'Test Product 2',
              description: 'Test Description 2',
              price: 2000
            },
          ]
        });
        done();
      });
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides invalid name query', function(done) {
        chai.request(server)
        .get('/api/products?wrongvariablename=Chicken')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Invalid product search'
          });
          done();
        });
      });
    
    
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .get('/api/products/not a number')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid product id'
          });
          done();
        });
      });
    
      it('Should send 404 error if product by id could not be found', function(done) {
        chai.request(server)
        .get('/api/products/999')
        .end(function(err, res) {
          util.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that product, please ensure you entered the correct id or name'
          });
          done();
        });
      });
    
      it('Should send 404 error if product by name could not be found', function(done) {
        chai.request(server)
        .get('/api/products?name=unknown product')
        .end(function(err, res) {
          util.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that product, please ensure you entered the correct id or name'
          });
          done();
        });
      });
    });
  });
  
  describe('Updating Products', function() {
    it('Should return updated product', function (done) {
      chai.request(server)
        .patch('/api/products/4')
        .send({
          name: 'Updated Test Product 4', 
          description: 'Updated Test Description 4', 
          price: 400
        })
        .end(function(err, res) {
          util.standardResponseObject200;
          res.body.should.deep.equal({
            updatedProduct: {
              product_id: 4,
              name: 'Updated Test Product 4', 
              description: 'Updated Test Description 4', 
              price: 400
            }
          });
          done();
        });
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .patch('/api/products/not a number')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid product id to update'
          });
          done();
        });
      });

      it(`Should send 400 error if client doesn't provide product update object`, function(done) {
        chai.request(server)
        .patch('/api/products/1')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid product update object'
          });
          done();
        });
      });

      it(`Should send 400 error if client provides invalid product update object`, function(done) {
        chai.request(server)
        .patch('/api/products/1')
        .send({
          wrongPropName: 'Test product 1',
          description: 'Test Description 1',
          price: 100
        })
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'You have provided an invalid product update object. Please use properties: name, description, price'
          });
          done();
        });
      });
    });
  });

  describe('Deleting Products', function() {
    it('Should return deleted product', function (done) {
      chai.request(server)
        .delete('/api/products/5')
        .end(function(err, res) {
          util.standardResponseObject410;
          res.body.should.deep.equal({
            deletedProduct: {
              product_id: 5,
              name: 'Test Product 5', 
              description: 'Test Description 5', 
              price: 5000
            }
          });
          done();
        });
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .delete('/api/products/not a number')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid product id'
          });
          done();
        });
      });
      it('Should send 404 error if client provides unknown id', function(done) {
        chai.request(server)
        .delete('/api/products/999')
        .end(function(err, res) {
          util.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that product, please ensure you entered the correct id or name'
          });
          done();
        });
      });
    });
  });
    
  describe('Creating Products', function() {
    it('Should return newly created product', function (done) {
      chai.request(server)
        .post('/api/products/')
        .send({
          name: 'Test Product 6', 
          description: 'Test Description 6', 
          price: 6000
        })
        .end(function(err, res) {
          util.standardResponseObject201;
          res.body.should.deep.equal({
            createdProduct: {
              product_id: 6,
              name: 'Test Product 6', 
              description: 'Test Description 6', 
              price: 6000
            }
          });
          done();
        });
    });

    describe('Errors', function() {
      it(`Should send 400 error if client doesn't provide product creation object`, function(done) {
        chai.request(server)
        .post('/api/products/')
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid product creation object'
          });
          done();
        });
      });

      it(`Should send 400 error if client provides invalid product creation object`, function(done) {
        chai.request(server)
        .post('/api/products/')
        .send({
          wrongPropName: 'Test product 7',
          description: 'Test Description 7',
          price: 100
        })
        .end(function(err, res) {
          util.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'You have provided an invalid product creation object. Please use properties: name, description, price'
          });
          done();
        });
      });
    });
  });
});
