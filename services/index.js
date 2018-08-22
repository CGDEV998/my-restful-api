'use-strict';

const customerService = require('./customer.service');
const productService = require('./product.service');

module.exports = {
  customers: customerService,
  products: productService
};
