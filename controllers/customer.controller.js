'use-strict';

const express = require('express');
const services = require('./../services');


exports.create = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.create(req.body, (err, newProductId) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.productService.fetch(newProductId, (err, response) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ createdProduct: response[0] });
        }
      });
    }
  });
};

exports.fetchAll = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetchAll((err, response) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ products: response });
    }
  });
};

exports.fetch = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetch(req.params.searchTerm, (err, response) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ products: response });
    }
  });
};

exports.update = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.productService.fetch(req.params.id, (err, response) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ updatedProduct: response[0] });
        }
      });
    }
  });
};

exports.remove = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.productService.fetch(req.params.id, (err, response) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.productService.remove(req.params.id, (err) => {
        if (err) {
          res.status(500).json({ error: err});
        } else {
          res.status(200).json({ deletedProduct: response[0] });
        }
      });
    }
  });
};
