const productRoutes = require('./productRoutes');
const customerRoutes = require('./customerRoutes');

module.exports = {
  products: productRoutes(),
  customers: customerRoutes()
};
