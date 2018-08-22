'use-strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();
const routes = require('./../routes');
const knex = require('../db/knex');
const utils = require('./utils');

chai.use(chaiHttp);

describe('Customer API Routes', function() {
  beforeEach(
    () => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  );

  afterEach(
    () => knex.migrate.rollback()
  );

  describe('Retreiving customers', function() {
    it('Should return all customers', function(done) {
      chai.request(server)
      .get('/api/customers/')
      .end(function(err, res) {
        utils.standardResponseObject200;
        utils.standardCustomerResponseObject(0, 1); // Test Customer 1
        utils.standardCustomerResponseObject(1, 2); // Test Customer 2
        utils.standardCustomerResponseObject(2, 3); // Test Customer 3
        utils.standardCustomerResponseObject(3, 4); // Test Customer 4
        utils.standardCustomerResponseObject(4, 5); // Test Customer 5
        done();
      });
    });

    it('Should return customer by id', function(done) {
      chai.request(server)
      .get('/api/customers/1')
      .end(function(err, res) {
        utils.standardResponseObject200;
        utils.standardCustomerResponseObject(0, 1);
        done();
      });
    });

    it('Should return customer by email', function(done) {
      chai.request(server)
      .get('/api/customers?email=TestCustomer2@email.com')
      .end(function(err, res) {
        utils.standardResponseObject200;
        utils.standardCustomerResponseObject(1, 2);
        done();
      });
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides invalid email query', function(done) {
        chai.request(server)
        .get('/api/customers?wrongvariablename(email)=TestCustomer1@email.com')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Invalid customer search'
          });
          done();
        });
      });
    
    
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .get('/api/customers/not a number')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid customer id'
          });
          done();
        });
      });
    
      it('Should send 404 error if product by id could not be found', function(done) {
        chai.request(server)
        .get('/api/customers/999')
        .end(function(err, res) {
          utils.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that customer, please ensure you entered the correct id or email'
          });
          done();
        });
      });
    
      it('Should send 404 error if product by email could not be found', function(done) {
        chai.request(server)
        .get('/api/customers?email=unknownCustomer@email.com')
        .end(function(err, res) {
          utils.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that customer, please ensure you entered the correct id or email'
          });
          done();
        });
      });
    });
  });

  describe('Updating Customers', function() {
    it('Should return updated customer', function(done) {
      chai.request(server)
      .patch('/api/customers/2')
      .send({
        first_name: 'Test Customer First Name 2 Updated',
        last_name: 'Test Customer Last Name 2 Updated',
        email: 'TestCustomer2Updated@email.com',
      })
      .end(function(err, res) {
        utils.standardResponseObject200;
        res.body.should.have.property('updatedCustomers');
        res.body.updatedCustomers.should.be.a('object');
        res.body.updatedCustomers.should.have.property('customer_id');
        res.body.updatedCustomers.customer_id.should.equal(2);
        res.body.updatedCustomers.should.have.property('first_name');
        res.body.updatedCustomers.first_name.should.equal('Test Customer First Name 2 Updated');
        res.body.updatedCustomers.should.have.property('last_name');
        res.body.updatedCustomers.last_name.should.equal('Test Customer Last Name 2 Updated');
        res.body.updatedCustomers.should.have.property('email');
        res.body.updatedCustomers.email.should.equal('TestCustomer2Updated@email.com');
        res.body.updatedCustomers.should.have.property('created_at');
      });
      done();
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .patch('/api/customers/not a number')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid customer id to update'
          });
          done();
        });
      });

      it(`Should send 400 error if client doesn't provide customer update object`, function(done) {
        chai.request(server)
        .patch('/api/customers/1')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid customer update object'
          });
          done();
        });
      });

      it(`Should send 400 error if client provides invalid customer update object`, function(done) {
        chai.request(server)
        .patch('/api/customers/1')
        .send({
          wrongVariableName: `Test Customer First Name 1`,
          last_name: `Test Customer Last Name 1`,
          email: 'TestCustomer1@email.com',
        })
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: `You have provided an invalid customer update object. Please use properties: first_name, last_name, email`
          });
          done();
        });
      });
    });
  });

  describe('Deleting Customers', function() {
    it('Should return deleted customer', function(done) {

      chai.request(server)
      .delete('/api/customers/5')
      .end(function(err, res) {
        utils.standardResponseObject;
        res.body.customers.should.deep.equal({
          customers: {
            customer_id: 5,
            first_name: `Test Customer First Name 5`,
            last_name: `Test Customer Last Name 5`,
            email: 'TestCustomer5@email.com',
          }
        });
      });
      done();
    });

    describe('Errors', function() {
      it('Should send 400 error if client provides an invalid id', function(done) {
        chai.request(server)
        .delete('/api/customers/not a number')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid customer id'
          });
          done();
        });
      });
      it('Should send 404 error if client provides unknown id', function(done) {
        chai.request(server)
        .delete('/api/customers/999')
        .end(function(err, res) {
          utils.standardErrorResponseObject404;
          res.body.should.deep.equal({
            error: 'Could not find that customer, please ensure you entered the correct id or email'
          });
          done();
        });
      });
    });
  });

  describe('Creating Customers', function() {
    it('Should return newly created customer', function(done) {

      chai.request(server)
      .post('/api/customers/')
      .send({
        first_name: `Test Customer First Name 6`,
        last_name: `Test Customer Last Name 6`,
        email: 'TestCustomer6@email.com',
      })
      .end(function(err, res) {
        utilss.standardResponseObject;
        res.body.customers.should.deep.equal({
          customers: {
            customer_id: 6,
            first_name: `Test Customer First Name 6`,
            last_name: `Test Customer Last Name 6`,
            email: 'TestCustomer6@email.com',
          }
        });
      });
      done();
    });

    describe('Errors', function() {
      it(`Should send 400 error if client doesn't provide customer creation object`, function(done) {
        chai.request(server)
        .post('/api/customers/')
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: 'Please provide a valid customer creation object'
          });
          done();
        });
      });

      it(`Should send 400 error if client provides invalid customer creation object`, function(done) {
        chai.request(server)
        .post('/api/customers/')
        .send({
          wrongVariableName: `Test Customer First Name 7`,
          last_name: `Test Customer Last Name 7`,
          email: 'TestCustomer7@email.com',
        })
        .end(function(err, res) {
          utils.standardErrorResponseObject400;
          res.body.should.deep.equal({
            error: `You have provided an invlaid customer update object.
                    Please use properties: first_name, last_name, email`
          });
          done();
        });
      });
    });
  });
});
