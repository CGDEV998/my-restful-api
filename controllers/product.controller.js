var express = require('express');
const services = require('./../services');

exports.create = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.create(req.body, (err, response, newProductId) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      services.productService.fetch(newProductId, (err, fetchResponse) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ message: response, createdProduct: fetchResponse[0] });
        }
      });
    }
  });
};

exports.fetchAll = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetchAll((err, response) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ products: response });
    }
  });
};

exports.fetch = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetch(req.params.searchTerm, (err, response) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ products: response });
    }
  });
};

exports.update = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.update(req.params.id, req.body, (err, response) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      services.productService.fetch(req.body, (err, fetchResponse) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.status(200).json({ message: response, updatedProduct: fetchResponse });
        }
      });
    }
  });
};

exports.remove = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetch(req.params, (err, fetchResponse) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      services.productService.remove(req.params, (err, response) => {
        if (err) {
          res.status(500).json({ message: err});
        } else {
          res.status(200).json({ message: response, deletedProduct: fetchResponse });
        }
      });
    }
  });
};
