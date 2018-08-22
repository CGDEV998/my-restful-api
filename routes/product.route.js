var express = require('express');
var services = require('./../services');
var productRoutes = express.Router();
var controller = require('./../controllers');

productRoutes.post('/', controller.products.create);

productRoutes.get('/', controller.products.fetch);

productRoutes.get('/:id', controller.products.fetch);

productRoutes.patch('/:id', controller.products.update);

productRoutes.delete('/:id', controller.products.remove);

module.exports = () => {
  return productRoutes;
};
