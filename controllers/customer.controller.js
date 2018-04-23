'use-strict';

const express = require('express');
const services = require('./../services');

exports.fetch = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customerService.fetch(req.params.searchTerm, (err, response) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ customers: response });
    }
  });
};

exports.update = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customerService.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.customerService.fetch(req.params.id, (err, response) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ updatedCustomers: response[0] });
        }
      });
    }
  });
};

exports.remove = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customerService.fetch(req.params.id, (err, response) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.customerService.remove(req.params.id, (err) => {
        if (err) {
          res.status(500).json({ error: err});
        } else {
          res.status(200).json({ deletedProduct: response[0] });
        }
      });
    }
  });
};

exports.create = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  services.customerService.create(req.body, (err, newProductId) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      services.customerService.fetch(newProductId, (err, response) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ createdProduct: response[0] });
        }
      });
    }
  });
};
