'use strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();

function createProducts (product, cb) {
  const response = [];
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();
  const query = {
    text: 'INSERT INTO products(name, description, price) VALUES($1, $2, $3)',
    values: [product.name, product.description, product.price]
  };

  client.query(query, (err, res) => {
    if (err) {
      cb(`Failed to add product: ${ product.name}`);
      return;
    } else {
      cb(null, `successfully added product: ${ product.name}`);
    };
  });
};

function fetchProducts () {}

function updateProducts () {}

function removeProducts () {}

module.exports = {
  createProducts: createProducts
};
