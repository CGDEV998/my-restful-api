var express = require('express');
var services = require('./../services');
var customerRoutes = express.Router();

customerRoutes.get('/', (req, res) => {
  res.json({message: 'successful get - customer'});
});

customerRoutes.get('/:id', (req, res) => {
  res.json({message: 'successful get - customer/id'});
});

customerRoutes.post('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    customername: req.body.customername
  }));
});

customerRoutes.put('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    customername: req.body.customername
  }));
});

customerRoutes.delete('/:id', (req, res) => {
  res.json({message: 'successful delete'});
});

customerRoutes.patch('/:id', (req, res) => {
  res.json({message: 'successful patch'});
});

module.exports = () => {
  return customerRoutes;
};
