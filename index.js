const express = require('express');
const services = require('./services/index');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var apiRoutes = express.Router();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

apiRoutes.get('/', (req, res) => {
  res.json({message: 'Welcome BillBoard'});
});

apiRoutes.get('/customer', (req, res) => {
  res.json({message: 'successful get - customer'});
});

apiRoutes.get('/customer/:id', (req, res) => {
  res.json({message: 'successful get - customer/id'});
});

apiRoutes.post('/customer', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    customername: req.body.customername
  }));
});

apiRoutes.post('/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.createProducts(req.body, (err, successMessage) => {
    if (err) {
      res.status(500).json({ message: err});
    } else {
      res.json({ message: successMessage});
    }
  });
});

apiRoutes.put('/customer/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    customername: req.body.customername
  }));
});

apiRoutes.delete('/customer/:id', (req, res) => {
  res.json({message: 'successful delete'});
});

apiRoutes.patch('/customer/:id', (req, res) => {
  res.json({message: 'successful patch'});
});

app.get('/', (req, res) => {
  res.json({message: 'welcome to Cayenne API'});
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log('Running on port: ' + port);
});
module.exports = app;
