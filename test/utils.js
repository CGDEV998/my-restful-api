'use-strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

function standardResponseObject(httpCode) {
  this.httpCode = httpCode;

  return `
    res.should.have.status(${ httpCode }); \n
    res.should.be.json; // jshint ignore:line \n
    res.body.should.be.a('object'); \n
  `;
}

exports.standardResponseObject200 = new standardResponseObject(200);
exports.standardResponseObject201 = new standardResponseObject(201);
exports.standardResponseObject400 = new standardResponseObject(400);
exports.standardResponseObject404 = new standardResponseObject(404);
exports.standardResponseObject410 = new standardResponseObject(410);
exports.standardResponseObject500 = new standardResponseObject(500);

exports.standardCustomerResponseObject = function (arrayIndex, customerId) {
  this.arrayIndex = arrayIndex;
  this.customerId = customerId;

  return `
    res.body.should.have.property('customers');
    res.body.customers.should.be.a('array');
    res.body.customers[${ arrayIndex }].should.be.a('object');
    res.body.customers[${ arrayIndex }].should.have.property('customer_id');
    res.body.customers[${ arrayIndex }].customer_id.should.equal(${ customerId });
    res.body.customers[${ arrayIndex }].should.have.property('first_name');
    res.body.customers[${ arrayIndex }].first_name.should.equal('Test Customer First Name ${ customerId }');
    res.body.customers[${ arrayIndex }].should.have.property('last_name');
    res.body.customers[${ arrayIndex }].last_name.should.equal('Test Customer Last Name ${ customerId }');
    res.body.customers[${ arrayIndex }].should.have.property('email');
    res.body.customers[${ arrayIndex }].email.should.equal('TestCustomer${ customerId }@email.com');
    res.body.customers[${ arrayIndex }].should.have.property('created_at');`;
};
