'use-strict';

const customerController = require('./customer.controller');
const productController = require('./product.controller');

module.exports = {
  customers: customerController,
  products: productController
};
