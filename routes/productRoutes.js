var express = require('express');
var services = require('./../services');
var productRoutes = express.Router();
var controller = require('./../controllers');

productRoutes.post('/create', controller.product.create);

productRoutes.get('/fetchAll', controller.product.fetchAll);

productRoutes.get('/fetchByName/:name', controller.product.fetch);

productRoutes.get('/fetchById/:id', controller.product.fetch);

productRoutes.patch('/update', controller.product.update);

productRoutes.delete('/remove/:id', controller.product.remove);

module.exports = () => {
  return productRoutes;
};
