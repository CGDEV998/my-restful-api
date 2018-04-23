'use-strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();
const routes = require('./../routes');
const knex = require('../db/knex');
const util = require('./utils');

chai.use(chaiHttp);

describe.skip('Customer API Routes', function() {

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
        util.standardResponseObject();
        res.body.should.have.property('customers');
        res.customers.should.be.a('array');
        res.customers.length.should.equal(5);
        res.body.should.deep.equal({ 
          customers: [
            {
              customer_id: 1,
              first_name: 'Test first name 1',
              last_name: 'Test last name 1',
              email: 'Test1@gmail.com',
              phone_number: 10000000000,
              created_at: '00/00/0000'
            },
            {
              customer_id: 2,
              first_name: 'Test first name 2',
              last_name: 'Test last name 2',
              email: 'Test2@gmail.com',
              phone_number: 20000000000,
              created_at: '00/00/0000'
            },
            {
              customer_id: 3,
              first_name: 'Test first name 3',
              last_name: 'Test last name 3',
              email: 'Test3@gmail.com',
              phone_number: 30000000000,
              created_at: '00/00/0000'
            },
            {
              customer_id: 4,
              first_name: 'Test first name 4',
              last_name: 'Test last name 4',
              email: 'Test4@gmail.com',
              phone_number: 40000000000,
              created_at: '00/00/0000'
            },
            {
              customer_id: 5,
              first_name: 'Test first name 5',
              last_name: 'Test last name 5',
              email: 'Test5@gmail.com',
              phone_number: 50000000000,
              created_at: '00/00/0000'
            }
          ]
        });
        done();
      });
    });

    it('Should return customer by id', function(done) {
      chai.request(server)
      .get('/api/customers/1')
      .end(function(err, res) {
        util.standardResponseObject();
        res.body.should.deep.equal({ 
          customers: [
            {
              customer_id: 1,
              first_name: 'Test first name 1',
              last_name: 'Test last name 1',
              email: 'Test1@gmail.com',
              phone_number: 10000000000,
              created_at: '00/00/0000'
            },
          ]
        });
        done();
      });
    });

    it('Should return customer by name', function(done) {
      chai.request(server)
      .get('/api/customers/Test first name 2')
      .end(function(err, res) {
        util.standardResponseObject();
        res.body.should.deep.equal({ 
          customers: [
            {
              customer_id: 2,
              first_name: 'Test first name 2',
              last_name: 'Test last name 2',
              email: 'Test2@gmail.com',
              phone_number: 20000000000,
              created_at: '00/00/0000'
            },
          ]
        });
        done();
      });
    });
  });

  describe('Updating Customers', function() {

    it('Should return updated customer', function(done) {

      chai.request(server)
      .patch('/api/customers/')
      .send({
        first_name: 'Updated test first name 2', 
        last_name: 'Updated test last name 2', 
        email: 'Updated_Test2@gmail.com',
        phone_number: 22000000000,
        created_at: '00/00/0000'
      })
      .end(function(err, res) {
        utils.standardResponseObject();
        res.body.customers.should.deep.equal({
          customers: {
            customer_id: 2,
            first_name: 'Updated test first name 2', 
            last_name: 'Updated test last name 2', 
            email: 'Updated_Test2@gmail.com',
            phone_number: 22000000000,
            created_at: '00/00/0000'
          }
        });
      });
      done();
    });
  });

  describe('Deleting Customers', function() {

    it('Should return deleted customer', function(done) {

      chai.request(server)
      .delete('/api/customers/5')
      .end(function(err, res) {
        utils.standardResponseObject();
        res.body.customers.should.deep.equal({
          customers: {
            customer_id: 5,
            first_name: 'Test first name 5',
            last_name: 'Test last name 5',
            email: 'Test5@gmail.com',
            phone_number: 50000000000,
            created_at: '00/00/0000'
          }
        });
      });
      done();
    });
  });

  describe('Creating Customers', function() {

    it('Should return newly created customer', function(done) {

      chai.request(server)
      .post('/api/customers/')
      .send({
        first_name: 'Test first name 6', 
        last_name: 'Test last name 6', 
        email: 'Test6@gmail.com',
        phone_number: 60000000000,
        created_at: '00/00/0000'
      })
      .end(function(err, res) {
        utils.standardResponseObject();
        res.body.customers.should.deep.equal({
          customers: {
            customer_id: 6,
            first_name: 'Test first name 6', 
            last_name: 'Test last name 6', 
            email: 'Test6@gmail.com',
            phone_number: 60000000000,
            created_at: '00/00/0000'
          }
        });
      });
      done();
    });
  });
});
