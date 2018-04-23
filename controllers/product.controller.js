'use-strict';

const express = require('express');
const services = require('./../services');

exports.fetch = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  services.productService.fetch(req.query, req.params, (err, response) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      res.status(response.code).json({ products: response.products });
    }
  });
};

exports.update = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.update(req.params.id, req.body, (err, updateResponse) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.productService.fetch(req.query, req.params, (err, fetchResponse) => {
        if (err) {
          res.status(err.code).json({ error: err.message });
        } else {
          res.status(updateResponse.code).json({ updatedProduct: fetchResponse.products[0] });
        }
      });
    }
  });
};

exports.remove = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetch(req.query, req.params, (err, fetchResponse) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.productService.remove(req.params.id, (err, removeResponse) => {
        if (err) {
          res.status(err.code).json({ error: err.message });
        } else {
          res.status(removeResponse.code).json({ deletedProduct: fetchResponse.products[0] });
        }
      });
    }
  });
};

exports.create = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.create(req.body, (err, createResponse) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.productService.fetch(req.query, { id: createResponse.createdProductId }, (err, fetchResponse) => {
        if (err) {
          res.status(err.code).json({ error: err.message });
        } else {
          res.status(createResponse.code).json({ createdProduct: fetchResponse.products[0] });
        }
      });
    }
  });
};
