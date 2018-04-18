const productRoutes = require('./product.route');
const customerRoutes = require('./customer.route');

module.exports = {
  products: productRoutes(),
  customers: customerRoutes()
};
