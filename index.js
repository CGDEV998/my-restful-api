const express = require('express');
const services = require('./services/index');
const routes = require('./routes');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
  res.json({message: 'welcome to Cayenne API'});
});

app.use('/api/products', routes.products);
app.use('/api/customer', routes.customers);

app.listen(port, () => {
  console.log('Running on port: ' + port);
});

module.exports = app;
