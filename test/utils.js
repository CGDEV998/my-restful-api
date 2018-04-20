'use-strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

exports.standardResponseObject = () => {
  return `
    res.should.have.status(200); \n
    res.should.be.json; // jshint ignore:line \n
    res.body.should.be.a('object'); \n
  `;
};

