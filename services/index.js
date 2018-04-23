'use-strict';

const customerService = require('./customer.service');
const productService = require('./product.service');

module.exports = {
  customer: customerService,
  productService: productService
};
