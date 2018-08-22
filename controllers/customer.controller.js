'use-strict';

const express = require('express');
const services = require('./../services');

exports.fetch = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customers.fetch(req.query, req.params, (err, response) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      res.status(response.code).json({ customers: response.customers });
    }
  });
};

exports.update = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customers.fetch({}, {}, (err, fetchResponse1) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.customers.update(req.params.id, req.body, fetchResponse1, (err, updateResponse) => {
        if (err) {
          res.status(err.code).json({ error: err.message });
        } else {
          services.customers.fetch({}, req.params, (err, fetchResponse2) => {
            if (err) {
              res.status(err.code).json({ error: err.message });
            } else {
              res.status(updateResponse.code).json({ updatedCustomers: fetchResponse2.customers[0] });
            }
          });
        }
      });
    }
  });
};

exports.remove = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customers.fetch(req.query, req.params.id, (err, response) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.customers.remove(req.params.id, (err) => {
        if (err) {
          res.status(err.code).json({ error: err.message});
        } else {
          res.status(response.code).json({ deletedProduct: response.customers[0] });
        }
      });
    }
  });
};

exports.create = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customers.create(req.body, (err, newProductId) => {
    if (err) {
      res.status(err.code).json({ error: err.message });
    } else {
      services.customers.fetch(req.query, newProductId, (err, response) => {
        if (err) {
          res.status(err.code).json({ error: err.message });
        } else {
          res.status(response.code).json({ createdProduct: response.customers[0] });
        }
      });
    }
  });
};
