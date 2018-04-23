var express = require('express');
var services = require('./../services');
var customerRoutes = express.Router();
var controller = require('./../controllers');

customerRoutes.post('/', controller.customer.create);

customerRoutes.get('/', controller.customer.fetch);

customerRoutes.get('/:searchTerm', controller.customer.fetch);

customerRoutes.patch('/:id', controller.customer.update);

customerRoutes.delete('/:id', controller.customer.remove);

module.exports = () => {
  return customerRoutes;
};