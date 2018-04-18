const express = require('express');
const services = require('./services/');
const routes = require('./routes/');
const bodyParser = require('body-parser');
var logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
  res.json({message: 'welcome to Cayenne API'});
});

app.use('/api/products', routes.products);
app.use('/api/customers', routes.customers);

app.listen(port, (err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log('Running on port: ' + port);
});

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

module.exports = app;
