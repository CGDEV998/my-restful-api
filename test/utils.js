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


