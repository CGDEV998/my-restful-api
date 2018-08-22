var express = require('express');
var services = require('./../services');
var customerRoutes = express.Router();
var controller = require('./../controllers');

customerRoutes.post('/', controller.customers.create);

customerRoutes.get('/', controller.customers.fetch);

customerRoutes.get('/:id', controller.customers.fetch);

customerRoutes.patch('/:id', controller.customers.update);

customerRoutes.delete('/:id', controller.customers.remove);

module.exports = () => {
  return customerRoutes;
};