'use strict';

const express = require('express');
const {
  Client
} = require('pg');
const router = express.Router();

exports.create = (product, cb) => {
  const response = [];
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();

  const query = {
    text: 'INSERT INTO products(name, description, price) VALUES($1, $2, $3) returning id',
    values: [product.name, product.description, product.price]
  };

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(`Failed to add product: ${ product.name}`, null);
    } else {
      cb(null, 'successfully added product', res.rows[0].id);
    };
  });
};

exports.fetchAll = (cb) => {
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();

  client.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err.stack);
      cb('Currently no products avaliable', null);
    } else {
      cb(null, res.rows);
    }
  });
};

exports.fetch = (search, cb) => {
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();

  var query;

  if (search.id) {
    query = {
      text: 'SELECT * FROM products WHERE id=$1',
      values: [search.id]
    };
  } else if (search.name) {
    query = {
      text: 'SELECT * FROM products WHERE name=$1',
      values: [search.name]
    };
  } else {
    cb('Please provide a product ID or name to fetch', null);
  }

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb('Something went wrong, please try again', null);
    } else if (res.rows.length === 0) {
      cb('Product does not exist', null);
    } else {
      cb(null, res.rows);
    }
  });
};

exports.update = (product, cb) => {
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();

  const query = {
    text: 'UPDATE products SET name=$2, description=$3, price=$4 WHERE id=$1',
    values: [product.id, product.name, product.description, product.price]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb(`Failed To Update Product ${ product.name }`, null);
    } else {
      cb(null, 'Product successfully updated');
    }
  });
};

exports.remove = (product, cb) => {
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();

  const query = {
    text: 'DELETE FROM products WHERE id=$1',
    values: [product.id]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err).stack;
      cb(`Failed to delete product (id: ${ product.id }), please make sure you're using the correct ID`, null);
    } else {
      cb(null, 'Successfully deleted product');
    }
  });
};
